import { cn } from "@/utils/cn";

export type SkeletonVariant = "text" | "circular" | "rectangular";

export const skeletonVariants: Record<SkeletonVariant, string> = {
  text: "rounded-md w-full h-4",
  circular: "rounded-full",
  rectangular: "rounded-card",
};

export interface SkeletonStyleProps {
  variant?: SkeletonVariant;
  className?: string;
}

export function skeletonStyles(props: SkeletonStyleProps = {}): string {
  const { variant = "text", className } = props;

  return cn("animate-pulse bg-gray-200", skeletonVariants[variant], className);
}
