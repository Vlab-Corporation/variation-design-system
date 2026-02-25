import { cn } from "@/utils/cn";

export type AlertVariant = "info" | "success" | "warning" | "error";
export type AlertAnimation = "fade-in" | "slide-down" | "none";

export const alertVariants: Record<AlertVariant, string> = {
  info: "bg-info-50 border-info-200 text-info-800",
  success: "bg-success-50 border-success-200 text-success-800",
  warning: "bg-warning-50 border-warning-200 text-warning-800",
  error: "bg-error-50 border-error-200 text-error-800",
};

export const alertIconColors: Record<AlertVariant, string> = {
  info: "text-info-500",
  success: "text-success-500",
  warning: "text-warning-500",
  error: "text-error-500",
};

export const alertAnimations: Record<AlertAnimation, string> = {
  "fade-in": "animate-fade-in",
  "slide-down": "animate-slide-down",
  none: "",
};

export interface AlertStyleProps {
  variant?: AlertVariant;
  animation?: AlertAnimation;
  className?: string;
}

export function alertStyles(props: AlertStyleProps = {}): string {
  const { variant = "info", animation = "fade-in", className } = props;

  return cn(
    "flex gap-3 p-4 rounded-lg border",
    alertVariants[variant],
    alertAnimations[animation],
    className,
  );
}

export function alertIconStyles(variant: AlertVariant = "info"): string {
  return cn("w-5 h-5", alertIconColors[variant]);
}

export function alertDismissStyles(): string {
  return cn(
    "flex-shrink-0 p-1 rounded-md transition-colors duration-200",
    "hover:bg-black/5 focus:outline-none focus:ring-2 focus:ring-current/20",
  );
}
