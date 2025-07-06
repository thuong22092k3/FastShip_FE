declare type TPartner = {
  // PartnerId: string;
  // PartnerName: string;
  // PartnerType: string;
  // ContactPerson: string;
  // SDT: string;
  // Email: string;
  // DiaChi: string;
  // SoGiayPhep: string;
  // KhuVucHoatDong: string;
  DoiTacId: string;
  TenDoiTac: string;
  KieuDoiTac: string;
  NguoiLienLac: string;
  SDT: string;
  Email: string;
  DiaChi: string;
  SoGiayPhep: string;
  SucChua: number;
  KhuVucHoatDong: string;
};
declare type TVehicle = {
  PhuongTienId: string;
  HangXe: string;
  TaiXeID: string;
  BienSo: string;
  LoaiXe: string;
  SucChua: number;
  TrangThai: string;
  BaoDuong: string;
  ThoiGianBaoDuong?: string;
  DiaDiemId: string;
};
declare type TEmployee = {
  NhanVienID: string;
  HoTen: string;
  UserName: string;
  Password: string;
  Email: string;
  HieuSuat: number;
  DiaDiemId: string;
};
declare type TOrder = {
  _id: string;
  DonHangId: string;
  NhanVienID: string;
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
  deliveryMethod?: string;
  payer: "sender" | "receiver";
  additionalServices?: Array<"viewBeforePay" | "codCheck" | "insurance">;
  packageInfo?: {
    length: number;
    width: number;
    height: number;
    weight: number;
  };
  packageType?: "document" | "parcel" | "heavy_parcel" | "fragile";
  TaiXeID?: string;
};
declare type TDriver = {
  TaiXeID: string;
  UserName: string;
  Password: string;
  HoTen: string;
  Email: string;
  HieuSuat: number;
  CongViec: number;
  DiaDiemId: string;
};
declare type TAdmin = {
  AdminId: string;
  HoTen: string;
  UserName: string;
  Password: string;
  Email: string;
};
declare type TCustomer = {
  CustomerId: string;
  HoTen: string;
  UserName: string;
  Password: string;
  SDT: string;
};
declare type TDelivery = {
  GiaoHangId: string;
  DonHangId: string;
  TaiXeID: string;
  PhuongTienId: string;
  PhuongThuc: string;
  TrangThai: string;
  BangChung: string;
};
declare type TMaintenance = {
  BaoDuongId: string;
  PhuongTienId: string;
  Ngay: string;
  TrangThai: string;
  ChiPhi: number;
};
declare type TRoute = {
  TuyenDuongId: string;
  KhoangCach: string;
  ThoiGianUocTinh: number;
  TuyenDuongToiUu: string;
};

declare type TLocation = {
  DiaDiemId: string;
  name: string;
  address: string;
  district: string;
  province: string;
  latitude: number;
  longitude: number;
};
