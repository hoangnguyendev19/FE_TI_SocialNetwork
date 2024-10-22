import { PasswordRequest, UserResponse } from "constants";
import axiosAuth from "./axiosAuth";

export const userApi = {
  getProfile: (): Promise<UserResponse> => axiosAuth.get("/user"),
  updateProfile: (data: any): Promise<any> => axiosAuth.put("/user", data),
  updatePassword: (data: PasswordRequest): Promise<any> =>
    axiosAuth.put("/user/password", data),
};
