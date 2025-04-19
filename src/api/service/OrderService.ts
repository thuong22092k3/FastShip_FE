import axios from "axios";
import { ENDPOINTS } from "../End_Point";
import { Order } from "../type/OrderType";

export const orderService = {
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

  // updateStatusOrder: async (DonHangId: string, TrangThai: string) => {
  //   const response = await axios.put(
  //     ENDPOINTS.ORDERS.UPDATE(DonHangId)
  //     { TrangThai },
  //   );
  //   return response.data;
  // },

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
