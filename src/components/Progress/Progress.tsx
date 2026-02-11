import { forwardRef, type HTMLAttributes } from "react";
import {
  progressTrackStyles,
  progressBarStyles,
  type ProgressSize,
  type ProgressVariant,
} from "./Progress.styles";

export type { ProgressSize, ProgressVariant } from "./Progress.styles";

export interface ProgressProps extends HTMLAttributes<HTMLDivElement> {
  /** Current value (0-100) */
  value?: number;
  /** Maximum value */
  max?: number;
  /** Size variant */
  size?: ProgressSize;
  /** Color variant */
  variant?: ProgressVariant;
  /** Show indeterminate animation */
  indeterminate?: boolean;
  /** Show value label */
  showLabel?: boolean;
}

export const Progress = forwardRef<HTMLDivElement, ProgressProps>(
  (
    {
      value = 0,
      max = 100,
      size = "md",
      variant = "default",
      indeterminate = false,
      showLabel = false,
      className,
      ...props
    },
    ref,
  ) => {
    const percentage = Math.min(100, Math.max(0, (value / max) * 100));

    return (
      <div ref={ref} className="w-full" {...props}>
        {showLabel && !indeterminate && (
          <div className="flex justify-between mb-1">
            <span className="text-sm text-gray-700" />
            <span className="text-sm text-gray-500">
              {Math.round(percentage)}%
            </span>
          </div>
        )}
        <div
          role="progressbar"
          aria-valuenow={indeterminate ? undefined : value}
          aria-valuemin={0}
          aria-valuemax={max}
          className={progressTrackStyles({ size, className })}
        >
          <div
            className={progressBarStyles({ variant, indeterminate })}
            style={indeterminate ? undefined : { width: `${percentage}%` }}
          />
        </div>
      </div>
    );
  },
);

Progress.displayName = "Progress";
