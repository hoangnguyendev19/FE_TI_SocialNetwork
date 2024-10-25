import { useInfiniteQuery, UseInfiniteQueryOptions } from "@tanstack/react-query";
import { postApi } from "api";
import { QueryKey } from "constants";

export const useShare = (
  options?: Omit<UseInfiniteQueryOptions<any>, "queryKey" | "queryFn" | "getNextPageParam">,
  postId?: string,
) => {
  return useInfiniteQuery({
    ...options,
    queryKey: [QueryKey.SHARE, postId],
    queryFn: async ({ pageParam = 1 }) => {
      const response = await postApi.getShares({
        page: pageParam,
        size: 10,
        sortField: "createdAt",
        sortBy: "DESC",
        filter: { id: postId },
      });
      return response;
    },
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      const currentPage = lastPage.page.number + 1;
      const totalPages = lastPage.page.totalPages;
      return currentPage < totalPages ? currentPage + 1 : undefined;
    },
  });
};
