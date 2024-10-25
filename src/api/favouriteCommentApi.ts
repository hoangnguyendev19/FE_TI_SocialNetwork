import axiosAuth from "./axiosAuth";

export const favouriteCommentApi = {
  createFavouriteComment: async (postId: string): Promise<any> => {
    const response = await axiosAuth.post(`/favourite-comment/${postId}`);
    return response.data;
  },
  deleteFavouriteComment: async (postId: string): Promise<any> => {
    const response = await axiosAuth.delete(`/favourite-comment/${postId}`);
    return response.data;
  },
};
