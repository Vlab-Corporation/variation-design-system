import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { Badge } from "./Badge";

describe("Badge Component", () => {
  describe("Rendering", () => {
    it("should render with default props", () => {
      render(<Badge>Default</Badge>);
      expect(screen.getByText("Default")).toBeInTheDocument();
    });

    it("should apply custom className", () => {
      render(<Badge className="custom-class">Badge</Badge>);
      expect(screen.getByText("Badge")).toHaveClass("custom-class");
    });
  });

  describe("Variants", () => {
    it("should render default variant", () => {
      render(<Badge variant="default">Default</Badge>);
      const badge = screen.getByText("Default");
      expect(badge).toHaveClass("bg-gray-100");
      expect(badge).toHaveClass("text-gray-800");
    });

    it("should render primary variant", () => {
      render(<Badge variant="primary">Primary</Badge>);
      const badge = screen.getByText("Primary");
      expect(badge).toHaveClass("bg-accent-100");
      expect(badge).toHaveClass("text-accent-800");
    });

    it("should render success variant", () => {
      render(<Badge variant="success">Success</Badge>);
      const badge = screen.getByText("Success");
      expect(badge).toHaveClass("bg-green-100");
      expect(badge).toHaveClass("text-green-800");
    });

    it("should render warning variant", () => {
      render(<Badge variant="warning">Warning</Badge>);
      const badge = screen.getByText("Warning");
      expect(badge).toHaveClass("bg-yellow-100");
      expect(badge).toHaveClass("text-yellow-800");
    });

    it("should render error variant", () => {
      render(<Badge variant="error">Error</Badge>);
      const badge = screen.getByText("Error");
      expect(badge).toHaveClass("bg-red-100");
      expect(badge).toHaveClass("text-red-800");
    });

    it("should render info variant", () => {
      render(<Badge variant="info">Info</Badge>);
      const badge = screen.getByText("Info");
      expect(badge).toHaveClass("bg-blue-100");
      expect(badge).toHaveClass("text-blue-800");
    });
  });

  describe("Sizes", () => {
    it("should render small size", () => {
      render(<Badge size="sm">Small</Badge>);
      const badge = screen.getByText("Small");
      expect(badge).toHaveClass("px-1.5");
      expect(badge).toHaveClass("py-0.5");
      expect(badge).toHaveClass("text-xs");
    });

    it("should render medium size by default", () => {
      render(<Badge>Medium</Badge>);
      const badge = screen.getByText("Medium");
      expect(badge).toHaveClass("px-2");
      expect(badge).toHaveClass("py-0.5");
      expect(badge).toHaveClass("text-sm");
    });

    it("should render large size", () => {
      render(<Badge size="lg">Large</Badge>);
      const badge = screen.getByText("Large");
      expect(badge).toHaveClass("px-2.5");
      expect(badge).toHaveClass("py-1");
      expect(badge).toHaveClass("text-base");
    });
  });

  describe("Shapes", () => {
    it("should render rounded shape by default", () => {
      render(<Badge>Rounded</Badge>);
      const badge = screen.getByText("Rounded");
      expect(badge).toHaveClass("rounded-md");
    });

    it("should render pill shape", () => {
      render(<Badge shape="pill">Pill</Badge>);
      const badge = screen.getByText("Pill");
      expect(badge).toHaveClass("rounded-full");
    });

    it("should render square shape", () => {
      render(<Badge shape="square">Square</Badge>);
      const badge = screen.getByText("Square");
      expect(badge).toHaveClass("rounded-none");
    });
  });

  describe("With dot indicator", () => {
    it("should render dot when dot prop is true", () => {
      render(<Badge dot>With Dot</Badge>);
      expect(screen.getByTestId("badge-dot")).toBeInTheDocument();
    });

    it("should not render dot by default", () => {
      render(<Badge>No Dot</Badge>);
      expect(screen.queryByTestId("badge-dot")).not.toBeInTheDocument();
    });

    it("should have appropriate dot styling", () => {
      render(
        <Badge dot variant="success">
          Status
        </Badge>,
      );
      const dot = screen.getByTestId("badge-dot");
      expect(dot).toHaveClass("w-2");
      expect(dot).toHaveClass("h-2");
      expect(dot).toHaveClass("rounded-full");
      expect(dot).toHaveClass("bg-green-500");
    });
  });

  describe("Animations", () => {
    it("should have fade-in animation", () => {
      render(<Badge>Animated</Badge>);
      const badge = screen.getByText("Animated");
      expect(badge).toHaveClass("animate-fade-in");
    });

    it("should support pulse animation for notifications", () => {
      render(<Badge pulse>Notification</Badge>);
      const badge = screen.getByText("Notification");
      expect(badge).toHaveClass("animate-pulse-subtle");
    });
  });

  describe("Accessibility", () => {
    it("should have appropriate role when interactive", () => {
      render(<Badge role="status">Status</Badge>);
      expect(screen.getByRole("status")).toBeInTheDocument();
    });
  });
});
