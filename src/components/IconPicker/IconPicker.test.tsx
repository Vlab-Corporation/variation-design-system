import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import {
  IconPicker,
  IconPickerTrigger,
  IconPickerContent,
  IconPickerGrid,
  IconPickerItem,
} from "./IconPicker";

const mockIcons = ["📄", "🏠", "⭐", "📁", "📝", "🎯", "🔧", "💡", "🎨", "📊"];

describe("IconPicker Component", () => {
  describe("IconPicker", () => {
    it("should render trigger", () => {
      render(
        <IconPicker>
          <IconPickerTrigger data-testid="trigger">
            Select Icon
          </IconPickerTrigger>
          <IconPickerContent>
            <IconPickerGrid icons={mockIcons} onSelect={() => {}} />
          </IconPickerContent>
        </IconPicker>,
      );
      expect(screen.getByTestId("trigger")).toBeInTheDocument();
    });

    it("should open on trigger click", () => {
      render(
        <IconPicker>
          <IconPickerTrigger>Select Icon</IconPickerTrigger>
          <IconPickerContent data-testid="content">
            <IconPickerGrid icons={mockIcons} onSelect={() => {}} />
          </IconPickerContent>
        </IconPicker>,
      );

      fireEvent.click(screen.getByText("Select Icon"));
      expect(screen.getByTestId("content")).toBeInTheDocument();
    });

    it("should call onSelect when icon clicked", () => {
      const onSelect = vi.fn();
      render(
        <IconPicker>
          <IconPickerTrigger>Select Icon</IconPickerTrigger>
          <IconPickerContent>
            <IconPickerGrid icons={mockIcons} onSelect={onSelect} />
          </IconPickerContent>
        </IconPicker>,
      );

      fireEvent.click(screen.getByText("Select Icon"));
      fireEvent.click(screen.getByText("📄"));
      expect(onSelect).toHaveBeenCalledWith("📄");
    });

    it("should close after selection", () => {
      render(
        <IconPicker>
          <IconPickerTrigger>Select Icon</IconPickerTrigger>
          <IconPickerContent data-testid="content">
            <IconPickerGrid icons={mockIcons} onSelect={() => {}} />
          </IconPickerContent>
        </IconPicker>,
      );

      fireEvent.click(screen.getByText("Select Icon"));
      expect(screen.getByTestId("content")).toBeInTheDocument();

      fireEvent.click(screen.getByText("📄"));
      expect(screen.queryByTestId("content")).not.toBeInTheDocument();
    });
  });

  describe("IconPickerGrid", () => {
    it("should render all icons", () => {
      render(
        <IconPicker defaultOpen>
          <IconPickerTrigger>Select</IconPickerTrigger>
          <IconPickerContent>
            <IconPickerGrid icons={mockIcons} onSelect={() => {}} />
          </IconPickerContent>
        </IconPicker>,
      );

      mockIcons.forEach((icon) => {
        expect(screen.getByText(icon)).toBeInTheDocument();
      });
    });

    it("should have grid layout", () => {
      render(
        <IconPicker defaultOpen>
          <IconPickerTrigger>Select</IconPickerTrigger>
          <IconPickerContent>
            <IconPickerGrid
              icons={mockIcons}
              onSelect={() => {}}
              data-testid="grid"
            />
          </IconPickerContent>
        </IconPicker>,
      );

      expect(screen.getByTestId("grid")).toHaveClass("grid");
    });
  });

  describe("IconPickerItem", () => {
    it("should render icon button", () => {
      render(
        <IconPicker defaultOpen>
          <IconPickerTrigger>Select</IconPickerTrigger>
          <IconPickerContent>
            <IconPickerItem icon="🎯" onClick={() => {}} data-testid="item" />
          </IconPickerContent>
        </IconPicker>,
      );

      expect(screen.getByTestId("item")).toBeInTheDocument();
    });

    it("should have hover styles", () => {
      render(
        <IconPicker defaultOpen>
          <IconPickerTrigger>Select</IconPickerTrigger>
          <IconPickerContent>
            <IconPickerItem icon="🎯" onClick={() => {}} data-testid="item" />
          </IconPickerContent>
        </IconPicker>,
      );

      expect(screen.getByTestId("item")).toHaveClass("hover:bg-gray-100");
    });
  });

  describe("Accessibility", () => {
    it("should have proper aria attributes", () => {
      render(
        <IconPicker>
          <IconPickerTrigger data-testid="trigger">
            Select Icon
          </IconPickerTrigger>
          <IconPickerContent>
            <IconPickerGrid icons={mockIcons} onSelect={() => {}} />
          </IconPickerContent>
        </IconPicker>,
      );

      expect(screen.getByTestId("trigger")).toHaveAttribute(
        "aria-haspopup",
        "true",
      );
    });

    it("should support keyboard navigation", () => {
      render(
        <IconPicker>
          <IconPickerTrigger>Select Icon</IconPickerTrigger>
          <IconPickerContent>
            <IconPickerGrid icons={mockIcons} onSelect={() => {}} />
          </IconPickerContent>
        </IconPicker>,
      );

      const trigger = screen.getByText("Select Icon");
      fireEvent.keyDown(trigger, { key: "Enter" });
      expect(screen.getByText("📄")).toBeInTheDocument();
    });
  });
});
