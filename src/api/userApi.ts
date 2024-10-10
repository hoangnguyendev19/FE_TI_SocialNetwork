import { User } from "constants";
import axiosClient from "./axiosClient";

export const userApi = {
  getProfile: (): Promise<User> => axiosClient.get("/users/profile"),
  updateProfile: (data: any): Promise<any> =>
    axiosClient.put("/users/profile", data),
};
