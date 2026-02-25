import {
  forwardRef,
  useId,
  useState,
  type ChangeEvent,
  type InputHTMLAttributes,
  type ReactNode,
} from "react";
import {
  checkboxWrapperStyles,
  checkboxRowStyles,
  checkboxIndicatorStyles,
  checkboxLabelStyles,
  checkboxTextFieldStyles,
} from "./Checkbox.styles";

export interface CheckboxProps extends Omit<
  InputHTMLAttributes<HTMLInputElement>,
  "size" | "type"
> {
  /** Label text or element */
  label?: ReactNode;
  /** Indeterminate state */
  indeterminate?: boolean;
  /** Wrapper className */
  className?: string;
  /** Show text field below checkbox when checked */
  withTextField?: boolean;
  /** Text field value (controlled) */
  textFieldValue?: string;
  /** Text field change handler */
  onTextFieldChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  /** Text field placeholder */
  textFieldPlaceholder?: string;
  /** Whether the text field has an error */
  textFieldError?: boolean;
}

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  (
    {
      label,
      indeterminate = false,
      disabled = false,
      className,
      id,
      checked,
      defaultChecked,
      onChange,
      withTextField,
      textFieldValue,
      onTextFieldChange,
      textFieldPlaceholder,
      textFieldError,
      ...props
    },
    ref,
  ) => {
    const generatedId = useId();
    const checkboxId = id || generatedId;
    const [internalChecked, setInternalChecked] = useState(!!defaultChecked);
    const isChecked = checked !== undefined ? checked : internalChecked;

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
      if (checked === undefined) {
        setInternalChecked(e.target.checked);
      }
      onChange?.(e);
    };

    return (
      <div className={checkboxWrapperStyles({ disabled, className })}>
        <label htmlFor={checkboxId} className={checkboxRowStyles({ disabled })}>
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
            checked={checked}
            defaultChecked={checked === undefined ? defaultChecked : undefined}
            onChange={handleChange}
            className="peer sr-only"
            aria-checked={indeterminate ? "mixed" : undefined}
            {...props}
          />
          <span
            className={checkboxIndicatorStyles({
              checked: isChecked,
              indeterminate,
              disabled,
            })}
            aria-hidden="true"
          >
            {isChecked && !indeterminate && (
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path
                  d="M3 7L6 10L11 4"
                  stroke="white"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            )}
            {indeterminate && (
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path
                  d="M3.5 7H10.5"
                  stroke="white"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
            )}
          </span>
          {label && (
            <span className={checkboxLabelStyles({ disabled })}>{label}</span>
          )}
        </label>
        {withTextField && isChecked && (
          <input
            type="text"
            value={textFieldValue}
            onChange={onTextFieldChange}
            placeholder={textFieldPlaceholder}
            disabled={disabled}
            className={checkboxTextFieldStyles({
              error: !!textFieldError,
            })}
          />
        )}
      </div>
    );
  },
);

Checkbox.displayName = "Checkbox";
