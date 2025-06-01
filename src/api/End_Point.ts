export const BASE_URL = "https://fastship-be.onrender.com";

export const ENDPOINTS = {
  AUTH: {
    LOGIN: `${BASE_URL}/api/auth/login`,
    REGISTER: `${BASE_URL}/api/auth/createUser`,
    UPDATE: `${BASE_URL}/api/auth/updateUser`,
    LOGOUT: `${BASE_URL}/api/auth/logout`,
    PROFILE: `${BASE_URL}/api/auth/profile`,
    DELETE: `${BASE_URL}/api/auth/deleteUser`,
  },
  ORDERS: {
    CREATE: `${BASE_URL}/api/order/createOrder`,
    // LIST: `${BASE_URL}/api/order/getOrder`,
    LIST: (page: number = 1, limit: number = 10) =>
      `${BASE_URL}/api/order/getOrder?page=${page}&limit=${limit}`,
    DETAIL: (id: string) => `${BASE_URL}/api/order/getOrderDetail/?id=${id}`,
    UPDATE: (id: string) => `${BASE_URL}/api/order/updateOrder?id=${id}`,
    DELETE: (id: string) => `${BASE_URL}/api/order/deleteOrder?id=${id}`,
    LOCATIONS: {
      LIST: `${BASE_URL}/api/locations`,
      OPTIMIZE: `${BASE_URL}/api/optimize/route`,
    },
    SEARCH: `${BASE_URL}/api/order/search`,
  },
  USERS: {
    LIST: `${BASE_URL}/api/auth/users`,
    DETAIL: (id: string) => `${BASE_URL}/api/auth/users/${id}`,
  },
  PARTNERS: {
    LIST: `${BASE_URL}/api/partner/getAllPartner`,
    DETAIL: `${BASE_URL}/api/partner`,
  },

  VEHICLES: {
    CREATE: `${BASE_URL}/api/vehicle/createVehicle`,
    LIST: `${BASE_URL}/api/vehicle/getAllVehicle`,
    // DETAIL: (id: string) => `${BASE_URL}/api/order/getOrderDetail/?id=${id}`,
    // UPDATE: (PhuongTienId: string) =>
    //   `${BASE_URL}/api/vehicle/updateVehicle?PhuongTienId=${PhuongTienId}`,
    DELETE: (PhuongTienId: string) =>
      `${BASE_URL}/api/vehicle/deleteVehicle?PhuongTienId=${PhuongTienId}`,
    UPDATE: `${BASE_URL}/api/vehicle/updateVehicle`,
  },

  LOCATIONS: {
    CREATE: `${BASE_URL}/api/location/create`,
    LIST: `${BASE_URL}/api/location/all`,
    SEARCH: `${BASE_URL}/api/location/search`,
    DETAIL: (DiaDiemId: string) => `${BASE_URL}/api/location/get/:${DiaDiemId}`,
    DELETE: (DiaDiemId: string) =>
      `${BASE_URL}/api/location/delete/${DiaDiemId}`,
    UPDATE: (DiaDiemId: string) =>
      `${BASE_URL}/api/location/update/${DiaDiemId}`,
  },
};
