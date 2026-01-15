import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import {
  CoverImage,
  CoverImageUploader,
  CoverImagePreview,
  CoverImageActions,
} from "./CoverImage";

describe("CoverImage Component", () => {
  describe("CoverImage", () => {
    it("should render container", () => {
      render(<CoverImage data-testid="cover" />);
      expect(screen.getByTestId("cover")).toBeInTheDocument();
    });

    it("should apply custom className", () => {
      render(<CoverImage className="custom-class" data-testid="cover" />);
      expect(screen.getByTestId("cover")).toHaveClass("custom-class");
    });

    it("should have default height", () => {
      render(<CoverImage data-testid="cover" />);
      expect(screen.getByTestId("cover")).toHaveClass("h-48");
    });

    it("should support custom height", () => {
      render(<CoverImage height="lg" data-testid="cover" />);
      expect(screen.getByTestId("cover")).toHaveClass("h-64");
    });
  });

  describe("CoverImagePreview", () => {
    it("should render image when src provided", () => {
      render(
        <CoverImagePreview src="https://example.com/image.jpg" alt="Cover" />,
      );
      expect(screen.getByRole("img")).toHaveAttribute(
        "src",
        "https://example.com/image.jpg",
      );
    });

    it("should have object-cover for proper scaling", () => {
      render(
        <CoverImagePreview
          src="https://example.com/image.jpg"
          alt="Cover"
          data-testid="preview"
        />,
      );
      expect(screen.getByRole("img")).toHaveClass("object-cover");
    });

    it("should support gradient overlay", () => {
      render(
        <CoverImagePreview
          src="https://example.com/image.jpg"
          alt="Cover"
          overlay="gradient"
          data-testid="preview"
        />,
      );
      expect(screen.getByTestId("preview")).toBeInTheDocument();
    });

    it("should support solid color background", () => {
      render(<CoverImagePreview color="#3B82F6" data-testid="preview" />);
      expect(screen.getByTestId("preview")).toHaveStyle({
        backgroundColor: "#3B82F6",
      });
    });
  });

  describe("CoverImageUploader", () => {
    it("should render upload area", () => {
      render(<CoverImageUploader onUpload={() => {}} data-testid="uploader" />);
      expect(screen.getByTestId("uploader")).toBeInTheDocument();
    });

    it("should show upload text", () => {
      render(<CoverImageUploader onUpload={() => {}} />);
      expect(screen.getByText(/add cover/i)).toBeInTheDocument();
    });

    it("should call onUpload when file selected", () => {
      const onUpload = vi.fn();
      render(<CoverImageUploader onUpload={onUpload} data-testid="uploader" />);

      const input = screen
        .getByTestId("uploader")
        .querySelector('input[type="file"]');
      const file = new File(["image"], "test.jpg", { type: "image/jpeg" });

      fireEvent.change(input!, { target: { files: [file] } });
      expect(onUpload).toHaveBeenCalledWith(file);
    });

    it("should accept image files only", () => {
      render(<CoverImageUploader onUpload={() => {}} data-testid="uploader" />);
      const input = screen
        .getByTestId("uploader")
        .querySelector('input[type="file"]');
      expect(input).toHaveAttribute("accept", "image/*");
    });
  });

  describe("CoverImageActions", () => {
    it("should render action buttons", () => {
      render(<CoverImageActions onReposition={() => {}} onRemove={() => {}} />);
      expect(screen.getByText(/reposition/i)).toBeInTheDocument();
      expect(screen.getByText(/remove/i)).toBeInTheDocument();
    });

    it("should call onRemove when remove clicked", () => {
      const onRemove = vi.fn();
      render(<CoverImageActions onReposition={() => {}} onRemove={onRemove} />);

      fireEvent.click(screen.getByText(/remove/i));
      expect(onRemove).toHaveBeenCalled();
    });

    it("should have hover visibility", () => {
      render(
        <CoverImageActions
          onReposition={() => {}}
          onRemove={() => {}}
          data-testid="actions"
        />,
      );
      expect(screen.getByTestId("actions")).toHaveClass("opacity-0");
      expect(screen.getByTestId("actions")).toHaveClass(
        "group-hover:opacity-100",
      );
    });
  });

  describe("Accessibility", () => {
    it("should have proper alt text on image", () => {
      render(
        <CoverImagePreview
          src="https://example.com/image.jpg"
          alt="Page cover image"
        />,
      );
      expect(screen.getByRole("img")).toHaveAttribute(
        "alt",
        "Page cover image",
      );
    });

    it("should have accessible upload button", () => {
      render(<CoverImageUploader onUpload={() => {}} />);
      expect(screen.getByRole("button")).toBeInTheDocument();
    });
  });
});
