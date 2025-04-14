import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import {
  ADD_VEHICLE,
  DELETE_VEHICLE,
  UPDATE_VEHICLE,
  RESET_ALL_STORES,
} from "../actions/actions";

const vehicleSlice = createSlice({
  name: "vehicleSlice",
  initialState: [] as TVehicle[],
  reducers: {
    uploadVehicles: (state, action: PayloadAction<TVehicle[]>) => {
      return [...action.payload];
    },
  },
  extraReducers: (builder) => {
    builder.addCase(RESET_ALL_STORES, () => []);
    builder.addCase(ADD_VEHICLE, (state, action: PayloadAction<TVehicle>) => {
      state.unshift(action.payload);
    });
    builder.addCase(
      DELETE_VEHICLE,
      (state, action: PayloadAction<{ phuongTienId: string }>) => {
        return state.filter(
          (v) => v.PhuongTienId !== action.payload.phuongTienId
        );
      }
    );
    builder.addCase(
      UPDATE_VEHICLE,
      (state, action: PayloadAction<TVehicle>) => {
        const index = state.findIndex(
          (v) => v.PhuongTienId === action.payload.PhuongTienId
        );
        if (index !== -1) {
          state[index] = action.payload;
        }
      }
    );
  },
});
export const { uploadVehicles } = vehicleSlice.actions;
export default vehicleSlice.reducer;
