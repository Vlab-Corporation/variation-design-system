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
      expect(card).toHaveClass("rounded-lg");
      expect(card).toHaveClass("bg-white");
      expect(card).toHaveClass("shadow-sm");
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
      expect(card).toHaveClass("shadow-md");
    });

    it("should render outlined variant", () => {
      render(
        <Card variant="outlined" data-testid="card">
          Content
        </Card>,
      );
      const card = screen.getByTestId("card");
      expect(card).toHaveClass("border");
      expect(card).toHaveClass("border-gray-200");
    });

    it("should render filled variant", () => {
      render(
        <Card variant="filled" data-testid="card">
          Content
        </Card>,
      );
      const card = screen.getByTestId("card");
      expect(card).toHaveClass("bg-gray-50");
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
      expect(card).toHaveClass("p-3");
    });

    it("should apply medium padding by default", () => {
      render(<Card data-testid="card">Content</Card>);
      const card = screen.getByTestId("card");
      expect(card).toHaveClass("p-4");
    });

    it("should apply large padding", () => {
      render(
        <Card padding="lg" data-testid="card">
          Content
        </Card>,
      );
      const card = screen.getByTestId("card");
      expect(card).toHaveClass("p-6");
    });

    it("should apply no padding when none specified", () => {
      render(
        <Card padding="none" data-testid="card">
          Content
        </Card>,
      );
      const card = screen.getByTestId("card");
      expect(card).toHaveClass("p-0");
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
      expect(title).toHaveClass("text-lg");
      expect(title).toHaveClass("font-semibold");
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
      expect(desc).toHaveClass("text-gray-500");
      expect(desc).toHaveClass("text-sm");
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

  describe("Animations", () => {
    it("should have hover transition when interactive", () => {
      render(
        <Card interactive data-testid="card">
          Content
        </Card>,
      );
      const card = screen.getByTestId("card");
      expect(card).toHaveClass("transition-all");
      expect(card).toHaveClass("duration-200");
    });

    it("should have hover shadow effect when interactive", () => {
      render(
        <Card interactive data-testid="card">
          Content
        </Card>,
      );
      const card = screen.getByTestId("card");
      expect(card).toHaveClass("hover:shadow-md");
    });

    it("should have subtle scale on hover when interactive", () => {
      render(
        <Card interactive data-testid="card">
          Content
        </Card>,
      );
      const card = screen.getByTestId("card");
      expect(card).toHaveClass("hover:scale-[1.01]");
    });
  });
});
