import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { Radio, RadioGroup } from "./Radio";

describe("Radio Component", () => {
  describe("Rendering", () => {
    it("should render a radio input", () => {
      render(<Radio name="test" />);
      expect(screen.getByRole("radio")).toBeInTheDocument();
    });

    it("should render with label", () => {
      render(<Radio name="test" label="Option A" />);
      expect(screen.getByText("Option A")).toBeInTheDocument();
    });

    it("should render with description", () => {
      render(<Radio name="test" label="Option A" description="First option" />);
      expect(screen.getByText("First option")).toBeInTheDocument();
    });
  });

  describe("Label Association", () => {
    it("should associate label with radio via htmlFor", () => {
      render(<Radio name="test" label="Option A" id="opt-a" />);
      expect(screen.getByLabelText("Option A")).toBeInTheDocument();
    });

    it("should generate unique id if not provided", () => {
      render(<Radio name="test" label="Option A" />);
      const radio = screen.getByRole("radio");
      expect(radio).toHaveAttribute("id");
    });
  });

  describe("Sizes", () => {
    it("should render small size", () => {
      render(<Radio name="test" size="sm" />);
      expect(screen.getByRole("radio")).toHaveClass("h-3.5", "w-3.5");
    });

    it("should render medium size by default", () => {
      render(<Radio name="test" />);
      expect(screen.getByRole("radio")).toHaveClass("h-4", "w-4");
    });

    it("should render large size", () => {
      render(<Radio name="test" size="lg" />);
      expect(screen.getByRole("radio")).toHaveClass("h-5", "w-5");
    });
  });

  describe("States", () => {
    it("should be disabled when disabled prop is true", () => {
      render(<Radio name="test" disabled />);
      expect(screen.getByRole("radio")).toBeDisabled();
    });

    it("should have disabled styling", () => {
      render(<Radio name="test" disabled />);
      expect(screen.getByRole("radio")).toHaveClass(
        "opacity-50",
        "cursor-not-allowed",
      );
    });
  });

  describe("Events", () => {
    it("should call onChange when clicked", () => {
      const handleChange = vi.fn();
      render(<Radio name="test" onChange={handleChange} />);
      fireEvent.click(screen.getByRole("radio"));
      expect(handleChange).toHaveBeenCalled();
    });
  });
});

describe("RadioGroup Component", () => {
  describe("Rendering", () => {
    it("should render radiogroup role", () => {
      render(
        <RadioGroup name="group">
          <Radio value="a" label="A" />
          <Radio value="b" label="B" />
        </RadioGroup>,
      );
      expect(screen.getByRole("radiogroup")).toBeInTheDocument();
    });

    it("should render all radio children", () => {
      render(
        <RadioGroup name="group">
          <Radio value="a" label="A" />
          <Radio value="b" label="B" />
          <Radio value="c" label="C" />
        </RadioGroup>,
      );
      expect(screen.getAllByRole("radio")).toHaveLength(3);
    });

    it("should render group label", () => {
      render(
        <RadioGroup name="group" label="Select option">
          <Radio value="a" label="A" />
        </RadioGroup>,
      );
      expect(screen.getByText("Select option")).toBeInTheDocument();
    });
  });

  describe("Context Propagation", () => {
    it("should pass name to all children", () => {
      render(
        <RadioGroup name="test-group">
          <Radio value="a" label="A" />
          <Radio value="b" label="B" />
        </RadioGroup>,
      );
      const radios = screen.getAllByRole("radio");
      radios.forEach((radio) => {
        expect(radio).toHaveAttribute("name", "test-group");
      });
    });

    it("should check the radio matching group value", () => {
      render(
        <RadioGroup name="group" value="b">
          <Radio value="a" label="A" />
          <Radio value="b" label="B" />
        </RadioGroup>,
      );
      expect(screen.getByLabelText("A")).not.toBeChecked();
      expect(screen.getByLabelText("B")).toBeChecked();
    });

    it("should call onChange with value when radio is clicked", () => {
      const handleChange = vi.fn();
      render(
        <RadioGroup name="group" value="a" onChange={handleChange}>
          <Radio value="a" label="A" />
          <Radio value="b" label="B" />
        </RadioGroup>,
      );
      fireEvent.click(screen.getByLabelText("B"));
      expect(handleChange).toHaveBeenCalledWith("b");
    });

    it("should disable all radios when group is disabled", () => {
      render(
        <RadioGroup name="group" disabled>
          <Radio value="a" label="A" />
          <Radio value="b" label="B" />
        </RadioGroup>,
      );
      const radios = screen.getAllByRole("radio");
      radios.forEach((radio) => {
        expect(radio).toBeDisabled();
      });
    });

    it("should pass size to all children", () => {
      render(
        <RadioGroup name="group" size="lg">
          <Radio value="a" label="A" />
          <Radio value="b" label="B" />
        </RadioGroup>,
      );
      const radios = screen.getAllByRole("radio");
      radios.forEach((radio) => {
        expect(radio).toHaveClass("h-5", "w-5");
      });
    });
  });

  describe("Orientation", () => {
    it("should render vertical by default", () => {
      render(
        <RadioGroup name="group">
          <Radio value="a" label="A" />
        </RadioGroup>,
      );
      expect(screen.getByRole("radiogroup")).toHaveClass("flex-col");
    });

    it("should render horizontal", () => {
      render(
        <RadioGroup name="group" orientation="horizontal">
          <Radio value="a" label="A" />
        </RadioGroup>,
      );
      expect(screen.getByRole("radiogroup")).toHaveClass("flex-row");
    });
  });

  describe("Accessibility", () => {
    it("should have aria-label from group label", () => {
      render(
        <RadioGroup name="group" label="Options">
          <Radio value="a" label="A" />
        </RadioGroup>,
      );
      expect(screen.getByRole("radiogroup")).toHaveAttribute(
        "aria-label",
        "Options",
      );
    });
  });
});
