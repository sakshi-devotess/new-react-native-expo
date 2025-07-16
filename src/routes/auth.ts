import AddMobileScreen from "../screens/Auth/AddMobileNumber/AddMobileScreen";
import LoginWithMpinScreen from "../screens/Auth/LoginWithMpin/LoginWithMpinScreen";
import SetMpinScreen from "../screens/Auth/SetMpin/SetMpinScreen";
import VerifyOtpScreen from "../screens/Auth/VerifyOtp/VerifyOtpScreen";

export const AUTH_ROUTE = {
  MOBILE_SCREEN: "EnterMobile",
  VERIFY_OTP: "VerifyOtp",
  SET_MPIN: "SetMpin",
  LOGIN_WITH_MPIN: "LoginWithMpin",
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
  {
    name: AUTH_ROUTE.LOGIN_WITH_MPIN,
    component: LoginWithMpinScreen,
  },
];
