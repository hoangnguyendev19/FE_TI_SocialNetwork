import { ForgotPasswordData, LoginData, SignupData } from "constants";
import axiosClient from "./axiosClient";

export const authApi = {
  login: (data: LoginData): Promise<any> =>
    axiosClient.post("/auth/login", data),

  signup: (data: SignupData): Promise<any> =>
    axiosClient.post("/auth/register", data),
  forgotPasword: (data: ForgotPasswordData): Promise<any> =>
    axiosClient.post("/auth/forgot-password", data),
  verifyCode: (data: any): Promise<any> =>
    axiosClient.put("/auth/verify-otp", data),
  setPassword: (data: any): Promise<any> =>
    axiosClient.put("/auth/set-password", data),
};
