import { forwardRef, type HTMLAttributes } from "react";
import { separatorStyles, type SeparatorOrientation } from "./Separator.styles";

export type { SeparatorOrientation } from "./Separator.styles";

export interface SeparatorProps extends HTMLAttributes<HTMLDivElement> {
  /** Orientation */
  orientation?: SeparatorOrientation;
}

export const Separator = forwardRef<HTMLDivElement, SeparatorProps>(
  ({ orientation = "horizontal", className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        role="separator"
        aria-orientation={orientation}
        className={separatorStyles({ orientation, className })}
        {...props}
      />
    );
  },
);

Separator.displayName = "Separator";
