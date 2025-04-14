import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  RESET_ALL_STORES,
  ADD_CUSTOMER,
  DELETE_CUSTOMER,
  UPDATE_CUSTOMER,
} from "../actions/actions";

const customerSlice = createSlice({
  name: "customerSlice",
  initialState: [] as TCustomer[],
  reducers: {
    uploadCustomers: (_, action: PayloadAction<TCustomer[]>) => [
      ...action.payload,
    ],
  },
  extraReducers: (builder) => {
    builder.addCase(RESET_ALL_STORES, () => []);
    builder.addCase(
      ADD_CUSTOMER,
      (state, action) => void state.unshift(action.payload)
    );
    builder.addCase(DELETE_CUSTOMER, (state, action) => {
      return state.filter(
        (customer) => customer.CustomerId !== action.payload.khachHangId
      );
    });
    builder.addCase(UPDATE_CUSTOMER, (state, action) => {
      const index = state.findIndex(
        (c) => c.CustomerId === action.payload.CustomerId
      );
      if (index !== -1) state[index] = action.payload;
    });
  },
});

export const { uploadCustomers } = customerSlice.actions;
export default customerSlice.reducer;
