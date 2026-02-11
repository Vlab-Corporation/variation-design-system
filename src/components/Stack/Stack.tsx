import { forwardRef, type HTMLAttributes } from "react";
import {
  stackStyles,
  type StackDirection,
  type StackAlign,
  type StackJustify,
  type StackGap,
} from "./Stack.styles";

export type { StackDirection, StackAlign, StackJustify, StackGap };

export interface StackProps extends HTMLAttributes<HTMLDivElement> {
  /** Flex direction */
  direction?: StackDirection;
  /** Align items */
  align?: StackAlign;
  /** Justify content */
  justify?: StackJustify;
  /** Gap between children */
  gap?: StackGap;
  /** Enable flex-wrap */
  wrap?: boolean;
  /** Use inline-flex instead of flex */
  inline?: boolean;
}

export const Stack = forwardRef<HTMLDivElement, StackProps>(
  (
    {
      direction = "column",
      align,
      justify,
      gap = "4",
      wrap = false,
      inline = false,
      className,
      children,
      ...props
    },
    ref,
  ) => {
    return (
      <div
        ref={ref}
        className={stackStyles({
          direction,
          align,
          justify,
          gap,
          wrap,
          inline,
          className,
        })}
        {...props}
      >
        {children}
      </div>
    );
  },
);

Stack.displayName = "Stack";

/** Vertical stack — shorthand for Stack direction="column" */
export const VStack = forwardRef<HTMLDivElement, Omit<StackProps, "direction">>(
  (props, ref) => {
    return <Stack ref={ref} direction="column" {...props} />;
  },
);

VStack.displayName = "VStack";

/** Horizontal stack — shorthand for Stack direction="row" */
export const HStack = forwardRef<HTMLDivElement, Omit<StackProps, "direction">>(
  (props, ref) => {
    return <Stack ref={ref} direction="row" {...props} />;
  },
);

HStack.displayName = "HStack";
