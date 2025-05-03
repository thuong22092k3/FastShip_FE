import axios from "axios";
import { DoiTac } from "../type/PartnerType";
import { ENDPOINTS } from "../End_Point";

export const partnerService = {
  createPartner: async (
    partnerData: Omit<DoiTac, "DoiTacId">
  ): Promise<DoiTac> => {
    const response = await axios.post(
      `${ENDPOINTS.PARTNERS.DETAIL}/createPartner`,
      partnerData
    );
    return response.data;
  },

  updatePartner: async (
    DoiTacId: string,
    updateData: Partial<DoiTac>
  ): Promise<DoiTac> => {
    const response = await axios.put(
      `${ENDPOINTS.PARTNERS.LIST}/partner/updatePartner`,
      { DoiTacId, ...updateData }
    );
    return response.data;
  },

  deletePartner: async (DoiTacId: string): Promise<{ success: boolean }> => {
    const response = await axios.delete(
      `${ENDPOINTS.PARTNERS.DETAIL}/deletePartner`,
      { params: { DoiTacId } }
    );
    return response.data;
  },

  // getAllPartners: async (): Promise<DoiTac[]> => {
  //   const response = await axios.get(`${ENDPOINTS.PARTNERS.LIST}`);
  //   return response.data;
  // },
  getAllPartners: async (): Promise<{ data: DoiTac[] }> => {
    try {
      const response = await axios.get(ENDPOINTS.PARTNERS.LIST);
      return response.data;
    } catch (error) {
      console.error("Error fetching partners:", error);
      throw error;
    }
  },
  getPartnerById: async (DoiTacId: string): Promise<DoiTac> => {
    const response = await axios.get(
      `${ENDPOINTS.PARTNERS.LIST}/partner/getPartnerById`,
      { params: { DoiTacId } }
    );
    return response.data;
  },

  searchPartners: async (query: string): Promise<DoiTac[]> => {
    const response = await axios.get(
      `${ENDPOINTS.PARTNERS.LIST}/partner/searchPartners`,
      { params: { query } }
    );
    return response.data;
  },

  getPartnerTypes: async (): Promise<string[]> => {
    const response = await axios.get(
      `${ENDPOINTS.PARTNERS.LIST}/partner/getPartnerTypes`
    );
    return response.data;
  },
};
