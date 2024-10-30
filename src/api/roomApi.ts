import { PaymentRequest, PostQueryRequest, RoomRequest } from "constants";
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
  updateRoomStatus: async (id: string, status: string): Promise<any> => {
    const response = await axiosAuth.put("/room/status", { id, status });
    return response.data;
  },
  updatePaymentStatus: async (id: string, status: string): Promise<any> => {
    const response = await axiosAuth.put("/room/update-payment-status", { id, status });
    return response.data;
  },
  createPayment: async (data: PaymentRequest): Promise<any> => {
    const response = await axiosAuth.post("/room/create-payment", data);
    return response.data;
  },
};
