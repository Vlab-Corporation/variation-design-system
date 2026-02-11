import {
  forwardRef,
  useEffect,
  useCallback,
  useRef,
  type HTMLAttributes,
  type MouseEvent,
  type ReactNode,
} from "react";
import { Portal } from "@/utils/Portal";
import {
  modalOverlayStyles,
  modalContentStyles,
  modalHeaderStyles,
  modalBodyStyles,
  modalFooterStyles,
  modalCloseStyles,
  type ModalSize,
} from "./Modal.styles";

export type { ModalSize } from "./Modal.styles";

export interface ModalProps extends Omit<
  HTMLAttributes<HTMLDivElement>,
  "title"
> {
  /** Whether the modal is open */
  open: boolean;
  /** Called when the modal should close */
  onClose: () => void;
  /** Modal size */
  size?: ModalSize;
  /** Close on overlay click */
  closeOnOverlayClick?: boolean;
  /** Close on Escape key */
  closeOnEscape?: boolean;
  /** Modal title (rendered in header) */
  title?: ReactNode;
  /** Footer content */
  footer?: ReactNode;
  /** Show close button */
  showCloseButton?: boolean;
  /** Overlay className */
  overlayClassName?: string;
}

export const Modal = forwardRef<HTMLDivElement, ModalProps>(
  (
    {
      open,
      onClose,
      size = "md",
      closeOnOverlayClick = true,
      closeOnEscape = true,
      title,
      footer,
      showCloseButton = true,
      className,
      overlayClassName,
      children,
      ...props
    },
    ref,
  ) => {
    const contentRef = useRef<HTMLDivElement>(null);
    const previousActiveElement = useRef<HTMLElement | null>(null);

    // Handle Escape key
    const handleKeyDown = useCallback(
      (e: KeyboardEvent) => {
        if (closeOnEscape && e.key === "Escape") {
          onClose();
        }
      },
      [closeOnEscape, onClose],
    );

    // Focus trap and scroll lock
    useEffect(() => {
      if (!open) return;

      previousActiveElement.current = document.activeElement as HTMLElement;
      document.body.style.overflow = "hidden";
      document.addEventListener("keydown", handleKeyDown);

      // Focus the modal content
      const timer = setTimeout(() => {
        contentRef.current?.focus();
      }, 0);

      return () => {
        document.body.style.overflow = "";
        document.removeEventListener("keydown", handleKeyDown);
        clearTimeout(timer);
        previousActiveElement.current?.focus();
      };
    }, [open, handleKeyDown]);

    if (!open) return null;

    const handleOverlayClick = (e: MouseEvent) => {
      if (closeOnOverlayClick && e.target === e.currentTarget) {
        onClose();
      }
    };

    return (
      <Portal>
        <div
          className={modalOverlayStyles({ className: overlayClassName })}
          onClick={handleOverlayClick}
        >
          <div
            ref={(node) => {
              (contentRef as { current: HTMLDivElement | null }).current = node;
              if (typeof ref === "function") {
                ref(node);
              } else if (ref) {
                (ref as { current: HTMLDivElement | null }).current = node;
              }
            }}
            role="dialog"
            aria-modal="true"
            aria-label={typeof title === "string" ? title : undefined}
            tabIndex={-1}
            className={modalContentStyles({ size, className })}
            onClick={(e) => e.stopPropagation()}
            {...props}
          >
            {(title || showCloseButton) && (
              <div className={modalHeaderStyles()}>
                {title && (
                  <h2 className="text-lg font-semibold text-gray-900">
                    {title}
                  </h2>
                )}
                {showCloseButton && (
                  <button
                    type="button"
                    onClick={onClose}
                    className={modalCloseStyles()}
                    aria-label="Close"
                  >
                    <svg
                      className="h-5 w-5"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      aria-hidden="true"
                    >
                      <path d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z" />
                    </svg>
                  </button>
                )}
              </div>
            )}
            <div className={modalBodyStyles()}>{children}</div>
            {footer && <div className={modalFooterStyles()}>{footer}</div>}
          </div>
        </div>
      </Portal>
    );
  },
);

Modal.displayName = "Modal";
