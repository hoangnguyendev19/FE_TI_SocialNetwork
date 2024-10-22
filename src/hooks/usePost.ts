import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import { postApi } from "api";
import { PostQueryRequest, QueryKey } from "constants";

export const usePost = (
  options?: Omit<UseQueryOptions<any>, "queryKey" | "queryFn">
) => {
  return useQuery<any>({
    ...options,
    queryKey: [QueryKey.POST],
    queryFn: ({ queryKey }) => {
      const [, postQueryRequest] = queryKey as [string, PostQueryRequest];
      return postApi.getPosts(postQueryRequest);
    },
  });
};
