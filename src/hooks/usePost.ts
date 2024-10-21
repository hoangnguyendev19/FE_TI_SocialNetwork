import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import { postApi } from "api";
import { PostQueryRequest, QueryKey } from "constants";

export const usePost = (
  options?: Omit<UseQueryOptions<any>, "queryKey" | "queryFn">,
  postQueryRequest?: PostQueryRequest
) => {
  return useQuery<any>({
    ...options,
    queryKey: [QueryKey.POST, postQueryRequest],
    queryFn: () => postApi.getPosts(postQueryRequest as PostQueryRequest),
  });
};
