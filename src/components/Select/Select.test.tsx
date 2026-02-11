import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { Select } from "./Select";

const defaultOptions = [
  { value: "apple", label: "Apple" },
  { value: "banana", label: "Banana" },
  { value: "cherry", label: "Cherry" },
];

describe("Select Component", () => {
  describe("Rendering", () => {
    it("should render a select element", () => {
      render(<Select options={defaultOptions} />);
      expect(screen.getByRole("combobox")).toBeInTheDocument();
    });

    it("should render options", () => {
      render(<Select options={defaultOptions} />);
      expect(screen.getByRole("option", { name: "Apple" })).toBeInTheDocument();
      expect(screen.getAllByRole("option")).toHaveLength(3);
    });

    it("should render placeholder option", () => {
      render(<Select options={defaultOptions} placeholder="Choose fruit" />);
      expect(screen.getByText("Choose fruit")).toBeInTheDocument();
      expect(screen.getAllByRole("option")).toHaveLength(4);
    });

    it("should render children when no options prop", () => {
      render(
        <Select>
          <option value="x">Custom X</option>
          <option value="y">Custom Y</option>
        </Select>,
      );
      expect(screen.getByText("Custom X")).toBeInTheDocument();
    });
  });

  describe("Label", () => {
    it("should render label when provided", () => {
      render(<Select options={defaultOptions} label="Fruit" />);
      expect(screen.getByText("Fruit")).toBeInTheDocument();
    });

    it("should associate label with select", () => {
      render(
        <Select options={defaultOptions} label="Fruit" id="fruit-select" />,
      );
      expect(screen.getByLabelText("Fruit")).toBeInTheDocument();
    });
  });

  describe("Error State", () => {
    it("should render error message", () => {
      render(<Select options={defaultOptions} error="Required" />);
      expect(screen.getByText("Required")).toBeInTheDocument();
    });

    it("should have error styling", () => {
      render(<Select options={defaultOptions} error="Error" />);
      expect(screen.getByRole("combobox")).toHaveClass("border-red-500");
    });

    it("should set aria-invalid", () => {
      render(<Select options={defaultOptions} error="Error" />);
      expect(screen.getByRole("combobox")).toHaveAttribute(
        "aria-invalid",
        "true",
      );
    });

    it("should show error instead of helper text", () => {
      render(
        <Select options={defaultOptions} helperText="Helper" error="Error" />,
      );
      expect(screen.getByText("Error")).toBeInTheDocument();
      expect(screen.queryByText("Helper")).not.toBeInTheDocument();
    });
  });

  describe("Helper Text", () => {
    it("should render helper text", () => {
      render(<Select options={defaultOptions} helperText="Pick one" />);
      expect(screen.getByText("Pick one")).toBeInTheDocument();
    });
  });

  describe("Sizes", () => {
    it("should render small size", () => {
      render(<Select options={defaultOptions} size="sm" />);
      expect(screen.getByRole("combobox")).toHaveClass("py-1", "text-sm");
    });

    it("should render medium size by default", () => {
      render(<Select options={defaultOptions} />);
      expect(screen.getByRole("combobox")).toHaveClass("py-2", "text-base");
    });

    it("should render large size", () => {
      render(<Select options={defaultOptions} size="lg" />);
      expect(screen.getByRole("combobox")).toHaveClass("py-3", "text-lg");
    });
  });

  describe("States", () => {
    it("should be disabled when disabled prop is true", () => {
      render(<Select options={defaultOptions} disabled />);
      expect(screen.getByRole("combobox")).toBeDisabled();
    });

    it("should have disabled styling", () => {
      render(<Select options={defaultOptions} disabled />);
      expect(screen.getByRole("combobox")).toHaveClass(
        "opacity-50",
        "cursor-not-allowed",
      );
    });

    it("should support disabled options", () => {
      const opts = [
        { value: "a", label: "A" },
        { value: "b", label: "B", disabled: true },
      ];
      render(<Select options={opts} />);
      expect(screen.getByRole("option", { name: "B" })).toBeDisabled();
    });
  });

  describe("Events", () => {
    it("should call onChange when value changes", () => {
      const handleChange = vi.fn();
      render(<Select options={defaultOptions} onChange={handleChange} />);
      fireEvent.change(screen.getByRole("combobox"), {
        target: { value: "banana" },
      });
      expect(handleChange).toHaveBeenCalled();
    });
  });

  describe("HTML attributes", () => {
    it("should pass through name attribute", () => {
      render(<Select options={defaultOptions} name="fruit" />);
      expect(screen.getByRole("combobox")).toHaveAttribute("name", "fruit");
    });

    it("should pass through data-testid", () => {
      render(<Select options={defaultOptions} data-testid="custom-select" />);
      expect(screen.getByTestId("custom-select")).toBeInTheDocument();
    });
  });
});
