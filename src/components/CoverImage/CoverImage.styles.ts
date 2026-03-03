import { cn } from "@/utils/cn";

export type CoverImageHeight = "sm" | "md" | "lg";

export const coverImageHeights: Record<CoverImageHeight, string> = {
  sm: "h-32",
  md: "h-48",
  lg: "h-64",
};

export type CoverImageOverlay = "none" | "gradient" | "dark";

export const coverImageOverlayStyles: Record<CoverImageOverlay, string> = {
  none: "",
  gradient:
    "after:absolute after:inset-0 after:bg-gradient-to-t after:from-black/30 after:to-transparent",
  dark: "after:absolute after:inset-0 after:bg-black/20",
};

export interface CoverImageStyleProps {
  height?: CoverImageHeight;
  className?: string;
}

export function coverImageStyles(props: CoverImageStyleProps = {}): string {
  const { height = "md", className } = props;
  return cn(
    "relative w-full overflow-hidden group",
    coverImageHeights[height],
    className,
  );
}

export interface CoverImagePreviewStyleProps {
  overlay?: CoverImageOverlay;
  hasSrc?: boolean;
  className?: string;
}

export function coverImagePreviewStyles(
  props: CoverImagePreviewStyleProps = {},
): string {
  const { overlay = "none", hasSrc = true, className } = props;
  return cn(
    hasSrc ? "relative w-full h-full" : "w-full h-full",
    coverImageOverlayStyles[overlay],
    className,
  );
}

export interface CoverImageUploaderStyleProps {
  className?: string;
}

export function coverImageUploaderStyles(
  props: CoverImageUploaderStyleProps = {},
): string {
  const { className } = props;
  return cn(
    "flex flex-col items-center justify-center w-full h-full",
    "bg-gray-100 border-2 border-dashed border-gray-300",
    "hover:bg-gray-50 hover:border-gray-400 transition-colors cursor-pointer",
    className,
  );
}

export interface CoverImageActionsStyleProps {
  className?: string;
}

export function coverImageActionsStyles(
  props: CoverImageActionsStyleProps = {},
): string {
  const { className } = props;
  return cn(
    "absolute bottom-2 right-2 flex gap-1",
    "opacity-0 group-hover:opacity-100 transition-opacity",
    className,
  );
}
