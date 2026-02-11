import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { Checkbox } from "./Checkbox";

describe("Checkbox Component", () => {
  describe("Rendering", () => {
    it("should render a checkbox input", () => {
      render(<Checkbox />);
      expect(screen.getByRole("checkbox")).toBeInTheDocument();
    });

    it("should render with label", () => {
      render(<Checkbox label="Accept terms" />);
      expect(screen.getByText("Accept terms")).toBeInTheDocument();
    });

    it("should render with description", () => {
      render(<Checkbox label="Terms" description="Read the terms" />);
      expect(screen.getByText("Read the terms")).toBeInTheDocument();
    });

    it("should apply custom className to wrapper", () => {
      const { container } = render(<Checkbox className="custom-class" />);
      expect(container.firstChild).toHaveClass("custom-class");
    });
  });

  describe("Label Association", () => {
    it("should associate label with checkbox via htmlFor", () => {
      render(<Checkbox label="Accept" id="terms" />);
      expect(screen.getByLabelText("Accept")).toBeInTheDocument();
    });

    it("should generate unique id if not provided", () => {
      render(<Checkbox label="Accept" />);
      const checkbox = screen.getByRole("checkbox");
      expect(checkbox).toHaveAttribute("id");
    });
  });

  describe("Sizes", () => {
    it("should render small size", () => {
      render(<Checkbox size="sm" />);
      expect(screen.getByRole("checkbox")).toHaveClass("h-3.5", "w-3.5");
    });

    it("should render medium size by default", () => {
      render(<Checkbox />);
      expect(screen.getByRole("checkbox")).toHaveClass("h-4", "w-4");
    });

    it("should render large size", () => {
      render(<Checkbox size="lg" />);
      expect(screen.getByRole("checkbox")).toHaveClass("h-5", "w-5");
    });
  });

  describe("States", () => {
    it("should be checked when checked prop is true", () => {
      render(<Checkbox checked onChange={() => {}} />);
      expect(screen.getByRole("checkbox")).toBeChecked();
    });

    it("should be disabled when disabled prop is true", () => {
      render(<Checkbox disabled />);
      expect(screen.getByRole("checkbox")).toBeDisabled();
    });

    it("should have disabled styling", () => {
      render(<Checkbox disabled />);
      expect(screen.getByRole("checkbox")).toHaveClass(
        "opacity-50",
        "cursor-not-allowed",
      );
    });

    it("should support indeterminate state", () => {
      render(<Checkbox indeterminate />);
      const checkbox = screen.getByRole("checkbox");
      expect(checkbox).toHaveAttribute("aria-checked", "mixed");
    });
  });

  describe("Events", () => {
    it("should call onChange when clicked", () => {
      const handleChange = vi.fn();
      render(<Checkbox onChange={handleChange} />);
      fireEvent.click(screen.getByRole("checkbox"));
      expect(handleChange).toHaveBeenCalled();
    });

    it("should not call onChange when disabled", () => {
      const handleChange = vi.fn();
      render(<Checkbox disabled onChange={handleChange} />);
      fireEvent.click(screen.getByRole("checkbox"));
      expect(handleChange).not.toHaveBeenCalled();
    });
  });

  describe("Accessibility", () => {
    it("should have checkbox role", () => {
      render(<Checkbox />);
      expect(screen.getByRole("checkbox")).toBeInTheDocument();
    });

    it("should support aria-label", () => {
      render(<Checkbox aria-label="Toggle feature" />);
      expect(screen.getByRole("checkbox")).toHaveAttribute(
        "aria-label",
        "Toggle feature",
      );
    });
  });

  describe("HTML attributes", () => {
    it("should pass through name attribute", () => {
      render(<Checkbox name="terms" />);
      expect(screen.getByRole("checkbox")).toHaveAttribute("name", "terms");
    });

    it("should pass through value attribute", () => {
      render(<Checkbox value="agreed" />);
      expect(screen.getByRole("checkbox")).toHaveAttribute("value", "agreed");
    });

    it("should pass through data-testid", () => {
      render(<Checkbox data-testid="custom-checkbox" />);
      expect(screen.getByTestId("custom-checkbox")).toBeInTheDocument();
    });
  });
});
