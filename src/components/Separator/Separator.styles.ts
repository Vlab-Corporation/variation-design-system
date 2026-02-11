import { cn } from "@/utils/cn";

export type SeparatorOrientation = "horizontal" | "vertical";

export const separatorOrientations: Record<SeparatorOrientation, string> = {
  horizontal: "w-full h-px",
  vertical: "h-full w-px",
};

export interface SeparatorStyleProps {
  orientation?: SeparatorOrientation;
  className?: string;
}

export function separatorStyles(props: SeparatorStyleProps = {}): string {
  const { orientation = "horizontal", className } = props;

  return cn(
    "shrink-0 bg-gray-200",
    separatorOrientations[orientation],
    className,
  );
}
