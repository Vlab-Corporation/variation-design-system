import { cn } from "@/utils/cn";

export type AlertVariant = "info" | "success" | "warning" | "error";
export type AlertAnimation = "fade-in" | "slide-down" | "none";

export const alertVariants: Record<AlertVariant, string> = {
  info: "bg-blue-50 border-blue-200 text-blue-800",
  success: "bg-green-50 border-green-200 text-green-800",
  warning: "bg-yellow-50 border-yellow-200 text-yellow-800",
  error: "bg-red-50 border-red-200 text-red-800",
};

export const alertIconColors: Record<AlertVariant, string> = {
  info: "text-blue-500",
  success: "text-green-500",
  warning: "text-yellow-500",
  error: "text-red-500",
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
  const {
    variant = "info",
    animation = "fade-in",
    className,
  } = props;

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
