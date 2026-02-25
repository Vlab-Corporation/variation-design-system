import { cn } from "@/utils/cn";

export type TagVariant =
  | "default"
  | "primary"
  | "success"
  | "warning"
  | "error"
  | "info";
export type TagSize = "sm" | "md" | "lg";

export const tagVariants: Record<TagVariant, string> = {
  default: "bg-gray-100 text-gray-800 hover:bg-gray-200",
  primary: "bg-accent-100 text-accent-800 hover:bg-accent-200",
  success: "bg-green-100 text-green-800 hover:bg-green-200",
  warning: "bg-yellow-100 text-yellow-800 hover:bg-yellow-200",
  error: "bg-red-100 text-red-800 hover:bg-red-200",
  info: "bg-blue-100 text-blue-800 hover:bg-blue-200",
};

export const tagSizes: Record<TagSize, string> = {
  sm: "px-2 py-0.5 text-xs gap-1",
  md: "px-2.5 py-1 text-sm gap-1.5",
  lg: "px-3 py-1.5 text-base gap-2",
};

export interface TagStyleProps {
  variant?: TagVariant;
  size?: TagSize;
  clickable?: boolean;
  className?: string;
}

export function tagStyles(props: TagStyleProps = {}): string {
  const {
    variant = "default",
    size = "md",
    clickable = false,
    className,
  } = props;

  return cn(
    "inline-flex items-center rounded-full font-medium",
    "transition-colors duration-200",
    tagVariants[variant],
    tagSizes[size],
    clickable && "cursor-pointer",
    className,
  );
}

export function tagRemoveStyles(): string {
  return cn(
    "inline-flex items-center justify-center rounded-full",
    "w-4 h-4 hover:bg-black/10 cursor-pointer",
    "transition-colors duration-150",
  );
}
