import { cn } from "@/utils/cn";

export type SelectSize = "sm" | "md" | "lg";

export const selectSizes: Record<SelectSize, string> = {
  sm: "px-2 py-1 text-sm pr-8",
  md: "px-3 py-2 text-base pr-10",
  lg: "px-4 py-3 text-lg pr-12",
};

export interface SelectStyleProps {
  size?: SelectSize;
  error?: boolean;
  disabled?: boolean;
  className?: string;
}

export function selectStyles(props: SelectStyleProps = {}): string {
  const { size = "md", error = false, disabled = false, className } = props;

  return cn(
    "w-full rounded-input border bg-white appearance-none cursor-pointer",
    "transition-all duration-200 ease-out",
    "focus:outline-none focus:ring-2 focus:ring-accent-500/20 focus:border-accent-500",
    selectSizes[size],
    error
      ? "border-error-500 focus:border-error-500 focus:ring-error-500/20"
      : "border-gray-300",
    disabled && "opacity-50 cursor-not-allowed bg-gray-50",
    className,
  );
}

export const selectIconSizes: Record<SelectSize, string> = {
  sm: "h-4 w-4 right-2",
  md: "h-5 w-5 right-3",
  lg: "h-5 w-5 right-4",
};
