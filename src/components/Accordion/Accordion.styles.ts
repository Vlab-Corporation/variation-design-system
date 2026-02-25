import { cn } from "@/utils/cn";

export type AccordionVariant = "default" | "bordered" | "separated";

export const accordionVariants: Record<AccordionVariant, string> = {
  default: "divide-y divide-gray-200",
  bordered: "divide-y divide-gray-200 border border-gray-200 rounded-card",
  separated: "space-y-2",
};

export const accordionItemSeparatedStyles =
  "border border-gray-200 rounded-card";

export interface AccordionStyleProps {
  variant?: AccordionVariant;
  className?: string;
}

export function accordionStyles(props: AccordionStyleProps = {}): string {
  const { variant = "default", className } = props;
  return cn(accordionVariants[variant], className);
}

export function accordionTriggerStyles(disabled?: boolean): string {
  return cn(
    "flex w-full items-center justify-between py-4 px-4 text-left font-medium",
    "transition-colors duration-200",
    "hover:bg-gray-50",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-500/20",
    disabled && "opacity-50 cursor-not-allowed hover:bg-transparent",
    !disabled && "cursor-pointer",
  );
}

export function accordionContentStyles(open: boolean): string {
  return cn(
    "overflow-hidden transition-all duration-200",
    open ? "animate-slide-down" : "hidden",
  );
}

export function accordionContentInnerStyles(): string {
  return "px-4 pb-4 text-gray-600";
}
