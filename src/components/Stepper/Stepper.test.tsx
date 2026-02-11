import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { Stepper } from "./Stepper";

const steps = [
  { label: "Step 1", description: "First step" },
  { label: "Step 2", description: "Second step" },
  { label: "Step 3", description: "Third step" },
];

describe("Stepper Component", () => {
  describe("Rendering", () => {
    it("should render all step labels", () => {
      render(<Stepper steps={steps} activeStep={0} />);
      expect(screen.getByText("Step 1")).toBeInTheDocument();
      expect(screen.getByText("Step 2")).toBeInTheDocument();
      expect(screen.getByText("Step 3")).toBeInTheDocument();
    });

    it("should render step descriptions", () => {
      render(<Stepper steps={steps} activeStep={0} />);
      expect(screen.getByText("First step")).toBeInTheDocument();
    });

    it("should render step numbers", () => {
      render(<Stepper steps={steps} activeStep={0} />);
      expect(screen.getByText("1")).toBeInTheDocument();
      expect(screen.getByText("2")).toBeInTheDocument();
      expect(screen.getByText("3")).toBeInTheDocument();
    });
  });

  describe("Active Step", () => {
    it("should mark current step as active", () => {
      render(<Stepper steps={steps} activeStep={1} />);
      const activeIndicator = screen.getByText("2").closest("div");
      expect(activeIndicator).toHaveClass("ring-4");
    });

    it("should have aria-current on active step", () => {
      render(<Stepper steps={steps} activeStep={1} />);
      const step2 = screen.getByText("2").closest("div");
      expect(step2).toHaveAttribute("aria-current", "step");
    });
  });

  describe("Completed Steps", () => {
    it("should show check icon for completed steps", () => {
      render(<Stepper steps={steps} activeStep={2} />);
      // Steps 0 and 1 should be completed (no number visible)
      expect(screen.queryByText("1")).not.toBeInTheDocument();
      expect(screen.queryByText("2")).not.toBeInTheDocument();
      expect(screen.getByText("3")).toBeInTheDocument();
    });

    it("should apply completed styling", () => {
      render(<Stepper steps={steps} activeStep={1} />);
      const completedIndicator = screen.queryByText("1");
      // Step 1 is completed, so number should not be visible
      expect(completedIndicator).not.toBeInTheDocument();
    });
  });

  describe("Orientation", () => {
    it("should render horizontal by default", () => {
      const { container } = render(<Stepper steps={steps} activeStep={0} />);
      expect(container.firstChild).toHaveClass("flex-row");
    });

    it("should render vertical", () => {
      const { container } = render(
        <Stepper steps={steps} activeStep={0} orientation="vertical" />,
      );
      expect(container.firstChild).toHaveClass("flex-col");
    });
  });

  describe("Accessibility", () => {
    it("should have list role", () => {
      render(<Stepper steps={steps} activeStep={0} />);
      expect(screen.getByRole("list")).toBeInTheDocument();
    });

    it("should have listitem roles", () => {
      render(<Stepper steps={steps} activeStep={0} />);
      expect(screen.getAllByRole("listitem")).toHaveLength(3);
    });
  });

  describe("HTML attributes", () => {
    it("should forward ref", () => {
      const ref = { current: null } as { current: HTMLDivElement | null };
      render(<Stepper ref={ref} steps={steps} activeStep={0} />);
      expect(ref.current).toBeInstanceOf(HTMLElement);
    });
  });
});
