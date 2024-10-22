export interface LoginData {
  email: string;
  password: string;
}

export interface SignupData {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  password: string;
  confirmPassword: string;
}

export interface ProfileData {
  firstName: string;
  lastName: string;
  phoneNumber: string;
  presentAddress: string;
  dateOfBirth: Date;
  permanentAddress: string;
  city: string;
  country: string;
}

export interface PasswordData {
  currentPassword: string;
  newPassword: string;
  confirmNewPassword: string;
}

export interface ForgotPasswordData {
  email: string;
}

export interface VerifyCodeData {
  otp: string;
}

export interface SetPasswordData {
  newPassword: string;
  confirmNewPassword: string;
}

export interface User {
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

export interface PostData {
  id: string;
  profilePictureUrl: string;
  firstName: string;
  lastName: string;
  content: string;
  mediaList: Array<MediaData>;
  likes: Array<LikeData>;
  comments: Array<CommentData>;
  shares: Array<ShareData>;
  createdAt: string;
  lastModified: string;
}

export interface LikeData {
  id: string;
  firstName: string;
  lastName: string;
  profilePictureUrl: string;
}

export interface CommentData {
  id: string;
  profilePictureUrl: string;
  content: string;
  name: string;
  createdAt: string;
  lastModified: string;
}

export interface ShareData {
  id: string;
  firstName: string;
  lastName: string;
  profilePictureUrl: string;
}

export interface MediaData {
  id: string;
  mediaUrl: string;
  mediaType: string;
}
