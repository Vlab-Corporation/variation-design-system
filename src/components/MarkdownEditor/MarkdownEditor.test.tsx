import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import {
  MarkdownEditor,
  MarkdownToolbar,
  MarkdownPreview,
  MarkdownFormatButton,
} from "./MarkdownEditor";

describe("MarkdownEditor Component", () => {
  describe("MarkdownEditor", () => {
    it("should render textarea", () => {
      render(<MarkdownEditor data-testid="editor" />);
      expect(screen.getByRole("textbox")).toBeInTheDocument();
    });

    it("should call onChange when typing", () => {
      const onChange = vi.fn();
      render(<MarkdownEditor onChange={onChange} />);

      fireEvent.change(screen.getByRole("textbox"), {
        target: { value: "# Hello" },
      });
      expect(onChange).toHaveBeenCalledWith("# Hello");
    });

    it("should support placeholder", () => {
      render(<MarkdownEditor placeholder="Write something..." />);
      expect(
        screen.getByPlaceholderText("Write something..."),
      ).toBeInTheDocument();
    });

    it("should support controlled value", () => {
      render(<MarkdownEditor value="# Test" />);
      expect(screen.getByRole("textbox")).toHaveValue("# Test");
    });
  });

  describe("MarkdownToolbar", () => {
    it("should render toolbar", () => {
      render(<MarkdownToolbar onFormat={() => {}} data-testid="toolbar" />);
      expect(screen.getByTestId("toolbar")).toBeInTheDocument();
    });

    it("should have formatting buttons", () => {
      render(<MarkdownToolbar onFormat={() => {}} />);
      expect(screen.getByRole("button", { name: /bold/i })).toBeInTheDocument();
      expect(
        screen.getByRole("button", { name: /italic/i }),
      ).toBeInTheDocument();
    });

    it("should call onFormat with format type", () => {
      const onFormat = vi.fn();
      render(<MarkdownToolbar onFormat={onFormat} />);

      fireEvent.click(screen.getByRole("button", { name: /bold/i }));
      expect(onFormat).toHaveBeenCalledWith("bold");
    });
  });

  describe("MarkdownPreview", () => {
    it("should render preview container", () => {
      render(<MarkdownPreview content="# Hello" data-testid="preview" />);
      expect(screen.getByTestId("preview")).toBeInTheDocument();
    });

    it("should have prose styling", () => {
      render(<MarkdownPreview content="# Hello" data-testid="preview" />);
      expect(screen.getByTestId("preview")).toHaveClass("prose");
    });
  });

  describe("MarkdownFormatButton", () => {
    it("should render format button", () => {
      render(<MarkdownFormatButton format="bold" onClick={() => {}} />);
      expect(screen.getByRole("button")).toBeInTheDocument();
    });

    it("should be keyboard accessible", () => {
      const onClick = vi.fn();
      render(<MarkdownFormatButton format="bold" onClick={onClick} />);

      fireEvent.keyDown(screen.getByRole("button"), { key: "Enter" });
      expect(onClick).toHaveBeenCalled();
    });
  });

  describe("Accessibility", () => {
    it("should have proper aria-label on editor", () => {
      render(<MarkdownEditor aria-label="Content editor" />);
      expect(screen.getByRole("textbox")).toHaveAttribute(
        "aria-label",
        "Content editor",
      );
    });
  });
});
