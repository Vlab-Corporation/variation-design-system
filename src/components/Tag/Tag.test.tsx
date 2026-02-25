import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { Tag } from "./Tag";

describe("Tag Component", () => {
  describe("Rendering", () => {
    it("should render tag text", () => {
      render(<Tag>React</Tag>);
      expect(screen.getByText("React")).toBeInTheDocument();
    });
  });

  describe("Variants", () => {
    it("should apply default variant", () => {
      render(<Tag>Tag</Tag>);
      expect(screen.getByText("Tag")).toHaveClass("bg-gray-100");
    });

    it("should apply primary variant", () => {
      render(<Tag variant="primary">Tag</Tag>);
      expect(screen.getByText("Tag")).toHaveClass("bg-accent-100");
    });

    it("should apply success variant", () => {
      render(<Tag variant="success">Tag</Tag>);
      expect(screen.getByText("Tag")).toHaveClass("bg-green-100");
    });

    it("should apply error variant", () => {
      render(<Tag variant="error">Tag</Tag>);
      expect(screen.getByText("Tag")).toHaveClass("bg-red-100");
    });
  });

  describe("Sizes", () => {
    it("should apply medium size by default", () => {
      render(<Tag>Tag</Tag>);
      expect(screen.getByText("Tag")).toHaveClass("text-sm");
    });

    it("should apply small size", () => {
      render(<Tag size="sm">Tag</Tag>);
      expect(screen.getByText("Tag")).toHaveClass("text-xs");
    });

    it("should apply large size", () => {
      render(<Tag size="lg">Tag</Tag>);
      expect(screen.getByText("Tag")).toHaveClass("text-base");
    });
  });

  describe("Removable", () => {
    it("should show remove button when removable", () => {
      render(<Tag removable>Tag</Tag>);
      expect(screen.getByLabelText("Remove")).toBeInTheDocument();
    });

    it("should not show remove button by default", () => {
      render(<Tag>Tag</Tag>);
      expect(screen.queryByLabelText("Remove")).not.toBeInTheDocument();
    });

    it("should call onRemove when remove is clicked", () => {
      const handleRemove = vi.fn();
      render(
        <Tag removable onRemove={handleRemove}>
          Tag
        </Tag>,
      );
      fireEvent.click(screen.getByLabelText("Remove"));
      expect(handleRemove).toHaveBeenCalledOnce();
    });
  });

  describe("Clickable", () => {
    it("should have button role when onClick is provided", () => {
      render(<Tag onClick={() => {}}>Tag</Tag>);
      expect(screen.getByRole("button")).toBeInTheDocument();
    });

    it("should call onClick when clicked", () => {
      const handleClick = vi.fn();
      render(<Tag onClick={handleClick}>Tag</Tag>);
      fireEvent.click(screen.getByText("Tag"));
      expect(handleClick).toHaveBeenCalledOnce();
    });
  });

  describe("HTML attributes", () => {
    it("should forward ref", () => {
      const ref = { current: null } as { current: HTMLSpanElement | null };
      render(<Tag ref={ref}>Tag</Tag>);
      expect(ref.current).toBeInstanceOf(HTMLElement);
    });

    it("should apply custom className", () => {
      render(<Tag className="custom">Tag</Tag>);
      expect(screen.getByText("Tag")).toHaveClass("custom");
    });
  });
});
