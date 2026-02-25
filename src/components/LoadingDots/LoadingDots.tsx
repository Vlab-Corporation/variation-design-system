import { forwardRef, type HTMLAttributes } from "react";
import {
  loadingDotsContainerStyles,
  loadingDotStyles,
  loadingDotsStaggerMs,
  type LoadingDotsSize,
  type LoadingDotsColor,
  type LoadingDotsSpeed,
} from "./LoadingDots.styles";

export type {
  LoadingDotsSize,
  LoadingDotsColor,
  LoadingDotsSpeed,
} from "./LoadingDots.styles";

export interface LoadingDotsProps extends HTMLAttributes<HTMLDivElement> {
  /** Dot size */
  size?: LoadingDotsSize;
  /** Dot color */
  color?: LoadingDotsColor;
  /** Animation speed */
  speed?: LoadingDotsSpeed;
  /** Accessible label */
  "aria-label"?: string;
}

/**
 * Loading dots indicator — three dots that pulse sequentially
 */
export const LoadingDots = forwardRef<HTMLDivElement, LoadingDotsProps>(
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
    const staggerMs = loadingDotsStaggerMs[speed];
    const dotClass = loadingDotStyles({ size, color, speed });

    return (
      <div
        ref={ref}
        role="status"
        aria-label={ariaLabel}
        className={loadingDotsContainerStyles({ size, className })}
        {...props}
      >
        {[0, 1, 2].map((i) => (
          <span
            key={i}
            className={dotClass}
            style={{ animationDelay: `${i * staggerMs}ms` }}
          />
        ))}
      </div>
    );
  },
);

LoadingDots.displayName = "LoadingDots";
