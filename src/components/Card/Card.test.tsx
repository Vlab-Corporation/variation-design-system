import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "./Card";
import {
  cardVariants,
  cardPaddings,
  cardHoverStyles,
  cardTitleStyles,
  cardDescriptionStyles,
} from "./Card.styles";

describe("Card Component", () => {
  describe("Card", () => {
    it("should render children", () => {
      render(<Card>Card Content</Card>);
      expect(screen.getByText("Card Content")).toBeInTheDocument();
    });

    it("should apply custom className", () => {
      render(
        <Card className="custom-class" data-testid="card">
          Content
        </Card>,
      );
      const card = screen.getByTestId("card");
      expect(card).toHaveClass("custom-class");
    });

    it("should have default styling", () => {
      render(<Card data-testid="card">Content</Card>);
      const card = screen.getByTestId("card");
      expect(card).toHaveClass("rounded-card");
      for (const cls of cardVariants.default.split(" ")) {
        expect(card).toHaveClass(cls);
      }
    });

    it("should render as different HTML element when as prop is provided", () => {
      render(
        <Card as="section" data-testid="card">
          Content
        </Card>,
      );
      const card = screen.getByTestId("card");
      expect(card.tagName.toLowerCase()).toBe("section");
    });
  });

  describe("Card Variants", () => {
    it("should render elevated variant", () => {
      render(
        <Card variant="elevated" data-testid="card">
          Content
        </Card>,
      );
      const card = screen.getByTestId("card");
      for (const cls of cardVariants.elevated.split(" ")) {
        expect(card).toHaveClass(cls);
      }
    });

    it("should render outlined variant", () => {
      render(
        <Card variant="outlined" data-testid="card">
          Content
        </Card>,
      );
      const card = screen.getByTestId("card");
      for (const cls of cardVariants.outlined.split(" ")) {
        expect(card).toHaveClass(cls);
      }
    });

    it("should render filled variant", () => {
      render(
        <Card variant="filled" data-testid="card">
          Content
        </Card>,
      );
      const card = screen.getByTestId("card");
      for (const cls of cardVariants.filled.split(" ")) {
        expect(card).toHaveClass(cls);
      }
    });

    it("should have border-transparent on default variant for layout shift prevention", () => {
      render(<Card data-testid="card">Content</Card>);
      const card = screen.getByTestId("card");
      for (const cls of cardVariants.default.split(" ")) {
        expect(card).toHaveClass(cls);
      }
    });

    it("should have border-transparent on elevated variant for layout shift prevention", () => {
      render(
        <Card variant="elevated" data-testid="card">
          Content
        </Card>,
      );
      const card = screen.getByTestId("card");
      for (const cls of cardVariants.elevated.split(" ")) {
        expect(card).toHaveClass(cls);
      }
    });

    it("should have border-transparent on filled variant for layout shift prevention", () => {
      render(
        <Card variant="filled" data-testid="card">
          Content
        </Card>,
      );
      const card = screen.getByTestId("card");
      for (const cls of cardVariants.filled.split(" ")) {
        expect(card).toHaveClass(cls);
      }
    });
  });

  describe("Card Padding", () => {
    it("should apply small padding", () => {
      render(
        <Card padding="sm" data-testid="card">
          Content
        </Card>,
      );
      const card = screen.getByTestId("card");
      expect(card).toHaveClass(cardPaddings.sm);
    });

    it("should apply medium padding by default", () => {
      render(<Card data-testid="card">Content</Card>);
      const card = screen.getByTestId("card");
      expect(card).toHaveClass(cardPaddings.md);
    });

    it("should apply large padding", () => {
      render(
        <Card padding="lg" data-testid="card">
          Content
        </Card>,
      );
      const card = screen.getByTestId("card");
      expect(card).toHaveClass(cardPaddings.lg);
    });

    it("should apply no padding when none specified", () => {
      render(
        <Card padding="none" data-testid="card">
          Content
        </Card>,
      );
      const card = screen.getByTestId("card");
      expect(card).toHaveClass(cardPaddings.none);
    });
  });

  describe("CardHeader", () => {
    it("should render children", () => {
      render(<CardHeader>Header Content</CardHeader>);
      expect(screen.getByText("Header Content")).toBeInTheDocument();
    });

    it("should have appropriate spacing", () => {
      render(<CardHeader data-testid="header">Header</CardHeader>);
      const header = screen.getByTestId("header");
      expect(header).toHaveClass("pb-2");
    });
  });

  describe("CardTitle", () => {
    it("should render as heading", () => {
      render(<CardTitle>Title</CardTitle>);
      const title = screen.getByRole("heading", { name: "Title" });
      expect(title).toBeInTheDocument();
    });

    it("should have appropriate typography", () => {
      render(<CardTitle data-testid="title">Title</CardTitle>);
      const title = screen.getByTestId("title");
      for (const cls of cardTitleStyles().split(" ")) {
        expect(title).toHaveClass(cls);
      }
    });
  });

  describe("CardDescription", () => {
    it("should render description text", () => {
      render(<CardDescription>Description text</CardDescription>);
      expect(screen.getByText("Description text")).toBeInTheDocument();
    });

    it("should have muted styling", () => {
      render(<CardDescription data-testid="desc">Desc</CardDescription>);
      const desc = screen.getByTestId("desc");
      for (const cls of cardDescriptionStyles().split(" ")) {
        expect(desc).toHaveClass(cls);
      }
    });
  });

  describe("CardContent", () => {
    it("should render children", () => {
      render(<CardContent>Main content</CardContent>);
      expect(screen.getByText("Main content")).toBeInTheDocument();
    });

    it("should have appropriate spacing", () => {
      render(<CardContent data-testid="content">Content</CardContent>);
      const content = screen.getByTestId("content");
      expect(content).toHaveClass("py-2");
    });
  });

  describe("CardFooter", () => {
    it("should render children", () => {
      render(<CardFooter>Footer content</CardFooter>);
      expect(screen.getByText("Footer content")).toBeInTheDocument();
    });

    it("should have border top", () => {
      render(<CardFooter data-testid="footer">Footer</CardFooter>);
      const footer = screen.getByTestId("footer");
      expect(footer).toHaveClass("pt-4");
      expect(footer).toHaveClass("border-t");
    });

    it("should support flex layout for actions", () => {
      render(<CardFooter data-testid="footer">Footer</CardFooter>);
      const footer = screen.getByTestId("footer");
      expect(footer).toHaveClass("flex");
    });
  });

  describe("Composed Card", () => {
    it("should render full card composition", () => {
      render(
        <Card>
          <CardHeader>
            <CardTitle>Card Title</CardTitle>
            <CardDescription>Card description here</CardDescription>
          </CardHeader>
          <CardContent>Main content</CardContent>
          <CardFooter>Footer actions</CardFooter>
        </Card>,
      );

      expect(screen.getByText("Card Title")).toBeInTheDocument();
      expect(screen.getByText("Card description here")).toBeInTheDocument();
      expect(screen.getByText("Main content")).toBeInTheDocument();
      expect(screen.getByText("Footer actions")).toBeInTheDocument();
    });
  });

  describe("Hover Modes", () => {
    describe("Common hover behavior", () => {
      it("should not have hover classes when hover is undefined", () => {
        render(<Card data-testid="card">Content</Card>);
        const card = screen.getByTestId("card");
        expect(card).not.toHaveClass("group/card");
        expect(card).not.toHaveClass("cursor-pointer");
        expect(card).not.toHaveClass("transition-all");
      });

      it('should have base hover classes when hover="outline"', () => {
        render(
          <Card hover="outline" data-testid="card">
            Content
          </Card>,
        );
        const card = screen.getByTestId("card");
        expect(card).toHaveClass("group/card");
        expect(card).toHaveClass("cursor-pointer");
        expect(card).toHaveClass("transition-all");
        expect(card).toHaveClass("duration-200");
        expect(card).toHaveClass("ease-out");
      });

      it('should have base hover classes when hover="elevated"', () => {
        render(
          <Card hover="elevated" data-testid="card">
            Content
          </Card>,
        );
        const card = screen.getByTestId("card");
        expect(card).toHaveClass("group/card");
        expect(card).toHaveClass("cursor-pointer");
        expect(card).toHaveClass("transition-all");
        expect(card).toHaveClass("duration-200");
        expect(card).toHaveClass("ease-out");
      });
    });

    describe('hover="outline"', () => {
      it("should apply outline hover styles from cardHoverStyles map", () => {
        render(
          <Card hover="outline" data-testid="card">
            Content
          </Card>,
        );
        const card = screen.getByTestId("card");
        for (const cls of cardHoverStyles.outline.split(" ")) {
          expect(card).toHaveClass(cls);
        }
      });
    });

    describe('hover="elevated"', () => {
      it("should apply elevated hover styles from cardHoverStyles map", () => {
        render(
          <Card hover="elevated" data-testid="card">
            Content
          </Card>,
        );
        const card = screen.getByTestId("card");
        for (const cls of cardHoverStyles.elevated.split(" ")) {
          expect(card).toHaveClass(cls);
        }
      });

      it("should not have outline-specific classes", () => {
        render(
          <Card hover="elevated" data-testid="card">
            Content
          </Card>,
        );
        const card = screen.getByTestId("card");
        expect(card).not.toHaveClass("hover:bg-accent-100");
        expect(card).not.toHaveClass("hover:border-accent-800");
      });
    });
  });
});
