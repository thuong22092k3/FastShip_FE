import { createAction } from "@reduxjs/toolkit";

export const RESET_ALL_STORES = createAction("RESET_ALL_STORES");

export const ADD_ORDER = createAction<TOrder>("ADD_ORDER");
export const DELETE_ORDER = createAction<string[]>("DELETE_ORDER");
export const UPDATE_ORDER = createAction<TOrder>("UPDATE_ORDER");

export const ADD_EMPLOYEE = createAction<TEmployee>("ADD_EMPLOYEE");
export const DELETE_EMPLOYEE = createAction<{ NhanVienID: string }>(
  "DELETE_EMPLOYEE"
);
export const UPDATE_EMPLOYEE = createAction<TEmployee>("UPDATE_EMPLOYEE");

export const ADD_EMPLOYEE_ACCOUNT = createAction<{
  NhanVienID: string;
  account: string;
}>("ADD_EMPLOYEE_ACCOUNT");

export const ADD_VEHICLE = createAction<TVehicle>("ADD_VEHICLE");
export const DELETE_VEHICLE = createAction<{ phuongTienId: string }>(
  "DELETE_VEHICLE"
);
export const UPDATE_VEHICLE = createAction<TVehicle>("UPDATE_VEHICLE");

export const ADD_PARTNER = createAction<TPartner>("ADD_PARTNER");
export const DELETE_PARTNER = createAction<{ doiTacId: string }>(
  "DELETE_PARTNER"
);
export const UPDATE_PARTNER = createAction<TPartner>("UPDATE_PARTNER");

export const ADD_DRIVER = createAction<TDriver>("ADD_DRIVER");
export const DELETE_DRIVER = createAction<{ TaiXeID: string }>("DELETE_DRIVER");
export const UPDATE_DRIVER = createAction<TDriver>("UPDATE_DRIVER");

export const ADD_CUSTOMER = createAction<TCustomer>("ADD_CUSTOMER");
export const DELETE_CUSTOMER = createAction<{ khachHangId: string }>(
  "DELETE_CUSTOMER"
);
export const UPDATE_CUSTOMER = createAction<TCustomer>("UPDATE_CUSTOMER");

export const ADD_ADMIN = createAction<TAdmin>("ADD_ADMIN");
export const DELETE_ADMIN = createAction<{ adminId: string }>("DELETE_ADMIN");
export const UPDATE_ADMIN = createAction<TAdmin>("UPDATE_ADMIN");

export const ADD_ROUTE = createAction<TRoute>("ADD_ROUTE");
export const DELETE_ROUTE = createAction<{ tuyenDuongId: string }>(
  "DELETE_ROUTE"
);
export const UPDATE_ROUTE = createAction<TRoute>("UPDATE_ROUTE");

export const ADD_DELIVERY = createAction<TDelivery>("ADD_DELIVERY");
export const DELETE_DELIVERY = createAction<{ giaoHangId: string }>(
  "DELETE_DELIVERY"
);
export const UPDATE_DELIVERY = createAction<TDelivery>("UPDATE_DELIVERY");

export const ADD_MAINTENANCE = createAction<TMaintenance>("ADD_MAINTENANCE");
export const DELETE_MAINTENANCE = createAction<{ baoTriId: string }>(
  "DELETE_MAINTENANCE"
);
export const UPDATE_MAINTENANCE =
  createAction<TMaintenance>("UPDATE_MAINTENANCE");
