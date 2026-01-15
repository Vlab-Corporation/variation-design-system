import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { Spinner } from "./Spinner";

describe("Spinner Component", () => {
  describe("Rendering", () => {
    it("should render spinner element", () => {
      render(<Spinner />);
      expect(screen.getByRole("status")).toBeInTheDocument();
    });

    it("should have accessible label", () => {
      render(<Spinner />);
      expect(screen.getByLabelText(/loading/i)).toBeInTheDocument();
    });

    it("should apply custom className", () => {
      render(<Spinner className="custom-class" />);
      expect(screen.getByRole("status")).toHaveClass("custom-class");
    });

    it("should support custom aria-label", () => {
      render(<Spinner aria-label="Processing..." />);
      expect(screen.getByLabelText("Processing...")).toBeInTheDocument();
    });
  });

  describe("Sizes", () => {
    it("should render small size", () => {
      render(<Spinner size="sm" />);
      const spinner = screen.getByRole("status");
      expect(spinner).toHaveClass("w-4");
      expect(spinner).toHaveClass("h-4");
    });

    it("should render medium size by default", () => {
      render(<Spinner />);
      const spinner = screen.getByRole("status");
      expect(spinner).toHaveClass("w-6");
      expect(spinner).toHaveClass("h-6");
    });

    it("should render large size", () => {
      render(<Spinner size="lg" />);
      const spinner = screen.getByRole("status");
      expect(spinner).toHaveClass("w-8");
      expect(spinner).toHaveClass("h-8");
    });

    it("should render extra large size", () => {
      render(<Spinner size="xl" />);
      const spinner = screen.getByRole("status");
      expect(spinner).toHaveClass("w-12");
      expect(spinner).toHaveClass("h-12");
    });
  });

  describe("Colors", () => {
    it("should render primary color by default", () => {
      render(<Spinner />);
      const spinner = screen.getByRole("status");
      expect(spinner).toHaveClass("text-primary-500");
    });

    it("should render white color", () => {
      render(<Spinner color="white" />);
      const spinner = screen.getByRole("status");
      expect(spinner).toHaveClass("text-white");
    });

    it("should render current color", () => {
      render(<Spinner color="current" />);
      const spinner = screen.getByRole("status");
      expect(spinner).toHaveClass("text-current");
    });

    it("should render gray color", () => {
      render(<Spinner color="gray" />);
      const spinner = screen.getByRole("status");
      expect(spinner).toHaveClass("text-gray-400");
    });
  });

  describe("Animations", () => {
    it("should have spin animation", () => {
      render(<Spinner />);
      const spinner = screen.getByRole("status");
      expect(spinner).toHaveClass("animate-spin");
    });

    it("should support slow spin animation", () => {
      render(<Spinner speed="slow" />);
      const spinner = screen.getByRole("status");
      expect(spinner).toHaveClass("animate-spin-slow");
    });

    it("should support fast spin animation", () => {
      render(<Spinner speed="fast" />);
      const spinner = screen.getByRole("status");
      expect(spinner).toHaveClass("animate-spin-fast");
    });
  });

  describe("Visual Structure", () => {
    it("should have circular border for spinner effect", () => {
      render(<Spinner />);
      const spinner = screen.getByRole("status");
      expect(spinner).toHaveClass("rounded-full");
      expect(spinner).toHaveClass("border-2");
    });

    it("should have transparent bottom border for spinning effect", () => {
      render(<Spinner />);
      const spinner = screen.getByRole("status");
      expect(spinner).toHaveClass("border-current");
      expect(spinner).toHaveClass("border-b-transparent");
    });
  });
});
