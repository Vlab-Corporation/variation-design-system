import { cn } from "@/utils/cn";

export type TextFieldSize = "sm" | "md" | "lg";

export const textFieldSizes: Record<TextFieldSize, string> = {
  sm: "h-[42px] px-3 text-body-3",
  md: "h-[54px] px-3.5 text-body-2",
  lg: "h-[62px] px-4 text-body-1",
};

export interface TextFieldStyleProps {
  size?: TextFieldSize;
  error?: boolean;
  disabled?: boolean;
  hasClearButton?: boolean;
  className?: string;
}

export function textFieldStyles(props: TextFieldStyleProps = {}): string {
  const {
    size = "md",
    error = false,
    disabled = false,
    hasClearButton = false,
    className,
  } = props;

  return cn(
    // Base
    "w-full rounded-[7px] border-[1.5px] bg-gray-50",
    "font-medium tracking-tight text-gray-900",
    "transition-all duration-200 ease-out",
    "placeholder:text-gray-500",
    // Focus
    "focus:outline-none focus:bg-white focus:border-accent-600",
    // Size
    textFieldSizes[size],
    // Clear button padding
    hasClearButton && "pr-10",
    // Error
    error
      ? "border-error-600 bg-white focus:border-error-600"
      : "border-gray-200",
    // Disabled
    disabled &&
      "cursor-not-allowed bg-gray-50 text-gray-500 border-gray-200 focus:border-gray-200 focus:bg-gray-50",
    className,
  );
}
