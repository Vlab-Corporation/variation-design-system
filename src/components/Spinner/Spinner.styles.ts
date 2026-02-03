import { cn } from "@/utils/cn";

export type SpinnerSize = "sm" | "md" | "lg" | "xl";
export type SpinnerColor = "primary" | "white" | "current" | "gray";
export type SpinnerSpeed = "normal" | "slow" | "fast";

export const spinnerSizes: Record<SpinnerSize, string> = {
  sm: "w-4 h-4",
  md: "w-6 h-6",
  lg: "w-8 h-8",
  xl: "w-12 h-12",
};

export const spinnerColors: Record<SpinnerColor, string> = {
  primary: "text-primary-500",
  white: "text-white",
  current: "text-current",
  gray: "text-gray-400",
};

export const spinnerSpeeds: Record<SpinnerSpeed, string> = {
  normal: "animate-spin",
  slow: "animate-spin-slow",
  fast: "animate-spin-fast",
};

export interface SpinnerStyleProps {
  size?: SpinnerSize;
  color?: SpinnerColor;
  speed?: SpinnerSpeed;
  className?: string;
}

export function spinnerStyles(props: SpinnerStyleProps = {}): string {
  const { size = "md", color = "primary", speed = "normal", className } = props;

  return cn(
    "rounded-full border-2 border-current border-b-transparent",
    spinnerSizes[size],
    spinnerColors[color],
    spinnerSpeeds[speed],
    className,
  );
}
