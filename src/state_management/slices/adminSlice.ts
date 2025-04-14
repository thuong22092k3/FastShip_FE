import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  RESET_ALL_STORES,
  ADD_ADMIN,
  DELETE_ADMIN,
  UPDATE_ADMIN,
} from "../actions/actions";

const adminSlice = createSlice({
  name: "adminSlice",
  initialState: [] as TAdmin[],
  reducers: {
    uploadAdmins: (_, action: PayloadAction<TAdmin[]>) => [...action.payload],
  },
  extraReducers: (builder) => {
    builder.addCase(RESET_ALL_STORES, () => []);
    builder.addCase(
      ADD_ADMIN,
      (state, action) => void state.unshift(action.payload)
    );
    builder.addCase(DELETE_ADMIN, (state, action) => {
      return state.filter((admin) => admin.AdminId !== action.payload.adminId);
    });
    builder.addCase(UPDATE_ADMIN, (state, action) => {
      const index = state.findIndex(
        (a) => a.AdminId === action.payload.AdminId
      );
      if (index !== -1) state[index] = action.payload;
    });
  },
});

export const { uploadAdmins } = adminSlice.actions;
export default adminSlice.reducer;
