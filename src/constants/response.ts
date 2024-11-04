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
  liked: boolean;
  owner: boolean;
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

export interface FavouriteResponse {
  userId: string;
  firstName: string;
  lastName: string;
  profilePictureUrl: string;
}

export interface CommentResponse {
  commentId: string;
  userId: string;
  firstName: string;
  lastName: string;
  profilePictureUrl: string;
  commentText: string;
  hidden: boolean;
  ownedPost: boolean;
  ownedComment: boolean;
  liked: boolean;
  totalLikes: number;
  childComments: Array<CommentResponse>;
  createdAt: string;
  lastModified: string;
}

export interface RoomResponse {
  id: string;
  boardingHouseId: string;
  roomName: string;
  roomRate: number;
  numberOfPeople: number;
  roomStatus: string;
  electricityMeterOldNumber: number;
  waterMeterOldNumber: number;
  payment: PaymentResponse;
  createdAt: string;
}

export interface PaymentResponse {
  id: string;
  status: string;
  totalAmount: number;
  electricityMeterNewNumber: number;
  waterMeterNewNumber: number;
}
