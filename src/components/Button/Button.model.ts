import { TextStyle, ViewStyle } from "react-native";

type Variant = "primary" | "secondary" | "danger" | "cancel";

export interface IButtonProps {
  text: string;
  onPress: () => Promise<void> | void;
  loading?: boolean;
  disabled?: boolean;
  variant?: Variant;
  style?: ViewStyle;
  textStyle?: TextStyle;
  disableForMs?: number;
}

export const variantStyles = {
  primary: { backgroundColor: "#6c63ff", textColor: "#fff" },
  secondary: { backgroundColor: "#ddd", textColor: "#fff" },
  danger: { backgroundColor: "#dc3545", textColor: "#fff" },
  cancel: { backgroundColor: "#f0f0f0", textColor: "#333" },
};
