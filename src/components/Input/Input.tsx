import { forwardRef, useId, type InputHTMLAttributes } from "react";
import { cn } from "@/utils/cn";

export interface InputProps extends Omit<
  InputHTMLAttributes<HTMLInputElement>,
  "size"
> {
  /** Label text */
  label?: string;
  /** Helper text shown below input */
  helperText?: string;
  /** Error message (replaces helperText when present) */
  error?: string;
  /** Input size */
  size?: "sm" | "md" | "lg";
  /** Wrapper className */
  className?: string;
  /** Input element className */
  inputClassName?: string;
}

const sizeStyles = {
  sm: "px-2 py-1 text-sm",
  md: "px-3 py-2 text-base",
  lg: "px-4 py-3 text-lg",
};

/**
 * Text input component with label and error state support
 */
export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      label,
      helperText,
      error,
      size = "md",
      className,
      inputClassName,
      disabled,
      id,
      ...props
    },
    ref,
  ) => {
    const generatedId = useId();
    const inputId = id || generatedId;
    const errorId = `${inputId}-error`;
    const helperId = `${inputId}-helper`;

    const hasError = Boolean(error);

    return (
      <div className={cn("flex flex-col gap-1.5", className)}>
        {label && (
          <label
            htmlFor={inputId}
            className="text-sm font-medium text-gray-700"
          >
            {label}
          </label>
        )}
        <input
          ref={ref}
          id={inputId}
          disabled={disabled}
          aria-invalid={hasError}
          aria-describedby={
            hasError ? errorId : helperText ? helperId : undefined
          }
          className={cn(
            // Base styles
            "w-full rounded-input border bg-white",
            "transition-all duration-200 ease-out",
            "placeholder:text-gray-400",
            // Focus styles with subtle animation
            "focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500",
            // Size styles
            sizeStyles[size],
            // Error styles
            hasError
              ? "border-red-500 focus:border-red-500 focus:ring-red-500/20"
              : "border-gray-300",
            // Disabled styles
            disabled && "opacity-50 cursor-not-allowed bg-gray-50",
            // Custom className
            inputClassName,
          )}
          {...props}
        />
        {error && (
          <p id={errorId} className="text-sm text-red-500">
            {error}
          </p>
        )}
        {!error && helperText && (
          <p id={helperId} className="text-sm text-gray-500">
            {helperText}
          </p>
        )}
      </div>
    );
  },
);

Input.displayName = "Input";
