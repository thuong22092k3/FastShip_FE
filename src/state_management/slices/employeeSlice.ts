import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import {
  ADD_EMPLOYEE,
  DELETE_EMPLOYEE,
  UPDATE_EMPLOYEE,
  RESET_ALL_STORES,
} from "../actions/actions";

const employeeSlice = createSlice({
  name: "employeeSlice",
  initialState: [] as TEmployee[],
  reducers: {
    uploadEmployees: (state, action: PayloadAction<TEmployee[]>) => {
      return [...action.payload];
    },
  },
  extraReducers: (builder) => {
    builder.addCase(RESET_ALL_STORES, () => []);
    builder.addCase(ADD_EMPLOYEE, (state, action: PayloadAction<TEmployee>) => {
      state.unshift(action.payload);
    });
    builder.addCase(
      DELETE_EMPLOYEE,
      (state, action: PayloadAction<{ nhanVienId: string }>) => {
        return state.filter((e) => e.NhanVienId !== action.payload.nhanVienId);
      }
    );
    builder.addCase(
      UPDATE_EMPLOYEE,
      (state, action: PayloadAction<TEmployee>) => {
        const index = state.findIndex(
          (e) => e.NhanVienId === action.payload.NhanVienId
        );
        if (index !== -1) {
          state[index] = action.payload;
        }
      }
    );
  },
});
export const { uploadEmployees } = employeeSlice.actions;
export default employeeSlice.reducer;
