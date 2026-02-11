import { forwardRef, useId, type TextareaHTMLAttributes } from "react";
import { cn } from "@/utils/cn";
import { textareaStyles, type TextareaSize } from "./Textarea.styles";

export type { TextareaSize } from "./Textarea.styles";

export interface TextareaProps extends Omit<
  TextareaHTMLAttributes<HTMLTextAreaElement>,
  "size"
> {
  /** Label text */
  label?: string;
  /** Helper text shown below textarea */
  helperText?: string;
  /** Error message */
  error?: string;
  /** Textarea size */
  size?: TextareaSize;
  /** Resize behavior */
  resize?: "none" | "vertical" | "horizontal" | "both";
  /** Wrapper className */
  className?: string;
  /** Textarea element className */
  textareaClassName?: string;
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  (
    {
      label,
      helperText,
      error,
      size = "md",
      resize = "vertical",
      className,
      textareaClassName,
      disabled,
      id,
      ...props
    },
    ref,
  ) => {
    const generatedId = useId();
    const textareaId = id || generatedId;
    const errorId = `${textareaId}-error`;
    const helperId = `${textareaId}-helper`;

    const hasError = Boolean(error);

    return (
      <div className={cn("flex flex-col gap-1.5", className)}>
        {label && (
          <label
            htmlFor={textareaId}
            className="text-sm font-medium text-gray-700"
          >
            {label}
          </label>
        )}
        <textarea
          ref={ref}
          id={textareaId}
          disabled={disabled}
          aria-invalid={hasError}
          aria-describedby={
            hasError ? errorId : helperText ? helperId : undefined
          }
          className={textareaStyles({
            size,
            error: hasError,
            disabled,
            resize,
            className: textareaClassName,
          })}
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

Textarea.displayName = "Textarea";
