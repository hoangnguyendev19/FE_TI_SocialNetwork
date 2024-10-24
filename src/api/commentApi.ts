import { CommentRequest, PostQueryRequest } from "constants";
import axiosAuth from "./axiosAuth";

export const commentApi = {
  getComments: async (postQueryRequest: PostQueryRequest): Promise<any> => {
    const response = await axiosAuth.post("/comment/view-list", postQueryRequest);
    return {
      ...response.data,
      currentPage: postQueryRequest.page,
      totalPages: response.data.totalPages,
    };
  },
  createComment: async (comment: CommentRequest): Promise<any> => {
    const response = await axiosAuth.post("/comment", { ...comment });
    return response.data;
  },
  deleteComment: async (postId: string): Promise<any> => {
    const response = await axiosAuth.delete(`/comment/${postId}`);
    return response.data;
  },
  updateComment: async (id: string | null, commentText: string): Promise<any> => {
    const response = await axiosAuth.put("/comment/update", { id, commentText });
    return response.data;
  },
  hideComment: async (id: string): Promise<any> => {
    const response = await axiosAuth.put(`/comment/hidden/${id}`);
    return response.data;
  },
};
