import {
  forwardRef,
  useState,
  useRef,
  useCallback,
  useEffect,
  type ReactNode,
  type HTMLAttributes,
} from "react";
import { popoverStyles, type PopoverPlacement } from "./Popover.styles";

export type { PopoverPlacement } from "./Popover.styles";

export interface PopoverProps extends Omit<
  HTMLAttributes<HTMLDivElement>,
  "content"
> {
  /** Popover content */
  content: ReactNode;
  /** Placement relative to trigger */
  placement?: PopoverPlacement;
  /** Controlled open state */
  open?: boolean;
  /** Called when open state changes */
  onOpenChange?: (open: boolean) => void;
  /** The trigger element */
  children: ReactNode;
}

export const Popover = forwardRef<HTMLDivElement, PopoverProps>(
  (
    {
      content,
      placement = "bottom",
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

    const setOpen = useCallback(
      (val: boolean) => {
        if (!isControlled) setInternalOpen(val);
        onOpenChange?.(val);
      },
      [isControlled, onOpenChange],
    );

    const toggle = useCallback(() => {
      setOpen(!isOpen);
    }, [isOpen, setOpen]);

    // Close on outside click
    useEffect(() => {
      if (!isOpen) return;

      const handleClick = (e: MouseEvent) => {
        if (
          containerRef.current &&
          !containerRef.current.contains(e.target as Node)
        ) {
          setOpen(false);
        }
      };

      document.addEventListener("mousedown", handleClick);
      return () => document.removeEventListener("mousedown", handleClick);
    }, [isOpen, setOpen]);

    // Close on Escape
    useEffect(() => {
      if (!isOpen) return;

      const handleKey = (e: KeyboardEvent) => {
        if (e.key === "Escape") setOpen(false);
      };

      document.addEventListener("keydown", handleKey);
      return () => document.removeEventListener("keydown", handleKey);
    }, [isOpen, setOpen]);

    return (
      <div
        ref={(node) => {
          (containerRef as { current: HTMLDivElement | null }).current = node;
          if (typeof ref === "function") ref(node);
          else if (ref)
            (ref as { current: HTMLDivElement | null }).current = node;
        }}
        className="relative inline-flex"
        {...props}
      >
        <div onClick={toggle} onKeyDown={(e) => e.key === "Enter" && toggle()}>
          {children}
        </div>
        {isOpen && (
          <div
            role="dialog"
            className={popoverStyles({ placement, className })}
          >
            {content}
          </div>
        )}
      </div>
    );
  },
);

Popover.displayName = "Popover";
