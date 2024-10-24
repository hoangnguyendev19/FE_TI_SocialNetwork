import { PostQueryRequest } from "constants";
import axiosAuth from "./axiosAuth";

export const favouriteApi = {
  getFavourites: async (postQueryRequest: PostQueryRequest): Promise<any> => {
    const response = await axiosAuth.post("/favourite/view-list", postQueryRequest);
    return {
      ...response.data,
      currentPage: postQueryRequest.page,
      totalPages: response.data.totalPages,
    };
  },
  createFavourite: async (postId: string): Promise<any> => {
    const response = await axiosAuth.post("/favourite", { postId });
    return response.data;
  },
  deleteFavourite: async (postId: string): Promise<any> => {
    const response = await axiosAuth.delete(`/favourite/${postId}`);
    return response.data;
  },
};
