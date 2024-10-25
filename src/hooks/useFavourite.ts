import { useInfiniteQuery, UseInfiniteQueryOptions } from "@tanstack/react-query";
import { favouriteApi } from "api";
import { QueryKey } from "constants";

export const useFavourite = (
  options?: Omit<UseInfiniteQueryOptions<any>, "queryKey" | "queryFn" | "getNextPageParam">,
  postId?: string,
) => {
  return useInfiniteQuery({
    ...options,
    queryKey: [QueryKey.FAVOURITE, postId],
    queryFn: async ({ pageParam = 1 }) => {
      const response = await favouriteApi.getFavourites({
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
