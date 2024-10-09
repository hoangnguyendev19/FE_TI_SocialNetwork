import axiosClient from "./axiosClient";

export const authApi = {
  login: (email: string, password: string): Promise<any> =>
    axiosClient.post("/auth/login", { email, password }),
};
