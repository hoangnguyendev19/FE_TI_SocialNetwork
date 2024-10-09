import { LoginData, SignupData } from "constants";
import axiosClient from "./axiosClient";

export const authApi = {
  login: (data: LoginData): Promise<any> =>
    axiosClient.post("/auth/login", data),

  signup: (data: SignupData): Promise<any> =>
    axiosClient.post("/auth/register", data),
};
