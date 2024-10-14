import axios from "axios";
import { getAccessToken } from "utils";

const axiosForm = axios.create({
  baseURL: import.meta.env.VITE_API_URL + "/api/v1",
  headers: {
    "Content-Type": "multipart/form-data",
  },
});

axiosForm.interceptors.request.use(
  (config) => {
    const token = getAccessToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

axiosForm.interceptors.response.use(
  (response) => response?.data ?? response,
  (error) => Promise.reject(error)
);

export default axiosForm;
