import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  RESET_ALL_STORES,
  ADD_PARTNER,
  DELETE_PARTNER,
  UPDATE_PARTNER,
} from "../actions/actions";

const partnerSlice = createSlice({
  name: "partnerSlice",
  initialState: [] as TPartner[],
  reducers: {
    uploadPartners: (_, action: PayloadAction<TPartner[]>) => [
      ...action.payload,
    ],
  },
  extraReducers: (builder) => {
    builder.addCase(RESET_ALL_STORES, () => []);
    builder.addCase(
      ADD_PARTNER,
      (state, action) => void state.unshift(action.payload)
    );
    builder.addCase(DELETE_PARTNER, (state, action) => {
      return state.filter(
        (partner) => partner.PartnerId !== action.payload.doiTacId
      );
    });
    builder.addCase(UPDATE_PARTNER, (state, action) => {
      const index = state.findIndex(
        (p) => p.PartnerId === action.payload.PartnerId
      );
      if (index !== -1) state[index] = action.payload;
    });
  },
});

export const { uploadPartners } = partnerSlice.actions;
export default partnerSlice.reducer;
