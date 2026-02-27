import { cn } from "@/utils/cn";

export type BadgeVariant =
  | "default"
  | "primary"
  | "success"
  | "warning"
  | "error"
  | "info";
export type BadgeSize = "sm" | "md" | "lg";
export type BadgeShape = "rounded" | "pill" | "square";

export const badgeVariants: Record<
  BadgeVariant,
  { bg: string; text: string; dot: string }
> = {
  default: { bg: "bg-gray-100", text: "text-gray-800", dot: "bg-gray-500" },
  primary: {
    bg: "bg-accent-100",
    text: "text-accent-800",
    dot: "bg-accent-500",
  },
  success: {
    bg: "bg-success-100",
    text: "text-success-800",
    dot: "bg-success-500",
  },
  warning: {
    bg: "bg-warning-100",
    text: "text-warning-800",
    dot: "bg-warning-500",
  },
  error: { bg: "bg-error-100", text: "text-error-800", dot: "bg-error-500" },
  info: { bg: "bg-info-100", text: "text-info-800", dot: "bg-info-500" },
};

export const badgeSizes: Record<BadgeSize, string> = {
  sm: "px-1.5 py-0.5 text-xs",
  md: "px-2 py-0.5 text-sm",
  lg: "px-2.5 py-1 text-base",
};

export const badgeShapes: Record<BadgeShape, string> = {
  rounded: "rounded-md",
  pill: "rounded-full",
  square: "rounded-none",
};

export interface BadgeStyleProps {
  variant?: BadgeVariant;
  size?: BadgeSize;
  shape?: BadgeShape;
  pulse?: boolean;
  className?: string;
}

export function badgeStyles(props: BadgeStyleProps = {}): string {
  const {
    variant = "default",
    size = "md",
    shape = "rounded",
    pulse = false,
    className,
  } = props;
  const styles = badgeVariants[variant];

  return cn(
    "inline-flex items-center gap-1.5 font-medium",
    styles.bg,
    styles.text,
    badgeSizes[size],
    badgeShapes[shape],
    "animate-fade-in",
    pulse && "animate-pulse-subtle",
    className,
  );
}

export function badgeDotStyles(variant: BadgeVariant = "default"): string {
  return cn("w-2 h-2 rounded-full", badgeVariants[variant].dot);
}
