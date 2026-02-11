import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { render, screen, fireEvent, act } from "@testing-library/react";
import { Tooltip } from "./Tooltip";

describe("Tooltip Component", () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  describe("Rendering", () => {
    it("should render trigger children", () => {
      render(
        <Tooltip content="Tooltip text">
          <button>Hover me</button>
        </Tooltip>,
      );
      expect(screen.getByText("Hover me")).toBeInTheDocument();
    });

    it("should not show tooltip by default", () => {
      render(
        <Tooltip content="Tooltip text">
          <button>Hover me</button>
        </Tooltip>,
      );
      expect(screen.queryByRole("tooltip")).not.toBeInTheDocument();
    });

    it("should show tooltip on hover after delay", () => {
      render(
        <Tooltip content="Tooltip text">
          <button>Hover me</button>
        </Tooltip>,
      );
      fireEvent.mouseEnter(screen.getByText("Hover me").parentElement!);
      act(() => {
        vi.advanceTimersByTime(200);
      });
      expect(screen.getByRole("tooltip")).toBeInTheDocument();
      expect(screen.getByText("Tooltip text")).toBeInTheDocument();
    });

    it("should hide tooltip on mouse leave", () => {
      render(
        <Tooltip content="Tooltip text">
          <button>Hover me</button>
        </Tooltip>,
      );
      const wrapper = screen.getByText("Hover me").parentElement!;
      fireEvent.mouseEnter(wrapper);
      act(() => {
        vi.advanceTimersByTime(200);
      });
      expect(screen.getByRole("tooltip")).toBeInTheDocument();
      fireEvent.mouseLeave(wrapper);
      act(() => {
        vi.advanceTimersByTime(0);
      });
      expect(screen.queryByRole("tooltip")).not.toBeInTheDocument();
    });
  });

  describe("Placement", () => {
    it("should apply top placement by default", () => {
      render(
        <Tooltip content="Tip" open>
          <button>Trigger</button>
        </Tooltip>,
      );
      expect(screen.getByRole("tooltip")).toHaveClass("bottom-full");
    });

    it("should apply bottom placement", () => {
      render(
        <Tooltip content="Tip" placement="bottom" open>
          <button>Trigger</button>
        </Tooltip>,
      );
      expect(screen.getByRole("tooltip")).toHaveClass("top-full");
    });

    it("should apply left placement", () => {
      render(
        <Tooltip content="Tip" placement="left" open>
          <button>Trigger</button>
        </Tooltip>,
      );
      expect(screen.getByRole("tooltip")).toHaveClass("right-full");
    });

    it("should apply right placement", () => {
      render(
        <Tooltip content="Tip" placement="right" open>
          <button>Trigger</button>
        </Tooltip>,
      );
      expect(screen.getByRole("tooltip")).toHaveClass("left-full");
    });
  });

  describe("Delay", () => {
    it("should respect custom show delay", () => {
      render(
        <Tooltip content="Tip" delayShow={500}>
          <button>Hover me</button>
        </Tooltip>,
      );
      const wrapper = screen.getByText("Hover me").parentElement!;
      fireEvent.mouseEnter(wrapper);
      act(() => {
        vi.advanceTimersByTime(499);
      });
      expect(screen.queryByRole("tooltip")).not.toBeInTheDocument();
      act(() => {
        vi.advanceTimersByTime(1);
      });
      expect(screen.getByRole("tooltip")).toBeInTheDocument();
    });

    it("should show instantly with delayShow=0", () => {
      render(
        <Tooltip content="Tip" delayShow={0}>
          <button>Hover me</button>
        </Tooltip>,
      );
      fireEvent.mouseEnter(screen.getByText("Hover me").parentElement!);
      act(() => {
        vi.advanceTimersByTime(0);
      });
      expect(screen.getByRole("tooltip")).toBeInTheDocument();
    });
  });

  describe("Controlled", () => {
    it("should show when open prop is true", () => {
      render(
        <Tooltip content="Tip" open>
          <button>Trigger</button>
        </Tooltip>,
      );
      expect(screen.getByRole("tooltip")).toBeInTheDocument();
    });

    it("should hide when open prop is false", () => {
      render(
        <Tooltip content="Tip" open={false}>
          <button>Trigger</button>
        </Tooltip>,
      );
      expect(screen.queryByRole("tooltip")).not.toBeInTheDocument();
    });
  });

  describe("Focus", () => {
    it("should show tooltip on focus", () => {
      render(
        <Tooltip content="Tip">
          <button>Focus me</button>
        </Tooltip>,
      );
      fireEvent.focus(screen.getByText("Focus me").parentElement!);
      act(() => {
        vi.advanceTimersByTime(200);
      });
      expect(screen.getByRole("tooltip")).toBeInTheDocument();
    });

    it("should hide tooltip on blur", () => {
      render(
        <Tooltip content="Tip">
          <button>Focus me</button>
        </Tooltip>,
      );
      const wrapper = screen.getByText("Focus me").parentElement!;
      fireEvent.focus(wrapper);
      act(() => {
        vi.advanceTimersByTime(200);
      });
      fireEvent.blur(wrapper);
      act(() => {
        vi.advanceTimersByTime(0);
      });
      expect(screen.queryByRole("tooltip")).not.toBeInTheDocument();
    });
  });

  describe("Accessibility", () => {
    it("should have tooltip role", () => {
      render(
        <Tooltip content="Tip" open>
          <button>Trigger</button>
        </Tooltip>,
      );
      expect(screen.getByRole("tooltip")).toBeInTheDocument();
    });
  });

  describe("Arrow", () => {
    it("should show arrow by default", () => {
      const { container } = render(
        <Tooltip content="Tip" open>
          <button>Trigger</button>
        </Tooltip>,
      );
      const arrow = container.querySelector('[aria-hidden="true"]');
      expect(arrow).toBeInTheDocument();
    });

    it("should hide arrow when arrow prop is false", () => {
      render(
        <Tooltip content="Tip" open arrow={false}>
          <button>Trigger</button>
        </Tooltip>,
      );
      const tooltip = screen.getByRole("tooltip");
      expect(
        tooltip.querySelector('[aria-hidden="true"]'),
      ).not.toBeInTheDocument();
    });
  });
});
