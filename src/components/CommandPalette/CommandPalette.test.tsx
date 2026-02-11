import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { CommandPalette } from "./CommandPalette";

const items = [
  { id: "1", label: "New File", group: "File", shortcut: "Ctrl+N" },
  { id: "2", label: "Open File", group: "File", shortcut: "Ctrl+O" },
  { id: "3", label: "Save", group: "File", shortcut: "Ctrl+S" },
  { id: "4", label: "Search", group: "Edit", shortcut: "Ctrl+F" },
  { id: "5", label: "Replace", group: "Edit" },
];

describe("CommandPalette Component", () => {
  describe("Rendering", () => {
    it("should not render when closed", () => {
      render(
        <CommandPalette open={false} onOpenChange={() => {}} items={items} />,
      );
      expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
    });

    it("should render when open", () => {
      render(
        <CommandPalette open={true} onOpenChange={() => {}} items={items} />,
      );
      expect(screen.getByRole("dialog")).toBeInTheDocument();
    });

    it("should render search input", () => {
      render(
        <CommandPalette open={true} onOpenChange={() => {}} items={items} />,
      );
      expect(screen.getByLabelText("Search commands")).toBeInTheDocument();
    });

    it("should render all items", () => {
      render(
        <CommandPalette open={true} onOpenChange={() => {}} items={items} />,
      );
      expect(screen.getByText("New File")).toBeInTheDocument();
      expect(screen.getByText("Save")).toBeInTheDocument();
      expect(screen.getByText("Search")).toBeInTheDocument();
    });

    it("should render group labels", () => {
      render(
        <CommandPalette open={true} onOpenChange={() => {}} items={items} />,
      );
      expect(screen.getByText("File")).toBeInTheDocument();
      expect(screen.getByText("Edit")).toBeInTheDocument();
    });

    it("should render shortcuts", () => {
      render(
        <CommandPalette open={true} onOpenChange={() => {}} items={items} />,
      );
      expect(screen.getByText("Ctrl+N")).toBeInTheDocument();
    });
  });

  describe("Filtering", () => {
    it("should filter items by query", () => {
      render(
        <CommandPalette open={true} onOpenChange={() => {}} items={items} />,
      );
      fireEvent.change(screen.getByLabelText("Search commands"), {
        target: { value: "new" },
      });
      expect(screen.getByText("New File")).toBeInTheDocument();
      expect(screen.queryByText("Save")).not.toBeInTheDocument();
    });

    it("should show empty text when no results", () => {
      render(
        <CommandPalette
          open={true}
          onOpenChange={() => {}}
          items={items}
          emptyText="No commands found"
        />,
      );
      fireEvent.change(screen.getByLabelText("Search commands"), {
        target: { value: "zzzzz" },
      });
      expect(screen.getByText("No commands found")).toBeInTheDocument();
    });
  });

  describe("Selection", () => {
    it("should call onSelect when item is clicked", () => {
      const handleSelect = vi.fn();
      render(
        <CommandPalette
          open={true}
          onOpenChange={() => {}}
          items={items}
          onSelect={handleSelect}
        />,
      );
      fireEvent.click(screen.getByText("New File"));
      expect(handleSelect).toHaveBeenCalledWith(
        expect.objectContaining({ id: "1", label: "New File" }),
      );
    });

    it("should call item onSelect when item is clicked", () => {
      const handleItemSelect = vi.fn();
      const itemsWithSelect = [
        { ...items[0], onSelect: handleItemSelect },
        ...items.slice(1),
      ];
      render(
        <CommandPalette
          open={true}
          onOpenChange={() => {}}
          items={itemsWithSelect}
        />,
      );
      fireEvent.click(screen.getByText("New File"));
      expect(handleItemSelect).toHaveBeenCalledOnce();
    });
  });

  describe("Keyboard Navigation", () => {
    it("should close on Escape", () => {
      const handleOpenChange = vi.fn();
      render(
        <CommandPalette
          open={true}
          onOpenChange={handleOpenChange}
          items={items}
        />,
      );
      fireEvent.keyDown(screen.getByLabelText("Search commands"), {
        key: "Escape",
      });
      expect(handleOpenChange).toHaveBeenCalledWith(false);
    });

    it("should select item on Enter", () => {
      const handleSelect = vi.fn();
      render(
        <CommandPalette
          open={true}
          onOpenChange={() => {}}
          items={items}
          onSelect={handleSelect}
        />,
      );
      fireEvent.keyDown(screen.getByLabelText("Search commands"), {
        key: "Enter",
      });
      expect(handleSelect).toHaveBeenCalledOnce();
    });
  });

  describe("Close", () => {
    it("should close on overlay click", () => {
      const handleOpenChange = vi.fn();
      render(
        <CommandPalette
          open={true}
          onOpenChange={handleOpenChange}
          items={items}
        />,
      );
      // Click the overlay (parent of dialog)
      const overlay = screen.getByRole("dialog").parentElement!;
      fireEvent.click(overlay);
      expect(handleOpenChange).toHaveBeenCalledWith(false);
    });
  });
});
