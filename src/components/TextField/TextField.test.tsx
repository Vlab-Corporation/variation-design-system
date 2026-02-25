import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { TextField } from "./TextField";

describe("TextField Component", () => {
  describe("Rendering", () => {
    it("should render an input element", () => {
      render(<TextField />);
      expect(screen.getByRole("textbox")).toBeInTheDocument();
    });

    it("should render with placeholder", () => {
      render(<TextField placeholder="이름을 입력해주세요." />);
      expect(
        screen.getByPlaceholderText("이름을 입력해주세요."),
      ).toBeInTheDocument();
    });

    it("should apply custom className to wrapper", () => {
      render(<TextField className="custom-class" />);
      const wrapper = screen.getByRole("textbox").closest(".custom-class");
      expect(wrapper).toBeInTheDocument();
    });

    it("should render as type text by default", () => {
      render(<TextField />);
      expect(screen.getByRole("textbox")).toHaveAttribute("type", "text");
    });
  });

  describe("Label", () => {
    it("should render label", () => {
      render(<TextField label="이름" />);
      expect(screen.getByText("이름")).toBeInTheDocument();
    });

    it("should associate label with input", () => {
      render(<TextField label="이름" id="name" />);
      expect(screen.getByLabelText("이름")).toBeInTheDocument();
    });
  });

  describe("Error State", () => {
    it("should render error message", () => {
      render(<TextField error="필수 답변입니다." />);
      expect(screen.getByText("필수 답변입니다.")).toBeInTheDocument();
    });

    it("should have error styling", () => {
      render(<TextField error="Error" />);
      expect(screen.getByRole("textbox")).toHaveClass("border-error-600");
    });

    it("should set aria-invalid", () => {
      render(<TextField error="Error" />);
      expect(screen.getByRole("textbox")).toHaveAttribute(
        "aria-invalid",
        "true",
      );
    });

    it("should show error instead of helper text", () => {
      render(<TextField helperText="Help" error="Error" />);
      expect(screen.getByText("Error")).toBeInTheDocument();
      expect(screen.queryByText("Help")).not.toBeInTheDocument();
    });
  });

  describe("Helper Text", () => {
    it("should render helper text", () => {
      render(<TextField helperText="도움말 텍스트" />);
      expect(screen.getByText("도움말 텍스트")).toBeInTheDocument();
    });
  });

  describe("Sizes", () => {
    it("should render small size", () => {
      render(<TextField size="sm" />);
      expect(screen.getByRole("textbox")).toHaveClass("h-[42px]");
    });

    it("should render medium size by default", () => {
      render(<TextField />);
      expect(screen.getByRole("textbox")).toHaveClass("h-[54px]");
    });

    it("should render large size", () => {
      render(<TextField size="lg" />);
      expect(screen.getByRole("textbox")).toHaveClass("h-[62px]");
    });
  });

  describe("States", () => {
    it("should be disabled", () => {
      render(<TextField disabled />);
      expect(screen.getByRole("textbox")).toBeDisabled();
    });

    it("should have disabled styling", () => {
      render(<TextField disabled />);
      expect(screen.getByRole("textbox")).toHaveClass(
        "cursor-not-allowed",
        "bg-gray-50",
      );
    });

    it("should have default background when unfocused", () => {
      render(<TextField />);
      expect(screen.getByRole("textbox")).toHaveClass("bg-gray-50");
    });
  });

  describe("Clear Button", () => {
    it("should not show clear button when empty", () => {
      render(<TextField />);
      expect(
        screen.queryByRole("button", { name: "입력 지우기" }),
      ).not.toBeInTheDocument();
    });

    it("should show clear button when controlled value is present", () => {
      render(<TextField value="류한희" onChange={() => {}} />);
      expect(
        screen.getByRole("button", { name: "입력 지우기" }),
      ).toBeInTheDocument();
    });

    it("should show clear button when uncontrolled value is typed", () => {
      render(<TextField defaultValue="류한희" />);
      expect(
        screen.getByRole("button", { name: "입력 지우기" }),
      ).toBeInTheDocument();
    });

    it("should not show clear button when disabled", () => {
      render(<TextField value="류한희" onChange={() => {}} disabled />);
      expect(
        screen.queryByRole("button", { name: "입력 지우기" }),
      ).not.toBeInTheDocument();
    });

    it("should not show clear button when clearable is false", () => {
      render(
        <TextField value="류한희" onChange={() => {}} clearable={false} />,
      );
      expect(
        screen.queryByRole("button", { name: "입력 지우기" }),
      ).not.toBeInTheDocument();
    });

    it("should call onClear when clear button is clicked", () => {
      const handleClear = vi.fn();
      render(<TextField defaultValue="류한희" onClear={handleClear} />);
      fireEvent.click(screen.getByRole("button", { name: "입력 지우기" }));
      expect(handleClear).toHaveBeenCalled();
    });

    it("should clear uncontrolled input value on clear", () => {
      render(<TextField defaultValue="류한희" />);
      fireEvent.click(screen.getByRole("button", { name: "입력 지우기" }));
      expect(screen.getByRole("textbox")).toHaveValue("");
    });
  });

  describe("Events", () => {
    it("should call onChange", () => {
      const handleChange = vi.fn();
      render(<TextField onChange={handleChange} />);
      fireEvent.change(screen.getByRole("textbox"), {
        target: { value: "test" },
      });
      expect(handleChange).toHaveBeenCalled();
    });
  });

  describe("HTML attributes", () => {
    it("should pass through data-testid", () => {
      render(<TextField data-testid="custom-textfield" />);
      expect(screen.getByTestId("custom-textfield")).toBeInTheDocument();
    });

    it("should support maxLength", () => {
      render(<TextField maxLength={10} />);
      expect(screen.getByRole("textbox")).toHaveAttribute("maxLength", "10");
    });
  });
});
