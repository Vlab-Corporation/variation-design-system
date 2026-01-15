import React, { forwardRef, type HTMLAttributes } from "react";
import { cn } from "@/utils/cn";

type BadgeVariant =
  | "default"
  | "primary"
  | "success"
  | "warning"
  | "error"
  | "info";
type BadgeSize = "sm" | "md" | "lg";
type BadgeShape = "rounded" | "pill" | "square";

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  /** Visual style variant */
  variant?: BadgeVariant;
  /** Badge size */
  size?: BadgeSize;
  /** Badge shape */
  shape?: BadgeShape;
  /** Show dot indicator */
  dot?: boolean;
  /** Enable pulse animation */
  pulse?: boolean;
  children: React.ReactNode;
}

const variantStyles: Record<
  BadgeVariant,
  { bg: string; text: string; dot: string }
> = {
  default: { bg: "bg-gray-100", text: "text-gray-800", dot: "bg-gray-500" },
  primary: {
    bg: "bg-primary-100",
    text: "text-primary-800",
    dot: "bg-primary-500",
  },
  success: { bg: "bg-green-100", text: "text-green-800", dot: "bg-green-500" },
  warning: {
    bg: "bg-yellow-100",
    text: "text-yellow-800",
    dot: "bg-yellow-500",
  },
  error: { bg: "bg-red-100", text: "text-red-800", dot: "bg-red-500" },
  info: { bg: "bg-blue-100", text: "text-blue-800", dot: "bg-blue-500" },
};

const sizeStyles: Record<BadgeSize, string> = {
  sm: "px-1.5 py-0.5 text-xs",
  md: "px-2 py-0.5 text-sm",
  lg: "px-2.5 py-1 text-base",
};

const shapeStyles: Record<BadgeShape, string> = {
  rounded: "rounded-md",
  pill: "rounded-full",
  square: "rounded-none",
};

/**
 * Badge component for status indicators and labels
 */
export const Badge = forwardRef<HTMLSpanElement, BadgeProps>(
  (
    {
      variant = "default",
      size = "md",
      shape = "rounded",
      dot = false,
      pulse = false,
      className,
      children,
      ...props
    },
    ref,
  ) => {
    const styles = variantStyles[variant];

    return (
      <span
        ref={ref}
        className={cn(
          "inline-flex items-center gap-1.5 font-medium",
          styles.bg,
          styles.text,
          sizeStyles[size],
          shapeStyles[shape],
          "animate-fade-in",
          pulse && "animate-pulse-subtle",
          className,
        )}
        {...props}
      >
        {dot && (
          <span
            data-testid="badge-dot"
            className={cn("w-2 h-2 rounded-full", styles.dot)}
          />
        )}
        {children}
      </span>
    );
  },
);

Badge.displayName = "Badge";
