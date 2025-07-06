import axios from "axios";
import { ENDPOINTS } from "../End_Point";

interface FilterParams {
  fromDate?: string;
  toDate?: string;
  TrangThai?: string;
  DiaChiGiaoHang?: string;
  NhanVienID?: string;
}

export const statisticsService = {
  getOverview: async () => {
    try {
      const response = await axios.get(ENDPOINTS.STATISTICS.OVERVIEW);

      return response.data;
    } catch (error) {
      console.error("Error fetching overview statistics:", error);
      throw error;
    }
    console.log("ENDPOINTS.STATISTICS.OVERVIEW", ENDPOINTS.STATISTICS.OVERVIEW);
  },

  getLocationStats: async () => {
    try {
      const response = await axios.get(ENDPOINTS.STATISTICS.LOCATIONS);
      return response.data;
    } catch (error) {
      console.error("Error fetching location statistics:", error);
      throw error;
    }
  },

  getStaffPerformance: async () => {
    try {
      const response = await axios.get(ENDPOINTS.STATISTICS.STAFF_PERFORMANCE);
      return response.data;
    } catch (error) {
      console.error("Error fetching staff performance:", error);
      throw error;
    }
  },

  filterOrders: async (params: FilterParams) => {
    try {
      const queryParams = new URLSearchParams();

      if (params.fromDate) queryParams.append("fromDate", params.fromDate);
      if (params.toDate) queryParams.append("toDate", params.toDate);
      if (params.TrangThai) queryParams.append("TrangThai", params.TrangThai);
      if (params.DiaChiGiaoHang)
        queryParams.append("DiaChiGiaoHang", params.DiaChiGiaoHang);
      if (params.NhanVienID)
        queryParams.append("NhanVienID", params.NhanVienID);

      const response = await axios.get(
        `${ENDPOINTS.STATISTICS.FILTER}?${queryParams.toString()}`
      );
      return response.data;
    } catch (error) {
      console.error("Error filtering orders:", error);
      throw error;
    }
  },

  getMonthlyStats: async () => {
    try {
      const response = await axios.get(ENDPOINTS.STATISTICS.MONTHLY);
      return response.data;
    } catch (error) {
      console.error("Error fetching monthly statistics:", error);
      throw error;
    }
  },

  getStatusStats: async () => {
    try {
      const response = await axios.get(ENDPOINTS.STATISTICS.STATUS);
      return response.data;
    } catch (error) {
      console.error("Error fetching status statistics:", error);
      throw error;
    }
  },

  getTopStaff: async (limit: number = 5) => {
    try {
      const response = await axios.get(
        `${ENDPOINTS.STATISTICS.TOP_STAFF}?limit=${limit}`
      );
      return response.data;
    } catch (error) {
      console.error("Error fetching top staff:", error);
      throw error;
    }
  },
};
