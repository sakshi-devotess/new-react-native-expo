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
