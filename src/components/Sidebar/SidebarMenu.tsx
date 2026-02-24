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
  type KeyboardEvent,
  type MouseEvent as ReactMouseEvent,
} from "react";
import {
  sidebarMenuStyles,
  sidebarMenuButtonStyles,
  sidebarMenuSubStyles,
  sidebarMenuSubButtonStyles,
  sidebarChevronStyles,
} from "./Sidebar.styles";
import { useSidebarContext } from "./Sidebar";
import { Tooltip } from "@/components/Tooltip/Tooltip";

// --- SubMenu Context (internal) ---

interface SubMenuContextValue {
  expanded: boolean;
  setExpanded: (value: boolean) => void;
  toggleExpanded: () => void;
  subMenuId: string;
}

const SubMenuContext = createContext<SubMenuContextValue | null>(null);

function useSubMenuContext() {
  const ctx = useContext(SubMenuContext);
  return ctx;
}

// --- ChevronDown Icon ---

function ChevronDownIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M5 7.5l5 5 5-5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

// --- SidebarMenu ---

export interface SidebarMenuProps extends HTMLAttributes<HTMLUListElement> {
  children: ReactNode;
}

export const SidebarMenu = forwardRef<HTMLUListElement, SidebarMenuProps>(
  ({ className, children, onKeyDown, ...props }, ref) => {
    const handleKeyDown = useCallback(
      (e: KeyboardEvent<HTMLUListElement>) => {
        onKeyDown?.(e);

        const list = e.currentTarget;
        const focusable = Array.from(
          list.querySelectorAll<HTMLElement>(
            'button:not([disabled]), [tabindex]:not([tabindex="-1"])',
          ),
        );
        const current = document.activeElement as HTMLElement;
        const index = focusable.indexOf(current);

        switch (e.key) {
          case "ArrowDown": {
            e.preventDefault();
            const next = index < focusable.length - 1 ? index + 1 : 0;
            focusable[next]?.focus();
            break;
          }
          case "ArrowUp": {
            e.preventDefault();
            const prev = index > 0 ? index - 1 : focusable.length - 1;
            focusable[prev]?.focus();
            break;
          }
          case "Home": {
            e.preventDefault();
            focusable[0]?.focus();
            break;
          }
          case "End": {
            e.preventDefault();
            focusable[focusable.length - 1]?.focus();
            break;
          }
        }
      },
      [onKeyDown],
    );

    return (
      <ul
        ref={ref}
        role="list"
        className={sidebarMenuStyles({ className })}
        onKeyDown={handleKeyDown}
        {...props}
      >
        {children}
      </ul>
    );
  },
);

SidebarMenu.displayName = "SidebarMenu";

// --- SidebarMenuItem ---

export interface SidebarMenuItemProps extends HTMLAttributes<HTMLLIElement> {
  /** Default expanded state (uncontrolled) */
  defaultExpanded?: boolean;
  /** Controlled expanded state */
  expanded?: boolean;
  /** Callback when expanded state changes */
  onExpandedChange?: (expanded: boolean) => void;
  children: ReactNode;
}

export const SidebarMenuItem = forwardRef<HTMLLIElement, SidebarMenuItemProps>(
  (
    {
      defaultExpanded = false,
      expanded: controlledExpanded,
      onExpandedChange,
      className,
      children,
      ...props
    },
    ref,
  ) => {
    const [internalExpanded, setInternalExpanded] = useState(defaultExpanded);
    const isControlled = controlledExpanded !== undefined;
    const expanded = isControlled ? controlledExpanded : internalExpanded;
    const subMenuId = useId();

    const setExpanded = useCallback(
      (value: boolean) => {
        if (!isControlled) setInternalExpanded(value);
        onExpandedChange?.(value);
      },
      [isControlled, onExpandedChange],
    );

    const toggleExpanded = useCallback(() => {
      setExpanded(!expanded);
    }, [expanded, setExpanded]);

    return (
      <SubMenuContext.Provider
        value={{ expanded, setExpanded, toggleExpanded, subMenuId }}
      >
        <li ref={ref} className={className} {...props}>
          {children}
        </li>
      </SubMenuContext.Provider>
    );
  },
);

SidebarMenuItem.displayName = "SidebarMenuItem";

// --- SidebarMenuButton ---

export interface SidebarMenuButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /** Icon element (24x24 recommended) */
  icon?: ReactNode;
  /** Active state */
  active?: boolean;
  /** Whether this button has a sub-menu */
  hasSub?: boolean;
  /** Tooltip label for collapsed mode */
  tooltip?: string;
  children?: ReactNode;
}

export const SidebarMenuButton = forwardRef<
  HTMLButtonElement,
  SidebarMenuButtonProps
>(
  (
    { icon, active, hasSub, tooltip, className, children, onClick, ...props },
    ref,
  ) => {
    const { collapsed } = useSidebarContext();
    const subCtx = useSubMenuContext();

    const handleClick = useCallback(
      (e: ReactMouseEvent<HTMLButtonElement>) => {
        if (hasSub && subCtx) {
          subCtx.toggleExpanded();
        }
        onClick?.(e);
      },
      [hasSub, subCtx, onClick],
    );

    const button = (
      <button
        ref={ref}
        type="button"
        className={sidebarMenuButtonStyles({
          active,
          collapsed,
          hasSub,
          className,
        })}
        onClick={handleClick}
        aria-expanded={hasSub && subCtx ? subCtx.expanded : undefined}
        aria-controls={hasSub && subCtx ? subCtx.subMenuId : undefined}
        aria-current={active ? "page" : undefined}
        {...props}
      >
        {icon && (
          <span className="inline-flex h-6 w-6 shrink-0 items-center justify-center">
            {icon}
          </span>
        )}
        {!collapsed && children && (
          <span className="flex-1 truncate text-left">{children}</span>
        )}
        {!collapsed && hasSub && (
          <ChevronDownIcon
            className={sidebarChevronStyles({
              expanded: subCtx?.expanded,
            })}
          />
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

SidebarMenuButton.displayName = "SidebarMenuButton";

// --- SidebarMenuSub ---

export interface SidebarMenuSubProps extends HTMLAttributes<HTMLUListElement> {
  children: ReactNode;
}

export const SidebarMenuSub = forwardRef<HTMLUListElement, SidebarMenuSubProps>(
  ({ className, children, ...props }, ref) => {
    const subCtx = useSubMenuContext();

    return (
      <ul
        ref={ref}
        id={subCtx?.subMenuId}
        role="list"
        hidden={subCtx ? !subCtx.expanded : false}
        className={sidebarMenuSubStyles({ className })}
        {...props}
      >
        {children}
      </ul>
    );
  },
);

SidebarMenuSub.displayName = "SidebarMenuSub";

// --- SidebarMenuSubItem ---

export interface SidebarMenuSubItemProps extends HTMLAttributes<HTMLLIElement> {
  children: ReactNode;
}

export const SidebarMenuSubItem = forwardRef<
  HTMLLIElement,
  SidebarMenuSubItemProps
>(({ className, children, ...props }, ref) => (
  <li ref={ref} className={className} {...props}>
    {children}
  </li>
));

SidebarMenuSubItem.displayName = "SidebarMenuSubItem";

// --- SidebarMenuSubButton ---

export interface SidebarMenuSubButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /** Active state */
  active?: boolean;
  /** Header style (B2 SemiBold) vs list style (B3 Medium) */
  isHeader?: boolean;
  children: ReactNode;
}

export const SidebarMenuSubButton = forwardRef<
  HTMLButtonElement,
  SidebarMenuSubButtonProps
>(({ active, isHeader, className, children, ...props }, ref) => (
  <button
    ref={ref}
    type="button"
    className={sidebarMenuSubButtonStyles({ active, isHeader, className })}
    aria-current={active ? "page" : undefined}
    {...props}
  >
    {children}
  </button>
));

SidebarMenuSubButton.displayName = "SidebarMenuSubButton";
