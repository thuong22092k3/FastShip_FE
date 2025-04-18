import axios from "axios";

const BASE_URL = "/order"; // Đổi nếu backend prefix khác

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
    const response = await axios.post(`${BASE_URL}/createOrder`, data);
    return response.data;
  },

  // Cập nhật trạng thái đơn hàng
  updateStatusOrder: async (DonHangId: string, TrangThai: string) => {
    const response = await axios.put(
      `${BASE_URL}/updateStatusOrder`,
      {
        TrangThai,
      },
      {
        params: { id: DonHangId },
      }
    );
    return response.data;
  },

  // Xóa đơn hàng
  deleteOrder: async (DonHangId: string) => {
    const response = await axios.delete(`${BASE_URL}/deleteOrder`, {
      params: { id: DonHangId },
    });
    return response.data;
  },

  // Lấy danh sách đơn hàng hoặc một đơn hàng cụ thể
  getOrder: async (DonHangId?: string) => {
    const response = await axios.get(`${BASE_URL}/getOrder`, {
      params: DonHangId ? { id: DonHangId } : {},
    });
    return response.data;
  },
};
