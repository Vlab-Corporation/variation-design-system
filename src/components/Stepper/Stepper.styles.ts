import { cn } from "@/utils/cn";

export type StepperOrientation = "horizontal" | "vertical";
export type StepStatus = "completed" | "active" | "pending";

export interface StepperStyleProps {
  orientation?: StepperOrientation;
  className?: string;
}

export function stepperStyles(props: StepperStyleProps = {}): string {
  const { orientation = "horizontal", className } = props;
  return cn(
    "flex",
    orientation === "horizontal" ? "flex-row w-full" : "flex-col",
    className,
  );
}

/** Each step column — all equal width via flex-1 */
export function stepSegmentStyles(): string {
  return "flex-1 flex flex-col items-center relative";
}

/**
 * Row containing [left-half-connector] [circle] [right-half-connector].
 * Connectors sit at indicator level, independent of label width.
 */
export function stepIndicatorRowStyles(): string {
  return "flex items-center w-full";
}

export function stepIndicatorStyles(status: StepStatus): string {
  return cn(
    "flex items-center justify-center w-8 h-8 rounded-full text-sm font-semibold shrink-0",
    "transition-all duration-200 border-2",
    status === "completed" && "bg-accent-600 border-accent-600 text-white",
    status === "active" &&
      "bg-white border-accent-600 text-accent-600 shadow-sm",
    status === "pending" && "bg-white border-gray-300 text-gray-400",
  );
}

/**
 * Half-connector line sitting beside the indicator circle.
 * `visible=false` renders a transparent spacer (first-left / last-right).
 */
export function stepHalfConnectorStyles(
  completed: boolean,
  visible: boolean,
): string {
  return cn(
    "flex-1 h-0.5 transition-colors duration-300",
    visible ? (completed ? "bg-accent-600" : "bg-gray-200") : "bg-transparent",
  );
}

/** Vertical half-connector — mirrors the horizontal pattern */
export function stepVerticalHalfConnectorStyles(
  completed: boolean,
  visible: boolean,
): string {
  return cn(
    "flex-1 w-0.5 min-h-3 transition-colors duration-300",
    visible ? (completed ? "bg-accent-600" : "bg-gray-200") : "bg-transparent",
  );
}

export function stepLabelStyles(
  status: StepStatus,
  orientation: StepperOrientation = "horizontal",
): string {
  return cn(
    "text-sm font-medium transition-colors duration-200 leading-tight",
    orientation === "horizontal" ? "mt-2 text-center" : "",
    status === "active" && "text-accent-700",
    status === "completed" && "text-gray-800",
    status === "pending" && "text-gray-400",
  );
}

export function stepDescriptionStyles(
  orientation: StepperOrientation = "horizontal",
): string {
  return cn(
    "text-xs text-gray-500 mt-0.5 leading-tight",
    orientation === "horizontal" ? "text-center" : "",
  );
}
