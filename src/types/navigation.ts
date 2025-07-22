export type AuthStackParamList = {
  AddMobile: undefined;
  VerifyOtp: { mobile: string; isForgotMpin?: boolean };
  LoginWithMpin: { mobile: string };
  SetMpin: { mobile: string };
  ForgotMpin: { mobile: string };
};

export type MainStackParamList = {
  Home: undefined;
  Account: undefined;
  ChangeMpin: undefined;
  Profile: undefined;
};
