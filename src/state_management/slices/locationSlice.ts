import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import {
  ADD_LOCATION,
  DELETE_LOCATION,
  UPDATE_LOCATION,
  RESET_ALL_STORES,
} from "../actions/actions";

const locationSlice = createSlice({
  name: "locationSlice",
  initialState: [] as TLocation[],
  reducers: {
    uploadLocations: (state, action: PayloadAction<TLocation[]>) => {
      return [...action.payload];
    },
  },
  extraReducers: (builder) => {
    builder.addCase(RESET_ALL_STORES, () => []);

    builder.addCase(ADD_LOCATION, (state, action: PayloadAction<TLocation>) => {
      state.unshift(action.payload);
    });

    builder.addCase(
      DELETE_LOCATION,
      (state, action: PayloadAction<{ DiaDiemId: string }>) => {
        return state.filter(
          (loc) => loc.DiaDiemId !== action.payload.DiaDiemId
        );
      }
    );

    builder.addCase(
      UPDATE_LOCATION,
      (state, action: PayloadAction<TLocation>) => {
        const index = state.findIndex(
          (loc) => loc.DiaDiemId === action.payload.DiaDiemId
        );
        if (index !== -1) {
          state[index] = action.payload;
        }
      }
    );
  },
});

export const { uploadLocations } = locationSlice.actions;
export default locationSlice.reducer;
