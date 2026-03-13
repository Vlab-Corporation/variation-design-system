import { forwardRef, type HTMLAttributes, type ReactNode } from "react";
import {
  sidebarHeaderStyles,
  sidebarContentStyles,
  sidebarFooterStyles,
  sidebarGroupStyles,
  sidebarGroupLabelStyles,
} from "./Sidebar.styles";
import { useSidebarContext } from "./Sidebar";

import { SidebarTrigger } from "./Sidebar";

// --- SidebarHeader ---

export interface SidebarHeaderProps extends HTMLAttributes<HTMLDivElement> {
  children?: ReactNode;
  /** Logo element */
  logo?: ReactNode;
  /** Sidebar title string */
  title?: string;
  /** Whether to show the sidebar toggle trigger automatically */
  showTrigger?: boolean;
}

export const SidebarHeader = forwardRef<HTMLDivElement, SidebarHeaderProps>(
  ({ logo, title, showTrigger, className, children, ...props }, ref) => {
    const { collapsed } = useSidebarContext();

    return (
      <div ref={ref} className={sidebarHeaderStyles({ className })} {...props}>
        <div className="flex h-[32px] items-center">
          {showTrigger && (
            <div className="flex shrink-0 items-center justify-center w-8 h-8">
              <SidebarTrigger tooltip="메뉴 여닫기" />
            </div>
          )}
          {!collapsed && (logo || title) && (
            <div className={`flex items-center gap-2 overflow-hidden ${showTrigger ? "ml-3" : ""}`}>
              {logo && <span className="shrink-0">{logo}</span>}
              {title && (
                <span className="truncate text-subtitle font-bold text-gray-900">
                  {title}
                </span>
              )}
            </div>
          )}
        </div>
        {children}
      </div>
    );
  },
);

SidebarHeader.displayName = "SidebarHeader";

// --- SidebarContent ---

export interface SidebarContentProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
}

export const SidebarContent = forwardRef<HTMLDivElement, SidebarContentProps>(
  ({ className, children, ...props }, ref) => {
    const { collapsed } = useSidebarContext();
    return (
      <div
        ref={ref}
        className={sidebarContentStyles({ collapsed, className })}
        {...props}
      >
        {children}
      </div>
    );
  },
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
  ({ className, children, ...props }, ref) => {
    const { collapsed } = useSidebarContext();
    return (
      <div
        ref={ref}
        role="group"
        className={sidebarGroupStyles({ collapsed, className })}
        {...props}
      >
        {children}
      </div>
    );
  },
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
