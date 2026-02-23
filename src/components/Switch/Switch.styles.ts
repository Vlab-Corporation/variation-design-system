import { cn } from "@/utils/cn";

export type SwitchSize = "sm" | "md" | "lg";

export const switchTrackSizes: Record<SwitchSize, string> = {
  sm: "h-4 w-7",
  md: "h-5 w-9",
  lg: "h-6 w-11",
};

export const switchThumbSizes: Record<SwitchSize, string> = {
  sm: "h-3 w-3",
  md: "h-4 w-4",
  lg: "h-5 w-5",
};

export const switchThumbTranslate: Record<SwitchSize, string> = {
  sm: "translate-x-3",
  md: "translate-x-4",
  lg: "translate-x-5",
};

export const switchLabelSizes: Record<SwitchSize, string> = {
  sm: "text-sm",
  md: "text-base",
  lg: "text-lg",
};

export interface SwitchTrackStyleProps {
  size?: SwitchSize;
  checked?: boolean;
  disabled?: boolean;
  className?: string;
}

export function switchTrackStyles(props: SwitchTrackStyleProps = {}): string {
  const { size = "md", checked = false, disabled = false, className } = props;

  return cn(
    "relative inline-flex items-center shrink-0 rounded-full cursor-pointer p-0.5",
    "transition-colors duration-200 ease-out",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500/20 focus-visible:ring-offset-2",
    switchTrackSizes[size],
    checked ? "bg-primary-500" : "bg-gray-300",
    disabled && "opacity-50 cursor-not-allowed",
    className,
  );
}

export interface SwitchThumbStyleProps {
  size?: SwitchSize;
  checked?: boolean;
}

export function switchThumbStyles(props: SwitchThumbStyleProps = {}): string {
  const { size = "md", checked = false } = props;

  return cn(
    "inline-block rounded-full bg-white shadow-sm",
    "transition-transform duration-200 ease-out",
    switchThumbSizes[size],
    checked && switchThumbTranslate[size],
  );
}
