import { PostData } from "constants";

export const posts: Array<PostData> = [
  {
    id: "1",
    profilePictureUrl:
      "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e",
    firstName: "John",
    lastName: "Doe",
    content: "Enjoying the sunny weather at the beach!",
    mediaList: [
      {
        id: "m1",
        mediaUrl: "https://www.youtube.com/watch?v=bB3-CUMERIU",
        mediaType: "video",
      },
    ],
    likes: [
      {
        id: "l1",
        firstName: "Emily",
        lastName: "Smith",
        profilePictureUrl:
          "https://images.unsplash.com/photo-1511367461989-f85a21fda167",
      },
    ],
    comments: [
      {
        id: "c1",
        profilePictureUrl:
          "https://images.unsplash.com/photo-1517423440428-a5a00ad493e8",
        content: "Looks amazing!",
        name: "Sarah Connor",
        createdAt: "2024-10-10T10:00:00Z",
        lastModifiedAt: "2024-10-10T10:00:00Z",
      },
    ],
    shares: [
      {
        id: "s1",
        firstName: "Michael",
        lastName: "Johnson",
        profilePictureUrl:
          "https://images.unsplash.com/photo-1544005313-94ddf0286df2",
      },
    ],
    createdAt: "2024-10-10T08:00:00Z",
    lastModifiedAt: "2024-10-10T08:00:00Z",
  },
  {
    id: "2",
    profilePictureUrl:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330",
    firstName: "Jane",
    lastName: "Doe",
    content: "Had an incredible hike this morning. The view was breathtaking!",
    mediaList: [
      {
        id: "m2",
        mediaUrl:
          "https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0",
        mediaType: "image",
      },
      {
        id: "m3",
        mediaUrl:
          "https://images.unsplash.com/photo-1507525428034-b723cf961d3e",
        mediaType: "image",
      },
    ],
    likes: [
      {
        id: "l2",
        firstName: "Anna",
        lastName: "Lee",
        profilePictureUrl:
          "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d",
      },
      {
        id: "l3",
        firstName: "Mark",
        lastName: "Robinson",
        profilePictureUrl:
          "https://images.unsplash.com/photo-1545994377-66c881694dc4",
      },
    ],
    comments: [
      {
        id: "c2",
        profilePictureUrl:
          "https://images.unsplash.com/photo-1500648767791-00dcc994a43e",
        content: "I need to visit this place!",
        name: "Alex Green",
        createdAt: "2024-10-12T09:00:00Z",
        lastModifiedAt: "2024-10-12T09:00:00Z",
      },
    ],
    shares: [
      {
        id: "s2",
        firstName: "David",
        lastName: "Kim",
        profilePictureUrl:
          "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde",
      },
    ],
    createdAt: "2024-10-11T07:30:00Z",
    lastModifiedAt: "2024-10-11T07:30:00Z",
  },
];
