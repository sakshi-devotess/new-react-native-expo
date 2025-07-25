import { NativeStackNavigationProp } from "@react-navigation/native-stack";

export interface IAddMobileScreenProps {
  navigation: NativeStackNavigationProp<any>;
}

export interface IVerifyOtpProps {
  otp: string;
}

export interface IVerifyOtpScreenProps {
  mobile: string;
  isForgotMpin?: boolean;
}
