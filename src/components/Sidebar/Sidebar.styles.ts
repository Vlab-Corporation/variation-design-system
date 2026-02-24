import { cn } from "@/utils/cn";

// --- Types ---

export interface SidebarStyleProps {
  collapsed?: boolean;
  className?: string;
}

export interface SidebarMenuButtonStyleProps {
  active?: boolean;
  collapsed?: boolean;
  hasSub?: boolean;
  className?: string;
}

export interface SidebarMenuSubButtonStyleProps {
  active?: boolean;
  isHeader?: boolean;
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
    "flex h-full flex-col bg-rwPrimary-100 transition-[width] duration-normal",
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
  className,
}: { className?: string } = {}) {
  return cn("flex-1 overflow-y-auto py-2", className);
}

export function sidebarFooterStyles({
  className,
}: { className?: string } = {}) {
  return cn("shrink-0 px-4 py-3", className);
}

export function sidebarGroupStyles({ className }: { className?: string } = {}) {
  return cn("px-4 pb-4", className);
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
  active,
  collapsed,
  hasSub,
  className,
}: SidebarMenuButtonStyleProps = {}) {
  return cn(
    "flex h-[46px] w-full items-center gap-[14px] rounded-button px-3 text-body-2 font-medium text-black transition-colors duration-fast",
    "hover:bg-rwPrimary-200",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rwPrimary-400",
    active && "bg-rwPrimary-300 font-semibold text-rwPrimary-800",
    collapsed && "justify-center px-0",
    hasSub && "cursor-pointer",
    className,
  );
}

export function sidebarMenuSubStyles({
  className,
}: { className?: string } = {}) {
  return cn("flex flex-col gap-0.5 pl-[38px]", className);
}

export function sidebarMenuSubButtonStyles({
  active,
  isHeader,
  className,
}: SidebarMenuSubButtonStyleProps = {}) {
  return cn(
    "flex w-full items-center rounded-button px-3 transition-colors duration-fast",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rwPrimary-400",
    isHeader
      ? cn(
          "h-[46px] text-body-2 font-semibold text-black",
          "hover:bg-rwPrimary-200",
          active && "bg-rwPrimary-200 text-rwPrimary-800",
        )
      : cn(
          "h-[38px] text-body-3 font-medium text-gray-700",
          "hover:bg-gray-200",
          active && "bg-rwPrimary-200 text-rwPrimary-800",
        ),
    className,
  );
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
    "hover:bg-rwPrimary-200",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rwPrimary-400",
    className,
  );
}
