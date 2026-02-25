import { cn } from "@/utils/cn";

export type PaginationSize = "sm" | "md" | "lg";

export const paginationSizes: Record<PaginationSize, string> = {
  sm: "h-8 min-w-8 px-2 text-sm",
  md: "h-10 min-w-10 px-3 text-base",
  lg: "h-12 min-w-12 px-4 text-lg",
};

export interface PaginationStyleProps {
  size?: PaginationSize;
  className?: string;
}

export function paginationStyles(props: PaginationStyleProps = {}): string {
  const { className } = props;
  return cn("flex items-center gap-1", className);
}

export interface PaginationItemStyleProps {
  size?: PaginationSize;
  active?: boolean;
  disabled?: boolean;
  className?: string;
}

export function paginationItemStyles(
  props: PaginationItemStyleProps = {},
): string {
  const { size = "md", active = false, disabled = false, className } = props;

  return cn(
    "inline-flex items-center justify-center rounded-button font-medium",
    "transition-colors duration-200",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-500/20",
    paginationSizes[size],
    active ? "bg-accent-500 text-white" : "text-gray-700 hover:bg-gray-100",
    disabled && "opacity-50 cursor-not-allowed pointer-events-none",
    !disabled && "cursor-pointer",
    className,
  );
}
