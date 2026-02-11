import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { SimpleAccordion } from "./Accordion";

const items = [
  { value: "item1", trigger: "Section 1", content: "Content 1" },
  { value: "item2", trigger: "Section 2", content: "Content 2" },
  { value: "item3", trigger: "Section 3", content: "Content 3" },
];

describe("Accordion Component", () => {
  describe("Rendering", () => {
    it("should render all triggers", () => {
      render(<SimpleAccordion items={items} />);
      expect(screen.getByText("Section 1")).toBeInTheDocument();
      expect(screen.getByText("Section 2")).toBeInTheDocument();
      expect(screen.getByText("Section 3")).toBeInTheDocument();
    });

    it("should not show content by default", () => {
      render(<SimpleAccordion items={items} />);
      expect(screen.queryByText("Content 1")).not.toBeInTheDocument();
    });
  });

  describe("Expand/Collapse", () => {
    it("should expand item on click", () => {
      render(<SimpleAccordion items={items} />);
      fireEvent.click(screen.getByText("Section 1"));
      expect(screen.getByText("Content 1")).toBeVisible();
    });

    it("should collapse item on second click", () => {
      render(<SimpleAccordion items={items} />);
      fireEvent.click(screen.getByText("Section 1"));
      expect(screen.getByText("Content 1")).toBeVisible();
      fireEvent.click(screen.getByText("Section 1"));
      expect(screen.queryByText("Content 1")).not.toBeInTheDocument();
    });

    it("should close other items in single mode", () => {
      render(<SimpleAccordion items={items} />);
      fireEvent.click(screen.getByText("Section 1"));
      expect(screen.getByText("Content 1")).toBeVisible();
      fireEvent.click(screen.getByText("Section 2"));
      expect(screen.queryByText("Content 1")).not.toBeInTheDocument();
      expect(screen.getByText("Content 2")).toBeVisible();
    });

    it("should keep multiple items open in multiple mode", () => {
      render(<SimpleAccordion items={items} multiple />);
      fireEvent.click(screen.getByText("Section 1"));
      fireEvent.click(screen.getByText("Section 2"));
      expect(screen.getByText("Content 1")).toBeVisible();
      expect(screen.getByText("Content 2")).toBeVisible();
    });
  });

  describe("Default Value", () => {
    it("should expand default items", () => {
      render(<SimpleAccordion items={items} defaultValue={["item2"]} />);
      expect(screen.getByText("Content 2")).toBeVisible();
    });
  });

  describe("Controlled", () => {
    it("should call onChange when toggled", () => {
      const handleChange = vi.fn();
      render(<SimpleAccordion items={items} onChange={handleChange} />);
      fireEvent.click(screen.getByText("Section 1"));
      expect(handleChange).toHaveBeenCalledWith(["item1"]);
    });
  });

  describe("Disabled", () => {
    it("should not expand disabled item", () => {
      const disabledItems = [
        ...items.slice(0, 1),
        { ...items[1], disabled: true },
        ...items.slice(2),
      ];
      render(<SimpleAccordion items={disabledItems} />);
      fireEvent.click(screen.getByText("Section 2"));
      expect(screen.queryByText("Content 2")).not.toBeInTheDocument();
    });
  });

  describe("Variants", () => {
    it("should apply default variant", () => {
      const { container } = render(<SimpleAccordion items={items} />);
      expect(container.firstChild).toHaveClass("divide-y");
    });

    it("should apply bordered variant", () => {
      const { container } = render(
        <SimpleAccordion items={items} variant="bordered" />,
      );
      expect(container.firstChild).toHaveClass("border");
    });

    it("should apply separated variant", () => {
      const { container } = render(
        <SimpleAccordion items={items} variant="separated" />,
      );
      expect(container.firstChild).toHaveClass("space-y-2");
    });
  });

  describe("Accessibility", () => {
    it("should have aria-expanded on triggers", () => {
      render(<SimpleAccordion items={items} />);
      const trigger = screen.getByText("Section 1").closest("button")!;
      expect(trigger).toHaveAttribute("aria-expanded", "false");
      fireEvent.click(trigger);
      expect(trigger).toHaveAttribute("aria-expanded", "true");
    });

    it("should have region role on content", () => {
      render(<SimpleAccordion items={items} defaultValue={["item1"]} />);
      expect(screen.getAllByRole("region").length).toBeGreaterThan(0);
    });
  });
});
