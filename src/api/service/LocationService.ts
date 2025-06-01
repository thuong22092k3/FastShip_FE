import axios from "axios";
import { Location } from "../type/LocationType";
import { ENDPOINTS } from "../End_Point";

export const LocationService = {
  getAll: async (): Promise<Location[]> => {
    const res = await axios.get(ENDPOINTS.LOCATIONS.LIST);
    return res.data.data;
  },

  getById: async (DiaDiemId: string): Promise<Location> => {
    const url = ENDPOINTS.LOCATIONS.DETAIL(DiaDiemId).replace(
      ":${DiaDiemId}",
      DiaDiemId
    );
    const res = await axios.get(url);
    return res.data.data;
  },

  create: async (location: Location): Promise<Location> => {
    const res = await axios.post(ENDPOINTS.LOCATIONS.CREATE, location);
    return res.data.data;
  },

  update: async (
    DiaDiemId: string,
    updateData: Partial<Location>
  ): Promise<Location> => {
    const url = ENDPOINTS.LOCATIONS.UPDATE(DiaDiemId).replace(
      ":${DiaDiemId}",
      DiaDiemId
    );
    const res = await axios.put(url, updateData);
    return res.data.data;
  },

  delete: async (DiaDiemId: string): Promise<Location> => {
    const url = ENDPOINTS.LOCATIONS.DELETE(DiaDiemId).replace(
      ":${DiaDiemId}",
      DiaDiemId
    );
    const res = await axios.delete(url);
    return res.data.data;
  },

  search: async (keyword: string): Promise<Location[]> => {
    const res = await axios.get(ENDPOINTS.LOCATIONS.SEARCH, {
      params: { name: keyword },
    });
    return res.data.data;
  },
};
