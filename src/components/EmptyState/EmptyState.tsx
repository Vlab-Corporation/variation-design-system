import { forwardRef, type HTMLAttributes, type ReactNode } from "react";
import {
  emptyStateStyles,
  emptyStateIconStyles,
  emptyStateTitleStyles,
  emptyStateDescriptionStyles,
  type EmptyStateSize,
} from "./EmptyState.styles";

export type { EmptyStateSize } from "./EmptyState.styles";

export interface EmptyStateProps extends HTMLAttributes<HTMLDivElement> {
  /** Icon or illustration */
  icon?: ReactNode;
  /** Title text */
  title: string;
  /** Description text */
  description?: string;
  /** Action element (e.g., Button) */
  action?: ReactNode;
  /** Size variant */
  size?: EmptyStateSize;
}

export const EmptyState = forwardRef<HTMLDivElement, EmptyStateProps>(
  (
    { icon, title, description, action, size = "md", className, ...props },
    ref,
  ) => {
    return (
      <div
        ref={ref}
        className={emptyStateStyles({ size, className })}
        {...props}
      >
        {icon && <div className={emptyStateIconStyles()}>{icon}</div>}
        <h3 className={emptyStateTitleStyles()}>{title}</h3>
        {description && (
          <p className={emptyStateDescriptionStyles()}>{description}</p>
        )}
        {action && <div>{action}</div>}
      </div>
    );
  },
);

EmptyState.displayName = "EmptyState";
