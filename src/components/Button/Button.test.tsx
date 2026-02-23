import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { Button } from "./Button";

describe("Button Component", () => {
  describe("Rendering", () => {
    it("should render with default props", () => {
      render(<Button>Click me</Button>);
      const button = screen.getByRole("button", { name: /click me/i });
      expect(button).toBeInTheDocument();
    });

    it("should render children correctly", () => {
      render(<Button>Submit Form</Button>);
      expect(screen.getByText("Submit Form")).toBeInTheDocument();
    });

    it("should apply custom className", () => {
      render(<Button className="custom-class">Test</Button>);
      const button = screen.getByRole("button");
      expect(button).toHaveClass("custom-class");
    });
  });

  describe("Variants", () => {
    it("should render primary variant by default", () => {
      render(<Button>Primary</Button>);
      const button = screen.getByRole("button");
      expect(button).toHaveClass("bg-gray-900");
      expect(button).toHaveClass("text-white");
    });

    it("should render secondary variant with border", () => {
      render(<Button variant="secondary">Secondary</Button>);
      const button = screen.getByRole("button");
      expect(button).toHaveClass("border-gray-400");
      expect(button).toHaveClass("text-gray-800");
    });

    it("should render ghost variant", () => {
      render(<Button variant="ghost">Ghost</Button>);
      const button = screen.getByRole("button");
      expect(button).toHaveClass("bg-transparent");
      expect(button).toHaveClass("text-gray-700");
    });
  });

  describe("Sizes", () => {
    it("should render small size", () => {
      render(<Button size="sm">Small</Button>);
      const button = screen.getByRole("button");
      expect(button).toHaveClass("py-2");
      expect(button).toHaveClass("px-6");
      expect(button).toHaveClass("text-sm");
      expect(button).toHaveClass("font-medium");
    });

    it("should render medium size by default", () => {
      render(<Button>Medium</Button>);
      const button = screen.getByRole("button");
      expect(button).toHaveClass("py-3");
      expect(button).toHaveClass("px-6");
      expect(button).toHaveClass("text-base");
      expect(button).toHaveClass("font-medium");
    });

    it("should render large size", () => {
      render(<Button size="lg">Large</Button>);
      const button = screen.getByRole("button");
      expect(button).toHaveClass("py-3.5");
      expect(button).toHaveClass("px-6");
      expect(button).toHaveClass("text-lg");
      expect(button).toHaveClass("font-semibold");
    });
  });

  describe("Shapes", () => {
    it("should render rounded shape by default", () => {
      render(<Button>Rounded</Button>);
      const button = screen.getByRole("button");
      expect(button).toHaveClass("rounded-button");
    });

    it("should render pill shape", () => {
      render(<Button shape="pill">Pill</Button>);
      const button = screen.getByRole("button");
      expect(button).toHaveClass("rounded-pill");
    });
  });

  describe("Icons", () => {
    it("should render left icon", () => {
      render(
        <Button leftIcon={<svg data-testid="left-svg" />}>With Icon</Button>,
      );
      expect(screen.getByTestId("button-left-icon")).toBeInTheDocument();
      expect(screen.getByTestId("left-svg")).toBeInTheDocument();
    });

    it("should render right icon", () => {
      render(
        <Button rightIcon={<svg data-testid="right-svg" />}>With Icon</Button>,
      );
      expect(screen.getByTestId("button-right-icon")).toBeInTheDocument();
      expect(screen.getByTestId("right-svg")).toBeInTheDocument();
    });

    it("should render both icons", () => {
      render(
        <Button
          leftIcon={<svg data-testid="left-svg" />}
          rightIcon={<svg data-testid="right-svg" />}
        >
          Both Icons
        </Button>,
      );
      expect(screen.getByTestId("button-left-icon")).toBeInTheDocument();
      expect(screen.getByTestId("button-right-icon")).toBeInTheDocument();
    });

    it("should adjust padding when left icon is present", () => {
      render(
        <Button leftIcon={<svg />} size="md">
          Icon
        </Button>,
      );
      const button = screen.getByRole("button");
      expect(button).toHaveClass("pl-[18px]");
    });

    it("should adjust padding when right icon is present", () => {
      render(
        <Button rightIcon={<svg />} size="md">
          Icon
        </Button>,
      );
      const button = screen.getByRole("button");
      expect(button).toHaveClass("pr-[18px]");
    });
  });

  describe("States", () => {
    it("should be disabled when disabled prop is true", () => {
      render(<Button disabled>Disabled</Button>);
      const button = screen.getByRole("button");
      expect(button).toBeDisabled();
      expect(button).toHaveClass("cursor-not-allowed");
    });

    it("should apply disabled colors for primary variant", () => {
      render(<Button disabled>Disabled</Button>);
      const button = screen.getByRole("button");
      expect(button).toHaveClass("bg-gray-200");
      expect(button).toHaveClass("text-gray-500");
    });

    it("should apply disabled colors for secondary variant", () => {
      render(
        <Button variant="secondary" disabled>
          Disabled
        </Button>,
      );
      const button = screen.getByRole("button");
      expect(button).toHaveClass("border-gray-200");
      expect(button).toHaveClass("text-gray-400");
    });

    it("should apply disabled colors for ghost variant", () => {
      render(
        <Button variant="ghost" disabled>
          Disabled
        </Button>,
      );
      const button = screen.getByRole("button");
      expect(button).toHaveClass("text-gray-400");
    });

    it("should show loading state", () => {
      render(<Button loading>Loading</Button>);
      const button = screen.getByRole("button");
      expect(button).toBeDisabled();
      expect(screen.getByTestId("button-spinner")).toBeInTheDocument();
    });

    it("should hide children text when loading", () => {
      render(<Button loading>Hidden Text</Button>);
      const text = screen.getByText("Hidden Text");
      expect(text).toHaveClass("invisible");
    });

    it("should hide icons when loading", () => {
      render(
        <Button loading leftIcon={<svg />} rightIcon={<svg />}>
          Loading
        </Button>,
      );
      expect(screen.getByTestId("button-left-icon")).toHaveClass("invisible");
      expect(screen.getByTestId("button-right-icon")).toHaveClass("invisible");
    });
  });

  describe("Events", () => {
    it("should call onClick when clicked", () => {
      const handleClick = vi.fn();
      render(<Button onClick={handleClick}>Clickable</Button>);
      fireEvent.click(screen.getByRole("button"));
      expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it("should not call onClick when disabled", () => {
      const handleClick = vi.fn();
      render(
        <Button onClick={handleClick} disabled>
          Disabled
        </Button>,
      );
      fireEvent.click(screen.getByRole("button"));
      expect(handleClick).not.toHaveBeenCalled();
    });

    it("should not call onClick when loading", () => {
      const handleClick = vi.fn();
      render(
        <Button onClick={handleClick} loading>
          Loading
        </Button>,
      );
      fireEvent.click(screen.getByRole("button"));
      expect(handleClick).not.toHaveBeenCalled();
    });
  });

  describe("Accessibility", () => {
    it("should have correct aria-disabled when disabled", () => {
      render(<Button disabled>Disabled</Button>);
      expect(screen.getByRole("button")).toHaveAttribute(
        "aria-disabled",
        "true",
      );
    });

    it("should have aria-busy when loading", () => {
      render(<Button loading>Loading</Button>);
      expect(screen.getByRole("button")).toHaveAttribute("aria-busy", "true");
    });

    it("should support aria-label", () => {
      render(<Button aria-label="Close dialog">X</Button>);
      expect(screen.getByLabelText("Close dialog")).toBeInTheDocument();
    });
  });

  describe("Styling", () => {
    it("should have transition classes", () => {
      render(<Button>Styled</Button>);
      const button = screen.getByRole("button");
      expect(button).toHaveClass("transition-colors");
      expect(button).toHaveClass("duration-200");
    });

    it("should have tracking-tight for letter spacing", () => {
      render(<Button>Tracked</Button>);
      const button = screen.getByRole("button");
      expect(button).toHaveClass("tracking-tight");
    });
  });

  describe("HTML attributes", () => {
    it("should support type attribute", () => {
      render(<Button type="submit">Submit</Button>);
      expect(screen.getByRole("button")).toHaveAttribute("type", "submit");
    });

    it('should default to type="button"', () => {
      render(<Button>Default Type</Button>);
      expect(screen.getByRole("button")).toHaveAttribute("type", "button");
    });

    it("should pass through additional HTML attributes", () => {
      render(<Button data-testid="custom-button">Test</Button>);
      expect(screen.getByTestId("custom-button")).toBeInTheDocument();
    });
  });
});
