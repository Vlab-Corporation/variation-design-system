import React, { forwardRef, type ButtonHTMLAttributes } from "react";
import { cn } from "@/utils/cn";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /** Visual style variant */
  variant?: "primary" | "secondary" | "outline" | "ghost";
  /** Button size */
  size?: "sm" | "md" | "lg";
  /** Loading state - shows spinner and disables button */
  loading?: boolean;
  /** Additional CSS classes */
  className?: string;
  /** Button content */
  children: React.ReactNode;
}

const variantStyles = {
  primary:
    "bg-primary-500 text-white hover:bg-primary-600 focus:ring-primary-500/20",
  secondary:
    "bg-secondary-100 text-secondary-800 hover:bg-secondary-200 focus:ring-secondary-500/20",
  outline:
    "bg-transparent border border-primary-500 text-primary-600 hover:bg-primary-50 focus:ring-primary-500/20",
  ghost:
    "bg-transparent text-gray-700 hover:bg-gray-100 focus:ring-gray-500/20",
};

const sizeStyles = {
  sm: "px-3 py-1.5 text-sm",
  md: "px-4 py-2 text-base",
  lg: "px-6 py-3 text-lg",
};

/**
 * Primary UI component for user actions
 */
export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = "primary",
      size = "md",
      loading = false,
      disabled = false,
      className,
      children,
      type = "button",
      ...props
    },
    ref,
  ) => {
    const isDisabled = disabled || loading;

    return (
      <button
        ref={ref}
        type={type}
        disabled={isDisabled}
        aria-disabled={isDisabled}
        aria-busy={loading}
        className={cn(
          // Base styles
          "inline-flex items-center justify-center font-medium rounded-button",
          "transition-all duration-200 ease-out",
          "focus:outline-none focus:ring-2 focus:ring-offset-2",
          // Animation styles - subtle hover and active states
          "hover:scale-[1.02] active:scale-[0.98]",
          // Variant styles
          variantStyles[variant],
          // Size styles
          sizeStyles[size],
          // Disabled styles
          isDisabled &&
            "opacity-50 cursor-not-allowed hover:scale-100 active:scale-100",
          // Custom classes
          className,
        )}
        {...props}
      >
        {loading && (
          <span
            data-testid="button-spinner"
            className={cn(
              "absolute w-4 h-4 border-2 border-current border-b-transparent rounded-full animate-spin",
            )}
          />
        )}
        <span className={cn(loading && "invisible")}>{children}</span>
      </button>
    );
  },
);

Button.displayName = "Button";
