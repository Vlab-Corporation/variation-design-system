import { cn } from "@/utils/cn";

export type CardVariant = "default" | "elevated" | "outlined" | "filled";
export type CardPadding = "none" | "sm" | "md" | "lg";

export const cardVariants: Record<CardVariant, string> = {
  default: "bg-white shadow-sm",
  elevated: "bg-white shadow-md",
  outlined: "bg-white border border-gray-200",
  filled: "bg-gray-50",
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
    "rounded-lg",
    cardVariants[variant],
    cardPaddings[padding],
    interactive && [
      "transition-all duration-200 ease-out",
      "hover:shadow-md hover:scale-[1.01]",
      "cursor-pointer",
    ],
    className,
  );
}
