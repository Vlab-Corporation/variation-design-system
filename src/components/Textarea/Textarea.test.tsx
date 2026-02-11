import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { Textarea } from "./Textarea";

describe("Textarea Component", () => {
  describe("Rendering", () => {
    it("should render a textarea element", () => {
      render(<Textarea />);
      expect(screen.getByRole("textbox")).toBeInTheDocument();
    });

    it("should render with placeholder", () => {
      render(<Textarea placeholder="Enter text..." />);
      expect(screen.getByPlaceholderText("Enter text...")).toBeInTheDocument();
    });

    it("should apply custom className to wrapper", () => {
      render(<Textarea className="custom-class" />);
      const wrapper = screen.getByRole("textbox").parentElement;
      expect(wrapper).toHaveClass("custom-class");
    });
  });

  describe("Label", () => {
    it("should render label", () => {
      render(<Textarea label="Description" />);
      expect(screen.getByText("Description")).toBeInTheDocument();
    });

    it("should associate label with textarea", () => {
      render(<Textarea label="Description" id="desc" />);
      expect(screen.getByLabelText("Description")).toBeInTheDocument();
    });
  });

  describe("Error State", () => {
    it("should render error message", () => {
      render(<Textarea error="Required" />);
      expect(screen.getByText("Required")).toBeInTheDocument();
    });

    it("should have error styling", () => {
      render(<Textarea error="Error" />);
      expect(screen.getByRole("textbox")).toHaveClass("border-red-500");
    });

    it("should set aria-invalid", () => {
      render(<Textarea error="Error" />);
      expect(screen.getByRole("textbox")).toHaveAttribute(
        "aria-invalid",
        "true",
      );
    });

    it("should show error instead of helper text", () => {
      render(<Textarea helperText="Help" error="Error" />);
      expect(screen.getByText("Error")).toBeInTheDocument();
      expect(screen.queryByText("Help")).not.toBeInTheDocument();
    });
  });

  describe("Helper Text", () => {
    it("should render helper text", () => {
      render(<Textarea helperText="Write your message" />);
      expect(screen.getByText("Write your message")).toBeInTheDocument();
    });
  });

  describe("Sizes", () => {
    it("should render small size", () => {
      render(<Textarea size="sm" />);
      expect(screen.getByRole("textbox")).toHaveClass("text-sm");
    });

    it("should render medium size by default", () => {
      render(<Textarea />);
      expect(screen.getByRole("textbox")).toHaveClass("text-base");
    });

    it("should render large size", () => {
      render(<Textarea size="lg" />);
      expect(screen.getByRole("textbox")).toHaveClass("text-lg");
    });
  });

  describe("Resize", () => {
    it("should have vertical resize by default", () => {
      render(<Textarea />);
      expect(screen.getByRole("textbox")).toHaveClass("resize-y");
    });

    it("should support none resize", () => {
      render(<Textarea resize="none" />);
      expect(screen.getByRole("textbox")).toHaveClass("resize-none");
    });

    it("should support both resize", () => {
      render(<Textarea resize="both" />);
      expect(screen.getByRole("textbox")).toHaveClass("resize");
    });
  });

  describe("States", () => {
    it("should be disabled", () => {
      render(<Textarea disabled />);
      expect(screen.getByRole("textbox")).toBeDisabled();
    });

    it("should have disabled styling", () => {
      render(<Textarea disabled />);
      expect(screen.getByRole("textbox")).toHaveClass(
        "opacity-50",
        "cursor-not-allowed",
      );
    });
  });

  describe("Events", () => {
    it("should call onChange", () => {
      const handleChange = vi.fn();
      render(<Textarea onChange={handleChange} />);
      fireEvent.change(screen.getByRole("textbox"), {
        target: { value: "test" },
      });
      expect(handleChange).toHaveBeenCalled();
    });
  });

  describe("HTML attributes", () => {
    it("should support rows attribute", () => {
      render(<Textarea rows={5} />);
      expect(screen.getByRole("textbox")).toHaveAttribute("rows", "5");
    });

    it("should pass through data-testid", () => {
      render(<Textarea data-testid="custom-textarea" />);
      expect(screen.getByTestId("custom-textarea")).toBeInTheDocument();
    });
  });
});
