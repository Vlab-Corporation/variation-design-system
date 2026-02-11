import {
  forwardRef,
  useState,
  useRef,
  useCallback,
  useEffect,
  type ReactNode,
  type HTMLAttributes,
  type KeyboardEvent,
  type MouseEvent as ReactMouseEvent,
} from "react";
import {
  dropdownMenuContentStyles,
  dropdownMenuItemStyles,
  dropdownMenuSeparatorStyles,
  dropdownMenuLabelStyles,
  type DropdownMenuAlign,
} from "./DropdownMenu.styles";

export type { DropdownMenuAlign } from "./DropdownMenu.styles";

// --- DropdownMenu ---

export interface DropdownMenuProps extends HTMLAttributes<HTMLDivElement> {
  /** Trigger element */
  trigger: ReactNode;
  /** Content alignment */
  align?: DropdownMenuAlign;
  /** Controlled open state */
  open?: boolean;
  /** Called when open state changes */
  onOpenChange?: (open: boolean) => void;
}

export const DropdownMenu = forwardRef<HTMLDivElement, DropdownMenuProps>(
  (
    {
      trigger,
      align = "start",
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

    // Close on outside click
    useEffect(() => {
      if (!isOpen) return;

      const handleClickOutside = (e: MouseEvent) => {
        if (
          containerRef.current &&
          !containerRef.current.contains(e.target as Node)
        ) {
          setOpen(false);
        }
      };

      document.addEventListener("mousedown", handleClickOutside);
      return () =>
        document.removeEventListener("mousedown", handleClickOutside);
    }, [isOpen, setOpen]);

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
          onClick={() => setOpen(!isOpen)}
          onKeyDown={handleTriggerKeyDown}
          aria-haspopup="true"
          aria-expanded={isOpen}
        >
          {trigger}
        </div>
        {isOpen && (
          <div
            ref={menuRef}
            role="menu"
            className={dropdownMenuContentStyles({ align, className })}
            onKeyDown={handleMenuKeyDown}
          >
            {children}
          </div>
        )}
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
