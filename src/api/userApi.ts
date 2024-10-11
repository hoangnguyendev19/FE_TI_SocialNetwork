import { PasswordData, User } from "constants";
import axiosAuth from "./axiosAuth";

export const userApi = {
  getProfile: (): Promise<User> => axiosAuth.get("/users"),
  updateProfile: (data: any): Promise<any> => axiosAuth.put("/users", data),
  updatePassword: (data: PasswordData): Promise<any> =>
    axiosAuth.put("/users/password", data),
};
