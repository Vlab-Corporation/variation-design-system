import { cn } from "@/utils/cn";

export type TooltipPlacement = "top" | "bottom" | "left" | "right";

export const tooltipPlacements: Record<TooltipPlacement, string> = {
  top: "bottom-full left-1/2 -translate-x-1/2 mb-2",
  bottom: "top-full left-1/2 -translate-x-1/2 mt-2",
  left: "right-full top-1/2 -translate-y-1/2 mr-2",
  right: "left-full top-1/2 -translate-y-1/2 ml-2",
};

export const tooltipArrows: Record<TooltipPlacement, string> = {
  top: "top-full left-1/2 -translate-x-1/2 border-t-gray-900 border-x-transparent border-b-transparent border-4",
  bottom:
    "bottom-full left-1/2 -translate-x-1/2 border-b-gray-900 border-x-transparent border-t-transparent border-4",
  left: "left-full top-1/2 -translate-y-1/2 border-l-gray-900 border-y-transparent border-r-transparent border-4",
  right:
    "right-full top-1/2 -translate-y-1/2 border-r-gray-900 border-y-transparent border-l-transparent border-4",
};

export interface TooltipStyleProps {
  placement?: TooltipPlacement;
  className?: string;
}

export function tooltipStyles(props: TooltipStyleProps = {}): string {
  const { placement = "top", className } = props;

  return cn(
    "absolute z-50 px-2.5 py-1.5 text-xs font-medium text-white bg-gray-900 rounded-md",
    "whitespace-nowrap pointer-events-none",
    "animate-fade-in",
    tooltipPlacements[placement],
    className,
  );
}
