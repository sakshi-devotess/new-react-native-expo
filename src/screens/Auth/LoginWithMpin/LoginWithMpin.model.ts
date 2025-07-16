import { NativeStackNavigationProp } from "@react-navigation/native-stack";

export interface IAddMobileScreenProps {
  navigation: NativeStackNavigationProp<any>;
}

export interface IVerifyMpinProps {
  mobile: string;
}

export interface IVerifyMpinForm {
  mpin: string;
}
