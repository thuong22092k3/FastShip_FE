import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  RESET_ALL_STORES,
  ADD_DRIVER,
  DELETE_DRIVER,
  UPDATE_DRIVER,
} from "../actions/actions";

const driverSlice = createSlice({
  name: "driverSlice",
  initialState: [] as TDriver[],
  reducers: {
    uploadDrivers: (_, action: PayloadAction<TDriver[]>) => [...action.payload],
  },
  extraReducers: (builder) => {
    builder.addCase(RESET_ALL_STORES, () => []);
    builder.addCase(
      ADD_DRIVER,
      (state, action) => void state.unshift(action.payload)
    );
    builder.addCase(DELETE_DRIVER, (state, action) => {
      return state.filter(
        (driver) => driver.TaiXeID !== action.payload.TaiXeID
      );
    });
    builder.addCase(UPDATE_DRIVER, (state, action) => {
      const index = state.findIndex(
        (d) => d.TaiXeID === action.payload.TaiXeID
      );
      if (index !== -1) state[index] = action.payload;
    });
  },
});

export const { uploadDrivers } = driverSlice.actions;
export default driverSlice.reducer;
