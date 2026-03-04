import { cn } from "@/utils/cn";

export type CardVariant = "default" | "elevated" | "outlined" | "filled";
export type CardPadding = "none" | "sm" | "md" | "lg";
export type CardHover = "outline" | "elevated";

export const cardVariants: Record<CardVariant, string> = {
  default: "bg-white shadow-md border border-transparent",
  elevated: "bg-white shadow-lg border border-transparent",
  outlined: "bg-white border border-gray-200",
  filled: "bg-gray-50 border border-transparent",
};

export const cardPaddings: Record<CardPadding, string> = {
  none: "p-0",
  sm: "p-3",
  md: "p-4",
  lg: "p-6",
};

export const cardHoverStyles: Record<CardHover, string> = {
  outline: "hover:bg-accent-100 hover:border-accent-800 hover:shadow-none",
  elevated: "hover:shadow-xl hover:-translate-y-0.5",
};

export interface CardStyleProps {
  variant?: CardVariant;
  padding?: CardPadding;
  hover?: CardHover;
  className?: string;
}

export function cardStyles(props: CardStyleProps = {}): string {
  const { variant = "default", padding = "md", hover, className } = props;

  return cn(
    "rounded-card",
    cardVariants[variant],
    cardPaddings[padding],
    hover && [
      "group/card cursor-pointer",
      "transition-all duration-200 ease-out",
      cardHoverStyles[hover],
    ],
    className,
  );
}

export interface CardTitleStyleProps {
  className?: string;
}

export function cardTitleStyles(props: CardTitleStyleProps = {}): string {
  const { className } = props;
  return cn(
    "text-body-1 font-semibold tracking-tight text-gray-900",
    "group-hover/card:text-accent-800",
    className,
  );
}

export interface CardDescriptionStyleProps {
  className?: string;
}

export function cardDescriptionStyles(
  props: CardDescriptionStyleProps = {},
): string {
  const { className } = props;
  return cn(
    "text-body-3 font-medium tracking-tight text-gray-600",
    "group-hover/card:text-gray-700",
    className,
  );
}
