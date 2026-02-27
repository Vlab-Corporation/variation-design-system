import { cn } from "@/utils/cn";

export type DropdownMenuAlign = "start" | "center" | "end";
export type DropdownMenuSide = "top" | "bottom";

export const dropdownMenuAligns: Record<DropdownMenuAlign, string> = {
  start: "left-0",
  center: "left-1/2 -translate-x-1/2",
  end: "right-0",
};

export const dropdownMenuSides: Record<DropdownMenuSide, string> = {
  bottom: "top-full mt-1",
  top: "bottom-full mb-1",
};

export interface DropdownMenuContentStyleProps {
  align?: DropdownMenuAlign;
  side?: DropdownMenuSide;
  /** When true, uses fixed positioning (side/align handled via inline styles) */
  portal?: boolean;
  className?: string;
}

export function dropdownMenuContentStyles(
  props: DropdownMenuContentStyleProps = {},
): string {
  const { align = "start", side = "bottom", portal = false, className } = props;

  return cn(
    portal
      ? "fixed z-dropdown min-w-[13.25rem] py-2.5"
      : "absolute z-dropdown min-w-[13.25rem] py-2.5",
    "bg-white border border-gray-200 rounded-card shadow-dropdown",
    "animate-fade-in",
    !portal && dropdownMenuSides[side],
    !portal && dropdownMenuAligns[align],
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
    "flex items-center gap-3.5 w-full px-5 py-3 text-body-2 font-medium tracking-tight text-left",
    "transition-colors duration-150",
    destructive
      ? "text-primary-600 hover:bg-primary-50 focus:bg-primary-50"
      : "text-gray-900 hover:bg-gray-100 focus:bg-gray-100",
    "focus:outline-none",
    disabled &&
      "opacity-50 cursor-not-allowed hover:bg-transparent focus:bg-transparent",
    className,
  );
}

export function dropdownMenuItemIconStyles(className?: string): string {
  return cn(
    "inline-flex shrink-0 items-center justify-center size-6",
    className,
  );
}

export function dropdownMenuSeparatorStyles(className?: string): string {
  return cn("mx-4 my-1 h-px bg-gray-500", className);
}

export function dropdownMenuLabelStyles(className?: string): string {
  return cn("px-5 py-1.5 text-xs font-semibold text-gray-500", className);
}
