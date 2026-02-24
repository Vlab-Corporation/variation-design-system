import React, { forwardRef, type ButtonHTMLAttributes } from "react";
import { cn } from "@/utils/cn";
import {
  buttonStyles,
  buttonIconSizes,
  type ButtonVariant,
  type ButtonSize,
  type ButtonShape,
} from "./Button.styles";

export type { ButtonVariant, ButtonSize, ButtonShape } from "./Button.styles";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /** Visual style variant */
  variant?: ButtonVariant;
  /** Button size */
  size?: ButtonSize;
  /** Button shape */
  shape?: ButtonShape;
  /** Loading state - shows spinner and disables button */
  loading?: boolean;
  /** Icon placed before children */
  leftIcon?: React.ReactNode;
  /** Icon placed after children */
  rightIcon?: React.ReactNode;
  /** Additional CSS classes */
  className?: string;
  /** Button content */
  children: React.ReactNode;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = "primary",
      size = "md",
      shape = "rounded",
      loading = false,
      disabled = false,
      leftIcon,
      rightIcon,
      className,
      children,
      type = "button",
      ...props
    },
    ref,
  ) => {
    const isDisabled = disabled || loading;
    const iconSize = buttonIconSizes[size];

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
          shape,
          disabled,
          loading,
          hasLeftIcon: !!leftIcon,
          hasRightIcon: !!rightIcon,
          className,
        })}
        {...props}
      >
        {loading && (
          <span
            data-testid="button-spinner"
            className="absolute w-4 h-4 border-2 border-current border-b-transparent rounded-full animate-spin"
          />
        )}
        {leftIcon && (
          <span
            data-testid="button-left-icon"
            className={cn(
              "inline-flex items-center justify-center shrink-0",
              iconSize,
              "[&>svg]:w-full [&>svg]:h-full",
              loading && "invisible",
            )}
          >
            {leftIcon}
          </span>
        )}
        <span className={cn(loading && "invisible")}>{children}</span>
        {rightIcon && (
          <span
            data-testid="button-right-icon"
            className={cn(
              "inline-flex items-center justify-center shrink-0",
              iconSize,
              "[&>svg]:w-full [&>svg]:h-full",
              loading && "invisible",
            )}
          >
            {rightIcon}
          </span>
        )}
      </button>
    );
  },
);

Button.displayName = "Button";
