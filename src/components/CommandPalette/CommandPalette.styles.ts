import { cn } from "@/utils/cn";

export interface CommandPaletteStyleProps {
  className?: string;
}

export function commandPaletteOverlayStyles(): string {
  return "fixed inset-0 z-50 bg-black/50 flex items-start justify-center pt-[20vh]";
}

export function commandPaletteStyles(
  props: CommandPaletteStyleProps = {},
): string {
  const { className } = props;
  return cn(
    "w-full max-w-lg bg-white rounded-card shadow-2xl border border-gray-200",
    "overflow-hidden animate-scale-in",
    className,
  );
}

export function commandPaletteInputStyles(): string {
  return cn(
    "w-full px-4 py-3 text-base border-b border-gray-200",
    "placeholder-gray-400 bg-transparent",
    "focus:outline-none",
  );
}

export function commandPaletteListStyles(): string {
  return "max-h-72 overflow-y-auto py-2";
}

export function commandPaletteGroupStyles(): string {
  return "px-3 py-1.5 text-xs font-semibold text-gray-500 uppercase tracking-wider";
}

export function commandPaletteItemStyles(active: boolean): string {
  return cn(
    "flex items-center gap-3 px-4 py-2.5 text-sm cursor-pointer",
    "transition-colors duration-100",
    active ? "bg-accent-50 text-accent-900" : "text-gray-700 hover:bg-gray-50",
  );
}

export function commandPaletteEmptyStyles(): string {
  return "px-4 py-8 text-center text-sm text-gray-500";
}

export function commandPaletteShortcutStyles(): string {
  return "ml-auto text-xs text-gray-400";
}
