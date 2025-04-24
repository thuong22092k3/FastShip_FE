export type UserRole = "Admin" | "NhanVien" | "TaiXe";

export type UserBase = {
  _id?: string;
  UserName: string;
  Password: string;
  HoTen: string;
  Email: string;
};

export type Admin = UserBase & {
  AdminId: string;
  role: "Admin";
};

export type NhanVien = UserBase & {
  NhanVienId: string;
  HieuSuat: number;
  role: "NhanVien";
};

export type TaiXe = UserBase & {
  TaiXeId: string;
  HieuSuat: number;
  CongViec: number;
  role: "TaiXe";
};

export type User = Admin | NhanVien | TaiXe;

export function isAdmin(user: User): user is Admin {
  return user.role === "Admin";
}

export function isNhanVien(user: User): user is NhanVien {
  return user.role === "NhanVien";
}

export function isTaiXe(user: User): user is TaiXe {
  return user.role === "TaiXe";
}
