import { cn } from "@/utils/cn";

export type TextareaSize = "sm" | "md" | "lg";

export const textareaSizes: Record<TextareaSize, string> = {
  sm: "px-2 py-1.5 text-sm",
  md: "px-3 py-2 text-base",
  lg: "px-4 py-3 text-lg",
};

export interface TextareaStyleProps {
  size?: TextareaSize;
  error?: boolean;
  disabled?: boolean;
  resize?: "none" | "vertical" | "horizontal" | "both";
  className?: string;
}

export function textareaStyles(props: TextareaStyleProps = {}): string {
  const {
    size = "md",
    error = false,
    disabled = false,
    resize = "vertical",
    className,
  } = props;

  const resizeClasses: Record<string, string> = {
    none: "resize-none",
    vertical: "resize-y",
    horizontal: "resize-x",
    both: "resize",
  };

  return cn(
    "w-full rounded-input border bg-white min-h-[80px]",
    "transition-all duration-200 ease-out",
    "placeholder:text-gray-400",
    "focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500",
    textareaSizes[size],
    resizeClasses[resize],
    error
      ? "border-red-500 focus:border-red-500 focus:ring-red-500/20"
      : "border-gray-300",
    disabled && "opacity-50 cursor-not-allowed bg-gray-50",
    className,
  );
}
