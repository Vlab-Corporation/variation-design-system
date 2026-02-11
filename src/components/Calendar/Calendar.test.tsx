import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { Calendar } from "./Calendar";

describe("Calendar Component", () => {
  describe("Rendering", () => {
    it("should render month and year", () => {
      render(<Calendar defaultValue={new Date(2025, 0, 15)} />);
      expect(screen.getByText(/January 2025/)).toBeInTheDocument();
    });

    it("should render weekday headers", () => {
      render(<Calendar />);
      expect(screen.getByText("Su")).toBeInTheDocument();
      expect(screen.getByText("Mo")).toBeInTheDocument();
      expect(screen.getByText("Sa")).toBeInTheDocument();
    });

    it("should render day numbers", () => {
      render(<Calendar defaultValue={new Date(2025, 0, 15)} />);
      expect(screen.getByText("15")).toBeInTheDocument();
      // Day "1" may appear multiple times (current + next month overflow)
      expect(screen.getAllByText("1").length).toBeGreaterThanOrEqual(1);
    });
  });

  describe("Navigation", () => {
    it("should navigate to previous month", () => {
      render(<Calendar defaultValue={new Date(2025, 1, 15)} />);
      expect(screen.getByText(/February 2025/)).toBeInTheDocument();
      fireEvent.click(screen.getByLabelText("Previous month"));
      expect(screen.getByText(/January 2025/)).toBeInTheDocument();
    });

    it("should navigate to next month", () => {
      render(<Calendar defaultValue={new Date(2025, 0, 15)} />);
      expect(screen.getByText(/January 2025/)).toBeInTheDocument();
      fireEvent.click(screen.getByLabelText("Next month"));
      expect(screen.getByText(/February 2025/)).toBeInTheDocument();
    });
  });

  describe("Date Selection", () => {
    it("should call onChange when date is clicked", () => {
      const handleChange = vi.fn();
      render(
        <Calendar
          defaultValue={new Date(2025, 0, 15)}
          onChange={handleChange}
        />,
      );
      fireEvent.click(screen.getByText("20"));
      expect(handleChange).toHaveBeenCalledOnce();
      expect(handleChange.mock.calls[0][0].getDate()).toBe(20);
    });

    it("should highlight selected date", () => {
      render(<Calendar defaultValue={new Date(2025, 0, 15)} />);
      const day15 = screen.getByText("15");
      expect(day15).toHaveAttribute("aria-selected", "true");
    });
  });

  describe("Controlled", () => {
    it("should support controlled value", () => {
      render(<Calendar value={new Date(2025, 5, 10)} />);
      expect(screen.getByText(/June 2025/)).toBeInTheDocument();
      // Day "10" may appear in both current and overflow months
      const day10 = screen
        .getAllByText("10")
        .find((el) => el.getAttribute("aria-selected") === "true");
      expect(day10).toBeDefined();
    });
  });

  describe("Navigation buttons", () => {
    it("should have previous month button", () => {
      render(<Calendar />);
      expect(screen.getByLabelText("Previous month")).toBeInTheDocument();
    });

    it("should have next month button", () => {
      render(<Calendar />);
      expect(screen.getByLabelText("Next month")).toBeInTheDocument();
    });
  });

  describe("HTML attributes", () => {
    it("should forward ref", () => {
      const ref = { current: null } as { current: HTMLDivElement | null };
      render(<Calendar ref={ref} />);
      expect(ref.current).toBeInstanceOf(HTMLElement);
    });

    it("should apply custom className", () => {
      const { container } = render(<Calendar className="custom" />);
      expect(container.firstChild).toHaveClass("custom");
    });
  });
});
