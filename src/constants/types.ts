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
