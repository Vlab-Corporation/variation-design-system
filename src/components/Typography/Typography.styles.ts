import { cn } from "@/utils/cn";

export type HeadingLevel = "h1" | "h2" | "h3" | "h4" | "h5" | "h6";

export type TextSize =
  | "xs"
  | "sm"
  | "base"
  | "lg"
  | "xl"
  | "2xl"
  | "3xl"
  | "4xl"
  | "5xl";

export type TextWeight =
  | "thin"
  | "light"
  | "normal"
  | "medium"
  | "semibold"
  | "bold"
  | "extrabold"
  | "black";

export type TextColor =
  | "default"
  | "secondary"
  | "muted"
  | "inverse"
  | "primary"
  | "success"
  | "warning"
  | "error"
  | "info";

export type TextAlign = "left" | "center" | "right";

export const headingLevelStyles: Record<HeadingLevel, string> = {
  h1: "text-4xl font-bold tracking-tight",
  h2: "text-3xl font-bold tracking-tight",
  h3: "text-2xl font-semibold",
  h4: "text-xl font-semibold",
  h5: "text-lg font-medium",
  h6: "text-base font-medium",
};

export const textSizes: Record<TextSize, string> = {
  xs: "text-xs",
  sm: "text-sm",
  base: "text-base",
  lg: "text-lg",
  xl: "text-xl",
  "2xl": "text-2xl",
  "3xl": "text-3xl",
  "4xl": "text-4xl",
  "5xl": "text-5xl",
};

export const textWeights: Record<TextWeight, string> = {
  thin: "font-thin",
  light: "font-light",
  normal: "font-normal",
  medium: "font-medium",
  semibold: "font-semibold",
  bold: "font-bold",
  extrabold: "font-extrabold",
  black: "font-black",
};

export const textColors: Record<TextColor, string> = {
  default: "text-gray-900",
  secondary: "text-gray-700",
  muted: "text-gray-500",
  inverse: "text-white",
  primary: "text-primary-500",
  success: "text-success-600",
  warning: "text-warning-600",
  error: "text-error-600",
  info: "text-info-600",
};

export const textAligns: Record<TextAlign, string> = {
  left: "text-left",
  center: "text-center",
  right: "text-right",
};

export interface HeadingStyleProps {
  level?: HeadingLevel;
  color?: TextColor;
  align?: TextAlign;
  truncate?: boolean;
  className?: string;
}

export function headingStyles(props: HeadingStyleProps = {}): string {
  const {
    level = "h2",
    color = "default",
    align,
    truncate = false,
    className,
  } = props;

  return cn(
    headingLevelStyles[level],
    textColors[color],
    align && textAligns[align],
    truncate && "truncate",
    className,
  );
}

export interface TextStyleProps {
  size?: TextSize;
  weight?: TextWeight;
  color?: TextColor;
  align?: TextAlign;
  truncate?: boolean;
  mono?: boolean;
  className?: string;
}

export function textStyles(props: TextStyleProps = {}): string {
  const {
    size = "base",
    weight = "normal",
    color = "default",
    align,
    truncate = false,
    mono = false,
    className,
  } = props;

  return cn(
    textSizes[size],
    textWeights[weight],
    textColors[color],
    align && textAligns[align],
    truncate && "truncate",
    mono && "font-mono",
    className,
  );
}
