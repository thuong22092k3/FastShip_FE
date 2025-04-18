export type Order = {
  DonHangId: string;
  NhanVienId: string;
  NguoiGui: string;
  NguoiNhan: string;
  SDT: string;
  DiaChiLayHang: string;
  DiaChiGiaoHang: string;
  CuocPhi: number;
  TrangThai: string;
  CreatedAt: string;
  UpdatedAt: string;
  GhiChu: string;
};

export const mockOrders = [
  {
    DonHangId: "DH001",
    NhanVienId: "NV01",
    NguoiGui: "Nguyễn Văn A",
    NguoiNhan: "Trần Thị B",
    SDT: "0909123456",
    DiaChiLayHang: "123 Lê Lợi, Q1",
    DiaChiGiaoHang: "456 Nguyễn Trãi, Q5",
    CuocPhi: 50000,
    TrangThai: "Đang giao",
    CreatedAt: "2025-04-14T08:30:00Z",
    UpdatedAt: "2025-04-15T10:15:00Z",
    GhiChu: "Giao hàng trước 17h",
  },
];
