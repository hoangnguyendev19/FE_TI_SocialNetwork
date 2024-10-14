import axios, { AxiosResponse } from "axios";
import { getAccessToken, getRefreshToken, removeToken, setToken } from "utils";

const axiosAuth = axios.create({
  baseURL: import.meta.env.VITE_API_URL + "/api/v1",
  headers: {
    "Content-Type": "application/json",
  },
});

// Function to refresh the token
const refreshToken = async () => {
  try {
    const refresh_token = getRefreshToken();
    const response = await axios.post(
      import.meta.env.VITE_API_URL + "/api/v1/auth/refresh",
      {
        refreshToken: refresh_token,
      }
    );
    const { accessToken, refreshToken: newRefreshToken } = response.data;

    setToken(accessToken, newRefreshToken);

    return accessToken;
  } catch (error) {
    console.error("Token refresh failed", error);
    return null;
  }
};

axiosAuth.interceptors.request.use(
  (config) => {
    const token = getAccessToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

axiosAuth.interceptors.response.use(
  (response: AxiosResponse) => response?.data ?? response,
  async (error) => {
    const originalRequest = error.config;

    // Handle 403 Forbidden
    if (error.response?.status === 403) {
      alert("You do not have permission to access this resource.");
    }

    // Handle 401 Unauthorized
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true; // Prevent infinite loop
      const newAccessToken = await refreshToken();

      if (newAccessToken) {
        // Set the new access token in headers and retry the request
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        return axiosAuth(originalRequest);
      } else {
        // If token refresh fails, you can log out the user or take other actions
        alert("Session expired. Please log in again.");
        removeToken();
        window.location.href = "/login";
      }
    }

    return Promise.reject(error);
  }
);

export default axiosAuth;
