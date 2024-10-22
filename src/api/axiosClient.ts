import axios, { AxiosResponse } from "axios";

const axiosClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL + "/api/v1",
  headers: {
    "Content-Type": "application/json",
  },
});

axiosClient.interceptors.response.use(
  (response: AxiosResponse) => response?.data ?? response,
  (error) => Promise.reject(error)
);

export default axiosClient;
