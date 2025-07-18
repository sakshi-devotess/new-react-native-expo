export interface IRequestOtp {
  mobile: string;
}

export interface IVerifyOtp {
  mobile: string;
  otp: string;
}

export interface ISetMpin {
  mobile: string;
  mpin: string;
  confirmMpin: string;
}

export interface IVerifyMpin {
  mobile: string;
  mpin: string;
}

export interface IChangePassword {
  currentPassword: string;
  password: string;
  confirmPassword: string;
}
