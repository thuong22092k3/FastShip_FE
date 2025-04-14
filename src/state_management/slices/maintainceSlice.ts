import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  RESET_ALL_STORES,
  ADD_MAINTENANCE,
  DELETE_MAINTENANCE,
  UPDATE_MAINTENANCE,
} from "../actions/actions";

const maintenanceSlice = createSlice({
  name: "maintenanceSlice",
  initialState: [] as TMaintenance[],
  reducers: {
    uploadMaintenances: (_, action: PayloadAction<TMaintenance[]>) => [
      ...action.payload,
    ],
  },
  extraReducers: (builder) => {
    builder.addCase(RESET_ALL_STORES, () => []);
    builder.addCase(
      ADD_MAINTENANCE,
      (state, action) => void state.unshift(action.payload)
    );
    builder.addCase(DELETE_MAINTENANCE, (state, action) => {
      return state.filter((m) => m.BaoDuongId !== action.payload.baoTriId);
    });
    builder.addCase(UPDATE_MAINTENANCE, (state, action) => {
      const index = state.findIndex(
        (m) => m.BaoDuongId === action.payload.BaoDuongId
      );
      if (index !== -1) state[index] = action.payload;
    });
  },
});

export const { uploadMaintenances } = maintenanceSlice.actions;
export default maintenanceSlice.reducer;
