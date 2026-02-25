import { cn } from "@/utils/cn";

export interface CalendarStyleProps {
  className?: string;
}

export function calendarStyles(props: CalendarStyleProps = {}): string {
  const { className } = props;
  return cn("w-72 p-3", className);
}

export function calendarHeaderStyles(): string {
  return "flex items-center justify-between mb-2";
}

export function calendarNavButtonStyles(): string {
  return cn(
    "inline-flex items-center justify-center w-8 h-8 rounded-button",
    "text-gray-600 hover:bg-gray-100 cursor-pointer",
    "transition-colors duration-150",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-500/20",
  );
}

export function calendarTitleStyles(): string {
  return "text-sm font-semibold text-gray-900";
}

export function calendarGridStyles(): string {
  return "grid grid-cols-7 gap-0";
}

export function calendarWeekdayStyles(): string {
  return "text-center text-xs font-medium text-gray-500 py-2";
}

export function calendarDayStyles(options: {
  selected?: boolean;
  today?: boolean;
  outsideMonth?: boolean;
  disabled?: boolean;
}): string {
  const { selected, today, outsideMonth, disabled } = options;
  return cn(
    "inline-flex items-center justify-center w-9 h-9 rounded-full text-sm",
    "transition-colors duration-150",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-500/20",
    !selected && !disabled && "hover:bg-gray-100 cursor-pointer",
    selected && "bg-accent-500 text-white hover:bg-accent-600",
    !selected && today && "font-bold text-accent-600",
    !selected && !today && !outsideMonth && "text-gray-900",
    outsideMonth && !selected && "text-gray-300",
    disabled && "text-gray-300 cursor-not-allowed hover:bg-transparent",
  );
}
