import { PostResponse } from "constants";

export const posts: Array<PostResponse> = [
  {
    id: "1",
    firstName: "John",
    lastName: "Doe",
    profilePictureUrl:
      "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e",
    content: "Enjoying the sunny weather at the beach!",
    mediaList: [
      {
        id: "m1",
        url: "https://www.youtube.com/watch?v=bB3-CUMERIU",
        type: "video",
      },
    ],
    totalLikes: 10,
    totalComments: 3,
    totalShares: 4,
    parentPost: null,
    createdAt: "2024-10-10T08:00:00Z",
    lastModified: "2024-10-10T08:00:00Z",
  },
  {
    id: "2",
    firstName: "Jane",
    lastName: "Doe",
    profilePictureUrl:
      "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e",
    content: "Enjoying the sunny weather at the beach!",
    mediaList: [
      {
        id: "m2",
        url: "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e",
        type: "image",
      },
    ],
    totalLikes: 10,
    totalComments: 3,
    totalShares: 4,
    parentPost: null,
    createdAt: "2024-10-10T08:00:00Z",
    lastModified: "2024-10-10T08:00:00Z",
  },
];
