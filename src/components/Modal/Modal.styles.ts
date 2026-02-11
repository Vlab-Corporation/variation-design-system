import { cn } from "@/utils/cn";

export type ModalSize = "sm" | "md" | "lg" | "xl" | "full";

export const modalSizes: Record<ModalSize, string> = {
  sm: "max-w-sm",
  md: "max-w-md",
  lg: "max-w-lg",
  xl: "max-w-xl",
  full: "max-w-[calc(100vw-2rem)] max-h-[calc(100vh-2rem)]",
};

export interface ModalOverlayStyleProps {
  className?: string;
}

export function modalOverlayStyles(props: ModalOverlayStyleProps = {}): string {
  const { className } = props;

  return cn(
    "fixed inset-0 z-50 flex items-center justify-center p-4",
    "bg-black/50 backdrop-blur-sm",
    "animate-fade-in",
    className,
  );
}

export interface ModalContentStyleProps {
  size?: ModalSize;
  className?: string;
}

export function modalContentStyles(props: ModalContentStyleProps = {}): string {
  const { size = "md", className } = props;

  return cn(
    "relative w-full bg-white rounded-card shadow-lg",
    "animate-scale-in",
    "max-h-[calc(100vh-4rem)] overflow-auto",
    modalSizes[size],
    className,
  );
}

export function modalHeaderStyles(className?: string): string {
  return cn(
    "flex items-center justify-between px-6 py-4 border-b border-gray-200",
    className,
  );
}

export function modalBodyStyles(className?: string): string {
  return cn("px-6 py-4", className);
}

export function modalFooterStyles(className?: string): string {
  return cn(
    "flex items-center justify-end gap-3 px-6 py-4 border-t border-gray-200",
    className,
  );
}

export function modalCloseStyles(className?: string): string {
  return cn(
    "inline-flex items-center justify-center rounded-button p-1",
    "text-gray-400 hover:text-gray-600",
    "transition-colors duration-200",
    "focus:outline-none focus:ring-2 focus:ring-primary-500/20",
    className,
  );
}
