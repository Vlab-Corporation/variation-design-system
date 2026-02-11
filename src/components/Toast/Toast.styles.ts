import { cn } from "@/utils/cn";

export type ToastVariant = "success" | "error" | "warning" | "info";
export type ToastPosition =
  | "top-right"
  | "top-left"
  | "top-center"
  | "bottom-right"
  | "bottom-left"
  | "bottom-center";

export const toastVariants: Record<ToastVariant, string> = {
  success: "bg-success-50 border-success-200 text-success-800",
  error: "bg-error-50 border-error-200 text-error-800",
  warning: "bg-warning-50 border-warning-200 text-warning-800",
  info: "bg-info-50 border-info-200 text-info-800",
};

export const toastIconColors: Record<ToastVariant, string> = {
  success: "text-success-500",
  error: "text-error-500",
  warning: "text-warning-500",
  info: "text-info-500",
};

export const toastPositions: Record<ToastPosition, string> = {
  "top-right": "top-4 right-4",
  "top-left": "top-4 left-4",
  "top-center": "top-4 left-1/2 -translate-x-1/2",
  "bottom-right": "bottom-4 right-4",
  "bottom-left": "bottom-4 left-4",
  "bottom-center": "bottom-4 left-1/2 -translate-x-1/2",
};

export interface ToastStyleProps {
  variant?: ToastVariant;
  className?: string;
}

export function toastStyles(props: ToastStyleProps = {}): string {
  const { variant = "info", className } = props;

  return cn(
    "flex items-start gap-3 w-full max-w-sm p-4 rounded-card border shadow-lg",
    "animate-slide-up",
    toastVariants[variant],
    className,
  );
}

export interface ToastContainerStyleProps {
  position?: ToastPosition;
  className?: string;
}

export function toastContainerStyles(
  props: ToastContainerStyleProps = {},
): string {
  const { position = "top-right", className } = props;

  return cn(
    "fixed z-50 flex flex-col gap-2 pointer-events-none",
    toastPositions[position],
    className,
  );
}
