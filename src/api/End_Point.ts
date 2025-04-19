export const BASE_URL = "https://fastship-be.onrender.com";

export const ENDPOINTS = {
  AUTH: {
    LOGIN: `${BASE_URL}/api/auth/login`,
    REGISTER: `${BASE_URL}/api/auth/register`,
    LOGOUT: `${BASE_URL}/api/auth/logout`,
    PROFILE: `${BASE_URL}/api/auth/profile`,
  },
  ORDERS: {
    CREATE: `${BASE_URL}/api/order/createOrder`,
    LIST: `${BASE_URL}/api/order/getOrder`,
    DETAIL: (id: string) => `${BASE_URL}/api/order/getOrderDetail/?id=${id}`,
    UPDATE: (id: string) => `${BASE_URL}/api/order/updateOrder?id=${id}`,
    DELETE: (id: string) => `${BASE_URL}/api/order/deleteOrder?id=${id}`,
  },
  USERS: {
    LIST: `${BASE_URL}/api/users`,
    DETAIL: (id: string) => `${BASE_URL}/api/users/${id}`,
  },
  PARTNERS: {
    LIST: `${BASE_URL}/api/partners`,
    CREATE: `${BASE_URL}/api/partners`,
  },
  // Thêm các nhóm khác nếu cần
};
