import { cn } from "@/utils/cn";

export type CardVariant = "default" | "elevated" | "outlined" | "filled";
export type CardPadding = "none" | "sm" | "md" | "lg";

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

export interface CardStyleProps {
  variant?: CardVariant;
  padding?: CardPadding;
  interactive?: boolean;
  className?: string;
}

export function cardStyles(props: CardStyleProps = {}): string {
  const {
    variant = "default",
    padding = "md",
    interactive = false,
    className,
  } = props;

  return cn(
    "rounded-card",
    cardVariants[variant],
    cardPaddings[padding],
    interactive && [
      "group/card cursor-pointer",
      "transition-all duration-200 ease-out",
      "hover:bg-accent-100 hover:border-accent-800 hover:shadow-none",
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
