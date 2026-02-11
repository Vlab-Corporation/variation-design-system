import {
  forwardRef,
  useId,
  createContext,
  useContext,
  type ChangeEvent,
  type InputHTMLAttributes,
  type ReactNode,
} from "react";
import { cn } from "@/utils/cn";
import {
  radioStyles,
  radioGroupStyles,
  radioInnerSizes,
  type RadioSize,
  type RadioGroupOrientation,
} from "./Radio.styles";

export type { RadioSize, RadioGroupOrientation } from "./Radio.styles";

// --- RadioGroup Context ---

interface RadioGroupContextValue {
  name: string;
  value?: string;
  onChange?: (value: string) => void;
  size?: RadioSize;
  disabled?: boolean;
}

const RadioGroupContext = createContext<RadioGroupContextValue | null>(null);

// --- Radio ---

export interface RadioProps extends Omit<
  InputHTMLAttributes<HTMLInputElement>,
  "size" | "type"
> {
  /** Label text or element */
  label?: ReactNode;
  /** Radio size */
  size?: RadioSize;
  /** Description text shown below label */
  description?: string;
  /** Wrapper className */
  className?: string;
  /** Radio input className */
  radioClassName?: string;
}

export const Radio = forwardRef<HTMLInputElement, RadioProps>(
  (
    {
      label,
      size: sizeProp,
      description,
      disabled: disabledProp,
      className,
      radioClassName,
      id,
      name: nameProp,
      value,
      checked,
      onChange: onChangeProp,
      ...props
    },
    ref,
  ) => {
    const group = useContext(RadioGroupContext);
    const generatedId = useId();
    const radioId = id || generatedId;

    const size = sizeProp || group?.size || "md";
    const disabled = disabledProp ?? group?.disabled ?? false;
    const name = nameProp || group?.name;
    const isChecked = group ? group.value === value : checked;

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
      if (group?.onChange && value !== undefined) {
        group.onChange(String(value));
      }
      onChangeProp?.(e);
    };

    return (
      <div
        className={cn(
          "inline-flex items-center gap-2",
          disabled ? "cursor-not-allowed" : "cursor-pointer",
          className,
        )}
      >
        <div className="relative inline-flex items-center justify-center">
          <input
            ref={ref}
            type="radio"
            id={radioId}
            name={name}
            value={value}
            checked={isChecked}
            disabled={disabled}
            onChange={handleChange}
            className={radioStyles({
              size,
              disabled,
              className: cn("peer", radioClassName),
            })}
            {...props}
          />
          <span
            className={cn(
              "absolute pointer-events-none rounded-full bg-white",
              "opacity-0 peer-checked:opacity-100",
              "transition-opacity duration-150",
              radioInnerSizes[size],
            )}
            aria-hidden="true"
          />
        </div>
        {(label || description) && (
          <div className="flex flex-col">
            {label && (
              <label
                htmlFor={radioId}
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

Radio.displayName = "Radio";

// --- RadioGroup ---

export interface RadioGroupProps {
  /** Group name for all radios */
  name: string;
  /** Currently selected value */
  value?: string;
  /** Called when selection changes */
  onChange?: (value: string) => void;
  /** Radio size for all children */
  size?: RadioSize;
  /** Disable all radios */
  disabled?: boolean;
  /** Layout orientation */
  orientation?: RadioGroupOrientation;
  /** Group label */
  label?: string;
  /** Additional className */
  className?: string;
  children: ReactNode;
}

export const RadioGroup = forwardRef<HTMLDivElement, RadioGroupProps>(
  (
    {
      name,
      value,
      onChange,
      size = "md",
      disabled = false,
      orientation = "vertical",
      label,
      className,
      children,
      ...props
    },
    ref,
  ) => {
    return (
      <RadioGroupContext.Provider
        value={{ name, value, onChange, size, disabled }}
      >
        <div
          ref={ref}
          role="radiogroup"
          aria-label={label}
          className={radioGroupStyles({ orientation, className })}
          {...props}
        >
          {label && (
            <span className="text-sm font-medium text-gray-700">{label}</span>
          )}
          {children}
        </div>
      </RadioGroupContext.Provider>
    );
  },
);

RadioGroup.displayName = "RadioGroup";
