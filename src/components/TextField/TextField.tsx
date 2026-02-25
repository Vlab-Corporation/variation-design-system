import {
  type ChangeEvent,
  forwardRef,
  type MouseEvent,
  useId,
  useRef,
  useState,
  type InputHTMLAttributes,
} from "react";
import { cn } from "@/utils/cn";
import { textFieldStyles, type TextFieldSize } from "./TextField.styles";

export type { TextFieldSize } from "./TextField.styles";

export interface TextFieldProps extends Omit<
  InputHTMLAttributes<HTMLInputElement>,
  "size"
> {
  /** Label text */
  label?: string;
  /** Helper text shown below input */
  helperText?: string;
  /** Error message */
  error?: string;
  /** TextField size */
  size?: TextFieldSize;
  /** Show clear button when input has value */
  clearable?: boolean;
  /** Called when clear button is clicked */
  onClear?: () => void;
  /** Wrapper className */
  className?: string;
  /** Input element className */
  inputClassName?: string;
}

export const TextField = forwardRef<HTMLInputElement, TextFieldProps>(
  (
    {
      label,
      helperText,
      error,
      size = "md",
      clearable = true,
      onClear,
      className,
      inputClassName,
      disabled,
      id,
      value,
      defaultValue,
      onChange,
      ...props
    },
    ref,
  ) => {
    const generatedId = useId();
    const textFieldId = id || generatedId;
    const errorId = `${textFieldId}-error`;
    const helperId = `${textFieldId}-helper`;

    const internalRef = useRef<HTMLInputElement | null>(null);
    const isControlled = value !== undefined;
    const [internalValue, setInternalValue] = useState(
      String(defaultValue ?? ""),
    );

    const currentValue = isControlled ? String(value) : internalValue;
    const hasError = Boolean(error);
    const hasValue = currentValue.length > 0;
    const showClearButton = clearable && hasValue && !disabled;

    const setRefs = (element: HTMLInputElement | null) => {
      internalRef.current = element;
      if (typeof ref === "function") {
        ref(element);
      } else if (ref) {
        Object.assign(ref, { current: element });
      }
    };

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
      if (!isControlled) {
        setInternalValue(e.target.value);
      }
      onChange?.(e);
    };

    const handleClear = (e: MouseEvent<HTMLButtonElement>) => {
      e.preventDefault();
      if (!isControlled) {
        setInternalValue("");
      }
      // Trigger onChange with empty value for controlled components
      const input = internalRef.current;
      if (input) {
        const nativeSetter = Object.getOwnPropertyDescriptor(
          HTMLInputElement.prototype,
          "value",
        )?.set;
        nativeSetter?.call(input, "");
        input.dispatchEvent(new Event("input", { bubbles: true }));
        input.focus();
      }
      onClear?.();
    };

    return (
      <div className={cn("flex flex-col gap-1.5", className)}>
        {label && (
          <label
            htmlFor={textFieldId}
            className="text-sm font-medium text-gray-700"
          >
            {label}
          </label>
        )}
        <div className="relative">
          <input
            ref={setRefs}
            id={textFieldId}
            type="text"
            disabled={disabled}
            aria-invalid={hasError}
            aria-describedby={
              hasError ? errorId : helperText ? helperId : undefined
            }
            value={isControlled ? value : internalValue}
            onChange={handleChange}
            className={textFieldStyles({
              size,
              error: hasError,
              disabled,
              hasClearButton: showClearButton,
              className: inputClassName,
            })}
            {...props}
          />
          {showClearButton && (
            <button
              type="button"
              tabIndex={-1}
              aria-label="입력 지우기"
              onClick={handleClear}
              className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center justify-center text-gray-400 hover:text-gray-500 transition-colors focus:outline-none"
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 18 18"
                fill="none"
                aria-hidden="true"
              >
                <circle cx="9" cy="9" r="9" fill="currentColor" />
                <path
                  d="M6.5 6.5L11.5 11.5M11.5 6.5L6.5 11.5"
                  stroke="white"
                  strokeWidth="1.2"
                  strokeLinecap="round"
                />
              </svg>
            </button>
          )}
        </div>
        {error && (
          <p id={errorId} className="text-label font-medium text-error-600">
            {error}
          </p>
        )}
        {!error && helperText && (
          <p id={helperId} className="text-label font-medium text-gray-500">
            {helperText}
          </p>
        )}
      </div>
    );
  },
);

TextField.displayName = "TextField";
