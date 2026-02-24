import { forwardRef, type HTMLAttributes, type ReactNode } from "react";
import {
  sidebarHeaderStyles,
  sidebarContentStyles,
  sidebarFooterStyles,
  sidebarGroupStyles,
  sidebarGroupLabelStyles,
} from "./Sidebar.styles";
import { useSidebarContext } from "./Sidebar";

// --- SidebarHeader ---

export interface SidebarHeaderProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
}

export const SidebarHeader = forwardRef<HTMLDivElement, SidebarHeaderProps>(
  ({ className, children, ...props }, ref) => (
    <div ref={ref} className={sidebarHeaderStyles({ className })} {...props}>
      {children}
    </div>
  ),
);

SidebarHeader.displayName = "SidebarHeader";

// --- SidebarContent ---

export interface SidebarContentProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
}

export const SidebarContent = forwardRef<HTMLDivElement, SidebarContentProps>(
  ({ className, children, ...props }, ref) => (
    <div ref={ref} className={sidebarContentStyles({ className })} {...props}>
      {children}
    </div>
  ),
);

SidebarContent.displayName = "SidebarContent";

// --- SidebarFooter ---

export interface SidebarFooterProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
}

export const SidebarFooter = forwardRef<HTMLDivElement, SidebarFooterProps>(
  ({ className, children, ...props }, ref) => (
    <div ref={ref} className={sidebarFooterStyles({ className })} {...props}>
      {children}
    </div>
  ),
);

SidebarFooter.displayName = "SidebarFooter";

// --- SidebarGroup ---

export interface SidebarGroupProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
}

export const SidebarGroup = forwardRef<HTMLDivElement, SidebarGroupProps>(
  ({ className, children, ...props }, ref) => (
    <div
      ref={ref}
      role="group"
      className={sidebarGroupStyles({ className })}
      {...props}
    >
      {children}
    </div>
  ),
);

SidebarGroup.displayName = "SidebarGroup";

// --- SidebarGroupLabel ---

export interface SidebarGroupLabelProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
}

export const SidebarGroupLabel = forwardRef<
  HTMLDivElement,
  SidebarGroupLabelProps
>(({ className, children, ...props }, ref) => {
  const { collapsed } = useSidebarContext();

  if (collapsed) return null;

  return (
    <div
      ref={ref}
      className={sidebarGroupLabelStyles({ className })}
      {...props}
    >
      {children}
    </div>
  );
});

SidebarGroupLabel.displayName = "SidebarGroupLabel";
