import Constants from "expo-constants";

export const colors = {
  primary: "#6c63ff",
  border: "#565656",
  red: "#EF5350",
  pink: "#EC407A",
  teal: "#26A69A",
  grey: "#BDBDBD",
  white: "#FFFFFF",
  black: "#000000",
};

export const config = {
  apiUrl: Constants.expoConfig?.extra?.apiUrl,
};

export const otpTimerSeconds = 60; // Duration for OTP Resend OTP Attempts in seconds
