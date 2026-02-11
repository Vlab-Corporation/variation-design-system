import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { Skeleton } from "./Skeleton";

describe("Skeleton Component", () => {
  describe("Rendering", () => {
    it("should render with status role", () => {
      render(<Skeleton />);
      expect(screen.getByRole("status")).toBeInTheDocument();
    });

    it("should have loading aria-label", () => {
      render(<Skeleton />);
      expect(screen.getByRole("status")).toHaveAttribute(
        "aria-label",
        "Loading",
      );
    });
  });

  describe("Variants", () => {
    it("should apply text variant by default", () => {
      render(<Skeleton />);
      expect(screen.getByRole("status")).toHaveClass("rounded-md");
    });

    it("should apply circular variant", () => {
      render(<Skeleton variant="circular" />);
      expect(screen.getByRole("status")).toHaveClass("rounded-full");
    });

    it("should apply rectangular variant", () => {
      render(<Skeleton variant="rectangular" />);
      expect(screen.getByRole("status")).toHaveClass("rounded-card");
    });
  });

  describe("Custom Dimensions", () => {
    it("should apply width as number", () => {
      render(<Skeleton width={200} />);
      expect(screen.getByRole("status")).toHaveStyle({ width: "200px" });
    });

    it("should apply width as string", () => {
      render(<Skeleton width="50%" />);
      expect(screen.getByRole("status")).toHaveStyle({ width: "50%" });
    });

    it("should apply height as number", () => {
      render(<Skeleton height={40} />);
      expect(screen.getByRole("status")).toHaveStyle({ height: "40px" });
    });

    it("should apply height as string", () => {
      render(<Skeleton height="100px" />);
      expect(screen.getByRole("status")).toHaveStyle({ height: "100px" });
    });
  });

  describe("Animation", () => {
    it("should have pulse animation", () => {
      render(<Skeleton />);
      expect(screen.getByRole("status")).toHaveClass("animate-pulse");
    });
  });

  describe("HTML attributes", () => {
    it("should forward ref", () => {
      const ref = { current: null } as { current: HTMLDivElement | null };
      render(<Skeleton ref={ref} />);
      expect(ref.current).toBeInstanceOf(HTMLElement);
    });

    it("should apply custom className", () => {
      render(<Skeleton className="custom" />);
      expect(screen.getByRole("status")).toHaveClass("custom");
    });

    it("should merge inline styles", () => {
      render(<Skeleton width={100} style={{ opacity: 0.5 }} />);
      const el = screen.getByRole("status");
      expect(el).toHaveStyle({ width: "100px", opacity: "0.5" });
    });
  });
});
