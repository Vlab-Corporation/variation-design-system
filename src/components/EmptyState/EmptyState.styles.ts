import { cn } from "@/utils/cn";

export type EmptyStateSize = "sm" | "md" | "lg";

export const emptyStateSizes: Record<EmptyStateSize, string> = {
  sm: "py-8 px-4",
  md: "py-12 px-6",
  lg: "py-16 px-8",
};

export interface EmptyStateStyleProps {
  size?: EmptyStateSize;
  className?: string;
}

export function emptyStateStyles(props: EmptyStateStyleProps = {}): string {
  const { size = "md", className } = props;
  return cn(
    "flex flex-col items-center justify-center text-center",
    emptyStateSizes[size],
    className,
  );
}

export function emptyStateIconStyles(): string {
  return "text-gray-400 mb-4";
}

export function emptyStateTitleStyles(): string {
  return "text-lg font-semibold text-gray-900 mb-1";
}

export function emptyStateDescriptionStyles(): string {
  return "text-sm text-gray-500 mb-6 max-w-sm";
}
