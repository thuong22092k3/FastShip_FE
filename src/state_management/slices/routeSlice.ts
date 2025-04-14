import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  RESET_ALL_STORES,
  ADD_ROUTE,
  DELETE_ROUTE,
  UPDATE_ROUTE,
} from "../actions/actions";

const routeSlice = createSlice({
  name: "routeSlice",
  initialState: [] as TRoute[],
  reducers: {
    uploadRoutes: (_, action: PayloadAction<TRoute[]>) => [...action.payload],
  },
  extraReducers: (builder) => {
    builder.addCase(RESET_ALL_STORES, () => []);
    builder.addCase(
      ADD_ROUTE,
      (state, action) => void state.unshift(action.payload)
    );
    builder.addCase(DELETE_ROUTE, (state, action) => {
      return state.filter(
        (route) => route.TuyenDuongId !== action.payload.tuyenDuongId
      );
    });
    builder.addCase(UPDATE_ROUTE, (state, action) => {
      const index = state.findIndex(
        (r) => r.TuyenDuongId === action.payload.TuyenDuongId
      );
      if (index !== -1) state[index] = action.payload;
    });
  },
});

export const { uploadRoutes } = routeSlice.actions;
export default routeSlice.reducer;
