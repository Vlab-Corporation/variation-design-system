import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { createRef } from "react";
import { LoadingDots } from "./LoadingDots";

describe("LoadingDots Component", () => {
  describe("Rendering", () => {
    it("should render with role status", () => {
      render(<LoadingDots />);
      expect(screen.getByRole("status")).toBeInTheDocument();
    });

    it("should have default accessible label", () => {
      render(<LoadingDots />);
      expect(screen.getByLabelText(/loading/i)).toBeInTheDocument();
    });

    it("should support custom aria-label", () => {
      render(<LoadingDots aria-label="Processing..." />);
      expect(screen.getByLabelText("Processing...")).toBeInTheDocument();
    });

    it("should render 3 dots", () => {
      render(<LoadingDots />);
      const container = screen.getByRole("status");
      const dots = container.querySelectorAll("span");
      expect(dots).toHaveLength(3);
    });

    it("should apply custom className", () => {
      render(<LoadingDots className="custom-class" />);
      expect(screen.getByRole("status")).toHaveClass("custom-class");
    });

    it("should forward ref", () => {
      const ref = createRef<HTMLDivElement>();
      render(<LoadingDots ref={ref} />);
      expect(ref.current).toBeInstanceOf(HTMLDivElement);
    });
  });

  describe("Sizes", () => {
    it("should render small size", () => {
      render(<LoadingDots size="sm" />);
      const container = screen.getByRole("status");
      expect(container).toHaveClass("w-4", "h-4");
      const dot = container.querySelector("span")!;
      expect(dot).toHaveClass("w-[3px]", "h-[3px]");
    });

    it("should render medium size by default", () => {
      render(<LoadingDots />);
      const container = screen.getByRole("status");
      expect(container).toHaveClass("w-6", "h-6");
      const dot = container.querySelector("span")!;
      expect(dot).toHaveClass("w-[5px]", "h-[5px]");
    });

    it("should render large size", () => {
      render(<LoadingDots size="lg" />);
      const container = screen.getByRole("status");
      expect(container).toHaveClass("w-8", "h-8");
      const dot = container.querySelector("span")!;
      expect(dot).toHaveClass("w-2", "h-2");
    });

    it("should render extra large size", () => {
      render(<LoadingDots size="xl" />);
      const container = screen.getByRole("status");
      expect(container).toHaveClass("w-12", "h-12");
      const dot = container.querySelector("span")!;
      expect(dot).toHaveClass("w-2.5", "h-2.5");
    });
  });

  describe("Colors", () => {
    it("should render primary color by default", () => {
      render(<LoadingDots />);
      const dot = screen.getByRole("status").querySelector("span")!;
      expect(dot).toHaveClass("bg-gray-900");
    });

    it("should render white color", () => {
      render(<LoadingDots color="white" />);
      const dot = screen.getByRole("status").querySelector("span")!;
      expect(dot).toHaveClass("bg-white");
    });

    it("should render current color", () => {
      render(<LoadingDots color="current" />);
      const dot = screen.getByRole("status").querySelector("span")!;
      expect(dot).toHaveClass("bg-current");
    });

    it("should render gray color", () => {
      render(<LoadingDots color="gray" />);
      const dot = screen.getByRole("status").querySelector("span")!;
      expect(dot).toHaveClass("bg-gray-400");
    });
  });

  describe("Animations", () => {
    it("should have dot-pulse animation by default", () => {
      render(<LoadingDots />);
      const dot = screen.getByRole("status").querySelector("span")!;
      expect(dot).toHaveClass("animate-dot-pulse");
    });

    it("should support slow animation", () => {
      render(<LoadingDots speed="slow" />);
      const dot = screen.getByRole("status").querySelector("span")!;
      expect(dot).toHaveClass("animate-dot-pulse-slow");
    });

    it("should support fast animation", () => {
      render(<LoadingDots speed="fast" />);
      const dot = screen.getByRole("status").querySelector("span")!;
      expect(dot).toHaveClass("animate-dot-pulse-fast");
    });

    it("should apply stagger delay to each dot", () => {
      render(<LoadingDots />);
      const dots = screen.getByRole("status").querySelectorAll("span");
      expect(dots[0]).toHaveStyle({ animationDelay: "0ms" });
      expect(dots[1]).toHaveStyle({ animationDelay: "160ms" });
      expect(dots[2]).toHaveStyle({ animationDelay: "320ms" });
    });

    it("should apply slow stagger delay", () => {
      render(<LoadingDots speed="slow" />);
      const dots = screen.getByRole("status").querySelectorAll("span");
      expect(dots[0]).toHaveStyle({ animationDelay: "0ms" });
      expect(dots[1]).toHaveStyle({ animationDelay: "240ms" });
      expect(dots[2]).toHaveStyle({ animationDelay: "480ms" });
    });

    it("should apply fast stagger delay", () => {
      render(<LoadingDots speed="fast" />);
      const dots = screen.getByRole("status").querySelectorAll("span");
      expect(dots[0]).toHaveStyle({ animationDelay: "0ms" });
      expect(dots[1]).toHaveStyle({ animationDelay: "100ms" });
      expect(dots[2]).toHaveStyle({ animationDelay: "200ms" });
    });
  });
});
