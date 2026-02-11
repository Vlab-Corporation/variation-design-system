import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { Modal } from "./Modal";

describe("Modal Component", () => {
  describe("Rendering", () => {
    it("should render when open is true", () => {
      render(
        <Modal open onClose={() => {}}>
          Modal Content
        </Modal>,
      );
      expect(screen.getByText("Modal Content")).toBeInTheDocument();
    });

    it("should not render when open is false", () => {
      render(
        <Modal open={false} onClose={() => {}}>
          Modal Content
        </Modal>,
      );
      expect(screen.queryByText("Modal Content")).not.toBeInTheDocument();
    });

    it("should render title", () => {
      render(
        <Modal open onClose={() => {}} title="My Modal">
          Content
        </Modal>,
      );
      expect(screen.getByText("My Modal")).toBeInTheDocument();
    });

    it("should render footer", () => {
      render(
        <Modal open onClose={() => {}} footer={<button>Save</button>}>
          Content
        </Modal>,
      );
      expect(screen.getByText("Save")).toBeInTheDocument();
    });

    it("should render close button by default", () => {
      render(
        <Modal open onClose={() => {}} title="Test">
          Content
        </Modal>,
      );
      expect(screen.getByLabelText("Close")).toBeInTheDocument();
    });

    it("should hide close button when showCloseButton is false", () => {
      render(
        <Modal open onClose={() => {}} showCloseButton={false} title="Test">
          Content
        </Modal>,
      );
      expect(screen.queryByLabelText("Close")).not.toBeInTheDocument();
    });
  });

  describe("Sizes", () => {
    it("should apply medium size by default", () => {
      render(
        <Modal open onClose={() => {}}>
          Content
        </Modal>,
      );
      expect(screen.getByRole("dialog")).toHaveClass("max-w-md");
    });

    it("should apply large size", () => {
      render(
        <Modal open onClose={() => {}} size="lg">
          Content
        </Modal>,
      );
      expect(screen.getByRole("dialog")).toHaveClass("max-w-lg");
    });

    it("should apply small size", () => {
      render(
        <Modal open onClose={() => {}} size="sm">
          Content
        </Modal>,
      );
      expect(screen.getByRole("dialog")).toHaveClass("max-w-sm");
    });
  });

  describe("Close Behavior", () => {
    it("should call onClose when close button is clicked", () => {
      const handleClose = vi.fn();
      render(
        <Modal open onClose={handleClose} title="Test">
          Content
        </Modal>,
      );
      fireEvent.click(screen.getByLabelText("Close"));
      expect(handleClose).toHaveBeenCalled();
    });

    it("should call onClose when Escape is pressed", () => {
      const handleClose = vi.fn();
      render(
        <Modal open onClose={handleClose}>
          Content
        </Modal>,
      );
      fireEvent.keyDown(document, { key: "Escape" });
      expect(handleClose).toHaveBeenCalled();
    });

    it("should not call onClose on Escape when closeOnEscape is false", () => {
      const handleClose = vi.fn();
      render(
        <Modal open onClose={handleClose} closeOnEscape={false}>
          Content
        </Modal>,
      );
      fireEvent.keyDown(document, { key: "Escape" });
      expect(handleClose).not.toHaveBeenCalled();
    });
  });

  describe("Accessibility", () => {
    it("should have dialog role", () => {
      render(
        <Modal open onClose={() => {}}>
          Content
        </Modal>,
      );
      expect(screen.getByRole("dialog")).toBeInTheDocument();
    });

    it("should have aria-modal attribute", () => {
      render(
        <Modal open onClose={() => {}}>
          Content
        </Modal>,
      );
      expect(screen.getByRole("dialog")).toHaveAttribute("aria-modal", "true");
    });

    it("should have aria-label from title", () => {
      render(
        <Modal open onClose={() => {}} title="My Dialog">
          Content
        </Modal>,
      );
      expect(screen.getByRole("dialog")).toHaveAttribute(
        "aria-label",
        "My Dialog",
      );
    });
  });

  describe("Scroll Lock", () => {
    it("should lock body scroll when open", () => {
      render(
        <Modal open onClose={() => {}}>
          Content
        </Modal>,
      );
      expect(document.body.style.overflow).toBe("hidden");
    });

    it("should restore body scroll when closed", () => {
      const { rerender } = render(
        <Modal open onClose={() => {}}>
          Content
        </Modal>,
      );
      rerender(
        <Modal open={false} onClose={() => {}}>
          Content
        </Modal>,
      );
      expect(document.body.style.overflow).toBe("");
    });
  });
});
