import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import {
  ADD_ORDER,
  DELETE_ORDER,
  UPDATE_ORDER,
  RESET_ALL_STORES,
} from "../actions/actions";
const orderSlice = createSlice({
  name: "orderSlice",
  initialState: [] as TOrder[],
  reducers: {
    uploadOrders: (state, action: PayloadAction<TOrder[]>) => {
      return [...action.payload];
    },
  },
  extraReducers: (builder) => {
    builder.addCase(RESET_ALL_STORES, () => []);
    builder.addCase(ADD_ORDER, (state, action: PayloadAction<TOrder>) => {
      state.unshift(action.payload);
    });
    builder.addCase(DELETE_ORDER, (state, action: PayloadAction<TOrder[]>) => {
      return state.filter(
        (order) => !action.payload.some((o) => o.DonHangId === order.DonHangId)
      );
    });
    builder.addCase(UPDATE_ORDER, (state, action: PayloadAction<TOrder>) => {
      const index = state.findIndex(
        (order) => order.DonHangId === action.payload.DonHangId
      );
      if (index !== -1) {
        state[index] = action.payload;
      }
    });
  },
});
export const { uploadOrders } = orderSlice.actions;
export default orderSlice.reducer;
