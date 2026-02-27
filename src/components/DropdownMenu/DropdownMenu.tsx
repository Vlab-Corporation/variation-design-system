import {
  forwardRef,
  useState,
  useRef,
  useCallback,
  useEffect,
  useLayoutEffect,
  type ReactNode,
  type HTMLAttributes,
  type KeyboardEvent,
  type MouseEvent as ReactMouseEvent,
  type CSSProperties,
} from "react";
import { createPortal } from "react-dom";
import {
  dropdownMenuContentStyles,
  dropdownMenuItemStyles,
  dropdownMenuItemIconStyles,
  dropdownMenuSeparatorStyles,
  dropdownMenuLabelStyles,
  type DropdownMenuAlign,
  type DropdownMenuSide,
} from "./DropdownMenu.styles";

export type {
  DropdownMenuAlign,
  DropdownMenuSide,
} from "./DropdownMenu.styles";

// --- DropdownMenu ---

export interface DropdownMenuProps extends HTMLAttributes<HTMLDivElement> {
  /** Trigger element */
  trigger: ReactNode;
  /** Content alignment */
  align?: DropdownMenuAlign;
  /** Vertical placement relative to trigger */
  side?: DropdownMenuSide;
  /** Controlled open state */
  open?: boolean;
  /** Called when open state changes */
  onOpenChange?: (open: boolean) => void;
  /** Render dropdown content in a portal (document.body) to avoid overflow clipping */
  portal?: boolean;
}

export const DropdownMenu = forwardRef<HTMLDivElement, DropdownMenuProps>(
  (
    {
      trigger,
      align = "start",
      side = "bottom",
      portal = false,
      open: controlledOpen,
      onOpenChange,
      className,
      children,
      ...props
    },
    ref,
  ) => {
    const [internalOpen, setInternalOpen] = useState(false);
    const isControlled = controlledOpen !== undefined;
    const isOpen = isControlled ? controlledOpen : internalOpen;

    const containerRef = useRef<HTMLDivElement>(null);
    const triggerRef = useRef<HTMLDivElement>(null);
    const menuRef = useRef<HTMLDivElement>(null);

    const setOpen = useCallback(
      (value: boolean) => {
        if (!isControlled) {
          setInternalOpen(value);
        }
        onOpenChange?.(value);
      },
      [isControlled, onOpenChange],
    );

    // --- Portal positioning ---
    const PORTAL_GAP = 4; // matches mt-1/mb-1 (0.25rem)

    const [portalStyle, setPortalStyle] = useState<CSSProperties>({});

    const updatePortalPosition = useCallback(() => {
      if (!triggerRef.current || !menuRef.current) return;

      const triggerRect = triggerRef.current.getBoundingClientRect();
      const menuRect = menuRef.current.getBoundingClientRect();

      let top: number;
      if (side === "bottom") {
        top = triggerRect.bottom + PORTAL_GAP;
      } else {
        top = triggerRect.top - menuRect.height - PORTAL_GAP;
      }

      let left: number;
      if (align === "end") {
        left = triggerRect.right - menuRect.width;
      } else if (align === "center") {
        left = triggerRect.left + triggerRect.width / 2 - menuRect.width / 2;
      } else {
        left = triggerRect.left;
      }

      setPortalStyle({ top, left });
    }, [side, align]);

    // Position before paint to avoid flash
    useLayoutEffect(() => {
      if (portal && isOpen) {
        updatePortalPosition();
      }
    }, [portal, isOpen, updatePortalPosition]);

    // Reposition on scroll/resize
    useEffect(() => {
      if (!portal || !isOpen) return;

      window.addEventListener("scroll", updatePortalPosition, true);
      window.addEventListener("resize", updatePortalPosition);

      return () => {
        window.removeEventListener("scroll", updatePortalPosition, true);
        window.removeEventListener("resize", updatePortalPosition);
      };
    }, [portal, isOpen, updatePortalPosition]);

    // Close on outside click
    useEffect(() => {
      if (!isOpen) return;

      const handleClickOutside = (e: MouseEvent) => {
        const target = e.target as Node;

        if (portal) {
          // In portal mode, check both trigger container and portaled menu
          const isInsideContainer = containerRef.current?.contains(target);
          const isInsideMenu = menuRef.current?.contains(target);
          if (!isInsideContainer && !isInsideMenu) {
            setOpen(false);
          }
        } else {
          if (containerRef.current && !containerRef.current.contains(target)) {
            setOpen(false);
          }
        }
      };

      document.addEventListener("mousedown", handleClickOutside);
      return () =>
        document.removeEventListener("mousedown", handleClickOutside);
    }, [isOpen, setOpen, portal]);

    // Close on Escape
    useEffect(() => {
      if (!isOpen) return;

      const handleKeyDown = (e: globalThis.KeyboardEvent) => {
        if (e.key === "Escape") {
          setOpen(false);
        }
      };

      document.addEventListener("keydown", handleKeyDown);
      return () => document.removeEventListener("keydown", handleKeyDown);
    }, [isOpen, setOpen]);

    const handleTriggerKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Enter" || e.key === " " || e.key === "ArrowDown") {
        e.preventDefault();
        setOpen(!isOpen);
      }
    };

    // Keyboard navigation within menu
    const handleMenuKeyDown = (e: KeyboardEvent) => {
      const menu = menuRef.current;
      if (!menu) return;

      const items = Array.from(
        menu.querySelectorAll<HTMLElement>(
          '[role="menuitem"]:not([aria-disabled="true"])',
        ),
      );
      const currentIndex = items.indexOf(e.target as HTMLElement);

      if (e.key === "ArrowDown") {
        e.preventDefault();
        const next = currentIndex < items.length - 1 ? currentIndex + 1 : 0;
        items[next]?.focus();
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        const prev = currentIndex > 0 ? currentIndex - 1 : items.length - 1;
        items[prev]?.focus();
      } else if (e.key === "Home") {
        e.preventDefault();
        items[0]?.focus();
      } else if (e.key === "End") {
        e.preventDefault();
        items[items.length - 1]?.focus();
      }
    };

    const menuContent = (
      <div
        ref={menuRef}
        role="menu"
        className={dropdownMenuContentStyles({
          align,
          side,
          portal,
          className,
        })}
        style={portal ? portalStyle : undefined}
        onKeyDown={handleMenuKeyDown}
      >
        {children}
      </div>
    );

    return (
      <div
        ref={(node) => {
          (containerRef as { current: HTMLDivElement | null }).current = node;
          if (typeof ref === "function") {
            ref(node);
          } else if (ref) {
            (ref as { current: HTMLDivElement | null }).current = node;
          }
        }}
        className="relative inline-block"
        {...props}
      >
        <div
          ref={triggerRef}
          onClick={() => setOpen(!isOpen)}
          onKeyDown={handleTriggerKeyDown}
          aria-haspopup="true"
          aria-expanded={isOpen}
        >
          {trigger}
        </div>
        {isOpen &&
          (portal ? createPortal(menuContent, document.body) : menuContent)}
      </div>
    );
  },
);

DropdownMenu.displayName = "DropdownMenu";

// --- DropdownMenuItem ---

export interface DropdownMenuItemProps extends Omit<
  HTMLAttributes<HTMLButtonElement>,
  "onSelect"
> {
  /** Disabled state */
  disabled?: boolean;
  /** Destructive (danger) styling */
  destructive?: boolean;
  /** Leading icon element */
  icon?: ReactNode;
  /** Called when item is selected */
  onSelect?: () => void;
}

export const DropdownMenuItem = forwardRef<
  HTMLButtonElement,
  DropdownMenuItemProps
>(
  (
    {
      disabled = false,
      destructive = false,
      icon,
      onSelect,
      className,
      children,
      onClick,
      ...props
    },
    ref,
  ) => {
    const handleClick = (e: ReactMouseEvent<HTMLButtonElement>) => {
      if (disabled) {
        e.preventDefault();
        return;
      }
      onClick?.(e);
      onSelect?.();
    };

    return (
      <button
        ref={ref}
        type="button"
        role="menuitem"
        disabled={disabled}
        aria-disabled={disabled}
        tabIndex={disabled ? -1 : 0}
        className={dropdownMenuItemStyles({
          disabled,
          destructive,
          className,
        })}
        onClick={handleClick}
        {...props}
      >
        {icon && <span className={dropdownMenuItemIconStyles()}>{icon}</span>}
        {children}
      </button>
    );
  },
);

DropdownMenuItem.displayName = "DropdownMenuItem";

// --- DropdownMenuSeparator ---

export function DropdownMenuSeparator({ className }: { className?: string }) {
  return (
    <div role="separator" className={dropdownMenuSeparatorStyles(className)} />
  );
}

DropdownMenuSeparator.displayName = "DropdownMenuSeparator";

// --- DropdownMenuLabel ---

export function DropdownMenuLabel({
  className,
  children,
}: {
  className?: string;
  children: ReactNode;
}) {
  return <div className={dropdownMenuLabelStyles(className)}>{children}</div>;
}

DropdownMenuLabel.displayName = "DropdownMenuLabel";
