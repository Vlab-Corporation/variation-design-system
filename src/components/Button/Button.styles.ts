import { cn } from "@/utils/cn";

export type ButtonVariant = "primary" | "secondary" | "outline" | "ghost";
export type ButtonSize = "sm" | "md" | "lg";

export const buttonVariants: Record<ButtonVariant, string> = {
  primary:
    "bg-primary-500 text-white hover:bg-primary-600 focus:ring-primary-500/20",
  secondary:
    "bg-secondary-100 text-secondary-800 hover:bg-secondary-200 focus:ring-secondary-500/20",
  outline:
    "bg-transparent border border-primary-500 text-primary-600 hover:bg-primary-50 focus:ring-primary-500/20",
  ghost:
    "bg-transparent text-gray-700 hover:bg-gray-100 focus:ring-gray-500/20",
};

export const buttonSizes: Record<ButtonSize, string> = {
  sm: "px-3 py-1.5 text-sm",
  md: "px-4 py-2 text-base",
  lg: "px-6 py-3 text-lg",
};

export interface ButtonStyleProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
  disabled?: boolean;
  loading?: boolean;
  className?: string;
}

export function buttonStyles(props: ButtonStyleProps = {}): string {
  const {
    variant = "primary",
    size = "md",
    disabled = false,
    loading = false,
    className,
  } = props;
  const isDisabled = disabled || loading;

  return cn(
    "inline-flex items-center justify-center font-medium rounded-button",
    "transition-all duration-200 ease-out",
    "focus:outline-none focus:ring-2 focus:ring-offset-2",
    "hover:scale-[1.02] active:scale-[0.98]",
    buttonVariants[variant],
    buttonSizes[size],
    isDisabled &&
      "opacity-50 cursor-not-allowed hover:scale-100 active:scale-100",
    className,
  );
}
