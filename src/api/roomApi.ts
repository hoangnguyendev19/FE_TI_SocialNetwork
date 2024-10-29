import { PostQueryRequest, RoomRequest } from "constants";
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
  createRoom: async (data: RoomRequest): Promise<any> => {
    const response = await axiosAuth.post("/room", data);
    return response.data;
  },
  resetRoom: async (id: string): Promise<any> => {
    const response = await axiosAuth.put(`/room/reset-room?roomId=${id}`);
    return response.data;
  },
};
