import Constants from "expo-constants";

export const colors = {
  primary: "#6c63ff",
  border: "#565656",
  red: "#EF5350",
  pink: "#EC407A",
  teal: "#26A69A",
  grey: "#BDBDBD",
};

export const config = {
  apiUrl: Constants.expoConfig?.extra?.apiUrl,
};

export const otpTimerSeconds = 80; // Duration for OTP Resend OTP Attempts in seconds
