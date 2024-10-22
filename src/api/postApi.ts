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
  createPost: async (content: string, files: string[]): Promise<any> => {
    const response = await axiosAuth.post("/post", { content, files });
    return response.data;
  },
};
