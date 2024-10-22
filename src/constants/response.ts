export interface UserResponse {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  status: string;
  dateOfBirth: string;
  presentAddress: string;
  permanentAddress: string;
  city: string;
  country: string;
  state: string;
  profilePictureUrl: string;
  coverPictureUrl: string;
}

export interface PostResponse {
  id: string;
  firstName: string;
  lastName: string;
  profilePictureUrl: string;
  content: string;
  totalLikes: number;
  totalComments: number;
  totalShares: number;
  parentPost: PostResponse | null;
  mediaList: Array<MediaResponse>;
  createdAt: string;
  lastModified: string;
}

export interface MediaResponse {
  id: string;
  url: string;
  type: string;
}
