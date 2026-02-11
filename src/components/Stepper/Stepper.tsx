import { forwardRef, type HTMLAttributes, type ReactNode } from "react";
import {
  stepperStyles,
  stepIndicatorStyles,
  stepConnectorStyles,
  stepLabelStyles,
  stepDescriptionStyles,
  type StepperOrientation,
  type StepStatus,
} from "./Stepper.styles";

export type { StepperOrientation, StepStatus } from "./Stepper.styles";

export interface StepData {
  /** Step label */
  label: string;
  /** Step description */
  description?: string;
  /** Custom icon/content for the indicator */
  icon?: ReactNode;
}

export interface StepperProps extends HTMLAttributes<HTMLDivElement> {
  /** Steps data */
  steps: StepData[];
  /** Current active step (0-based) */
  activeStep: number;
  /** Orientation */
  orientation?: StepperOrientation;
}

function getStepStatus(index: number, activeStep: number): StepStatus {
  if (index < activeStep) return "completed";
  if (index === activeStep) return "active";
  return "pending";
}

function CheckIcon() {
  return (
    <svg
      className="w-4 h-4"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={3}
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
    </svg>
  );
}

export const Stepper = forwardRef<HTMLDivElement, StepperProps>(
  (
    { steps, activeStep, orientation = "horizontal", className, ...props },
    ref,
  ) => {
    return (
      <div
        ref={ref}
        role="list"
        aria-label="Progress"
        className={stepperStyles({ orientation, className })}
        {...props}
      >
        {steps.map((step, index) => {
          const status = getStepStatus(index, activeStep);
          const isLast = index === steps.length - 1;

          return (
            <div
              key={index}
              role="listitem"
              className={
                orientation === "horizontal"
                  ? `flex items-center ${!isLast ? "flex-1" : ""}`
                  : "flex flex-col"
              }
            >
              <div className="flex items-center">
                <div
                  className={stepIndicatorStyles(status)}
                  aria-current={status === "active" ? "step" : undefined}
                >
                  {status === "completed" ? (
                    <CheckIcon />
                  ) : (
                    (step.icon ?? index + 1)
                  )}
                </div>
                {orientation === "horizontal" && (
                  <div className="ml-2">
                    <div className={stepLabelStyles(status)}>{step.label}</div>
                    {step.description && (
                      <div className={stepDescriptionStyles()}>
                        {step.description}
                      </div>
                    )}
                  </div>
                )}
              </div>

              {orientation === "vertical" && (
                <div className="ml-10 mt-1">
                  <div className={stepLabelStyles(status)}>{step.label}</div>
                  {step.description && (
                    <div className={stepDescriptionStyles()}>
                      {step.description}
                    </div>
                  )}
                </div>
              )}

              {!isLast && (
                <div
                  className={stepConnectorStyles(
                    status === "completed",
                    orientation,
                  )}
                  aria-hidden="true"
                />
              )}
            </div>
          );
        })}
      </div>
    );
  },
);

Stepper.displayName = "Stepper";
