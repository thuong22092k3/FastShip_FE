import axios from "axios";
import { ENDPOINTS } from "../End_Point";
import { Order } from "../type/OrderType";
import { store } from "../../state_management/store/store";
import { UPDATE_ORDER } from "../../state_management/actions/actions";

export const orderService = {
  // const dispatch = useDispatch();
  // const orders = useSelector((state: RootState) => state.orderSlice);
  createOrder: async (data: {
    NhanVienId?: string;
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
        `https://fastship-be.onrender.com/api/order/updateStatusOrder?id=${DonHangId}`,
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
  getOrder: async (): Promise<{ orders: Order[] }> => {
    const response = await axios.get(ENDPOINTS.ORDERS.LIST);
    return response.data || { orders: [] };
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
      const apiUrl = `${ENDPOINTS.ORDERS.DETAIL}?donHangId=${donHangId}`;
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
};
