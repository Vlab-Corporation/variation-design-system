import { cn } from "@/utils/cn";

export type DropdownMenuAlign = "start" | "center" | "end";

export const dropdownMenuAligns: Record<DropdownMenuAlign, string> = {
  start: "left-0",
  center: "left-1/2 -translate-x-1/2",
  end: "right-0",
};

export interface DropdownMenuContentStyleProps {
  align?: DropdownMenuAlign;
  className?: string;
}

export function dropdownMenuContentStyles(
  props: DropdownMenuContentStyleProps = {},
): string {
  const { align = "start", className } = props;

  return cn(
    "absolute z-dropdown mt-1 min-w-[8rem] py-1",
    "bg-white border border-gray-200 rounded-card shadow-lg",
    "animate-fade-in",
    dropdownMenuAligns[align],
    className,
  );
}

export function dropdownMenuItemStyles(
  props: {
    disabled?: boolean;
    destructive?: boolean;
    className?: string;
  } = {},
): string {
  const { disabled = false, destructive = false, className } = props;

  return cn(
    "flex items-center gap-2 w-full px-3 py-2 text-sm text-left",
    "transition-colors duration-150",
    destructive
      ? "text-error-600 hover:bg-error-50 focus:bg-error-50"
      : "text-gray-700 hover:bg-gray-100 focus:bg-gray-100",
    "focus:outline-none",
    disabled &&
      "opacity-50 cursor-not-allowed hover:bg-transparent focus:bg-transparent",
    className,
  );
}

export function dropdownMenuSeparatorStyles(className?: string): string {
  return cn("my-1 h-px bg-gray-200", className);
}

export function dropdownMenuLabelStyles(className?: string): string {
  return cn("px-3 py-1.5 text-xs font-semibold text-gray-500", className);
}
