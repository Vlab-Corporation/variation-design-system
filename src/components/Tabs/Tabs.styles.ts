import { cn } from "@/utils/cn";

export type TabsVariant = "underline" | "pill";
export type TabsSize = "sm" | "md" | "lg";

export const tabsListVariants: Record<TabsVariant, string> = {
  underline: "border-b border-gray-200",
  pill: "bg-gray-100 p-1 rounded-card",
};

export const tabVariants: Record<TabsVariant, string> = {
  underline:
    "border-b-2 border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 data-[active=true]:border-accent-500 data-[active=true]:text-accent-600",
  pill: "rounded-button text-gray-500 hover:text-gray-700 data-[active=true]:bg-white data-[active=true]:text-gray-900 data-[active=true]:shadow-sm",
};

export const tabSizes: Record<TabsSize, string> = {
  sm: "px-3 py-1.5 text-sm",
  md: "px-4 py-2 text-base",
  lg: "px-5 py-2.5 text-lg",
};

export interface TabsListStyleProps {
  variant?: TabsVariant;
  className?: string;
}

export function tabsListStyles(props: TabsListStyleProps = {}): string {
  const { variant = "underline", className } = props;

  return cn("flex gap-0", tabsListVariants[variant], className);
}

export interface TabStyleProps {
  variant?: TabsVariant;
  size?: TabsSize;
  disabled?: boolean;
  className?: string;
}

export function tabStyles(props: TabStyleProps = {}): string {
  const {
    variant = "underline",
    size = "md",
    disabled = false,
    className,
  } = props;

  return cn(
    "inline-flex items-center justify-center font-medium cursor-pointer",
    "transition-all duration-200 ease-out",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-500/20",
    tabVariants[variant],
    tabSizes[size],
    disabled && "opacity-50 cursor-not-allowed",
    className,
  );
}

export function tabPanelStyles(className?: string): string {
  return cn("py-4", className);
}
