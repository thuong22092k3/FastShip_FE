import axios from "axios";
import { ENDPOINTS } from "../End_Point";
import { PagedResponse } from "../type/BaseReponse";
import { Order } from "../type/OrderType";
interface RouteStop {
  name: string;
  address: string;
  latitude: number;
  longitude: number;
  arrivalTime?: string;
}

interface RouteData {
  stops: RouteStop[];
  polyline?: string;
  estimatedTime?: string;
}
export const orderService = {
  // const dispatch = useDispatch();
  // const orders = useSelector((state: RootState) => state.orderSlice);
  createOrder: async (data: {
    NhanVienID?: string;
    NguoiGui: string;
    NguoiNhan: string;
    SDT: string;
    DiaChiLayHang: string;
    DiaChiGiaoHang: string;
    CuocPhi?: number;
    TrangThai?: string;
    GhiChu?: string;
  }) => {
    const response = await axios.post(ENDPOINTS.ORDERS.CREATE, data);
    console.log("response", response.data);
    return response.data;
  },

  updateStatusOrder: async (DonHangId: string, TrangThai: string) => {
    try {
      const response = await axios.put(
        ENDPOINTS.ORDERS.UPDATE_STATUS(DonHangId),
        { TrangThai },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      // dispatch(
      //   UPDATE_ORDER({
      //     DonHangId,
      //     TrangThai,
      //     UpdateAt: new Date().toISOString(),
      //   } as TOrder)
      // );
      return {
        success: true,
        data: response.data,
        updatedOrder: { DonHangId, TrangThai },
      };
    } catch (error) {
      console.error("Update status error:", error);

      // Thêm thông tin chi tiết lỗi
      if (axios.isAxiosError(error)) {
        console.error("Error details:", {
          url: error.config?.url,
          status: error.response?.status,
          data: error.response?.data,
          message: error.message,
        });
      }

      throw error;
    }
  },

  deleteOrder: async (DonHangId: string) => {
    const response = await axios.delete(ENDPOINTS.ORDERS.DELETE(DonHangId));
    return response.data;
  },

  // getOrder: async (DonHangId?: string) => {
  //   const response = DonHangId
  //     ? await axios.get(ENDPOINTS.ORDERS.DETAIL(DonHangId))
  //     : await axios.get(ENDPOINTS.ORDERS.LIST);
  //   return response.data;
  // },
  // getOrder: async (): Promise<{ orders: Order[] }> => {
  //   const response = await axios.get(ENDPOINTS.ORDERS.LIST);
  //   return response.data || { orders: [] };
  // },
  // getOrder: async (
  //   page: number = 1,
  //   limit: number = 10
  // ): Promise<PagedResponse<Order>> => {
  //   const response = await axios.get(ENDPOINTS.ORDERS.LIST(page, limit));
  //   return response.data;
  // },
  getOrder: async (
    page: number = 1,
    limit: number = 10,
    user: { role: string; id: string }
  ): Promise<PagedResponse<Order>> => {
    const params = new URLSearchParams({
      page: page.toString(),
      limit: limit.toString(),
      role: user.role,
      id: user.id,
    });

    const response = await axios.get(`${ENDPOINTS.ORDERS.LIST()}?${params}`);
    return response.data;
  },

  // getDetailOrder: async (donHangId: string): Promise<Order> => {
  //   try {
  //     const response = await axios.get(ENDPOINTS.ORDERS.DETAIL(donHangId));

  //     return response.data.order;
  //   } catch (error) {
  //     console.error("Error fetching order detail:", error);
  //     throw error;
  //   }
  // },

  getDetailOrder: async (donHangId: string): Promise<Order> => {
    try {
      const apiUrl = ENDPOINTS.ORDERS.DETAIL(donHangId);
      console.log("Request URL:", apiUrl);

      const response = await axios.get(apiUrl);

      if (response.data?.order) {
        return response.data.order;
      } else if (response.data) {
        return response.data;
      } else {
        throw new Error("Invalid response format");
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error("Axios error details:", {
          url: error.config?.url,
          status: error.response?.status,
          data: error.response?.data,
          message: error.message,
        });
      }
      throw new Error(`Failed to fetch order details`);
    }
  },

  optimizeRoute: async (order: Order) => {
    try {
      const response = await fetch(ENDPOINTS.ORDERS.LOCATIONS.OPTIMIZE, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ order }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error("Error optimizing route:", error);
      throw error;
    }
  },

  getDeliveryRoute: async (orderId: string) => {
    try {
      const response = await axios.get(
        `${ENDPOINTS.ORDERS.DELIVERY_ROUTE(orderId)}`
      );
      return response.data;
    } catch (error) {
      console.error("Error fetching delivery route:", error);
      throw error;
    }
  },

  searchOrders: async (
    keyword: string,
    page: number = 1,
    limit: number = 10
  ): Promise<PagedResponse<Order>> => {
    const response = await axios.get(ENDPOINTS.ORDERS.SEARCH, {
      params: {
        keyword,
        page,
        limit,
      },
    });
    return response.data;
  },
  assignDriver: async (donHangId: string, TaiXeID: string) => {
    const response = await axios.post(ENDPOINTS.ORDERS.ASSIGN_DRIVER, {
      donHangId,
      TaiXeID,
    });
    return response.data;
  },
  getOrderStats: async (user: {
    role: string;
    id: string;
  }): Promise<{
    total: number;
    active: number;
    completed: number;
  }> => {
    const params = new URLSearchParams({
      role: user.role,
      id: user.id,
    });

    const response = await axios.get(`${ENDPOINTS.ORDERS.STATS}?${params}`);
    return response.data.stats;
  },
};
