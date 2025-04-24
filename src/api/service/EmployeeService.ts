import axios from "axios";
import { ENDPOINTS } from "../End_Point";
import { Admin, NhanVien, TaiXe, User, UserRole } from "../type/EmployeeType";

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

  getUsersByRole: async <T extends User>(role?: UserRole): Promise<T[]> => {
    try {
      const url = role
        ? `${ENDPOINTS.USERS.LIST}?role=${role}`
        : ENDPOINTS.USERS.LIST;

      const response = await axios.get(url);

      return response.data.users.map((user: any) => {
        switch (user.role) {
          case "Admin":
            return {
              _id: user._id,
              AdminID: user.AdminID,
              UserName: user.UserName,
              Password: user.Password,
              HoTen: user.HoTen,
              Email: user.Email,
              role: "Admin",
            };
          case "NhanVien":
            return {
              _id: user._id,
              NhanVienID: user.NhanVienID,
              UserName: user.UserName,
              Password: user.Password,
              HoTen: user.HoTen,
              Email: user.Email,
              HieuSuat: user.HieuSuat || 0,
              role: "NhanVien",
            };
          case "TaiXe":
            return {
              _id: user._id,
              TaiXeID: user.TaiXeID,
              UserName: user.UserName,
              Password: user.Password,
              HoTen: user.HoTen,
              Email: user.Email,
              HieuSuat: user.HieuSuat || 0,
              CongViec: user.CongViec || 0,
              role: "TaiXe",
            };
          default:
            throw new Error(`Unknown role: ${user.role}`);
        }
      });
    } catch (error) {
      console.error("Error fetching users by role:", error);
      throw error;
    }
  },

  getAllAdmins: async (): Promise<Admin[]> => {
    return employeeService.getUsersByRole<Admin>("Admin");
  },

  getAllEmployees: async (): Promise<NhanVien[]> => {
    return employeeService.getUsersByRole<NhanVien>("NhanVien");
  },

  // getAllDrivers: async (): Promise<TaiXe[]> => {
  //   return employeeService.getUsersByRole<TaiXe>("TaiXe");
  // },
  // In your EmployeeService.ts
  getAllDrivers: async (): Promise<TaiXe[]> => {
    try {
      const response = await axios.get(`${ENDPOINTS.USERS.LIST}?role=TaiXe`);
      console.log("API Response:", response);
      return response.data.users.map((user: any) => ({
        TaiXeId: user._id,
        HoTen: user.HoTen,
        UserName: user.UserName,
        Password: user.Password,
        Email: user.Email,
        HieuSuat: user.HieuSuat || 0,
        CongViec: user.CongViec || 0,
        role: "TaiXe" as const,
      }));
    } catch (error) {
      console.error("Error fetching drivers:", error);
      throw error;
    }
  },
  getEmployees: async (): Promise<NhanVien[]> => {
    try {
      const response = await axios.get(`${ENDPOINTS.USERS.LIST}?role=NhanVien`);
      return response.data.users.map((user: any) => ({
        NhanVienID: user._id,
        HoTen: user.HoTen,
        UserName: user.UserName,
        Password: user.Password,
        Email: user.Email,
        HieuSuat: user.HieuSuat || 0,
        role: "NhanVien" as const,
      }));
    } catch (error) {
      console.error("Error fetching employees:", error);
      throw error;
    }
  },

  getDrivers: async (): Promise<TaiXe[]> => {
    try {
      const response = await axios.get(`${ENDPOINTS.USERS.LIST}?role=TaiXe`);
      return response.data.users.map((user: any) => ({
        TaiXeID: user._id,
        HoTen: user.HoTen,
        UserName: user.UserName,
        Password: user.Password,
        Email: user.Email,
        HieuSuat: user.HieuSuat || 0,
        CongViec: user.CongViec || 0,
        role: "TaiXe" as const,
      }));
    } catch (error) {
      console.error("Error fetching drivers:", error);
      throw error;
    }
  },
};
