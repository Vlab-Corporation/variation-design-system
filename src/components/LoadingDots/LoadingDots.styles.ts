import { cn } from "@/utils/cn";

export type LoadingDotsSize = "sm" | "md" | "lg" | "xl";
export type LoadingDotsColor = "primary" | "white" | "current" | "gray";
export type LoadingDotsSpeed = "normal" | "slow" | "fast";

export const loadingDotsContainerSizes: Record<LoadingDotsSize, string> = {
  sm: "w-4 h-4 gap-0.5",
  md: "w-6 h-6 gap-[3px]",
  lg: "w-8 h-8 gap-1.5",
  xl: "w-12 h-12 gap-2",
};

export const loadingDotSizes: Record<LoadingDotsSize, string> = {
  sm: "w-[3px] h-[3px]",
  md: "w-[5px] h-[5px]",
  lg: "w-2 h-2",
  xl: "w-2.5 h-2.5",
};

export const loadingDotsColors: Record<LoadingDotsColor, string> = {
  primary: "bg-gray-900",
  white: "bg-white",
  current: "bg-current",
  gray: "bg-gray-400",
};

export const loadingDotsSpeeds: Record<LoadingDotsSpeed, string> = {
  normal: "animate-dot-pulse",
  slow: "animate-dot-pulse-slow",
  fast: "animate-dot-pulse-fast",
};

export const loadingDotsStaggerMs: Record<LoadingDotsSpeed, number> = {
  normal: 200,
  slow: 240,
  fast: 160,
};

export interface LoadingDotsContainerStyleProps {
  size?: LoadingDotsSize;
  className?: string;
}

export interface LoadingDotStyleProps {
  size?: LoadingDotsSize;
  color?: LoadingDotsColor;
  speed?: LoadingDotsSpeed;
  className?: string;
}

export function loadingDotsContainerStyles(
  props: LoadingDotsContainerStyleProps = {},
): string {
  const { size = "md", className } = props;

  return cn(
    "inline-flex items-center justify-center",
    loadingDotsContainerSizes[size],
    className,
  );
}

export function loadingDotStyles(props: LoadingDotStyleProps = {}): string {
  const { size = "md", color = "primary", speed = "normal", className } = props;

  return cn(
    "rounded-full",
    loadingDotSizes[size],
    loadingDotsColors[color],
    loadingDotsSpeeds[speed],
    className,
  );
}
