import { cn } from "@/utils/cn";

export type InputSize = "sm" | "md" | "lg";

export const inputSizes: Record<InputSize, string> = {
  sm: "px-2 py-1 text-sm",
  md: "px-3 py-2 text-base",
  lg: "px-4 py-3 text-lg",
};

export interface InputStyleProps {
  size?: InputSize;
  error?: boolean;
  disabled?: boolean;
  className?: string;
}

export function inputStyles(props: InputStyleProps = {}): string {
  const { size = "md", error = false, disabled = false, className } = props;

  return cn(
    "w-full rounded-input border bg-white",
    "transition-all duration-200 ease-out",
    "placeholder:text-gray-400",
    "focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500",
    inputSizes[size],
    error
      ? "border-red-500 focus:border-red-500 focus:ring-red-500/20"
      : "border-gray-300",
    disabled && "opacity-50 cursor-not-allowed bg-gray-50",
    className,
  );
}
