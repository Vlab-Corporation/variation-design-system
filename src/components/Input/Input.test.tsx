import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { Input } from "./Input";

describe("Input Component", () => {
  describe("Rendering", () => {
    it("should render an input element", () => {
      render(<Input />);
      expect(screen.getByRole("textbox")).toBeInTheDocument();
    });

    it("should render with placeholder", () => {
      render(<Input placeholder="Enter text..." />);
      expect(screen.getByPlaceholderText("Enter text...")).toBeInTheDocument();
    });

    it("should apply custom className to wrapper", () => {
      render(<Input className="custom-class" />);
      const wrapper = screen.getByRole("textbox").parentElement;
      expect(wrapper).toHaveClass("custom-class");
    });

    it("should apply inputClassName to input element", () => {
      render(<Input inputClassName="input-custom" />);
      expect(screen.getByRole("textbox")).toHaveClass("input-custom");
    });
  });

  describe("Label", () => {
    it("should render label when provided", () => {
      render(<Input label="Email" />);
      expect(screen.getByText("Email")).toBeInTheDocument();
    });

    it("should associate label with input", () => {
      render(<Input label="Email" id="email-input" />);
      const input = screen.getByLabelText("Email");
      expect(input).toBeInTheDocument();
    });

    it("should generate unique id if not provided", () => {
      render(<Input label="Username" />);
      const input = screen.getByLabelText("Username");
      expect(input).toHaveAttribute("id");
    });
  });

  describe("Helper Text", () => {
    it("should render helper text when provided", () => {
      render(<Input helperText="Enter your email address" />);
      expect(screen.getByText("Enter your email address")).toBeInTheDocument();
    });

    it("should have correct styling for helper text", () => {
      render(<Input helperText="Helper" />);
      const helper = screen.getByText("Helper");
      expect(helper).toHaveClass("text-gray-500");
      expect(helper).toHaveClass("text-sm");
    });
  });

  describe("Error State", () => {
    it("should render error message when provided", () => {
      render(<Input error="This field is required" />);
      expect(screen.getByText("This field is required")).toBeInTheDocument();
    });

    it("should have error styling on input", () => {
      render(<Input error="Error" />);
      const input = screen.getByRole("textbox");
      expect(input).toHaveClass("border-red-500");
    });

    it("should have error styling on error message", () => {
      render(<Input error="Error message" />);
      const error = screen.getByText("Error message");
      expect(error).toHaveClass("text-red-500");
    });

    it("should show error instead of helper text when both provided", () => {
      render(<Input helperText="Helper" error="Error" />);
      expect(screen.getByText("Error")).toBeInTheDocument();
      expect(screen.queryByText("Helper")).not.toBeInTheDocument();
    });

    it("should set aria-invalid when error is present", () => {
      render(<Input error="Error" />);
      expect(screen.getByRole("textbox")).toHaveAttribute(
        "aria-invalid",
        "true",
      );
    });

    it("should associate error message with input via aria-describedby", () => {
      render(<Input error="Error message" id="test-input" />);
      const input = screen.getByRole("textbox");
      expect(input).toHaveAttribute("aria-describedby", "test-input-error");
    });
  });

  describe("Sizes", () => {
    it("should render small size", () => {
      render(<Input size="sm" />);
      const input = screen.getByRole("textbox");
      expect(input).toHaveClass("px-2");
      expect(input).toHaveClass("py-1");
      expect(input).toHaveClass("text-sm");
    });

    it("should render medium size by default", () => {
      render(<Input />);
      const input = screen.getByRole("textbox");
      expect(input).toHaveClass("px-3");
      expect(input).toHaveClass("py-2");
    });

    it("should render large size", () => {
      render(<Input size="lg" />);
      const input = screen.getByRole("textbox");
      expect(input).toHaveClass("px-4");
      expect(input).toHaveClass("py-3");
      expect(input).toHaveClass("text-lg");
    });
  });

  describe("States", () => {
    it("should be disabled when disabled prop is true", () => {
      render(<Input disabled />);
      expect(screen.getByRole("textbox")).toBeDisabled();
    });

    it("should have disabled styling", () => {
      render(<Input disabled />);
      const input = screen.getByRole("textbox");
      expect(input).toHaveClass("opacity-50");
      expect(input).toHaveClass("cursor-not-allowed");
    });

    it("should support readOnly", () => {
      render(<Input readOnly value="Read only value" />);
      expect(screen.getByRole("textbox")).toHaveAttribute("readonly");
    });
  });

  describe("Events", () => {
    it("should call onChange when value changes", () => {
      const handleChange = vi.fn();
      render(<Input onChange={handleChange} />);
      fireEvent.change(screen.getByRole("textbox"), {
        target: { value: "test" },
      });
      expect(handleChange).toHaveBeenCalled();
    });

    it("should call onFocus when focused", () => {
      const handleFocus = vi.fn();
      render(<Input onFocus={handleFocus} />);
      fireEvent.focus(screen.getByRole("textbox"));
      expect(handleFocus).toHaveBeenCalled();
    });

    it("should call onBlur when blurred", () => {
      const handleBlur = vi.fn();
      render(<Input onBlur={handleBlur} />);
      const input = screen.getByRole("textbox");
      fireEvent.focus(input);
      fireEvent.blur(input);
      expect(handleBlur).toHaveBeenCalled();
    });
  });

  describe("Animations", () => {
    it("should have transition for focus state", () => {
      render(<Input />);
      const input = screen.getByRole("textbox");
      expect(input).toHaveClass("transition-all");
      expect(input).toHaveClass("duration-200");
    });

    it("should have focus ring animation", () => {
      render(<Input />);
      const input = screen.getByRole("textbox");
      expect(input).toHaveClass("focus:ring-2");
      expect(input).toHaveClass("focus:ring-accent-500/20");
    });
  });

  describe("HTML attributes", () => {
    it("should support type attribute", () => {
      render(<Input type="email" />);
      expect(screen.getByRole("textbox")).toHaveAttribute("type", "email");
    });

    it("should support password type", () => {
      render(<Input type="password" placeholder="Password" />);
      const input = screen.getByPlaceholderText("Password");
      expect(input).toHaveAttribute("type", "password");
    });

    it("should support required attribute", () => {
      render(<Input required />);
      expect(screen.getByRole("textbox")).toBeRequired();
    });

    it("should support maxLength", () => {
      render(<Input maxLength={100} />);
      expect(screen.getByRole("textbox")).toHaveAttribute("maxLength", "100");
    });

    it("should pass through additional HTML attributes", () => {
      render(<Input data-testid="custom-input" autoComplete="off" />);
      const input = screen.getByTestId("custom-input");
      expect(input).toHaveAttribute("autocomplete", "off");
    });
  });
});
