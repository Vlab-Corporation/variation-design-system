import {
  forwardRef,
  useState,
  createContext,
  useContext,
  useCallback,
  useId,
  type ReactNode,
  type HTMLAttributes,
  type ButtonHTMLAttributes,
} from "react";
import { sidebarStyles, sidebarTriggerStyles } from "./Sidebar.styles";
import { Tooltip } from "@/components/Tooltip/Tooltip";

// --- Sidebar Context ---

interface SidebarContextValue {
  collapsed: boolean;
  setCollapsed: (value: boolean) => void;
  toggleCollapsed: () => void;
  sidebarId: string;
}

const SidebarContext = createContext<SidebarContextValue | null>(null);

export function useSidebarContext() {
  const ctx = useContext(SidebarContext);
  if (!ctx)
    throw new Error("Sidebar components must be used within <SidebarProvider>");
  return ctx;
}

// --- SidebarProvider ---

export interface SidebarProviderProps {
  /** Controlled collapsed state */
  collapsed?: boolean;
  /** Callback when collapsed state changes */
  onCollapsedChange?: (collapsed: boolean) => void;
  /** Default collapsed state (uncontrolled) */
  defaultCollapsed?: boolean;
  children: ReactNode;
}

export const SidebarProvider = ({
  collapsed: controlledCollapsed,
  onCollapsedChange,
  defaultCollapsed = false,
  children,
}: SidebarProviderProps) => {
  const [internalCollapsed, setInternalCollapsed] = useState(defaultCollapsed);
  const isControlled = controlledCollapsed !== undefined;
  const collapsed = isControlled ? controlledCollapsed : internalCollapsed;
  const sidebarId = useId();

  const setCollapsed = useCallback(
    (value: boolean) => {
      if (!isControlled) setInternalCollapsed(value);
      onCollapsedChange?.(value);
    },
    [isControlled, onCollapsedChange],
  );

  const toggleCollapsed = useCallback(() => {
    setCollapsed(!collapsed);
  }, [collapsed, setCollapsed]);

  return (
    <SidebarContext.Provider
      value={{ collapsed, setCollapsed, toggleCollapsed, sidebarId }}
    >
      {children}
    </SidebarContext.Provider>
  );
};

SidebarProvider.displayName = "SidebarProvider";

// --- Sidebar ---

import {
  SidebarHeader,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
} from "./SidebarLayout";
import {
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarMenuSub,
  SidebarMenuSubItem,
  SidebarMenuSubButton,
} from "./SidebarMenu";

export interface SidebarItemConfig {
  id?: string;
  label: ReactNode;
  icon?: ReactNode;
  showWhenCollapsed?: boolean;
  onClick?: () => void;
  variant?: "nav" | "action";
  subItems?: {
    id?: string;
    label: ReactNode;
    icon?: ReactNode;
    showWhenCollapsed?: boolean;
    onClick?: () => void;
  }[];
}

export interface SidebarProps extends HTMLAttributes<HTMLElement> {
  children?: ReactNode;
  /** Config-based header */
  header?: {
    title?: string;
    logo?: ReactNode;
    showTrigger?: boolean;
  };
  /** Config-based navigation items */
  items?: SidebarItemConfig[];
  /** Config-based footer */
  footer?: ReactNode;
  /** ID of the currently active item or subItem */
  activeItemId?: string;
}

export const Sidebar = forwardRef<HTMLElement, SidebarProps>(
  (
    { className, children, header, items, footer, activeItemId, ...props },
    ref,
  ) => {
    const { collapsed, sidebarId } = useSidebarContext();

    return (
      <nav
        ref={ref}
        id={sidebarId}
        role="navigation"
        aria-label="Sidebar navigation"
        className={sidebarStyles({ collapsed, className })}
        {...props}
      >
        {header && (
          <SidebarHeader
            logo={header.logo}
            title={header.title}
            showTrigger={header.showTrigger}
          />
        )}

        {items && items.length > 0 && (
          <SidebarContent>
            <SidebarGroup>
              <SidebarMenu>
                {items.map((item, idx) => {
                  const hasSub = !!(item.subItems && item.subItems.length > 0);
                  const isItemActive = activeItemId === item.id;
                  // tooltip assumes label is string, if it's a node we can't easily tooltip it, 
                  // but usually the label is string or very simple. We cast to string for tooltip if possible.
                  const strLabel = typeof item.label === "string" ? item.label : undefined;

                  return (
                    <SidebarMenuItem key={item.id ?? idx}>
                      <SidebarMenuButton
                        variant={item.variant}
                        icon={item.icon}
                        active={isItemActive && !hasSub}
                        hasSub={hasSub}
                        showWhenCollapsed={item.showWhenCollapsed}
                        onClick={item.onClick}
                        tooltip={strLabel}
                      >
                        {item.label}
                      </SidebarMenuButton>

                      {hasSub && (
                        <SidebarMenuSub>
                          {item.subItems!.map((sub, sidx) => {
                            const isSubActive = activeItemId === sub.id;
                            const strSubLabel = typeof sub.label === "string" ? sub.label : undefined;

                            return (
                              <SidebarMenuSubItem key={sub.id ?? `${idx}-${sidx}`}>
                                <SidebarMenuSubButton
                                  isHeader={false}
                                  active={isSubActive}
                                  hasSub={false}
                                  showWhenCollapsed={sub.showWhenCollapsed}
                                  onClick={sub.onClick}
                                  tooltip={strSubLabel}
                                >
                                  {sub.label}
                                </SidebarMenuSubButton>
                              </SidebarMenuSubItem>
                            );
                          })}
                        </SidebarMenuSub>
                      )}
                    </SidebarMenuItem>
                  );
                })}
              </SidebarMenu>
            </SidebarGroup>
          </SidebarContent>
        )}

        {children}

        {footer && <SidebarFooter className="[&>div]:block [&>div]:w-full px-4 pt-4 pb-6">{footer}</SidebarFooter>}
      </nav>
    );
  },
);

Sidebar.displayName = "Sidebar";

// --- SidebarTrigger ---

export interface SidebarTriggerProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /** Tooltip label for collapsed mode */
  tooltip?: string;
}

export const SidebarTrigger = forwardRef<
  HTMLButtonElement,
  SidebarTriggerProps
>(({ className, tooltip, children, ...props }, ref) => {
  const { collapsed, toggleCollapsed } = useSidebarContext();

  const button = (
    <button
      ref={ref}
      type="button"
      aria-expanded={!collapsed}
      onClick={toggleCollapsed}
      className={sidebarTriggerStyles({ className })}
      {...props}
    >
      {children ?? (
        <svg
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
          aria-hidden="true"
        >
          <path
            d="M3 5h14M3 10h14M3 15h14"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
        </svg>
      )}
    </button>
  );

  if (collapsed && tooltip) {
    return (
      <Tooltip content={tooltip} placement="right">
        {button}
      </Tooltip>
    );
  }

  return button;
});

SidebarTrigger.displayName = "SidebarTrigger";
