import { forwardRef, type HTMLAttributes } from "react";
import { cn } from "@/utils/cn";

type SpinnerSize = "sm" | "md" | "lg" | "xl";
type SpinnerColor = "primary" | "white" | "current" | "gray";
type SpinnerSpeed = "normal" | "slow" | "fast";

export interface SpinnerProps extends HTMLAttributes<HTMLDivElement> {
  /** Spinner size */
  size?: SpinnerSize;
  /** Spinner color */
  color?: SpinnerColor;
  /** Animation speed */
  speed?: SpinnerSpeed;
  /** Accessible label */
  "aria-label"?: string;
}

const sizeStyles: Record<SpinnerSize, string> = {
  sm: "w-4 h-4",
  md: "w-6 h-6",
  lg: "w-8 h-8",
  xl: "w-12 h-12",
};

const colorStyles: Record<SpinnerColor, string> = {
  primary: "text-primary-500",
  white: "text-white",
  current: "text-current",
  gray: "text-gray-400",
};

const speedStyles: Record<SpinnerSpeed, string> = {
  normal: "animate-spin",
  slow: "animate-spin-slow",
  fast: "animate-spin-fast",
};

/**
 * Loading spinner indicator
 */
export const Spinner = forwardRef<HTMLDivElement, SpinnerProps>(
  (
    {
      size = "md",
      color = "primary",
      speed = "normal",
      "aria-label": ariaLabel = "Loading",
      className,
      ...props
    },
    ref,
  ) => {
    return (
      <div
        ref={ref}
        role="status"
        aria-label={ariaLabel}
        className={cn(
          "rounded-full border-2 border-current border-b-transparent",
          sizeStyles[size],
          colorStyles[color],
          speedStyles[speed],
          className,
        )}
        {...props}
      />
    );
  },
);

Spinner.displayName = "Spinner";
