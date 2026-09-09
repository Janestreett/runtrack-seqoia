import axios from "axios";
import { API_URL } from "../config/constants";
import { useAuthStore } from "../store/authStore";

export const api = axios.create({ baseURL: API_URL });

api.interceptors.request.use((config) => {
  const token = useAuthStore.getState().token;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (res) => res,
  (error) => {
    if (error.response?.status === 401) {
      useAuthStore.getState().logout();
    }
    const message =
      error.response?.data?.message ||
      (error.request ? "Network error. Please check your connection." : error.message);
    return Promise.reject(new Error(message));
  }
);
