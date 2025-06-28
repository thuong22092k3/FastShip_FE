import { createSlice, PayloadAction } from "@reduxjs/toolkit";
// export type TControl = {
//   openDrawer: boolean;
//   language: string;
// };
// const controlSlice = createSlice({
//   name: "controlSlice",
//   initialState: { openDrawer: false, language: "EN" },
//   reducers: {
//     toggleDrawer: (state: TControl) => {
//       state.openDrawer = !state.openDrawer;
//       return state;
//     },
//     toggleLanguage: (state: TControl, action: PayloadAction<string>) => {
//       state.language = action.payload;
//       return state;
//     },
//   },
// });
// export const { toggleDrawer, toggleLanguage } = controlSlice.actions;
// export default controlSlice.reducer;

export type TControl = {
  openDrawer: boolean;
  language: string;
};

const controlSlice = createSlice({
  name: "controlSlice",
  initialState: { openDrawer: false, language: "EN" },
  reducers: {
    toggleDrawer: (state: TControl) => {
      state.openDrawer = !state.openDrawer;
    },
    setDrawer: (state: TControl, action: PayloadAction<boolean>) => {
      state.openDrawer = action.payload;
    },
    toggleLanguage: (state: TControl, action: PayloadAction<string>) => {
      state.language = action.payload;
    },
  },
});

export const { toggleDrawer, setDrawer, toggleLanguage } = controlSlice.actions;
export default controlSlice.reducer;
