import { cn } from "@/utils/cn";

export type ProgressSize = "sm" | "md" | "lg";
export type ProgressVariant = "default" | "success" | "warning" | "error";

export const progressSizes: Record<ProgressSize, string> = {
  sm: "h-1.5",
  md: "h-2.5",
  lg: "h-4",
};

export const progressVariants: Record<ProgressVariant, string> = {
  default: "bg-primary-500",
  success: "bg-green-500",
  warning: "bg-yellow-500",
  error: "bg-red-500",
};

export interface ProgressStyleProps {
  size?: ProgressSize;
  className?: string;
}

export function progressTrackStyles(props: ProgressStyleProps = {}): string {
  const { size = "md", className } = props;
  return cn(
    "w-full overflow-hidden rounded-full bg-gray-200",
    progressSizes[size],
    className,
  );
}

export interface ProgressBarStyleProps {
  variant?: ProgressVariant;
  indeterminate?: boolean;
}

export function progressBarStyles(props: ProgressBarStyleProps = {}): string {
  const { variant = "default", indeterminate = false } = props;
  return cn(
    "h-full rounded-full transition-all duration-300 ease-out",
    progressVariants[variant],
    indeterminate && "animate-indeterminate",
  );
}
