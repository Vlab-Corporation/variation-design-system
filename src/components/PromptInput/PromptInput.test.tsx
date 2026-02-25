import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { PromptInput } from "./PromptInput";

describe("PromptInput Component", () => {
  describe("Rendering", () => {
    it("should render a textarea element", () => {
      render(<PromptInput />);
      expect(screen.getByRole("textbox")).toBeInTheDocument();
    });

    it("should render default placeholder", () => {
      render(<PromptInput />);
      expect(
        screen.getByPlaceholderText("메시지를 입력하세요"),
      ).toBeInTheDocument();
    });

    it("should render custom placeholder", () => {
      render(<PromptInput placeholder="Ask anything..." />);
      expect(
        screen.getByPlaceholderText("Ask anything..."),
      ).toBeInTheDocument();
    });

    it("should render send button", () => {
      render(<PromptInput />);
      expect(screen.getByRole("button", { name: "전송" })).toBeInTheDocument();
    });
  });

  describe("States", () => {
    it("should disable send button when input is empty", () => {
      render(<PromptInput />);
      expect(screen.getByRole("button", { name: "전송" })).toBeDisabled();
    });

    it("should enable send button when text is entered", () => {
      render(<PromptInput />);
      fireEvent.change(screen.getByRole("textbox"), {
        target: { value: "hello" },
      });
      expect(screen.getByRole("button", { name: "전송" })).toBeEnabled();
    });

    it("should apply active styles to send button when has value", () => {
      render(<PromptInput />);
      fireEvent.change(screen.getByRole("textbox"), {
        target: { value: "hello" },
      });
      expect(screen.getByRole("button", { name: "전송" })).toHaveClass(
        "bg-accent-600",
      );
    });

    it("should apply inactive styles to send button when empty", () => {
      render(<PromptInput />);
      expect(screen.getByRole("button", { name: "전송" })).toHaveClass(
        "bg-gray-200",
      );
    });

    it("should disable send button when loading", () => {
      render(<PromptInput loading />);
      fireEvent.change(screen.getByRole("textbox"), {
        target: { value: "hello" },
      });
      expect(screen.getByRole("button", { name: "전송" })).toBeDisabled();
    });

    it("should disable textarea when disabled", () => {
      render(<PromptInput disabled />);
      expect(screen.getByRole("textbox")).toBeDisabled();
    });
  });

  describe("Auto-expand", () => {
    it("should have single-line border-radius by default", () => {
      render(<PromptInput />);
      const container = screen.getByRole("textbox").parentElement;
      expect(container).toHaveClass("rounded-[40px]");
    });
  });

  describe("Events", () => {
    it("should call onSubmit on Enter key", () => {
      const handleSubmit = vi.fn();
      render(<PromptInput onSubmit={handleSubmit} />);
      const textarea = screen.getByRole("textbox");
      fireEvent.change(textarea, { target: { value: "hello" } });
      fireEvent.keyDown(textarea, { key: "Enter" });
      expect(handleSubmit).toHaveBeenCalledWith("hello");
    });

    it("should not call onSubmit on Shift+Enter", () => {
      const handleSubmit = vi.fn();
      render(<PromptInput onSubmit={handleSubmit} />);
      const textarea = screen.getByRole("textbox");
      fireEvent.change(textarea, { target: { value: "hello" } });
      fireEvent.keyDown(textarea, { key: "Enter", shiftKey: true });
      expect(handleSubmit).not.toHaveBeenCalled();
    });

    it("should call onSubmit on send button click", () => {
      const handleSubmit = vi.fn();
      render(<PromptInput onSubmit={handleSubmit} />);
      fireEvent.change(screen.getByRole("textbox"), {
        target: { value: "hello" },
      });
      fireEvent.click(screen.getByRole("button", { name: "전송" }));
      expect(handleSubmit).toHaveBeenCalledWith("hello");
    });

    it("should not submit when value is empty", () => {
      const handleSubmit = vi.fn();
      render(<PromptInput onSubmit={handleSubmit} />);
      fireEvent.keyDown(screen.getByRole("textbox"), { key: "Enter" });
      expect(handleSubmit).not.toHaveBeenCalled();
    });

    it("should clear input after submit in uncontrolled mode", () => {
      const handleSubmit = vi.fn();
      render(<PromptInput onSubmit={handleSubmit} />);
      const textarea = screen.getByRole("textbox");
      fireEvent.change(textarea, { target: { value: "hello" } });
      fireEvent.keyDown(textarea, { key: "Enter" });
      expect(textarea).toHaveValue("");
    });

    it("should call onChange handler", () => {
      const handleChange = vi.fn();
      render(<PromptInput onChange={handleChange} />);
      fireEvent.change(screen.getByRole("textbox"), {
        target: { value: "test" },
      });
      expect(handleChange).toHaveBeenCalled();
    });
  });

  describe("Accessibility", () => {
    it("should have default aria-label", () => {
      render(<PromptInput />);
      expect(screen.getByRole("textbox")).toHaveAttribute(
        "aria-label",
        "메시지 입력",
      );
    });

    it("should accept custom aria-label", () => {
      render(<PromptInput aria-label="Chat input" />);
      expect(screen.getByRole("textbox")).toHaveAttribute(
        "aria-label",
        "Chat input",
      );
    });

    it("should have aria-label on send button", () => {
      render(<PromptInput />);
      expect(screen.getByRole("button", { name: "전송" })).toBeInTheDocument();
    });
  });

  describe("Styling", () => {
    it("should apply className to container", () => {
      render(<PromptInput className="custom-class" />);
      const container = screen.getByRole("textbox").parentElement;
      expect(container).toHaveClass("custom-class");
    });

    it("should apply textareaClassName to textarea", () => {
      render(<PromptInput textareaClassName="textarea-custom" />);
      expect(screen.getByRole("textbox")).toHaveClass("textarea-custom");
    });
  });
});
