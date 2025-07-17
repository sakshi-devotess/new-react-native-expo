export interface CellProps {
  title: string;
  icon: string;
  iconColor?: string;
  tintColor?: string;
  style?: object;
  onPress?: () => void;
  secondIcon?: string;
  subtitle?: string;
  showForwardIcon?: boolean;
}
