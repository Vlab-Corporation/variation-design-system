import { forwardRef, type HTMLAttributes } from "react";
import { skeletonStyles, type SkeletonVariant } from "./Skeleton.styles";

export type { SkeletonVariant } from "./Skeleton.styles";

export interface SkeletonProps extends HTMLAttributes<HTMLDivElement> {
  /** Shape variant */
  variant?: SkeletonVariant;
  /** Width (CSS value) */
  width?: string | number;
  /** Height (CSS value) */
  height?: string | number;
}

export const Skeleton = forwardRef<HTMLDivElement, SkeletonProps>(
  ({ variant = "text", width, height, className, style, ...props }, ref) => {
    const inlineStyle = {
      ...style,
      ...(width !== undefined
        ? { width: typeof width === "number" ? `${width}px` : width }
        : {}),
      ...(height !== undefined
        ? { height: typeof height === "number" ? `${height}px` : height }
        : {}),
    };

    return (
      <div
        ref={ref}
        role="status"
        aria-label="Loading"
        className={skeletonStyles({ variant, className })}
        style={inlineStyle}
        {...props}
      />
    );
  },
);

Skeleton.displayName = "Skeleton";
