import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { Separator } from "./Separator";

describe("Separator Component", () => {
  describe("Rendering", () => {
    it("should render separator", () => {
      render(<Separator />);
      expect(screen.getByRole("separator")).toBeInTheDocument();
    });
  });

  describe("Orientation", () => {
    it("should be horizontal by default", () => {
      render(<Separator />);
      const el = screen.getByRole("separator");
      expect(el).toHaveClass("w-full", "h-px");
      expect(el).toHaveAttribute("aria-orientation", "horizontal");
    });

    it("should apply vertical orientation", () => {
      render(<Separator orientation="vertical" />);
      const el = screen.getByRole("separator");
      expect(el).toHaveClass("h-full", "w-px");
      expect(el).toHaveAttribute("aria-orientation", "vertical");
    });
  });

  describe("Styling", () => {
    it("should have background color", () => {
      render(<Separator />);
      expect(screen.getByRole("separator")).toHaveClass("bg-gray-200");
    });

    it("should apply custom className", () => {
      render(<Separator className="my-4" />);
      expect(screen.getByRole("separator")).toHaveClass("my-4");
    });
  });

  describe("HTML attributes", () => {
    it("should forward ref", () => {
      const ref = { current: null } as { current: HTMLDivElement | null };
      render(<Separator ref={ref} />);
      expect(ref.current).toBeInstanceOf(HTMLElement);
    });

    it("should pass through data attributes", () => {
      render(<Separator data-testid="my-sep" />);
      expect(screen.getByTestId("my-sep")).toBeInTheDocument();
    });
  });
});
