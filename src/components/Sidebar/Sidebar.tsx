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

export interface SidebarProps extends HTMLAttributes<HTMLElement> {
  children: ReactNode;
}

export const Sidebar = forwardRef<HTMLElement, SidebarProps>(
  ({ className, children, ...props }, ref) => {
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
        {children}
      </nav>
    );
  },
);

Sidebar.displayName = "Sidebar";

// --- SidebarTrigger ---

export interface SidebarTriggerProps
  extends ButtonHTMLAttributes<HTMLButtonElement> {
  /** Tooltip label for collapsed mode */
  tooltip?: string;
}

export const SidebarTrigger = forwardRef<HTMLButtonElement, SidebarTriggerProps>(
  ({ className, tooltip, children, ...props }, ref) => {
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
  },
);

SidebarTrigger.displayName = "SidebarTrigger";
