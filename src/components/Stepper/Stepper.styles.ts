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
    orientation === "horizontal" ? "flex-row items-center" : "flex-col",
    className,
  );
}

export function stepStyles(
  _status: StepStatus,
  orientation: StepperOrientation = "horizontal",
): string {
  return cn(
    "flex items-center",
    orientation === "horizontal" ? "flex-row" : "flex-col",
  );
}

export function stepIndicatorStyles(status: StepStatus): string {
  return cn(
    "flex items-center justify-center w-8 h-8 rounded-full text-sm font-medium shrink-0",
    "transition-colors duration-200",
    status === "completed" && "bg-primary-500 text-white",
    status === "active" && "bg-primary-500 text-white ring-4 ring-primary-100",
    status === "pending" && "bg-gray-200 text-gray-500",
  );
}

export function stepConnectorStyles(
  completed: boolean,
  orientation: StepperOrientation = "horizontal",
): string {
  return cn(
    "transition-colors duration-200",
    orientation === "horizontal"
      ? "flex-1 h-0.5 mx-2 min-w-8"
      : "w-0.5 my-2 min-h-8 ml-4",
    completed ? "bg-primary-500" : "bg-gray-200",
  );
}

export function stepLabelStyles(status: StepStatus): string {
  return cn(
    "text-sm font-medium mt-2",
    status === "active" && "text-primary-600",
    status === "completed" && "text-gray-900",
    status === "pending" && "text-gray-500",
  );
}

export function stepDescriptionStyles(): string {
  return "text-xs text-gray-500 mt-0.5";
}
