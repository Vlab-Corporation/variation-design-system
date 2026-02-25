import { cn } from "@/utils/cn";

export type AvatarSize = "xs" | "sm" | "md" | "lg" | "xl";
export type AvatarShape = "circle" | "square";

export const avatarSizes: Record<AvatarSize, string> = {
  xs: "w-6 h-6 text-xs",
  sm: "w-8 h-8 text-sm",
  md: "w-10 h-10 text-base",
  lg: "w-12 h-12 text-lg",
  xl: "w-16 h-16 text-xl",
};

export const avatarShapes: Record<AvatarShape, string> = {
  circle: "rounded-full",
  square: "rounded-card",
};

export interface AvatarStyleProps {
  size?: AvatarSize;
  shape?: AvatarShape;
  isDefault?: boolean;
  className?: string;
}

export function avatarStyles(props: AvatarStyleProps = {}): string {
  const { size = "md", shape = "circle", isDefault = false, className } = props;

  return cn(
    "inline-flex items-center justify-center overflow-hidden",
    "select-none shrink-0",
    isDefault
      ? "bg-white border border-gray-300 text-gray-700"
      : "bg-gray-200 text-gray-600 font-medium",
    avatarSizes[size],
    avatarShapes[shape],
    className,
  );
}

export function avatarImageStyles(): string {
  return "w-full h-full object-cover";
}
