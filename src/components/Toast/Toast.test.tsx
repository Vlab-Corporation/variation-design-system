import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { render, screen, fireEvent, act } from "@testing-library/react";
import type { ReactElement } from "react";
import { ToastProvider, useToast } from "./Toast";

function TestTrigger({
  variant = "info" as const,
  message = "Test message",
  title,
  duration,
}: {
  variant?: "success" | "error" | "warning" | "info";
  message?: string;
  title?: string;
  duration?: number;
}) {
  const { addToast } = useToast();
  return (
    <button
      onClick={() => addToast({ variant, message, title, duration })}
      data-testid="trigger"
    >
      Add Toast
    </button>
  );
}

function renderWithProvider(
  ui: ReactElement,
  props?: { position?: "top-right" | "top-left" | "bottom-right" },
) {
  return render(<ToastProvider {...props}>{ui}</ToastProvider>);
}

describe("Toast Component", () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  describe("Rendering", () => {
    it("should render toast when triggered", () => {
      renderWithProvider(<TestTrigger />);
      fireEvent.click(screen.getByTestId("trigger"));
      expect(screen.getByText("Test message")).toBeInTheDocument();
    });

    it("should render toast with title", () => {
      renderWithProvider(<TestTrigger title="Success!" />);
      fireEvent.click(screen.getByTestId("trigger"));
      expect(screen.getByText("Success!")).toBeInTheDocument();
    });

    it("should render multiple toasts", () => {
      renderWithProvider(<TestTrigger />);
      const trigger = screen.getByTestId("trigger");
      fireEvent.click(trigger);
      fireEvent.click(trigger);
      expect(screen.getAllByRole("alert")).toHaveLength(2);
    });
  });

  describe("Variants", () => {
    it("should render success variant", () => {
      renderWithProvider(<TestTrigger variant="success" />);
      fireEvent.click(screen.getByTestId("trigger"));
      const toast = screen.getByRole("alert");
      expect(toast).toHaveClass("bg-success-50");
    });

    it("should render error variant", () => {
      renderWithProvider(<TestTrigger variant="error" />);
      fireEvent.click(screen.getByTestId("trigger"));
      const toast = screen.getByRole("alert");
      expect(toast).toHaveClass("bg-error-50");
    });

    it("should render warning variant", () => {
      renderWithProvider(<TestTrigger variant="warning" />);
      fireEvent.click(screen.getByTestId("trigger"));
      const toast = screen.getByRole("alert");
      expect(toast).toHaveClass("bg-warning-50");
    });

    it("should render info variant", () => {
      renderWithProvider(<TestTrigger variant="info" />);
      fireEvent.click(screen.getByTestId("trigger"));
      const toast = screen.getByRole("alert");
      expect(toast).toHaveClass("bg-info-50");
    });
  });

  describe("Auto Dismiss", () => {
    it("should auto-dismiss after default duration", () => {
      renderWithProvider(<TestTrigger />);
      fireEvent.click(screen.getByTestId("trigger"));
      expect(screen.getByRole("alert")).toBeInTheDocument();
      act(() => {
        vi.advanceTimersByTime(5000);
      });
      expect(screen.queryByRole("alert")).not.toBeInTheDocument();
    });

    it("should auto-dismiss after custom duration", () => {
      renderWithProvider(<TestTrigger duration={2000} />);
      fireEvent.click(screen.getByTestId("trigger"));
      act(() => {
        vi.advanceTimersByTime(1999);
      });
      expect(screen.getByRole("alert")).toBeInTheDocument();
      act(() => {
        vi.advanceTimersByTime(1);
      });
      expect(screen.queryByRole("alert")).not.toBeInTheDocument();
    });

    it("should not auto-dismiss when duration is 0", () => {
      renderWithProvider(<TestTrigger duration={0} />);
      fireEvent.click(screen.getByTestId("trigger"));
      act(() => {
        vi.advanceTimersByTime(10000);
      });
      expect(screen.getByRole("alert")).toBeInTheDocument();
    });
  });

  describe("Manual Dismiss", () => {
    it("should dismiss when close button is clicked", () => {
      renderWithProvider(<TestTrigger duration={0} />);
      fireEvent.click(screen.getByTestId("trigger"));
      expect(screen.getByRole("alert")).toBeInTheDocument();
      fireEvent.click(screen.getByLabelText("Dismiss"));
      expect(screen.queryByRole("alert")).not.toBeInTheDocument();
    });
  });

  describe("Max Toasts", () => {
    it("should limit visible toasts to maxToasts", () => {
      render(
        <ToastProvider maxToasts={2}>
          <TestTrigger />
        </ToastProvider>,
      );
      const trigger = screen.getByTestId("trigger");
      fireEvent.click(trigger);
      fireEvent.click(trigger);
      fireEvent.click(trigger);
      expect(screen.getAllByRole("alert")).toHaveLength(2);
    });
  });

  describe("Accessibility", () => {
    it("should have alert role on toasts", () => {
      renderWithProvider(<TestTrigger />);
      fireEvent.click(screen.getByTestId("trigger"));
      expect(screen.getByRole("alert")).toBeInTheDocument();
    });

    it("should have aria-live region", () => {
      renderWithProvider(<TestTrigger />);
      expect(screen.getByLabelText("Notifications")).toHaveAttribute(
        "aria-live",
        "polite",
      );
    });
  });

  describe("useToast Hook", () => {
    it("should throw when used outside ToastProvider", () => {
      const consoleError = vi
        .spyOn(console, "error")
        .mockImplementation(() => {});
      expect(() => {
        render(<TestTrigger />);
      }).toThrow("useToast must be used within a ToastProvider");
      consoleError.mockRestore();
    });
  });
});
