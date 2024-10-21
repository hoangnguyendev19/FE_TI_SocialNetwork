import { PasswordData, UserResponse } from "constants";
import axiosAuth from "./axiosAuth";

export const userApi = {
  getProfile: (): Promise<UserResponse> => axiosAuth.get("/user"),
  updateProfile: (data: any): Promise<any> => axiosAuth.put("/user", data),
  updatePassword: (data: PasswordData): Promise<any> =>
    axiosAuth.put("/user/password", data),
};
