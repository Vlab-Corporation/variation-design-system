import { cn } from "@/utils/cn";

// --- Types ---

export interface SidebarStyleProps {
  collapsed?: boolean;
  className?: string;
}

export interface SidebarMenuButtonStyleProps {
  /** "nav" = navigation item (default), "action" = action trigger (e.g. create) */
  variant?: "nav" | "action";
  active?: boolean;
  collapsed?: boolean;
  hasSub?: boolean;
  className?: string;
}

export interface SidebarMenuSubButtonStyleProps {
  active?: boolean;
  isHeader?: boolean;
  hasSub?: boolean;
  collapsed?: boolean;
  /** Whether this button is inside an expanded group (hasSub && expanded) */
  inExpandedGroup?: boolean;
  className?: string;
}

export interface SidebarChevronStyleProps {
  expanded?: boolean;
  className?: string;
}

// --- Style Functions ---

export function sidebarStyles({
  collapsed,
  className,
}: SidebarStyleProps = {}) {
  return cn(
    "flex h-full flex-col bg-accent-100 transition-[width] duration-normal",
    collapsed ? "w-16" : "w-[284px]",
    className,
  );
}

export function sidebarHeaderStyles({
  className,
}: { className?: string } = {}) {
  return cn("shrink-0 px-4 py-3", className);
}

export function sidebarContentStyles({
  collapsed,
  className,
}: { collapsed?: boolean; className?: string } = {}) {
  return cn(
    "flex-1 py-2",
    collapsed ? "overflow-visible" : "overflow-y-auto",
    className,
  );
}

export function sidebarFooterStyles({
  className,
}: { className?: string } = {}) {
  return cn("shrink-0 border-t border-gray-200 px-4 py-3", className);
}

export interface SidebarGroupStyleProps {
  collapsed?: boolean;
  className?: string;
}

export function sidebarGroupStyles({
  collapsed,
  className,
}: SidebarGroupStyleProps = {}) {
  return cn(collapsed ? "px-2 pb-4" : "px-4 pb-4", className);
}

export function sidebarGroupLabelStyles({
  className,
}: { className?: string } = {}) {
  return cn("mb-1 px-2 text-label font-medium text-gray-500", className);
}

export function sidebarMenuStyles({ className }: { className?: string } = {}) {
  return cn("flex flex-col gap-0.5", className);
}

export function sidebarMenuButtonStyles({
  variant = "nav",
  active,
  collapsed,
  hasSub,
  className,
}: SidebarMenuButtonStyleProps = {}) {
  return cn(
    "flex h-[46px] w-full items-center gap-[14px] rounded-button text-body-2 font-medium transition-colors duration-fast",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-400",
    variant === "action"
      ? cn("text-black", "hover:bg-accent-200")
      : cn(
          "text-black",
          "hover:bg-accent-200",
          active && "bg-accent-300 font-semibold text-accent-800",
        ),
    collapsed ? "justify-center px-0" : "pl-1 pr-3",
    hasSub && "cursor-pointer",
    className,
  );
}

export function sidebarMenuSubStyles({
  hidden,
  className,
}: { hidden?: boolean; className?: string } = {}) {
  return cn(
    hidden ? "hidden" : "flex flex-col gap-0.5",
    "pl-[38px]",
    className,
  );
}

export function sidebarMenuSubItemStyles({
  expanded,
  className,
}: { expanded?: boolean; className?: string } = {}) {
  return cn("rounded-button", expanded && "bg-accent-200", className);
}

export function sidebarMenuSubButtonStyles({
  active,
  isHeader,
  hasSub,
  collapsed,
  inExpandedGroup,
  className,
}: SidebarMenuSubButtonStyleProps = {}) {
  return cn(
    "flex w-full items-center rounded-button px-3 transition-colors duration-fast",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-400",
    isHeader
      ? cn(
          "h-[46px] gap-[14px] text-body-2 font-medium text-black",
          inExpandedGroup
            ? "text-accent-800"
            : cn(
                "hover:bg-accent-200",
                active && "bg-accent-300 text-accent-800",
              ),
        )
      : cn(
          "h-[38px] text-body-3 font-medium text-gray-700",
          "hover:bg-gray-200",
          active && "bg-accent-200 text-accent-800",
        ),
    hasSub && "cursor-pointer",
    collapsed && "justify-center px-0",
    className,
  );
}

export function sidebarMenuSubSubStyles({
  hidden,
  className,
}: { hidden?: boolean; className?: string } = {}) {
  return cn(hidden ? "hidden" : "flex flex-col gap-0.5", "pl-6", className);
}

export function sidebarChevronStyles({
  expanded,
  className,
}: SidebarChevronStyleProps = {}) {
  return cn(
    "ml-auto h-5 w-5 shrink-0 text-gray-500 transition-transform duration-fast",
    expanded && "rotate-180",
    className,
  );
}

export function sidebarTriggerStyles({
  className,
}: { className?: string } = {}) {
  return cn(
    "inline-flex h-8 w-8 items-center justify-center rounded-button transition-colors duration-fast",
    "hover:bg-accent-200",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-400",
    className,
  );
}
