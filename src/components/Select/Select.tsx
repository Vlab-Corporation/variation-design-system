import { forwardRef, useId, type SelectHTMLAttributes } from "react";
import { cn } from "@/utils/cn";
import {
  selectStyles,
  selectIconSizes,
  type SelectSize,
} from "./Select.styles";

export type { SelectSize } from "./Select.styles";

export interface SelectOption {
  value: string;
  label: string;
  disabled?: boolean;
}

export interface SelectProps extends Omit<
  SelectHTMLAttributes<HTMLSelectElement>,
  "size"
> {
  /** Label text */
  label?: string;
  /** Helper text shown below select */
  helperText?: string;
  /** Error message */
  error?: string;
  /** Select size */
  size?: SelectSize;
  /** Placeholder option */
  placeholder?: string;
  /** Options to render */
  options?: SelectOption[];
  /** Wrapper className */
  className?: string;
  /** Select element className */
  selectClassName?: string;
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  (
    {
      label,
      helperText,
      error,
      size = "md",
      placeholder,
      options,
      className,
      selectClassName,
      disabled,
      children,
      id,
      ...props
    },
    ref,
  ) => {
    const generatedId = useId();
    const selectId = id || generatedId;
    const errorId = `${selectId}-error`;
    const helperId = `${selectId}-helper`;

    const hasError = Boolean(error);

    return (
      <div className={cn("flex flex-col gap-1.5", className)}>
        {label && (
          <label
            htmlFor={selectId}
            className="text-sm font-medium text-gray-700"
          >
            {label}
          </label>
        )}
        <div className="relative">
          <select
            ref={ref}
            id={selectId}
            disabled={disabled}
            aria-invalid={hasError}
            aria-describedby={
              hasError ? errorId : helperText ? helperId : undefined
            }
            className={selectStyles({
              size,
              error: hasError,
              disabled,
              className: selectClassName,
            })}
            {...props}
          >
            {placeholder && (
              <option value="" disabled>
                {placeholder}
              </option>
            )}
            {options
              ? options.map((opt) => (
                  <option
                    key={opt.value}
                    value={opt.value}
                    disabled={opt.disabled}
                  >
                    {opt.label}
                  </option>
                ))
              : children}
          </select>
          <svg
            className={cn(
              "absolute top-1/2 -translate-y-1/2 pointer-events-none text-gray-500",
              selectIconSizes[size],
            )}
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden="true"
          >
            <path
              fillRule="evenodd"
              d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
              clipRule="evenodd"
            />
          </svg>
        </div>
        {error && (
          <p id={errorId} className="text-sm text-error-500">
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

Select.displayName = "Select";
