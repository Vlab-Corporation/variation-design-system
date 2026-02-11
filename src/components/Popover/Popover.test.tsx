import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { Popover } from "./Popover";

describe("Popover Component", () => {
  describe("Rendering", () => {
    it("should render trigger", () => {
      render(
        <Popover content="Popover content">
          <button>Trigger</button>
        </Popover>,
      );
      expect(screen.getByText("Trigger")).toBeInTheDocument();
    });

    it("should not show content by default", () => {
      render(
        <Popover content="Popover content">
          <button>Trigger</button>
        </Popover>,
      );
      expect(screen.queryByText("Popover content")).not.toBeInTheDocument();
    });
  });

  describe("Open/Close", () => {
    it("should show content on trigger click", () => {
      render(
        <Popover content="Popover content">
          <button>Trigger</button>
        </Popover>,
      );
      fireEvent.click(screen.getByText("Trigger"));
      expect(screen.getByText("Popover content")).toBeInTheDocument();
    });

    it("should hide content on second click", () => {
      render(
        <Popover content="Popover content">
          <button>Trigger</button>
        </Popover>,
      );
      fireEvent.click(screen.getByText("Trigger"));
      fireEvent.click(screen.getByText("Trigger"));
      expect(screen.queryByText("Popover content")).not.toBeInTheDocument();
    });

    it("should close on Escape", () => {
      render(
        <Popover content="Popover content">
          <button>Trigger</button>
        </Popover>,
      );
      fireEvent.click(screen.getByText("Trigger"));
      expect(screen.getByText("Popover content")).toBeInTheDocument();
      fireEvent.keyDown(document, { key: "Escape" });
      expect(screen.queryByText("Popover content")).not.toBeInTheDocument();
    });

    it("should close on outside click", () => {
      render(
        <div>
          <Popover content="Popover content">
            <button>Trigger</button>
          </Popover>
          <button>Outside</button>
        </div>,
      );
      fireEvent.click(screen.getByText("Trigger"));
      expect(screen.getByText("Popover content")).toBeInTheDocument();
      fireEvent.mouseDown(screen.getByText("Outside"));
      expect(screen.queryByText("Popover content")).not.toBeInTheDocument();
    });
  });

  describe("Controlled Mode", () => {
    it("should support controlled open state", () => {
      render(
        <Popover content="Popover content" open={true}>
          <button>Trigger</button>
        </Popover>,
      );
      expect(screen.getByText("Popover content")).toBeInTheDocument();
    });

    it("should call onOpenChange", () => {
      const handleOpenChange = vi.fn();
      render(
        <Popover content="Popover content" onOpenChange={handleOpenChange}>
          <button>Trigger</button>
        </Popover>,
      );
      fireEvent.click(screen.getByText("Trigger"));
      expect(handleOpenChange).toHaveBeenCalledWith(true);
    });
  });

  describe("Placement", () => {
    it("should apply bottom placement by default", () => {
      render(
        <Popover content="Popover content" open={true}>
          <button>Trigger</button>
        </Popover>,
      );
      expect(screen.getByRole("dialog")).toHaveClass("top-full");
    });

    it("should apply top placement", () => {
      render(
        <Popover content="Popover content" open={true} placement="top">
          <button>Trigger</button>
        </Popover>,
      );
      expect(screen.getByRole("dialog")).toHaveClass("bottom-full");
    });
  });

  describe("Accessibility", () => {
    it("should have dialog role when open", () => {
      render(
        <Popover content="Popover content" open={true}>
          <button>Trigger</button>
        </Popover>,
      );
      expect(screen.getByRole("dialog")).toBeInTheDocument();
    });
  });
});
