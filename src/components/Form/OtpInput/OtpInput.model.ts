export interface IOtpInputProps {
  value: string;
  onChange: (text: string) => void;
  inputCount?: number;
  errorMessage?: string;
  secureTextEntry?: boolean;
}
