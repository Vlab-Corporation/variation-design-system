import {
  forwardRef,
  useState,
  useRef,
  useCallback,
  type ReactNode,
  type HTMLAttributes,
} from "react";
import {
  tooltipStyles,
  tooltipArrows,
  type TooltipPlacement,
} from "./Tooltip.styles";

export type { TooltipPlacement } from "./Tooltip.styles";

export interface TooltipProps extends Omit<
  HTMLAttributes<HTMLDivElement>,
  "content"
> {
  /** Tooltip content */
  content: ReactNode;
  /** Placement relative to trigger */
  placement?: TooltipPlacement;
  /** Delay before showing (ms) */
  delayShow?: number;
  /** Delay before hiding (ms) */
  delayHide?: number;
  /** Show arrow */
  arrow?: boolean;
  /** Controlled open state */
  open?: boolean;
  /** The trigger element */
  children: ReactNode;
}

export const Tooltip = forwardRef<HTMLDivElement, TooltipProps>(
  (
    {
      content,
      placement = "top",
      delayShow = 200,
      delayHide = 0,
      arrow = true,
      open: controlledOpen,
      className,
      children,
      ...props
    },
    ref,
  ) => {
    const [internalOpen, setInternalOpen] = useState(false);
    const isControlled = controlledOpen !== undefined;
    const isOpen = isControlled ? controlledOpen : internalOpen;

    const showTimer = useRef<ReturnType<typeof setTimeout>>();
    const hideTimer = useRef<ReturnType<typeof setTimeout>>();

    const show = useCallback(() => {
      if (isControlled) return;
      if (hideTimer.current) clearTimeout(hideTimer.current);
      showTimer.current = setTimeout(() => {
        setInternalOpen(true);
      }, delayShow);
    }, [isControlled, delayShow]);

    const hide = useCallback(() => {
      if (isControlled) return;
      if (showTimer.current) clearTimeout(showTimer.current);
      hideTimer.current = setTimeout(() => {
        setInternalOpen(false);
      }, delayHide);
    }, [isControlled, delayHide]);

    return (
      <div
        ref={ref}
        className="relative inline-flex"
        onMouseEnter={show}
        onMouseLeave={hide}
        onFocus={show}
        onBlur={hide}
        {...props}
      >
        {children}
        {isOpen && (
          <div
            role="tooltip"
            className={tooltipStyles({ placement, className })}
          >
            {content}
            {arrow && (
              <span
                className={`absolute ${tooltipArrows[placement]}`}
                aria-hidden="true"
              />
            )}
          </div>
        )}
      </div>
    );
  },
);

Tooltip.displayName = "Tooltip";
