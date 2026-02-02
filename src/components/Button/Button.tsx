import React, { forwardRef, type ButtonHTMLAttributes } from "react";
import { cn } from "@/utils/cn";
import {
  buttonStyles,
  type ButtonVariant,
  type ButtonSize,
} from "./Button.styles";

export type { ButtonVariant, ButtonSize } from "./Button.styles";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /** Visual style variant */
  variant?: ButtonVariant;
  /** Button size */
  size?: ButtonSize;
  /** Loading state - shows spinner and disables button */
  loading?: boolean;
  /** Additional CSS classes */
  className?: string;
  /** Button content */
  children: React.ReactNode;
}

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
        className={buttonStyles({
          variant,
          size,
          disabled,
          loading,
          className,
        })}
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
