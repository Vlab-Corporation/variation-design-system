import { cn } from "@/utils/cn";

export type ButtonVariant = "primary" | "secondary" | "ghost";
export type ButtonSize = "sm" | "md" | "lg";
export type ButtonShape = "pill" | "rounded";

export const buttonVariants: Record<ButtonVariant, string> = {
  primary: "bg-gray-900 text-white hover:bg-gray-700 focus:ring-gray-900/20",
  secondary:
    "bg-transparent border-[1.5px] border-gray-400 text-gray-800 hover:bg-gray-50 focus:ring-gray-400/20",
  ghost: "bg-transparent text-gray-700 hover:bg-gray-100 focus:ring-gray-500/20",
};

export const buttonDisabledVariants: Record<ButtonVariant, string> = {
  primary: "bg-gray-200 text-gray-500",
  secondary: "bg-transparent border-[1.5px] border-gray-200 text-gray-400",
  ghost: "bg-transparent text-gray-400",
};

export const buttonShapes: Record<ButtonShape, string> = {
  pill: "rounded-pill",
  rounded: "rounded-button",
};

export const buttonSizes: Record<ButtonSize, string> = {
  sm: "py-2 px-6 text-sm font-medium",
  md: "py-3 px-6 text-base font-medium",
  lg: "py-3.5 px-6 text-lg font-semibold",
};

export const buttonIconGaps: Record<ButtonSize, string> = {
  sm: "gap-[7px]",
  md: "gap-[7px]",
  lg: "gap-1",
};

export const buttonIconSizes: Record<ButtonSize, string> = {
  sm: "w-4 h-4",
  md: "w-4 h-4",
  lg: "w-5 h-5",
};

export const buttonIconPadding: Record<
  ButtonSize,
  { left: string; right: string }
> = {
  sm: { left: "pl-3.5 pr-4", right: "pl-4 pr-3.5" },
  md: { left: "pl-[18px] pr-5", right: "pl-5 pr-[18px]" },
  lg: { left: "pl-5", right: "pr-5" },
};

export interface ButtonStyleProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
  shape?: ButtonShape;
  disabled?: boolean;
  loading?: boolean;
  hasLeftIcon?: boolean;
  hasRightIcon?: boolean;
  className?: string;
}

export function buttonStyles(props: ButtonStyleProps = {}): string {
  const {
    variant = "primary",
    size = "md",
    shape = "rounded",
    disabled = false,
    loading = false,
    hasLeftIcon = false,
    hasRightIcon = false,
    className,
  } = props;
  const isDisabled = disabled || loading;

  return cn(
    "inline-flex items-center justify-center whitespace-nowrap tracking-tight",
    "transition-colors duration-200 ease-out",
    "focus:outline-none focus:ring-2 focus:ring-offset-2",
    buttonShapes[shape],
    buttonSizes[size],
    buttonIconGaps[size],
    isDisabled
      ? cn(buttonDisabledVariants[variant], "cursor-not-allowed")
      : buttonVariants[variant],
    hasLeftIcon && buttonIconPadding[size].left,
    hasRightIcon && buttonIconPadding[size].right,
    className,
  );
}
