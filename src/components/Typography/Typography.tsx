import { forwardRef, type HTMLAttributes } from "react";
import {
  headingStyles,
  textStyles,
  type HeadingLevel,
  type TextSize,
  type TextWeight,
  type TextColor,
  type TextAlign,
} from "./Typography.styles";

export type { HeadingLevel, TextSize, TextWeight, TextColor, TextAlign };

export interface HeadingProps extends HTMLAttributes<HTMLHeadingElement> {
  /** Heading level (h1-h6) — also determines the rendered HTML tag */
  level?: HeadingLevel;
  /** Text color */
  color?: TextColor;
  /** Text alignment */
  align?: TextAlign;
  /** Truncate with ellipsis */
  truncate?: boolean;
}

export const Heading = forwardRef<HTMLHeadingElement, HeadingProps>(
  (
    {
      level = "h2",
      color = "default",
      align,
      truncate = false,
      className,
      children,
      ...props
    },
    ref,
  ) => {
    const Tag = level;

    return (
      <Tag
        ref={ref}
        className={headingStyles({ level, color, align, truncate, className })}
        {...props}
      >
        {children}
      </Tag>
    );
  },
);

Heading.displayName = "Heading";

export interface TextProps extends HTMLAttributes<HTMLElement> {
  /** Render as a different HTML element */
  as?: "p" | "span" | "div" | "label";
  /** Text size */
  size?: TextSize;
  /** Font weight */
  weight?: TextWeight;
  /** Text color */
  color?: TextColor;
  /** Text alignment */
  align?: TextAlign;
  /** Truncate with ellipsis */
  truncate?: boolean;
  /** Use monospace font */
  mono?: boolean;
}

export const Text = forwardRef<HTMLElement, TextProps>(
  (
    {
      as = "p",
      size = "base",
      weight = "normal",
      color = "default",
      align,
      truncate = false,
      mono = false,
      className,
      children,
      ...props
    },
    ref,
  ) => {
    const Component = as;
    return (
      <Component
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        ref={ref as any}
        className={textStyles({
          size,
          weight,
          color,
          align,
          truncate,
          mono,
          className,
        })}
        {...props}
      >
        {children}
      </Component>
    );
  },
);

Text.displayName = "Text";
