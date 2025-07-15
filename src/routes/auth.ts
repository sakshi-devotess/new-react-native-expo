import AddMobileScreen from "../screens/Auth/AddMobileNumber/AddMobileScreen";
import SetMpinScreen from "../screens/Auth/SetMpin/SetMpinScreen";
import VerifyOtpScreen from "../screens/Auth/VerifyOtp/VerifyOtpScreen";

export const AUTH_ROUTE = {
  MOBILE_SCREEN: "EnterMobile",
  VERIFY_OTP: "VerifyOtp",
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
  {
    name: AUTH_ROUTE.VERIFY_OTP,
    component: VerifyOtpScreen,
  },
  {
    name: AUTH_ROUTE.SET_MPIN,
    component: SetMpinScreen,
  },
];
