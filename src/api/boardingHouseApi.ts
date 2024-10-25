import { BoardingHouseRequest } from "constants";
import axiosAuth from "./axiosAuth";

export const boardingHouseApi = {
  createBoardingHouse: async (data: BoardingHouseRequest): Promise<any> => {
    const response = await axiosAuth.post("/boarding-house", { ...data });
    return response.data;
  },
};
