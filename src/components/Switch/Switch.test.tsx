import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { Switch } from "./Switch";

describe("Switch Component", () => {
  describe("Rendering", () => {
    it("should render a switch", () => {
      render(<Switch />);
      expect(screen.getByRole("switch")).toBeInTheDocument();
    });

    it("should render with label", () => {
      render(<Switch label="Dark mode" />);
      expect(screen.getByText("Dark mode")).toBeInTheDocument();
    });

    it("should render with description", () => {
      render(
        <Switch
          label="Notifications"
          description="Enable push notifications"
        />,
      );
      expect(screen.getByText("Enable push notifications")).toBeInTheDocument();
    });
  });

  describe("Sizes", () => {
    it("should render small size", () => {
      render(<Switch size="sm" />);
      expect(screen.getByRole("switch")).toHaveClass("h-4", "w-7");
    });

    it("should render medium size by default", () => {
      render(<Switch />);
      expect(screen.getByRole("switch")).toHaveClass("h-5", "w-9");
    });

    it("should render large size", () => {
      render(<Switch size="lg" />);
      expect(screen.getByRole("switch")).toHaveClass("h-6", "w-11");
    });
  });

  describe("States", () => {
    it("should be unchecked by default", () => {
      render(<Switch />);
      expect(screen.getByRole("switch")).toHaveAttribute(
        "aria-checked",
        "false",
      );
    });

    it("should be checked when checked prop is true", () => {
      render(<Switch checked />);
      expect(screen.getByRole("switch")).toHaveAttribute(
        "aria-checked",
        "true",
      );
    });

    it("should have checked styling", () => {
      render(<Switch checked />);
      expect(screen.getByRole("switch")).toHaveClass("bg-primary-500");
    });

    it("should have unchecked styling", () => {
      render(<Switch />);
      expect(screen.getByRole("switch")).toHaveClass("bg-gray-300");
    });

    it("should be disabled", () => {
      render(<Switch disabled />);
      expect(screen.getByRole("switch")).toBeDisabled();
    });

    it("should have disabled styling", () => {
      render(<Switch disabled />);
      expect(screen.getByRole("switch")).toHaveClass(
        "opacity-50",
        "cursor-not-allowed",
      );
    });
  });

  describe("Events", () => {
    it("should call onChange with true when clicked while unchecked", () => {
      const handleChange = vi.fn();
      render(<Switch checked={false} onChange={handleChange} />);
      fireEvent.click(screen.getByRole("switch"));
      expect(handleChange).toHaveBeenCalledWith(true);
    });

    it("should call onChange with false when clicked while checked", () => {
      const handleChange = vi.fn();
      render(<Switch checked onChange={handleChange} />);
      fireEvent.click(screen.getByRole("switch"));
      expect(handleChange).toHaveBeenCalledWith(false);
    });

    it("should not call onChange when disabled", () => {
      const handleChange = vi.fn();
      render(<Switch disabled onChange={handleChange} />);
      fireEvent.click(screen.getByRole("switch"));
      expect(handleChange).not.toHaveBeenCalled();
    });
  });

  describe("Accessibility", () => {
    it("should have switch role", () => {
      render(<Switch />);
      expect(screen.getByRole("switch")).toBeInTheDocument();
    });

    it("should have aria-checked attribute", () => {
      render(<Switch checked />);
      expect(screen.getByRole("switch")).toHaveAttribute(
        "aria-checked",
        "true",
      );
    });

    it("should have aria-labelledby when label is provided", () => {
      render(<Switch label="Toggle" id="my-switch" />);
      expect(screen.getByRole("switch")).toHaveAttribute(
        "aria-labelledby",
        "my-switch-label",
      );
    });

    it("should have type button to prevent form submission", () => {
      render(<Switch />);
      expect(screen.getByRole("switch")).toHaveAttribute("type", "button");
    });
  });

  describe("HTML attributes", () => {
    it("should pass through data-testid", () => {
      render(<Switch data-testid="custom-switch" />);
      expect(screen.getByTestId("custom-switch")).toBeInTheDocument();
    });
  });
});
