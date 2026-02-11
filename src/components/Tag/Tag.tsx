import { forwardRef, type HTMLAttributes, type ReactNode } from "react";
import {
  tagStyles,
  tagRemoveStyles,
  type TagVariant,
  type TagSize,
} from "./Tag.styles";

export type { TagVariant, TagSize } from "./Tag.styles";

export interface TagProps extends HTMLAttributes<HTMLSpanElement> {
  /** Visual variant */
  variant?: TagVariant;
  /** Size */
  size?: TagSize;
  /** Show remove button */
  removable?: boolean;
  /** Called when remove button is clicked */
  onRemove?: () => void;
  children: ReactNode;
}

export const Tag = forwardRef<HTMLSpanElement, TagProps>(
  (
    {
      variant = "default",
      size = "md",
      removable = false,
      onRemove,
      onClick,
      className,
      children,
      ...props
    },
    ref,
  ) => {
    return (
      <span
        ref={ref}
        role={onClick ? "button" : undefined}
        tabIndex={onClick ? 0 : undefined}
        onClick={onClick}
        onKeyDown={
          onClick
            ? (e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  onClick(e as never);
                }
              }
            : undefined
        }
        className={tagStyles({
          variant,
          size,
          clickable: !!onClick,
          className,
        })}
        {...props}
      >
        {children}
        {removable && (
          <button
            type="button"
            aria-label="Remove"
            onClick={(e) => {
              e.stopPropagation();
              onRemove?.();
            }}
            className={tagRemoveStyles()}
          >
            <svg
              className="w-3 h-3"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        )}
      </span>
    );
  },
);

Tag.displayName = "Tag";
