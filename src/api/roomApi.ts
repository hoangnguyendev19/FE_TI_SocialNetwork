import { PostQueryRequest } from "constants";
import axiosAuth from "./axiosAuth";

export const roomApi = {
  getRooms: async (postQueryRequest: PostQueryRequest): Promise<any> => {
    const response = await axiosAuth.post("/room/view-list", postQueryRequest);
    return {
      ...response.data,
      currentPage: postQueryRequest.page,
      totalPages: response.data.totalPages,
    };
  },
  createRoom: async (data: any): Promise<any> => {
    const response = await axiosAuth.post("/room", data);
    return response.data;
  },
};
