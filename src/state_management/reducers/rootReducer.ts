import { combineReducers } from "@reduxjs/toolkit";

// Import tất cả các slice
import orderSlice from "../slices/orderSlice";
import employeeSlice from "../slices/employeeSlice";
import vehicleSlice from "../slices/vehicleSlice";
import partnerSlice from "../slices/partnerSlice";
import driverSlice from "../slices/driveSlice";
import customerSlice from "../slices/customerSlice";
import adminSlice from "../slices/adminSlice";
import routeSlice from "../slices/routeSlice";
import deliverySlice from "../slices/deliverySlice";
import maintenanceSlice from "../slices/maintainceSlice";
import controlSlice, { TControl } from "../slices/controlSlice";
import authSlice, { AuthState } from "../slices/authSlice";

export type RootState = {
  authSlice: AuthState;
  orderSlice: TOrder[];
  employeeSlice: TEmployee[];
  vehicleSlice: TVehicle[];
  partnerSlice: TPartner[];
  driverSlice: TDriver[];
  customerSlice: TCustomer[];
  adminSlice: TAdmin[];
  routeSlice: TRoute[];
  deliverySlice: TDelivery[];
  maintenanceSlice: TMaintenance[];
  controlSlice: TControl;
};

const rootReducer = combineReducers({
  authSlice,
  controlSlice,
  orderSlice,
  employeeSlice,
  vehicleSlice,
  partnerSlice,
  driverSlice,
  customerSlice,
  adminSlice,
  routeSlice,
  deliverySlice,
  maintenanceSlice,
});

export default rootReducer;
