import AddMobileScreen from "../screens/Auth/AddMobileNumber/AddMobileScreen";

export const AUTH_ROUTE = {
  MOBILE_SCREEN: "EnterMobile",
  OTP_VERIFY: "OtpVerify",
  SET_MPIN: "SetMpin",
  USER_DETAILS: "UserDetails",
  MPIN_LOGIN: "MpinLogin",
  FORGOT_MPIN: "ForgotMpin",
};

export const AUTH_ROUTES = [
  {
    name: AUTH_ROUTE.MOBILE_SCREEN,
    component: AddMobileScreen,
  },
];
