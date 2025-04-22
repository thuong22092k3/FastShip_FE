import axios from "axios";
import { ENDPOINTS } from "../End_Point";
import { Admin, NhanVien, TaiXe } from "../type/EmployeeType";

export type CreateUserInput =
  | (Omit<Admin, "AdminID"> & { role: "Admin" })
  | (Omit<NhanVien, "NhanVienID"> & { role: "NhanVien" })
  | (Omit<TaiXe, "TaiXeID"> & { role: "TaiXe" });

export type UpdateUserInput = Partial<CreateUserInput> & {
  UserName: string;
};

export const employeeService = {
  login: async (data: { UserName: string; Password: string }) => {
    const res = await axios.post(`${ENDPOINTS.AUTH.LOGIN}`, data);
    return res.data;
  },

  createUser: async (data: CreateUserInput) => {
    const res = await axios.post(`${ENDPOINTS.AUTH.REGISTER}`, data);
    return res.data;
  },

  updateUser: async (data: UpdateUserInput) => {
    const res = await axios.put(`${ENDPOINTS.AUTH.PROFILE}`, data);
    return res.data;
  },

  getUserDetail: async (id: string) => {
    const res = await axios.get(`${ENDPOINTS.USERS.DETAIL(id)}`);
    return res.data;
  },

  getAllUsers: async () => {
    const res = await axios.get(`${ENDPOINTS.USERS.LIST}`);
    return res.data;
  },
};
