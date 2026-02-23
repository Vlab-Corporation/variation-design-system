import { forwardRef, type HTMLAttributes, type ReactNode } from "react";
import {
  stepperStyles,
  stepSegmentStyles,
  stepIndicatorRowStyles,
  stepIndicatorStyles,
  stepHalfConnectorStyles,
  stepVerticalHalfConnectorStyles,
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
    if (orientation === "horizontal") {
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
            const isFirst = index === 0;
            const isLast = index === steps.length - 1;
            const leftCompleted = index > 0 && index - 1 < activeStep;
            const rightCompleted = index < activeStep;

            return (
              <div
                key={index}
                role="listitem"
                className={stepSegmentStyles()}
              >
                {/* Indicator row: [left-connector] [circle] [right-connector] */}
                <div className={stepIndicatorRowStyles()}>
                  <div
                    className={stepHalfConnectorStyles(
                      leftCompleted,
                      !isFirst,
                    )}
                    aria-hidden="true"
                  />
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
                  <div
                    className={stepHalfConnectorStyles(
                      rightCompleted,
                      !isLast,
                    )}
                    aria-hidden="true"
                  />
                </div>
                {/* Label + description below, centered under circle */}
                <div className={stepLabelStyles(status, orientation)}>
                  {step.label}
                </div>
                {step.description && (
                  <div className={stepDescriptionStyles(orientation)}>
                    {step.description}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      );
    }

    // Vertical orientation — same half-connector pattern as horizontal
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
          const isFirst = index === 0;
          const isLast = index === steps.length - 1;
          const topCompleted = index > 0 && index - 1 < activeStep;
          const bottomCompleted = index < activeStep;

          return (
            <div
              key={index}
              role="listitem"
              className="flex-1 flex flex-row gap-3"
            >
              {/* Left column: [top-half-connector] [circle] [bottom-half-connector] */}
              <div className="flex flex-col items-center shrink-0">
                <div
                  className={stepVerticalHalfConnectorStyles(
                    topCompleted,
                    !isFirst,
                  )}
                  aria-hidden="true"
                />
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
                <div
                  className={stepVerticalHalfConnectorStyles(
                    bottomCompleted,
                    !isLast,
                  )}
                  aria-hidden="true"
                />
              </div>
              {/* Right column: label + description, vertically centered */}
              <div className="flex flex-col justify-center py-2">
                <div className={stepLabelStyles(status, orientation)}>
                  {step.label}
                </div>
                {step.description && (
                  <div className={stepDescriptionStyles(orientation)}>
                    {step.description}
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    );
  },
);

Stepper.displayName = "Stepper";
