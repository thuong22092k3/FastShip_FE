import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { RESET_ALL_STORES } from "../actions/actions";

const deliverySlice = createSlice({
  name: "deliverySlice",
  initialState: [] as TDelivery[],
  reducers: {
    uploadDeliveries: (state, action: PayloadAction<TDelivery[]>) => {
      return [...action.payload];
    },
    addDelivery: (state, action: PayloadAction<TDelivery>) => {
      state.unshift(action.payload);
    },
    deleteDelivery: (state, action: PayloadAction<{ giaoHangId: string }>) => {
      return state.filter((d) => d.GiaoHangId !== action.payload.giaoHangId);
    },
    updateDelivery: (
      state,
      action: PayloadAction<{ giaoHangId: string; newData: TDelivery }>
    ) => {
      const index = state.findIndex(
        (d) => d.GiaoHangId === action.payload.giaoHangId
      );
      if (index !== -1) {
        state[index] = action.payload.newData;
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(RESET_ALL_STORES, () => []);
  },
});
export const { uploadDeliveries, addDelivery, deleteDelivery, updateDelivery } =
  deliverySlice.actions;
export default deliverySlice.reducer;
