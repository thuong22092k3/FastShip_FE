import { showNotification } from "@mantine/notifications";
import "@mantine/notifications/styles.css";
import axios from "axios";
import { ENDPOINTS } from "../End_Point";
import { Vehicle } from "../type/VehicleType";

export const vehicleService = {
  createVehicle: async (data: {
    HangXe: string;
    TaiXeID: string;
    BienSo: string;
    LoaiXe: string;
    SucChua: number;
    TrangThai: string;
    BaoDuong: string;
    DiaDiemId: string;
  }) => {
    try {
      const response = await axios.post(ENDPOINTS.VEHICLES.CREATE, data);
      return response.data;
    } catch (error: any) {
      if (axios.isAxiosError(error)) {
        if (error.response?.status === 409) {
          showNotification({
            title: "Trùng biển số",
            message: "Phương tiện với biển số này đã tồn tại!",
            color: "red",
          });
        } else {
          showNotification({
            title: "Lỗi",
            message: "Không thể thêm phương tiện. Vui lòng thử lại.",
            color: "red",
          });
        }
      } else {
        showNotification({
          title: "Lỗi không xác định",
          message: "Đã xảy ra lỗi không xác định khi thêm phương tiện.",
          color: "red",
        });
      }
      throw error;
    }
  },

  updateVehicle: async (PhuongTienId: string, updateData: Partial<Vehicle>) => {
    try {
      const response = await axios.put(ENDPOINTS.VEHICLES.UPDATE, {
        PhuongTienId,
        ...updateData,
      });
      return response.data;
    } catch (error) {
      console.error("Error updating vehicle:", error);
      throw error;
    }
  },

  deleteVehicle: async (PhuongTienId: string) => {
    try {
      const response = await axios.delete(
        ENDPOINTS.VEHICLES.DELETE(PhuongTienId)
      );
      return response.data;
    } catch (error) {
      console.error("Error deleting vehicle:", error);
      throw error;
    }
  },

  getAllVehicles: async (): Promise<{ data: Vehicle[] }> => {
    try {
      const response = await axios.get(ENDPOINTS.VEHICLES.LIST);
      return response.data; // This should match your backend response format
    } catch (error) {
      console.error("Error fetching vehicles:", error);
      throw error;
    }
  },
  // Maintenance operations
  //   createMaintenance: async (data: {
  //     PhuongTienId: string;
  //     Ngay: Date;
  //     TrangThai: string;
  //     ChiPhi: number;
  //   }) => {
  //     try {
  //       const response = await axios.post(ENDPOINTS.MAINTENANCE.CREATE, {
  //         ...data,
  //         BaoDuongId: `BD_${Date.now()}`,
  //       });
  //       return response.data;
  //     } catch (error) {
  //       console.error("Error creating maintenance record:", error);
  //       throw error;
  //     }
  //   },

  //   updateMaintenance: async (
  //     BaoDuongId: string,
  //     updateData: Partial<IBaoDuong>
  //   ) => {
  //     try {
  //       const response = await axios.put(
  //         `${ENDPOINTS.MAINTENANCE.UPDATE}?BaoDuongId=${BaoDuongId}`,
  //         updateData
  //       );
  //       return response.data;
  //     } catch (error) {
  //       console.error("Error updating maintenance record:", error);
  //       throw error;
  //     }
  //   },

  //   deleteMaintenance: async (BaoDuongId: string) => {
  //     try {
  //       const response = await axios.delete(
  //         `${ENDPOINTS.MAINTENANCE.DELETE}?BaoDuongId=${BaoDuongId}`
  //       );
  //       return response.data;
  //     } catch (error) {
  //       console.error("Error deleting maintenance record:", error);
  //       throw error;
  //     }
  //   },

  //   getAllMaintenance: async (): Promise<{ maintenance: IBaoDuong[] }> => {
  //     try {
  //       const response = await axios.get(ENDPOINTS.MAINTENANCE.LIST);
  //       return response.data || { maintenance: [] };
  //     } catch (error) {
  //       console.error("Error fetching maintenance records:", error);
  //       throw error;
  //     }
  //   },
};
