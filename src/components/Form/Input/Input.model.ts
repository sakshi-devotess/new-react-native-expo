export interface IFormInputProps {
  value: string;
  onChange: (text: string) => void;
  placeholder: string;
  secureTextEntry?: boolean;
  errorMessage?: string;
  keyboardType?:
    | "default"
    | "email-address"
    | "numeric"
    | "phone-pad"
    | "decimal-pad"
    | "number-pad";
  textContentType?: "none" | "username" | "password" | "name";
  autoCapitalize?: "none" | "sentences" | "words" | "characters";
  autoCorrect?: boolean;
  attribute?: string;
  maxLength?: number;
}
