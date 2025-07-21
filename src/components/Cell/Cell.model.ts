import { Ionicons } from "@expo/vector-icons";

export interface ICellProps {
  title: string;
  icon: keyof typeof Ionicons.glyphMap;
  iconColor?: string;
  tintColor?: string;
  style?: object;
  onPress?: () => void;
  secondIcon?: keyof typeof Ionicons.glyphMap;
  subtitle?: string;
  showForwardIcon?: boolean;
}
