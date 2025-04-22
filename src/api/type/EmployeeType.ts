export type UserBase = {
  UserName: string;
  Password: string;
  HoTen: string;
  Email: string;
};

export type Admin = UserBase & {
  AdminID: string;
  role: "Admin";
};

export type NhanVien = UserBase & {
  NhanVienID: string;
  HieuSuat: number;
  role: "NhanVien";
};

export type TaiXe = UserBase & {
  TaiXeID: string;
  HieuSuat: number;
  CongViec: number;
  role: "TaiXe";
};
