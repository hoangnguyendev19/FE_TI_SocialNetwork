export const ErrorCode = {
  // Login error
  USER_NOT_EXIST: "user-does-not-exist",
  WRONG_PASSWORD: "wrong-password",
  PASSWORD_INVALID: "password-invalid",
  EMAIL_INVALID: "email-invalid",

  // Signup error
  EMAIL_ALREADY_EXIST: "email-already-exist",
  EMAIL_NOT_CORRECT_FORMAT: "email-not-correct-format",
  INVALID_PHONE_NUMBER: "invalid-phone-number",
  // PASSWORD_INVALID: "password-invalid",
  PASSWORDS_DO_NOT_MATCH: "passwords-do-not-match",

  // Settings - Security error
  // WRONG_PASSWORD: "wrong-password",
  // PASSWORD_INVALID: "password-invalid",
  CONFIRM_PASSWORD_DOES_NOT_MATCH: "confirm-password-does-not-match",

  // Create post error
  NOT_BASE64_FORMAT: "not-base64-format",

  // Forgot password error
  USER_DOES_NOT_EXIST: "user-does-not-exist",
  UNABLE_TO_SEND_OTP: "unable-to-send-otp",
  OTP_EXPIRED: "otp-expired",
  OTP_DOES_NOT_EXIST: "otp-does-not-exist",
  // PASSWORDS_DO_NOT_MATCH: "passwords-do-not-match",

  // Update post error
  FILE_UPLOAD_FAILED: "file-upload-failed",
  DELTE_FILE_FAILED: "delete-file-failed",

  // Delete post error
  POST_DOES_NOT_EXIST: "post-does-not-exist",
};
