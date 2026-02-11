import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { Pagination } from "./Pagination";

describe("Pagination Component", () => {
  describe("Rendering", () => {
    it("should render navigation", () => {
      render(<Pagination page={1} totalPages={5} />);
      expect(screen.getByRole("navigation")).toBeInTheDocument();
    });

    it("should render page buttons", () => {
      render(<Pagination page={1} totalPages={5} />);
      expect(screen.getByLabelText("Page 1")).toBeInTheDocument();
      expect(screen.getByLabelText("Page 5")).toBeInTheDocument();
    });

    it("should render prev/next buttons", () => {
      render(<Pagination page={3} totalPages={5} />);
      expect(screen.getByLabelText("Previous page")).toBeInTheDocument();
      expect(screen.getByLabelText("Next page")).toBeInTheDocument();
    });

    it("should render edge buttons when showEdges is true", () => {
      render(<Pagination page={3} totalPages={5} showEdges />);
      expect(screen.getByLabelText("First page")).toBeInTheDocument();
      expect(screen.getByLabelText("Last page")).toBeInTheDocument();
    });
  });

  describe("Active State", () => {
    it("should mark current page as active", () => {
      render(<Pagination page={3} totalPages={5} />);
      expect(screen.getByLabelText("Page 3")).toHaveAttribute(
        "aria-current",
        "page",
      );
    });

    it("should apply active styling", () => {
      render(<Pagination page={2} totalPages={5} />);
      expect(screen.getByLabelText("Page 2")).toHaveClass("bg-primary-500");
    });
  });

  describe("Navigation", () => {
    it("should call onChange when page is clicked", () => {
      const handleChange = vi.fn();
      render(<Pagination page={1} totalPages={5} onChange={handleChange} />);
      fireEvent.click(screen.getByLabelText("Page 3"));
      expect(handleChange).toHaveBeenCalledWith(3);
    });

    it("should call onChange on next button click", () => {
      const handleChange = vi.fn();
      render(<Pagination page={2} totalPages={5} onChange={handleChange} />);
      fireEvent.click(screen.getByLabelText("Next page"));
      expect(handleChange).toHaveBeenCalledWith(3);
    });

    it("should call onChange on prev button click", () => {
      const handleChange = vi.fn();
      render(<Pagination page={3} totalPages={5} onChange={handleChange} />);
      fireEvent.click(screen.getByLabelText("Previous page"));
      expect(handleChange).toHaveBeenCalledWith(2);
    });
  });

  describe("Disabled State", () => {
    it("should disable prev button on first page", () => {
      render(<Pagination page={1} totalPages={5} />);
      expect(screen.getByLabelText("Previous page")).toBeDisabled();
    });

    it("should disable next button on last page", () => {
      render(<Pagination page={5} totalPages={5} />);
      expect(screen.getByLabelText("Next page")).toBeDisabled();
    });
  });

  describe("Ellipsis", () => {
    it("should show ellipsis for many pages", () => {
      render(<Pagination page={5} totalPages={10} />);
      const nav = screen.getByRole("navigation");
      expect(nav.textContent).toContain("…");
    });

    it("should not show ellipsis for few pages", () => {
      render(<Pagination page={1} totalPages={5} />);
      const nav = screen.getByRole("navigation");
      expect(nav.textContent).not.toContain("…");
    });
  });

  describe("Sizes", () => {
    it("should apply medium size by default", () => {
      render(<Pagination page={1} totalPages={3} />);
      expect(screen.getByLabelText("Page 1")).toHaveClass("h-10");
    });

    it("should apply small size", () => {
      render(<Pagination page={1} totalPages={3} size="sm" />);
      expect(screen.getByLabelText("Page 1")).toHaveClass("h-8");
    });
  });

  describe("Accessibility", () => {
    it("should have navigation role", () => {
      render(<Pagination page={1} totalPages={5} />);
      expect(screen.getByRole("navigation")).toHaveAttribute(
        "aria-label",
        "Pagination",
      );
    });
  });
});
