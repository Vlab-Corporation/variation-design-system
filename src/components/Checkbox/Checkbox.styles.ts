import { cn } from "@/utils/cn";

export type CheckboxSize = "sm" | "md" | "lg";

export const checkboxSizes: Record<CheckboxSize, string> = {
  sm: "h-3.5 w-3.5",
  md: "h-4 w-4",
  lg: "h-5 w-5",
};

export const checkboxLabelSizes: Record<CheckboxSize, string> = {
  sm: "text-sm",
  md: "text-base",
  lg: "text-lg",
};

export const checkboxIconSizes: Record<CheckboxSize, string> = {
  sm: "h-3 w-3",
  md: "h-3.5 w-3.5",
  lg: "h-4 w-4",
};

export interface CheckboxStyleProps {
  size?: CheckboxSize;
  disabled?: boolean;
  className?: string;
}

export function checkboxStyles(props: CheckboxStyleProps = {}): string {
  const { size = "md", disabled = false, className } = props;

  return cn(
    "shrink-0 rounded border appearance-none cursor-pointer",
    "transition-all duration-200 ease-out",
    "border-gray-300 bg-white",
    "checked:bg-primary-500 checked:border-primary-500",
    "focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:ring-offset-1",
    checkboxSizes[size],
    disabled && "opacity-50 cursor-not-allowed",
    className,
  );
}

export interface CheckboxWrapperStyleProps {
  disabled?: boolean;
  className?: string;
}

export function checkboxWrapperStyles(
  props: CheckboxWrapperStyleProps = {},
): string {
  const { disabled = false, className } = props;

  return cn(
    "inline-flex items-center gap-2",
    disabled ? "cursor-not-allowed" : "cursor-pointer",
    className,
  );
}
