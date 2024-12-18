export interface LoginRequest {
  email: string;
  password: string;
}

export interface SignupRequest {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  password: string;
  confirmPassword: string;
}

export interface ProfileRequest {
  firstName: string;
  lastName: string;
  phoneNumber: string;
  presentAddress: string;
  dateOfBirth: Date;
  permanentAddress: string;
  city: string;
  country: string;
}

export interface PasswordRequest {
  currentPassword: string;
  newPassword: string;
  confirmNewPassword: string;
}

export interface ForgotPasswordRequest {
  email: string;
}

export interface VerifyCodeRequest {
  otp: string;
}

export interface SetPasswordRequest {
  newPassword: string;
  confirmNewPassword: string;
}

export interface PostQueryRequest {
  page: number | unknown;
  size: number;
  sortField: string;
  sortBy: string;
  filter: object;
}

export interface CommentRequest {
  postId: string;
  parentCommentId: string | null;
  commentText: string;
}

export interface BoardingHouseRequest {
  boardingHouseName: string;
  presentAddress: string;
  ward: string;
  city: string;
}

export interface SettingsRequest {
  boardingHouseId: string;
  electricityBill: number;
  waterBill: number;
}

export interface RoomRequest {
  boardingHouseId: string;
  roomName: string;
  roomStatus: string;
  electricityMeterOldNumber: number;
  waterMeterOldNumber: number;
}

export interface PaymentRequest {
  roomId: string;
  roomRate: number;
  waterMeterNewNumber: number;
  electricityMeterNewNumber: number;
}
