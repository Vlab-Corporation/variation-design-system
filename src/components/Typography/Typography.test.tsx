import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import type { RefObject } from "react";
import { Heading, Text } from "./Typography";

describe("Heading Component", () => {
  describe("Rendering", () => {
    it("should render as h2 by default", () => {
      render(<Heading>Title</Heading>);
      expect(screen.getByRole("heading", { level: 2 })).toBeInTheDocument();
    });

    it("should render children text", () => {
      render(<Heading>Hello World</Heading>);
      expect(screen.getByText("Hello World")).toBeInTheDocument();
    });

    it("should apply custom className", () => {
      render(<Heading className="custom-class">Title</Heading>);
      expect(screen.getByRole("heading")).toHaveClass("custom-class");
    });
  });

  describe("Levels", () => {
    it("should render h1", () => {
      render(<Heading level="h1">H1</Heading>);
      const heading = screen.getByRole("heading", { level: 1 });
      expect(heading).toHaveClass("text-4xl", "font-bold");
    });

    it("should render h2", () => {
      render(<Heading level="h2">H2</Heading>);
      const heading = screen.getByRole("heading", { level: 2 });
      expect(heading).toHaveClass("text-3xl", "font-bold");
    });

    it("should render h3", () => {
      render(<Heading level="h3">H3</Heading>);
      const heading = screen.getByRole("heading", { level: 3 });
      expect(heading).toHaveClass("text-2xl", "font-semibold");
    });

    it("should render h4", () => {
      render(<Heading level="h4">H4</Heading>);
      const heading = screen.getByRole("heading", { level: 4 });
      expect(heading).toHaveClass("text-xl", "font-semibold");
    });

    it("should render h5", () => {
      render(<Heading level="h5">H5</Heading>);
      const heading = screen.getByRole("heading", { level: 5 });
      expect(heading).toHaveClass("text-lg", "font-medium");
    });

    it("should render h6", () => {
      render(<Heading level="h6">H6</Heading>);
      const heading = screen.getByRole("heading", { level: 6 });
      expect(heading).toHaveClass("text-base", "font-medium");
    });
  });

  describe("Colors", () => {
    it("should apply default color", () => {
      render(<Heading>Title</Heading>);
      expect(screen.getByRole("heading")).toHaveClass("text-gray-900");
    });

    it("should apply primary color", () => {
      render(<Heading color="primary">Title</Heading>);
      expect(screen.getByRole("heading")).toHaveClass("text-primary-500");
    });

    it("should apply muted color", () => {
      render(<Heading color="muted">Title</Heading>);
      expect(screen.getByRole("heading")).toHaveClass("text-gray-500");
    });
  });

  describe("Alignment", () => {
    it("should align center", () => {
      render(<Heading align="center">Title</Heading>);
      expect(screen.getByRole("heading")).toHaveClass("text-center");
    });

    it("should align right", () => {
      render(<Heading align="right">Title</Heading>);
      expect(screen.getByRole("heading")).toHaveClass("text-right");
    });
  });

  describe("Truncate", () => {
    it("should apply truncate class", () => {
      render(<Heading truncate>Very long title</Heading>);
      expect(screen.getByRole("heading")).toHaveClass("truncate");
    });
  });

  describe("HTML attributes", () => {
    it("should pass through data attributes", () => {
      render(<Heading data-testid="custom-heading">Title</Heading>);
      expect(screen.getByTestId("custom-heading")).toBeInTheDocument();
    });

    it("should forward ref", () => {
      const ref = { current: null } as RefObject<HTMLHeadingElement>;
      render(<Heading ref={ref}>Title</Heading>);
      expect(ref.current).toBeInstanceOf(HTMLElement);
    });
  });
});

describe("Text Component", () => {
  describe("Rendering", () => {
    it("should render as p element by default", () => {
      render(<Text>Hello</Text>);
      const el = screen.getByText("Hello");
      expect(el.tagName).toBe("P");
    });

    it("should render as span", () => {
      render(<Text as="span">Inline</Text>);
      const el = screen.getByText("Inline");
      expect(el.tagName).toBe("SPAN");
    });

    it("should render as div", () => {
      render(<Text as="div">Block</Text>);
      const el = screen.getByText("Block");
      expect(el.tagName).toBe("DIV");
    });

    it("should apply custom className", () => {
      render(<Text className="custom">Hello</Text>);
      expect(screen.getByText("Hello")).toHaveClass("custom");
    });
  });

  describe("Sizes", () => {
    it("should apply xs size", () => {
      render(<Text size="xs">Small</Text>);
      expect(screen.getByText("Small")).toHaveClass("text-xs");
    });

    it("should apply base size by default", () => {
      render(<Text>Normal</Text>);
      expect(screen.getByText("Normal")).toHaveClass("text-base");
    });

    it("should apply lg size", () => {
      render(<Text size="lg">Large</Text>);
      expect(screen.getByText("Large")).toHaveClass("text-lg");
    });

    it("should apply 2xl size", () => {
      render(<Text size="2xl">Extra Large</Text>);
      expect(screen.getByText("Extra Large")).toHaveClass("text-2xl");
    });
  });

  describe("Weights", () => {
    it("should apply normal weight by default", () => {
      render(<Text>Normal</Text>);
      expect(screen.getByText("Normal")).toHaveClass("font-normal");
    });

    it("should apply bold weight", () => {
      render(<Text weight="bold">Bold</Text>);
      expect(screen.getByText("Bold")).toHaveClass("font-bold");
    });

    it("should apply semibold weight", () => {
      render(<Text weight="semibold">Semibold</Text>);
      expect(screen.getByText("Semibold")).toHaveClass("font-semibold");
    });
  });

  describe("Colors", () => {
    it("should apply default color", () => {
      render(<Text>Default</Text>);
      expect(screen.getByText("Default")).toHaveClass("text-gray-900");
    });

    it("should apply secondary color", () => {
      render(<Text color="secondary">Secondary</Text>);
      expect(screen.getByText("Secondary")).toHaveClass("text-gray-700");
    });

    it("should apply error color", () => {
      render(<Text color="error">Error</Text>);
      expect(screen.getByText("Error")).toHaveClass("text-error-600");
    });
  });

  describe("Mono", () => {
    it("should apply monospace font", () => {
      render(<Text mono>Code</Text>);
      expect(screen.getByText("Code")).toHaveClass("font-mono");
    });
  });

  describe("Truncate", () => {
    it("should apply truncate class", () => {
      render(<Text truncate>Long text</Text>);
      expect(screen.getByText("Long text")).toHaveClass("truncate");
    });
  });

  describe("HTML attributes", () => {
    it("should pass through data attributes", () => {
      render(<Text data-testid="custom-text">Hello</Text>);
      expect(screen.getByTestId("custom-text")).toBeInTheDocument();
    });

    it("should forward ref", () => {
      const ref = { current: null } as RefObject<HTMLElement>;
      render(<Text ref={ref}>Hello</Text>);
      expect(ref.current).toBeInstanceOf(HTMLElement);
    });
  });
});
