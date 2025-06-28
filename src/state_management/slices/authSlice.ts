// src/slices/authSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  ADD_ADMIN,
  ADD_DRIVER,
  ADD_EMPLOYEE,
  RESET_ALL_STORES,
} from "../actions/actions";

// Định nghĩa interface AuthUser
interface AuthUser {
  id: string;
  username: string;
  fullName: string;
  email?: string;
  role?: "Admin" | "TaiXe" | "NhanVien";
}

// Định nghĩa interface AuthState
interface AuthState {
  currentUser: AuthUser | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  currentUser: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,
};

const authSlice = createSlice({
  name: "authSlice",
  initialState,
  reducers: {
    loginStart: (state) => {
      state.isLoading = true;
      state.error = null;
    },
    loginSuccess: (state, action: PayloadAction<AuthUser>) => {
      state.currentUser = action.payload;
      state.isAuthenticated = true;
      state.isLoading = false;
      state.error = null;
    },
    loginFailure: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    logout: (state) => {
      state.currentUser = null;
      state.isAuthenticated = false;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(RESET_ALL_STORES, () => initialState);

    builder.addCase(ADD_ADMIN, (state, action: PayloadAction<TAdmin>) => {
      if (state.currentUser?.username === action.payload.UserName) {
        state.currentUser = {
          id: action.payload.AdminId,
          username: action.payload.UserName,
          fullName: action.payload.HoTen,
          email: action.payload.Email,
          role: "Admin",
        };
      }
    });

    builder.addCase(ADD_DRIVER, (state, action: PayloadAction<TDriver>) => {
      if (state.currentUser?.username === action.payload.UserName) {
        state.currentUser = {
          id: action.payload.TaiXeID,
          username: action.payload.UserName,
          fullName: action.payload.HoTen,
          email: action.payload.Email,
          role: "TaiXe",
        };
      }
    });

    builder.addCase(ADD_EMPLOYEE, (state, action: PayloadAction<TEmployee>) => {
      if (state.currentUser?.username === action.payload.UserName) {
        state.currentUser = {
          id: action.payload.NhanVienID,
          username: action.payload.UserName,
          fullName: action.payload.HoTen,
          email: action.payload.Email,
          role: "NhanVien",
        };
      }
    });
  },
});

export const { loginStart, loginSuccess, loginFailure, logout, clearError } =
  authSlice.actions;

// Export cả AuthState dưới dạng named export
export type { AuthState };
export default authSlice.reducer;
