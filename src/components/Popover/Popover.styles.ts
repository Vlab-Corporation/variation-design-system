import { cn } from "@/utils/cn";

export type PopoverPlacement = "top" | "bottom" | "left" | "right";

export const popoverPlacements: Record<PopoverPlacement, string> = {
  top: "bottom-full left-1/2 -translate-x-1/2 mb-2",
  bottom: "top-full left-1/2 -translate-x-1/2 mt-2",
  left: "right-full top-1/2 -translate-y-1/2 mr-2",
  right: "left-full top-1/2 -translate-y-1/2 ml-2",
};

export interface PopoverStyleProps {
  placement?: PopoverPlacement;
  className?: string;
}

export function popoverStyles(props: PopoverStyleProps = {}): string {
  const { placement = "bottom", className } = props;

  return cn(
    "absolute z-50",
    "bg-white rounded-card shadow-lg border border-gray-200",
    "p-4",
    "animate-fade-in",
    popoverPlacements[placement],
    className,
  );
}
