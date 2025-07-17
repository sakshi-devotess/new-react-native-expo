import { GestureResponderEvent } from "react-native";

export interface ContactRowProps {
  name: string;
  onPress?: (event: GestureResponderEvent) => void;
  style?: object;
  onLongPress?: (event: GestureResponderEvent) => void;
  selected?: boolean;
  showForwardIcon?: boolean;
  subtitle2?: string;
}
