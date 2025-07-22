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

export interface IChangeMpin {
  currentMpin: string;
  newMpin: string;
  confirmMpin: string;
}
