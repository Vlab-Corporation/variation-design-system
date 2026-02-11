import { describe, it, expect } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { Avatar } from "./Avatar";

describe("Avatar Component", () => {
  describe("Rendering", () => {
    it("should render with image", () => {
      render(<Avatar src="https://example.com/avatar.jpg" alt="John Doe" />);
      expect(screen.getByLabelText("John Doe")).toBeInTheDocument();
      const img = screen.getByLabelText("John Doe").querySelector("img");
      expect(img).toHaveAttribute("src", "https://example.com/avatar.jpg");
    });

    it("should render initials from alt text", () => {
      render(<Avatar alt="John Doe" />);
      expect(screen.getByText("JD")).toBeInTheDocument();
    });

    it("should render custom fallback", () => {
      render(<Avatar fallback="?" />);
      expect(screen.getByText("?")).toBeInTheDocument();
    });

    it("should show fallback on image error", () => {
      render(<Avatar src="broken.jpg" alt="John Doe" />);
      const img = screen.getByLabelText("John Doe").querySelector("img")!;
      fireEvent.error(img);
      expect(screen.getByText("JD")).toBeInTheDocument();
    });
  });

  describe("Sizes", () => {
    it("should apply medium size by default", () => {
      render(<Avatar alt="Test" />);
      expect(screen.getByRole("img")).toHaveClass("w-10", "h-10");
    });

    it("should apply xs size", () => {
      render(<Avatar alt="Test" size="xs" />);
      expect(screen.getByRole("img")).toHaveClass("w-6", "h-6");
    });

    it("should apply xl size", () => {
      render(<Avatar alt="Test" size="xl" />);
      expect(screen.getByRole("img")).toHaveClass("w-16", "h-16");
    });
  });

  describe("Shapes", () => {
    it("should be circle by default", () => {
      render(<Avatar alt="Test" />);
      expect(screen.getByRole("img")).toHaveClass("rounded-full");
    });

    it("should apply square shape", () => {
      render(<Avatar alt="Test" shape="square" />);
      expect(screen.getByRole("img")).toHaveClass("rounded-card");
    });
  });

  describe("Initials", () => {
    it("should generate single initial", () => {
      render(<Avatar alt="John" />);
      expect(screen.getByText("J")).toBeInTheDocument();
    });

    it("should generate two initials", () => {
      render(<Avatar alt="John Doe" />);
      expect(screen.getByText("JD")).toBeInTheDocument();
    });

    it("should limit to two initials", () => {
      render(<Avatar alt="John Middle Doe" />);
      expect(screen.getByText("JM")).toBeInTheDocument();
    });
  });

  describe("Accessibility", () => {
    it("should have img role", () => {
      render(<Avatar alt="John" />);
      expect(screen.getByRole("img")).toBeInTheDocument();
    });

    it("should have aria-label", () => {
      render(<Avatar alt="John Doe" />);
      expect(screen.getByRole("img")).toHaveAttribute("aria-label", "John Doe");
    });
  });

  describe("HTML attributes", () => {
    it("should forward ref", () => {
      const ref = { current: null } as { current: HTMLSpanElement | null };
      render(<Avatar ref={ref} alt="Test" />);
      expect(ref.current).toBeInstanceOf(HTMLElement);
    });

    it("should apply custom className", () => {
      render(<Avatar alt="Test" className="custom" />);
      expect(screen.getByRole("img")).toHaveClass("custom");
    });
  });
});
