import { NativeStackNavigationProp } from "@react-navigation/native-stack";

export interface IAddMobileScreenProps {
  navigation: NativeStackNavigationProp<any>;
}

export interface ISetMpinProps {
  mobile: string;
}

export interface ISetMpinForm {
  mpin: string;
  confirmMpin: string;
}
