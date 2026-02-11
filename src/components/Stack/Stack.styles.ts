import { cn } from "@/utils/cn";

export type StackDirection = "row" | "column";
export type StackAlign = "start" | "center" | "end" | "stretch" | "baseline";
export type StackJustify =
  | "start"
  | "center"
  | "end"
  | "between"
  | "around"
  | "evenly";
export type StackGap =
  | "0"
  | "1"
  | "2"
  | "3"
  | "4"
  | "5"
  | "6"
  | "8"
  | "10"
  | "12"
  | "16";

export const stackDirections: Record<StackDirection, string> = {
  row: "flex-row",
  column: "flex-col",
};

export const stackAligns: Record<StackAlign, string> = {
  start: "items-start",
  center: "items-center",
  end: "items-end",
  stretch: "items-stretch",
  baseline: "items-baseline",
};

export const stackJustifies: Record<StackJustify, string> = {
  start: "justify-start",
  center: "justify-center",
  end: "justify-end",
  between: "justify-between",
  around: "justify-around",
  evenly: "justify-evenly",
};

export const stackGaps: Record<StackGap, string> = {
  "0": "gap-0",
  "1": "gap-1",
  "2": "gap-2",
  "3": "gap-3",
  "4": "gap-4",
  "5": "gap-5",
  "6": "gap-6",
  "8": "gap-8",
  "10": "gap-10",
  "12": "gap-12",
  "16": "gap-16",
};

export interface StackStyleProps {
  direction?: StackDirection;
  align?: StackAlign;
  justify?: StackJustify;
  gap?: StackGap;
  wrap?: boolean;
  inline?: boolean;
  className?: string;
}

export function stackStyles(props: StackStyleProps = {}): string {
  const {
    direction = "column",
    align,
    justify,
    gap = "4",
    wrap = false,
    inline = false,
    className,
  } = props;

  return cn(
    inline ? "inline-flex" : "flex",
    stackDirections[direction],
    align && stackAligns[align],
    justify && stackJustifies[justify],
    stackGaps[gap],
    wrap && "flex-wrap",
    className,
  );
}
