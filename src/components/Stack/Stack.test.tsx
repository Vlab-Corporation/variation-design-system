import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { Stack, VStack, HStack } from "./Stack";

describe("Stack Component", () => {
  describe("Rendering", () => {
    it("should render children", () => {
      render(
        <Stack>
          <span>Child 1</span>
          <span>Child 2</span>
        </Stack>,
      );
      expect(screen.getByText("Child 1")).toBeInTheDocument();
      expect(screen.getByText("Child 2")).toBeInTheDocument();
    });

    it("should apply custom className", () => {
      render(
        <Stack className="custom" data-testid="stack">
          Content
        </Stack>,
      );
      expect(screen.getByTestId("stack")).toHaveClass("custom");
    });
  });

  describe("Direction", () => {
    it("should be column by default", () => {
      render(<Stack data-testid="stack">Content</Stack>);
      expect(screen.getByTestId("stack")).toHaveClass("flex-col");
    });

    it("should apply row direction", () => {
      render(
        <Stack direction="row" data-testid="stack">
          Content
        </Stack>,
      );
      expect(screen.getByTestId("stack")).toHaveClass("flex-row");
    });
  });

  describe("Gap", () => {
    it("should apply default gap-4", () => {
      render(<Stack data-testid="stack">Content</Stack>);
      expect(screen.getByTestId("stack")).toHaveClass("gap-4");
    });

    it("should apply custom gap", () => {
      render(
        <Stack gap="8" data-testid="stack">
          Content
        </Stack>,
      );
      expect(screen.getByTestId("stack")).toHaveClass("gap-8");
    });

    it("should apply zero gap", () => {
      render(
        <Stack gap="0" data-testid="stack">
          Content
        </Stack>,
      );
      expect(screen.getByTestId("stack")).toHaveClass("gap-0");
    });
  });

  describe("Alignment", () => {
    it("should apply align center", () => {
      render(
        <Stack align="center" data-testid="stack">
          Content
        </Stack>,
      );
      expect(screen.getByTestId("stack")).toHaveClass("items-center");
    });

    it("should apply justify between", () => {
      render(
        <Stack justify="between" data-testid="stack">
          Content
        </Stack>,
      );
      expect(screen.getByTestId("stack")).toHaveClass("justify-between");
    });
  });

  describe("Wrap", () => {
    it("should not wrap by default", () => {
      render(<Stack data-testid="stack">Content</Stack>);
      expect(screen.getByTestId("stack")).not.toHaveClass("flex-wrap");
    });

    it("should apply flex-wrap", () => {
      render(
        <Stack wrap data-testid="stack">
          Content
        </Stack>,
      );
      expect(screen.getByTestId("stack")).toHaveClass("flex-wrap");
    });
  });

  describe("Inline", () => {
    it("should use flex by default", () => {
      render(<Stack data-testid="stack">Content</Stack>);
      expect(screen.getByTestId("stack")).toHaveClass("flex");
    });

    it("should use inline-flex when inline", () => {
      render(
        <Stack inline data-testid="stack">
          Content
        </Stack>,
      );
      expect(screen.getByTestId("stack")).toHaveClass("inline-flex");
    });
  });

  describe("HTML attributes", () => {
    it("should forward ref", () => {
      const ref = { current: null } as { current: HTMLDivElement | null };
      render(<Stack ref={ref}>Content</Stack>);
      expect(ref.current).toBeInstanceOf(HTMLElement);
    });

    it("should pass through data attributes", () => {
      render(<Stack data-testid="my-stack">Content</Stack>);
      expect(screen.getByTestId("my-stack")).toBeInTheDocument();
    });
  });
});

describe("VStack Component", () => {
  it("should render as column", () => {
    render(<VStack data-testid="vstack">Content</VStack>);
    expect(screen.getByTestId("vstack")).toHaveClass("flex-col");
  });

  it("should apply gap", () => {
    render(
      <VStack gap="6" data-testid="vstack">
        Content
      </VStack>,
    );
    expect(screen.getByTestId("vstack")).toHaveClass("gap-6");
  });
});

describe("HStack Component", () => {
  it("should render as row", () => {
    render(<HStack data-testid="hstack">Content</HStack>);
    expect(screen.getByTestId("hstack")).toHaveClass("flex-row");
  });

  it("should apply align center", () => {
    render(
      <HStack align="center" data-testid="hstack">
        Content
      </HStack>,
    );
    expect(screen.getByTestId("hstack")).toHaveClass("items-center");
  });
});
