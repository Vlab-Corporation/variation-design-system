import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
  BreadcrumbEllipsis,
} from "./Breadcrumb";

describe("Breadcrumb Component", () => {
  describe("Breadcrumb", () => {
    it("should render as nav element", () => {
      render(<Breadcrumb data-testid="breadcrumb">Content</Breadcrumb>);
      const breadcrumb = screen.getByTestId("breadcrumb");
      expect(breadcrumb.tagName.toLowerCase()).toBe("nav");
    });

    it("should have aria-label for accessibility", () => {
      render(<Breadcrumb>Content</Breadcrumb>);
      expect(screen.getByRole("navigation")).toHaveAttribute(
        "aria-label",
        "Breadcrumb",
      );
    });

    it("should accept custom aria-label", () => {
      render(<Breadcrumb aria-label="Custom navigation">Content</Breadcrumb>);
      expect(screen.getByRole("navigation")).toHaveAttribute(
        "aria-label",
        "Custom navigation",
      );
    });

    it("should apply custom className", () => {
      render(
        <Breadcrumb className="custom-class" data-testid="breadcrumb">
          Content
        </Breadcrumb>,
      );
      expect(screen.getByTestId("breadcrumb")).toHaveClass("custom-class");
    });
  });

  describe("BreadcrumbList", () => {
    it("should render as ordered list", () => {
      render(
        <Breadcrumb>
          <BreadcrumbList data-testid="list">
            <BreadcrumbItem>Item</BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>,
      );
      const list = screen.getByTestId("list");
      expect(list.tagName.toLowerCase()).toBe("ol");
    });

    it("should have flex layout", () => {
      render(
        <Breadcrumb>
          <BreadcrumbList data-testid="list">
            <BreadcrumbItem>Item</BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>,
      );
      const list = screen.getByTestId("list");
      expect(list).toHaveClass("flex");
      expect(list).toHaveClass("items-center");
      expect(list).toHaveClass("gap-1.5");
    });

    it("should wrap on small screens", () => {
      render(
        <Breadcrumb>
          <BreadcrumbList data-testid="list">
            <BreadcrumbItem>Item</BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>,
      );
      const list = screen.getByTestId("list");
      expect(list).toHaveClass("flex-wrap");
    });
  });

  describe("BreadcrumbItem", () => {
    it("should render as list item", () => {
      render(
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem data-testid="item">Content</BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>,
      );
      const item = screen.getByTestId("item");
      expect(item.tagName.toLowerCase()).toBe("li");
    });

    it("should have inline-flex layout", () => {
      render(
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem data-testid="item">Content</BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>,
      );
      const item = screen.getByTestId("item");
      expect(item).toHaveClass("inline-flex");
      expect(item).toHaveClass("items-center");
    });
  });

  describe("BreadcrumbLink", () => {
    it("should render as anchor by default", () => {
      render(
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/home">Home</BreadcrumbLink>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>,
      );
      const link = screen.getByRole("link", { name: "Home" });
      expect(link).toBeInTheDocument();
      expect(link).toHaveAttribute("href", "/home");
    });

    it("should have hover styles", () => {
      render(
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/home" data-testid="link">
                Home
              </BreadcrumbLink>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>,
      );
      const link = screen.getByTestId("link");
      expect(link).toHaveClass("hover:text-gray-900");
    });

    it("should have transition", () => {
      render(
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/home" data-testid="link">
                Home
              </BreadcrumbLink>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>,
      );
      const link = screen.getByTestId("link");
      expect(link).toHaveClass("transition-colors");
    });

    it("should handle click events", () => {
      const handleClick = vi.fn();
      render(
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/home" onClick={handleClick}>
                Home
              </BreadcrumbLink>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>,
      );
      const link = screen.getByRole("link", { name: "Home" });
      fireEvent.click(link);
      expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it("should support custom component via asChild", () => {
      render(
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <button type="button">Custom Button</button>
              </BreadcrumbLink>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>,
      );
      expect(
        screen.getByRole("button", { name: "Custom Button" }),
      ).toBeInTheDocument();
    });
  });

  describe("BreadcrumbPage", () => {
    it("should render as span", () => {
      render(
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbPage data-testid="page">Current Page</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>,
      );
      const page = screen.getByTestId("page");
      expect(page.tagName.toLowerCase()).toBe("span");
    });

    it('should have aria-current="page"', () => {
      render(
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbPage>Current Page</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>,
      );
      expect(screen.getByText("Current Page")).toHaveAttribute(
        "aria-current",
        "page",
      );
    });

    it("should have disabled/current styling", () => {
      render(
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbPage data-testid="page">Current</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>,
      );
      const page = screen.getByTestId("page");
      expect(page).toHaveClass("font-medium");
      expect(page).toHaveClass("text-gray-900");
    });

    it("should not be a link", () => {
      render(
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbPage>Current Page</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>,
      );
      expect(screen.queryByRole("link")).not.toBeInTheDocument();
    });
  });

  describe("BreadcrumbSeparator", () => {
    it("should render separator", () => {
      render(
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/home">Home</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator data-testid="separator" />
            <BreadcrumbItem>
              <BreadcrumbPage>Current</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>,
      );
      expect(screen.getByTestId("separator")).toBeInTheDocument();
    });

    it("should have aria-hidden", () => {
      render(
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbSeparator data-testid="separator" />
          </BreadcrumbList>
        </Breadcrumb>,
      );
      expect(screen.getByTestId("separator")).toHaveAttribute(
        "aria-hidden",
        "true",
      );
    });

    it('should have role="presentation"', () => {
      render(
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbSeparator data-testid="separator" />
          </BreadcrumbList>
        </Breadcrumb>,
      );
      expect(screen.getByTestId("separator")).toHaveAttribute(
        "role",
        "presentation",
      );
    });

    it("should accept custom separator", () => {
      render(
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbSeparator data-testid="separator">/</BreadcrumbSeparator>
          </BreadcrumbList>
        </Breadcrumb>,
      );
      expect(screen.getByTestId("separator")).toHaveTextContent("/");
    });

    it("should render default chevron icon when no children", () => {
      render(
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbSeparator data-testid="separator" />
          </BreadcrumbList>
        </Breadcrumb>,
      );
      const separator = screen.getByTestId("separator");
      expect(separator.querySelector("svg")).toBeInTheDocument();
    });
  });

  describe("BreadcrumbEllipsis", () => {
    it("should render ellipsis button", () => {
      render(
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbEllipsis data-testid="ellipsis" />
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>,
      );
      expect(screen.getByTestId("ellipsis")).toBeInTheDocument();
    });

    it("should have accessible label", () => {
      render(
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbEllipsis />
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>,
      );
      expect(screen.getByRole("button", { name: /more/i })).toBeInTheDocument();
    });

    it("should have hover styles", () => {
      render(
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbEllipsis data-testid="ellipsis" />
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>,
      );
      const ellipsis = screen.getByTestId("ellipsis");
      expect(ellipsis).toHaveClass("hover:bg-gray-100");
    });

    it("should handle click events", () => {
      const handleClick = vi.fn();
      render(
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbEllipsis onClick={handleClick} />
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>,
      );
      fireEvent.click(screen.getByRole("button"));
      expect(handleClick).toHaveBeenCalledTimes(1);
    });
  });

  describe("Composed Breadcrumb", () => {
    it("should render full breadcrumb composition", () => {
      render(
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/">Home</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink href="/products">Products</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Current Product</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>,
      );

      expect(screen.getByRole("link", { name: "Home" })).toBeInTheDocument();
      expect(
        screen.getByRole("link", { name: "Products" }),
      ).toBeInTheDocument();
      expect(screen.getByText("Current Product")).toBeInTheDocument();
    });

    it("should render with ellipsis for collapsed items", () => {
      render(
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/">Home</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbEllipsis />
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Current</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>,
      );

      expect(screen.getByRole("link", { name: "Home" })).toBeInTheDocument();
      expect(screen.getByRole("button", { name: /more/i })).toBeInTheDocument();
      expect(screen.getByText("Current")).toBeInTheDocument();
    });
  });

  describe("Accessibility", () => {
    it("should have proper structure for screen readers", () => {
      render(
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/">Home</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Current</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>,
      );

      const nav = screen.getByRole("navigation");
      expect(nav).toBeInTheDocument();

      const list = nav.querySelector("ol");
      expect(list).toBeInTheDocument();
    });

    it("should indicate current page with aria-current", () => {
      render(
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbPage>Current</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>,
      );

      expect(screen.getByText("Current")).toHaveAttribute(
        "aria-current",
        "page",
      );
    });
  });
});
