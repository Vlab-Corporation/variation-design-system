import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { EmptyState } from "./EmptyState";

describe("EmptyState Component", () => {
  describe("Rendering", () => {
    it("should render title", () => {
      render(<EmptyState title="No data" />);
      expect(screen.getByText("No data")).toBeInTheDocument();
    });

    it("should render description", () => {
      render(<EmptyState title="No data" description="Try again later" />);
      expect(screen.getByText("Try again later")).toBeInTheDocument();
    });

    it("should render icon", () => {
      render(
        <EmptyState
          title="No data"
          icon={<span data-testid="icon">icon</span>}
        />,
      );
      expect(screen.getByTestId("icon")).toBeInTheDocument();
    });

    it("should render action", () => {
      render(<EmptyState title="No data" action={<button>Create</button>} />);
      expect(screen.getByText("Create")).toBeInTheDocument();
    });
  });

  describe("Sizes", () => {
    it("should apply medium size by default", () => {
      const { container } = render(<EmptyState title="No data" />);
      expect(container.firstChild).toHaveClass("py-12");
    });

    it("should apply small size", () => {
      const { container } = render(<EmptyState title="No data" size="sm" />);
      expect(container.firstChild).toHaveClass("py-8");
    });

    it("should apply large size", () => {
      const { container } = render(<EmptyState title="No data" size="lg" />);
      expect(container.firstChild).toHaveClass("py-16");
    });
  });

  describe("HTML attributes", () => {
    it("should forward ref", () => {
      const ref = { current: null } as { current: HTMLDivElement | null };
      render(<EmptyState ref={ref} title="No data" />);
      expect(ref.current).toBeInstanceOf(HTMLElement);
    });

    it("should apply custom className", () => {
      const { container } = render(
        <EmptyState title="No data" className="custom" />,
      );
      expect(container.firstChild).toHaveClass("custom");
    });
  });
});
