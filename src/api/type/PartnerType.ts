export type DoiTac = {
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
  //   createdAt?: Date;
  //   updatedAt?: Date;
};

export type PartnerType =
  | "NhaCungCap"
  | "NhaPhanPhoi"
  | "CongTyVanChuyen"
  | "TrungTamBaoHanh"
  | "Khac";
