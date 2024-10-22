import { PostQueryRequest } from "constants";
import axiosAuth from "./axiosAuth";

export const postApi = {
  getPosts: (postQueryRequest: PostQueryRequest): Promise<any> =>
    axiosAuth.post("/post/news", postQueryRequest),
};
