import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { Progress } from "./Progress";

describe("Progress Component", () => {
  describe("Rendering", () => {
    it("should render progressbar", () => {
      render(<Progress value={50} />);
      expect(screen.getByRole("progressbar")).toBeInTheDocument();
    });

    it("should set aria-valuenow", () => {
      render(<Progress value={75} />);
      expect(screen.getByRole("progressbar")).toHaveAttribute(
        "aria-valuenow",
        "75",
      );
    });

    it("should set aria-valuemin and aria-valuemax", () => {
      render(<Progress value={50} />);
      const bar = screen.getByRole("progressbar");
      expect(bar).toHaveAttribute("aria-valuemin", "0");
      expect(bar).toHaveAttribute("aria-valuemax", "100");
    });
  });

  describe("Value", () => {
    it("should render 0% width for value 0", () => {
      render(<Progress value={0} />);
      const inner = screen.getByRole("progressbar").firstChild as HTMLElement;
      expect(inner).toHaveStyle({ width: "0%" });
    });

    it("should render 50% width for value 50", () => {
      render(<Progress value={50} />);
      const inner = screen.getByRole("progressbar").firstChild as HTMLElement;
      expect(inner).toHaveStyle({ width: "50%" });
    });

    it("should render 100% width for value 100", () => {
      render(<Progress value={100} />);
      const inner = screen.getByRole("progressbar").firstChild as HTMLElement;
      expect(inner).toHaveStyle({ width: "100%" });
    });

    it("should clamp value above max", () => {
      render(<Progress value={150} />);
      const inner = screen.getByRole("progressbar").firstChild as HTMLElement;
      expect(inner).toHaveStyle({ width: "100%" });
    });

    it("should support custom max", () => {
      render(<Progress value={25} max={50} />);
      const inner = screen.getByRole("progressbar").firstChild as HTMLElement;
      expect(inner).toHaveStyle({ width: "50%" });
    });
  });

  describe("Sizes", () => {
    it("should apply medium size by default", () => {
      render(<Progress value={50} />);
      expect(screen.getByRole("progressbar")).toHaveClass("h-2.5");
    });

    it("should apply small size", () => {
      render(<Progress value={50} size="sm" />);
      expect(screen.getByRole("progressbar")).toHaveClass("h-1.5");
    });

    it("should apply large size", () => {
      render(<Progress value={50} size="lg" />);
      expect(screen.getByRole("progressbar")).toHaveClass("h-4");
    });
  });

  describe("Variants", () => {
    it("should apply default variant", () => {
      render(<Progress value={50} />);
      const inner = screen.getByRole("progressbar").firstChild as HTMLElement;
      expect(inner).toHaveClass("bg-primary-500");
    });

    it("should apply success variant", () => {
      render(<Progress value={50} variant="success" />);
      const inner = screen.getByRole("progressbar").firstChild as HTMLElement;
      expect(inner).toHaveClass("bg-green-500");
    });

    it("should apply error variant", () => {
      render(<Progress value={50} variant="error" />);
      const inner = screen.getByRole("progressbar").firstChild as HTMLElement;
      expect(inner).toHaveClass("bg-red-500");
    });
  });

  describe("Indeterminate", () => {
    it("should not have aria-valuenow when indeterminate", () => {
      render(<Progress indeterminate />);
      expect(
        screen.getByRole("progressbar").getAttribute("aria-valuenow"),
      ).toBeNull();
    });
  });

  describe("Label", () => {
    it("should show percentage label", () => {
      render(<Progress value={75} showLabel />);
      expect(screen.getByText("75%")).toBeInTheDocument();
    });
  });

  describe("HTML attributes", () => {
    it("should forward ref", () => {
      const ref = { current: null } as { current: HTMLDivElement | null };
      render(<Progress ref={ref} value={50} />);
      expect(ref.current).toBeInstanceOf(HTMLElement);
    });
  });
});
