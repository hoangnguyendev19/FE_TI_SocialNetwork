import { PostQueryRequest } from "constants";
import axiosAuth from "./axiosAuth";

export const postApi = {
  getPosts: async (postQueryRequest: PostQueryRequest): Promise<any> => {
    const response = await axiosAuth.post("/post/news", postQueryRequest);
    return {
      ...response.data,
      currentPage: postQueryRequest.page,
      totalPages: response.data.totalPages,
    };
  },
  createPost: async (content: string, files: string[], parentPostId?: string): Promise<any> => {
    const response = await axiosAuth.post("/post", { content, files, parentPostId: parentPostId || null });
    return response.data;
  },
  updatePost: async (postId: string, content: string, files: string[], deleteFileIds: string[]): Promise<any> => {
    const response = await axiosAuth.put(`/post`, { postId, content, files, deleteFileIds });
    return response.data;
  },
  deletePost: async (id: string): Promise<any> => {
    const response = await axiosAuth.delete(`/post/${id}`);
    return response.data;
  },
  reportPost: async (postId: string, reason: string): Promise<any> => {
    const response = await axiosAuth.post("/post/report", { postId, reason });
    return response.data;
  },
  getShares: async (postQueryRequest: PostQueryRequest): Promise<any> => {
    const response = await axiosAuth.post("/post/share", postQueryRequest);
    return {
      ...response.data,
      currentPage: postQueryRequest.page,
      totalPages: response.data.totalPages,
    };
  },
};
