import { forwardRef, type HTMLAttributes } from "react";
import {
  spinnerStyles,
  type SpinnerSize,
  type SpinnerColor,
  type SpinnerSpeed,
} from "./Spinner.styles";

export type { SpinnerSize, SpinnerColor, SpinnerSpeed } from "./Spinner.styles";

export interface SpinnerProps extends HTMLAttributes<HTMLDivElement> {
  /** Spinner size */
  size?: SpinnerSize;
  /** Spinner color */
  color?: SpinnerColor;
  /** Animation speed */
  speed?: SpinnerSpeed;
  /** Accessible label */
  "aria-label"?: string;
}

/**
 * Loading spinner indicator
 */
export const Spinner = forwardRef<HTMLDivElement, SpinnerProps>(
  (
    {
      size = "md",
      color = "primary",
      speed = "normal",
      "aria-label": ariaLabel = "Loading",
      className,
      ...props
    },
    ref,
  ) => {
    return (
      <div
        ref={ref}
        role="status"
        aria-label={ariaLabel}
        className={spinnerStyles({ size, color, speed, className })}
        {...props}
      />
    );
  },
);

Spinner.displayName = "Spinner";
