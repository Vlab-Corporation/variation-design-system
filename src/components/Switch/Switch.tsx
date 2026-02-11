import {
  forwardRef,
  useId,
  type ButtonHTMLAttributes,
  type ReactNode,
} from "react";
import { cn } from "@/utils/cn";
import {
  switchTrackStyles,
  switchThumbStyles,
  type SwitchSize,
} from "./Switch.styles";

export type { SwitchSize } from "./Switch.styles";

export interface SwitchProps extends Omit<
  ButtonHTMLAttributes<HTMLButtonElement>,
  "onChange"
> {
  /** Whether the switch is on */
  checked?: boolean;
  /** Called when the switch is toggled */
  onChange?: (checked: boolean) => void;
  /** Switch size */
  size?: SwitchSize;
  /** Label text or element */
  label?: ReactNode;
  /** Description text */
  description?: string;
  /** Wrapper className */
  className?: string;
}

export const Switch = forwardRef<HTMLButtonElement, SwitchProps>(
  (
    {
      checked = false,
      onChange,
      size = "md",
      label,
      description,
      disabled = false,
      className,
      id,
      ...props
    },
    ref,
  ) => {
    const generatedId = useId();
    const switchId = id || generatedId;
    const labelId = `${switchId}-label`;

    const handleClick = () => {
      if (!disabled) {
        onChange?.(!checked);
      }
    };

    return (
      <div
        className={cn(
          "inline-flex items-center gap-2",
          disabled ? "cursor-not-allowed" : "cursor-pointer",
          className,
        )}
      >
        <button
          ref={ref}
          id={switchId}
          type="button"
          role="switch"
          aria-checked={checked}
          aria-labelledby={label ? labelId : undefined}
          disabled={disabled}
          onClick={handleClick}
          className={switchTrackStyles({ size, checked, disabled })}
          {...props}
        >
          <span
            className={switchThumbStyles({ size, checked })}
            aria-hidden="true"
          />
        </button>
        {(label || description) && (
          <div className="flex flex-col">
            {label && (
              <span
                id={labelId}
                className={cn(
                  "font-medium text-gray-900 select-none",
                  disabled && "opacity-50",
                  size === "sm" && "text-sm",
                  size === "md" && "text-base",
                  size === "lg" && "text-lg",
                )}
              >
                {label}
              </span>
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

Switch.displayName = "Switch";
