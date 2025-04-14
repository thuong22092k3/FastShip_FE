declare type TPartner = {
  PartnerId: string;
  PartnerName: string;
  PartnerType: string;
  ContactPerson: string;
  SDT: string;
  Email: string;
  DiaChi: string;
  SoGiayPhep: string;
  KhuVucHoatDong: string;
};
declare type TVehicle = {
  PhuongTienId: string;
  TaiXeId: string;
  BienSo: string;
  LoaiXe: string;
  SucChua: number;
  TrangThai: string;
  GPSLocation: string;
  BaoDuong: string;
};
declare type TEmployee = {
  NhanVienId: string;
  HoTen: string;
  UserName: string;
  Password: string;
  Email: string;
  HieuSuat: number;
};
declare type TOrder = {
  DonHangId: string;
  NhanVienId: string;
  NguoiGui: string;
  NguoiNhan: string;
  SDT: string;
  DiaChiLayHang: string;
  DiaChiGiaoHang: string;
  CuocPhi: number;
  TrangThai: string;
  CreateAt: string;
  UpdateAt: string;
  GhiChu: string;
};
declare type TDriver = {
  TaiXeId: string;
  UserName: string;
  Password: string;
  HoTen: string;
  Email: string;
  HieuSuat: number;
  CongViec: number;
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
  TaiXeId: string;
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
