import axios from "axios";
import { ENDPOINTS } from "../End_Point";
import { Location } from "../type/LocationType";

export const LocationService = {
  getAll: async (): Promise<Location[]> => {
    const res = await axios.get(ENDPOINTS.LOCATIONS.LIST);
    return res.data.data;
  },

  getById: async (DiaDiemId: string): Promise<Location> => {
    const url = ENDPOINTS.LOCATIONS.DETAIL(DiaDiemId).replace(
      `${DiaDiemId}`,
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
  removeVietnameseTones: (str: string): string => {
    return str
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "") // remove diacritics
      .replace(/đ/g, "d")
      .replace(/Đ/g, "D");
  },
  normalizeAddress: (address: string) => {
    let normalized = address.trim();

    if (!normalized.toLowerCase().includes("việt nam")) {
      normalized += ", Việt Nam";
    }

    normalized = normalized.replace("TP.", "Thành phố");

    normalized = LocationService.removeVietnameseTones(normalized);

    return normalized;
  },

  getLocationDetailsFromAddress: async (address: string) => {
    const normalizedAddress = LocationService.normalizeAddress(address); // đã bỏ dấu

    const encodedAddress = encodeURIComponent(normalizedAddress); // sẽ chỉ có %20, %2C, v.v.

    const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodedAddress}&addressdetails=1&limit=1&countrycodes=vn`;

    const headers = {
      "Accept-Language": "vi,en-US;q=0.9,en;q=0.8",
    };

    try {
      const response = await axios.get(url, { headers });
      const results = response.data;
      if (!results || results.length === 0) {
        throw new Error("Không tìm thấy địa chỉ.");
      }

      const data = results[0];
      const addressDetails = data.address;

      return {
        latitude: parseFloat(data.lat),
        longitude: parseFloat(data.lon),
        displayName: data.display_name,
        addressDetails: {
          district:
            addressDetails.county || addressDetails.state_district || "",
          province: addressDetails.state || addressDetails.region || "",
          city:
            addressDetails.city ||
            addressDetails.town ||
            addressDetails.village ||
            "",
          country: addressDetails.country || "",
          countryCode: addressDetails.country_code || "",
          postcode: addressDetails.postcode || "",
          road: addressDetails.road || "",
          houseNumber: addressDetails.house_number || "",
        },
      };
    } catch (error) {
      console.error("Error fetching location details:", error);
      throw new Error("Không thể lấy thông tin địa chỉ từ dịch vụ bản đồ.");
    }
  },
};
