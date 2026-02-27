import React, {
  forwardRef,
  type HTMLAttributes,
  type ElementType,
} from "react";
import { cn } from "@/utils/cn";
import {
  cardStyles,
  cardTitleStyles,
  cardDescriptionStyles,
  type CardVariant,
  type CardPadding,
} from "./Card.styles";

export type { CardVariant, CardPadding } from "./Card.styles";

export interface CardProps extends HTMLAttributes<HTMLElement> {
  /** Visual style variant */
  variant?: CardVariant;
  /** Padding size */
  padding?: CardPadding;
  /** Whether the card has hover effects */
  interactive?: boolean;
  /** Render as different HTML element */
  as?: ElementType;
  children: React.ReactNode;
}

/**
 * Card container component with multiple variants
 */
export const Card = forwardRef<HTMLElement, CardProps>(
  (
    {
      variant = "default",
      padding = "md",
      interactive = false,
      as: Component = "div",
      className,
      children,
      ...props
    },
    ref,
  ) => {
    return (
      <Component
        ref={ref}
        className={cardStyles({ variant, padding, interactive, className })}
        {...props}
      >
        {children}
      </Component>
    );
  },
);

Card.displayName = "Card";

/* Card subcomponents */

export interface CardHeaderProps extends HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export const CardHeader = forwardRef<HTMLDivElement, CardHeaderProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <div ref={ref} className={cn("pb-2", className)} {...props}>
        {children}
      </div>
    );
  },
);

CardHeader.displayName = "CardHeader";

export interface CardTitleProps extends HTMLAttributes<HTMLHeadingElement> {
  children: React.ReactNode;
}

export const CardTitle = forwardRef<HTMLHeadingElement, CardTitleProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <h3 ref={ref} className={cardTitleStyles({ className })} {...props}>
        {children}
      </h3>
    );
  },
);

CardTitle.displayName = "CardTitle";

export interface CardDescriptionProps extends HTMLAttributes<HTMLParagraphElement> {
  children: React.ReactNode;
}

export const CardDescription = forwardRef<
  HTMLParagraphElement,
  CardDescriptionProps
>(({ className, children, ...props }, ref) => {
  return (
    <p ref={ref} className={cardDescriptionStyles({ className })} {...props}>
      {children}
    </p>
  );
});

CardDescription.displayName = "CardDescription";

export interface CardContentProps extends HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export const CardContent = forwardRef<HTMLDivElement, CardContentProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <div ref={ref} className={cn("py-2", className)} {...props}>
        {children}
      </div>
    );
  },
);

CardContent.displayName = "CardContent";

export interface CardFooterProps extends HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export const CardFooter = forwardRef<HTMLDivElement, CardFooterProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "pt-4 border-t border-gray-100 flex items-center gap-2",
          className,
        )}
        {...props}
      >
        {children}
      </div>
    );
  },
);

CardFooter.displayName = "CardFooter";
