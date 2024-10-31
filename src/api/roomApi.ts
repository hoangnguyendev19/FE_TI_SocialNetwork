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
  deleteRoom: async (id: string): Promise<any> => {
    const response = await axiosAuth.delete(`/room/${id}`);
    return response.data;
  },
  addPeople: async (roomId: string, people: Array<object>): Promise<any> => {
    const response = await axiosAuth.post("/room/add-people", { roomId, people });
    return response.data;
  },
  getDetail: async (id: string): Promise<any> => {
    const response = await axiosAuth.get(`/room/detail/${id}`);
    return response.data;
  },
  updatePeople: async (roomUserId: string, fullName: string, phoneNumber: string): Promise<any> => {
    const response = await axiosAuth.put("/room/update-people", { roomUserId, fullName, phoneNumber });
    return response.data;
  },
  deletePeople: async (id: string): Promise<any> => {
    const response = await axiosAuth.delete(`/room/delete-people/${id}`);
    return response.data;
  },
};
