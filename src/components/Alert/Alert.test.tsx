import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { Alert, AlertTitle, AlertDescription } from "./Alert";

describe("Alert Component", () => {
  describe("Rendering", () => {
    it("should render with default props", () => {
      render(<Alert>Alert message</Alert>);
      expect(screen.getByRole("alert")).toBeInTheDocument();
    });

    it("should render children", () => {
      render(<Alert>Alert content</Alert>);
      expect(screen.getByText("Alert content")).toBeInTheDocument();
    });

    it("should apply custom className", () => {
      render(<Alert className="custom-class">Alert</Alert>);
      expect(screen.getByRole("alert")).toHaveClass("custom-class");
    });
  });

  describe("Variants", () => {
    it("should render info variant by default", () => {
      render(<Alert>Info</Alert>);
      const alert = screen.getByRole("alert");
      expect(alert).toHaveClass("bg-info-50");
      expect(alert).toHaveClass("border-info-200");
      expect(alert).toHaveClass("text-info-800");
    });

    it("should render success variant", () => {
      render(<Alert variant="success">Success</Alert>);
      const alert = screen.getByRole("alert");
      expect(alert).toHaveClass("bg-success-50");
      expect(alert).toHaveClass("border-success-200");
      expect(alert).toHaveClass("text-success-800");
    });

    it("should render warning variant", () => {
      render(<Alert variant="warning">Warning</Alert>);
      const alert = screen.getByRole("alert");
      expect(alert).toHaveClass("bg-warning-50");
      expect(alert).toHaveClass("border-warning-200");
      expect(alert).toHaveClass("text-warning-800");
    });

    it("should render error variant", () => {
      render(<Alert variant="error">Error</Alert>);
      const alert = screen.getByRole("alert");
      expect(alert).toHaveClass("bg-error-50");
      expect(alert).toHaveClass("border-error-200");
      expect(alert).toHaveClass("text-error-800");
    });
  });

  describe("Icon", () => {
    it("should render icon by default", () => {
      render(<Alert>With icon</Alert>);
      expect(screen.getByTestId("alert-icon")).toBeInTheDocument();
    });

    it("should hide icon when icon prop is false", () => {
      render(<Alert icon={false}>No icon</Alert>);
      expect(screen.queryByTestId("alert-icon")).not.toBeInTheDocument();
    });

    it("should render custom icon when provided", () => {
      render(
        <Alert icon={<span data-testid="custom-icon">★</span>}>Custom</Alert>,
      );
      expect(screen.getByTestId("custom-icon")).toBeInTheDocument();
    });

    it("should render appropriate icon for each variant", () => {
      const { rerender } = render(<Alert variant="success">Success</Alert>);
      expect(screen.getByTestId("alert-icon")).toBeInTheDocument();

      rerender(<Alert variant="error">Error</Alert>);
      expect(screen.getByTestId("alert-icon")).toBeInTheDocument();

      rerender(<Alert variant="warning">Warning</Alert>);
      expect(screen.getByTestId("alert-icon")).toBeInTheDocument();

      rerender(<Alert variant="info">Info</Alert>);
      expect(screen.getByTestId("alert-icon")).toBeInTheDocument();
    });
  });

  describe("Dismissible", () => {
    it("should show close button when dismissible", () => {
      render(<Alert dismissible>Dismissible</Alert>);
      expect(
        screen.getByRole("button", { name: /dismiss/i }),
      ).toBeInTheDocument();
    });

    it("should not show close button by default", () => {
      render(<Alert>Not dismissible</Alert>);
      expect(
        screen.queryByRole("button", { name: /dismiss/i }),
      ).not.toBeInTheDocument();
    });

    it("should call onDismiss when close button is clicked", () => {
      const handleDismiss = vi.fn();
      render(
        <Alert dismissible onDismiss={handleDismiss}>
          Dismissible
        </Alert>,
      );
      fireEvent.click(screen.getByRole("button", { name: /dismiss/i }));
      expect(handleDismiss).toHaveBeenCalledTimes(1);
    });
  });

  describe("AlertTitle", () => {
    it("should render title", () => {
      render(
        <Alert>
          <AlertTitle>Alert Title</AlertTitle>
        </Alert>,
      );
      expect(screen.getByText("Alert Title")).toBeInTheDocument();
    });

    it("should have appropriate styling", () => {
      render(
        <Alert>
          <AlertTitle data-testid="title">Title</AlertTitle>
        </Alert>,
      );
      const title = screen.getByTestId("title");
      expect(title).toHaveClass("font-semibold");
    });
  });

  describe("AlertDescription", () => {
    it("should render description", () => {
      render(
        <Alert>
          <AlertDescription>Alert description text</AlertDescription>
        </Alert>,
      );
      expect(screen.getByText("Alert description text")).toBeInTheDocument();
    });

    it("should have appropriate styling", () => {
      render(
        <Alert>
          <AlertDescription data-testid="desc">Description</AlertDescription>
        </Alert>,
      );
      const desc = screen.getByTestId("desc");
      expect(desc).toHaveClass("text-sm");
    });
  });

  describe("Composed Alert", () => {
    it("should render full composition", () => {
      render(
        <Alert variant="success">
          <AlertTitle>Success!</AlertTitle>
          <AlertDescription>Your changes have been saved.</AlertDescription>
        </Alert>,
      );

      expect(screen.getByRole("alert")).toBeInTheDocument();
      expect(screen.getByText("Success!")).toBeInTheDocument();
      expect(
        screen.getByText("Your changes have been saved."),
      ).toBeInTheDocument();
    });
  });

  describe("Animations", () => {
    it("should have fade-in animation by default", () => {
      render(<Alert>Animated</Alert>);
      const alert = screen.getByRole("alert");
      expect(alert).toHaveClass("animate-fade-in");
    });

    it("should have slide-down animation when specified", () => {
      render(<Alert animation="slide-down">Slide</Alert>);
      const alert = screen.getByRole("alert");
      expect(alert).toHaveClass("animate-slide-down");
    });
  });

  describe("Accessibility", () => {
    it('should have role="alert"', () => {
      render(<Alert>Alert</Alert>);
      expect(screen.getByRole("alert")).toBeInTheDocument();
    });

    it('should have aria-live="polite" by default', () => {
      render(<Alert>Alert</Alert>);
      expect(screen.getByRole("alert")).toHaveAttribute("aria-live", "polite");
    });

    it('should have aria-live="assertive" for error alerts', () => {
      render(<Alert variant="error">Error</Alert>);
      expect(screen.getByRole("alert")).toHaveAttribute(
        "aria-live",
        "assertive",
      );
    });
  });
});
