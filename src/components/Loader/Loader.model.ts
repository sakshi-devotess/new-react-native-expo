import { ReactNode } from "react";

export interface ILoaderProps {
  loading: boolean;
  children?: ReactNode;
  size?: "small" | "large";
  color?: string;
  isShowLoaderText?: boolean;
}
