import { ForgotPasswordData, LoginRequest, SignupRequest } from "constants";
import axiosClient from "./axiosClient";

export const authApi = {
  login: (data: LoginRequest): Promise<any> =>
    axiosClient.post("/auth/login", data),

  signup: (data: SignupRequest): Promise<any> =>
    axiosClient.post("/auth/register", data),
  forgotPasword: (data: ForgotPasswordData): Promise<any> =>
    axiosClient.post("/auth/forgot-password", data),
  verifyCode: (data: any): Promise<any> =>
    axiosClient.put("/auth/verify-otp", data),
  setPassword: (data: any): Promise<any> =>
    axiosClient.put("/auth/set-password", data),
};
