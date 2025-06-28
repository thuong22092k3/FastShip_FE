// src/services/AuthService.ts
import axios from "axios";
import { ENDPOINTS } from "../End_Point";
import {
  Admin,
  NhanVien,
  TaiXe,
  User,
  isAdmin,
  isNhanVien,
  isTaiXe,
} from "../type/EmployeeType";

export const AuthService = {
  login: async (UserName: string, Password: string): Promise<Admin> => {
    try {
      const response = await axios.post(`${ENDPOINTS.AUTH.LOGIN}`, {
        UserName,
        Password,
      });
      console.log("response", response);
      console.log(ENDPOINTS.AUTH.LOGIN);
      if (response.data && response.data.user) {
        return response.data.user as Admin;
      }
      throw new Error("Invalid response from server");
    } catch (error) {
      console.error("Login error:", error);
      throw error;
    }
  },

  logout: async (): Promise<void> => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("user");
  },

  getCurrentUser: (): User | null => {
    const userStr = localStorage.getItem("user");
    return userStr ? (JSON.parse(userStr) as User) : null;
  },

  isAuthenticated: (): boolean => {
    return !!localStorage.getItem("authToken");
  },

  hasRole: (requiredRole: "Admin" | "NhanVien" | "TaiXe"): boolean => {
    const user = AuthService.getCurrentUser();
    return user ? user.role === requiredRole : false;
  },

  hasAnyRole: (requiredRoles: ("Admin" | "NhanVien" | "TaiXe")[]): boolean => {
    const user = AuthService.getCurrentUser();
    return user ? requiredRoles.includes(user.role) : false;
  },

  isCurrentUserAdmin: (): boolean => {
    const user = AuthService.getCurrentUser();
    return user ? isAdmin(user) : false;
  },

  isCurrentUserNhanVien: (): boolean => {
    const user = AuthService.getCurrentUser();
    return user ? isNhanVien(user) : false;
  },

  isCurrentUserTaiXe: (): boolean => {
    const user = AuthService.getCurrentUser();
    return user ? isTaiXe(user) : false;
  },

  getAdminUser: (): Admin | null => {
    const user = AuthService.getCurrentUser();
    return user && isAdmin(user) ? user : null;
  },

  getNhanVienUser: (): NhanVien | null => {
    const user = AuthService.getCurrentUser();
    return user && isNhanVien(user) ? user : null;
  },

  getTaiXeUser: (): TaiXe | null => {
    const user = AuthService.getCurrentUser();
    return user && isTaiXe(user) ? user : null;
  },
};
