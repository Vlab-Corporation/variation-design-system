import {
  forwardRef,
  useId,
  type InputHTMLAttributes,
  type ReactNode,
} from "react";
import { cn } from "@/utils/cn";
import {
  checkboxStyles,
  checkboxWrapperStyles,
  checkboxIconSizes,
  type CheckboxSize,
} from "./Checkbox.styles";

export type { CheckboxSize } from "./Checkbox.styles";

export interface CheckboxProps extends Omit<
  InputHTMLAttributes<HTMLInputElement>,
  "size" | "type"
> {
  /** Label text or element */
  label?: ReactNode;
  /** Checkbox size */
  size?: CheckboxSize;
  /** Description text shown below label */
  description?: string;
  /** Indeterminate state */
  indeterminate?: boolean;
  /** Wrapper className */
  className?: string;
  /** Checkbox input className */
  checkboxClassName?: string;
}

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  (
    {
      label,
      size = "md",
      description,
      indeterminate = false,
      disabled = false,
      className,
      checkboxClassName,
      id,
      ...props
    },
    ref,
  ) => {
    const generatedId = useId();
    const checkboxId = id || generatedId;

    return (
      <div className={checkboxWrapperStyles({ disabled, className })}>
        <div className="relative inline-flex items-center justify-center">
          <input
            ref={(node) => {
              if (node) {
                node.indeterminate = indeterminate;
              }
              if (typeof ref === "function") {
                ref(node);
              } else if (ref) {
                (ref as { current: HTMLInputElement | null }).current = node;
              }
            }}
            type="checkbox"
            id={checkboxId}
            disabled={disabled}
            className={checkboxStyles({
              size,
              disabled,
              className: cn("peer", checkboxClassName),
            })}
            aria-checked={indeterminate ? "mixed" : undefined}
            {...props}
          />
          {/* Check icon */}
          <svg
            className={cn(
              "absolute pointer-events-none opacity-0 peer-checked:opacity-100 text-white",
              "transition-opacity duration-150",
              indeterminate && "!opacity-0",
              checkboxIconSizes[size],
            )}
            viewBox="0 0 16 16"
            fill="none"
            aria-hidden="true"
          >
            <path
              d="M3.5 8L6.5 11L12.5 5"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          {/* Indeterminate icon */}
          {indeterminate && (
            <svg
              className={cn(
                "absolute pointer-events-none text-white",
                checkboxIconSizes[size],
              )}
              viewBox="0 0 16 16"
              fill="none"
              aria-hidden="true"
            >
              <path
                d="M4 8H12"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          )}
        </div>
        {(label || description) && (
          <div className="flex flex-col">
            {label && (
              <label
                htmlFor={checkboxId}
                className={cn(
                  "font-medium text-gray-900 select-none",
                  disabled && "opacity-50",
                  size === "sm" && "text-sm",
                  size === "md" && "text-base",
                  size === "lg" && "text-lg",
                )}
              >
                {label}
              </label>
            )}
            {description && (
              <span
                className={cn(
                  "text-gray-500",
                  disabled && "opacity-50",
                  size === "lg" ? "text-sm" : "text-xs",
                )}
              >
                {description}
              </span>
            )}
          </div>
        )}
      </div>
    );
  },
);

Checkbox.displayName = "Checkbox";
