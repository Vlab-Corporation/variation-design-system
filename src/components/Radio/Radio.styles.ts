import { cn } from "@/utils/cn";

export type RadioSize = "sm" | "md" | "lg";
export type RadioGroupOrientation = "horizontal" | "vertical";

export const radioSizes: Record<RadioSize, string> = {
  sm: "h-3.5 w-3.5",
  md: "h-4 w-4",
  lg: "h-5 w-5",
};

export const radioLabelSizes: Record<RadioSize, string> = {
  sm: "text-sm",
  md: "text-base",
  lg: "text-lg",
};

export const radioInnerSizes: Record<RadioSize, string> = {
  sm: "h-1.5 w-1.5",
  md: "h-2 w-2",
  lg: "h-2.5 w-2.5",
};

export interface RadioStyleProps {
  size?: RadioSize;
  disabled?: boolean;
  className?: string;
}

export function radioStyles(props: RadioStyleProps = {}): string {
  const { size = "md", disabled = false, className } = props;

  return cn(
    "shrink-0 rounded-full border appearance-none cursor-pointer",
    "transition-all duration-200 ease-out",
    "border-gray-300 bg-white",
    "checked:border-primary-500 checked:bg-primary-500",
    "focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:ring-offset-1",
    radioSizes[size],
    disabled && "opacity-50 cursor-not-allowed",
    className,
  );
}

export interface RadioGroupStyleProps {
  orientation?: RadioGroupOrientation;
  className?: string;
}

export function radioGroupStyles(props: RadioGroupStyleProps = {}): string {
  const { orientation = "vertical", className } = props;

  return cn(
    "flex gap-3",
    orientation === "vertical" ? "flex-col" : "flex-row flex-wrap",
    className,
  );
}
