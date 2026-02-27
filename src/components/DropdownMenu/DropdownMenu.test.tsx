import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import type { ComponentProps } from "react";
import {
  DropdownMenu,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuLabel,
} from "./DropdownMenu";

function renderDropdown(props?: Partial<ComponentProps<typeof DropdownMenu>>) {
  return render(
    <DropdownMenu trigger={<button>Open Menu</button>} {...props}>
      <DropdownMenuLabel>Actions</DropdownMenuLabel>
      <DropdownMenuItem onSelect={() => {}}>Edit</DropdownMenuItem>
      <DropdownMenuItem onSelect={() => {}}>Copy</DropdownMenuItem>
      <DropdownMenuSeparator />
      <DropdownMenuItem destructive onSelect={() => {}}>
        Delete
      </DropdownMenuItem>
    </DropdownMenu>,
  );
}

function renderPortalDropdown(
  props?: Partial<ComponentProps<typeof DropdownMenu>>,
) {
  return renderDropdown({ portal: true, ...props });
}

describe("DropdownMenu Component", () => {
  describe("Rendering", () => {
    it("should render trigger", () => {
      renderDropdown();
      expect(screen.getByText("Open Menu")).toBeInTheDocument();
    });

    it("should not render menu by default", () => {
      renderDropdown();
      expect(screen.queryByRole("menu")).not.toBeInTheDocument();
    });

    it("should render menu when trigger is clicked", () => {
      renderDropdown();
      fireEvent.click(screen.getByText("Open Menu"));
      expect(screen.getByRole("menu")).toBeInTheDocument();
    });

    it("should render menu items", () => {
      renderDropdown();
      fireEvent.click(screen.getByText("Open Menu"));
      expect(screen.getByText("Edit")).toBeInTheDocument();
      expect(screen.getByText("Copy")).toBeInTheDocument();
      expect(screen.getByText("Delete")).toBeInTheDocument();
    });

    it("should render label", () => {
      renderDropdown();
      fireEvent.click(screen.getByText("Open Menu"));
      expect(screen.getByText("Actions")).toBeInTheDocument();
    });

    it("should render separator", () => {
      renderDropdown();
      fireEvent.click(screen.getByText("Open Menu"));
      expect(screen.getByRole("separator")).toBeInTheDocument();
    });
  });

  describe("Icon", () => {
    it("should render icon when provided", () => {
      render(
        <DropdownMenu trigger={<button>Open</button>}>
          <DropdownMenuItem
            icon={<svg data-testid="test-icon" />}
            onSelect={() => {}}
          >
            Settings
          </DropdownMenuItem>
        </DropdownMenu>,
      );
      fireEvent.click(screen.getByText("Open"));
      expect(screen.getByTestId("test-icon")).toBeInTheDocument();
    });

    it("should not render icon wrapper when icon is not provided", () => {
      render(
        <DropdownMenu trigger={<button>Open</button>}>
          <DropdownMenuItem onSelect={() => {}}>Settings</DropdownMenuItem>
        </DropdownMenu>,
      );
      fireEvent.click(screen.getByText("Open"));
      const button = screen.getByText("Settings");
      expect(button.querySelector("span")).toBeNull();
    });

    it("should render icon with correct wrapper styles", () => {
      render(
        <DropdownMenu trigger={<button>Open</button>}>
          <DropdownMenuItem
            icon={<svg data-testid="test-icon" />}
            onSelect={() => {}}
          >
            Settings
          </DropdownMenuItem>
        </DropdownMenu>,
      );
      fireEvent.click(screen.getByText("Open"));
      const iconWrapper = screen.getByTestId("test-icon").parentElement;
      expect(iconWrapper?.tagName).toBe("SPAN");
      expect(iconWrapper).toHaveClass("size-6");
    });
  });

  describe("Open/Close", () => {
    it("should toggle menu on trigger click", () => {
      renderDropdown();
      const trigger = screen.getByText("Open Menu");
      fireEvent.click(trigger);
      expect(screen.getByRole("menu")).toBeInTheDocument();
      fireEvent.click(trigger);
      expect(screen.queryByRole("menu")).not.toBeInTheDocument();
    });

    it("should close on Escape key", () => {
      renderDropdown();
      fireEvent.click(screen.getByText("Open Menu"));
      expect(screen.getByRole("menu")).toBeInTheDocument();
      fireEvent.keyDown(document, { key: "Escape" });
      expect(screen.queryByRole("menu")).not.toBeInTheDocument();
    });

    it("should close on outside click", () => {
      renderDropdown();
      fireEvent.click(screen.getByText("Open Menu"));
      expect(screen.getByRole("menu")).toBeInTheDocument();
      fireEvent.mouseDown(document.body);
      expect(screen.queryByRole("menu")).not.toBeInTheDocument();
    });

    it("should support controlled open state", () => {
      const handleOpenChange = vi.fn();
      render(
        <DropdownMenu
          trigger={<button>Open</button>}
          open={true}
          onOpenChange={handleOpenChange}
        >
          <DropdownMenuItem>Item</DropdownMenuItem>
        </DropdownMenu>,
      );
      expect(screen.getByRole("menu")).toBeInTheDocument();
    });
  });

  describe("Menu Items", () => {
    it("should call onSelect when item is clicked", () => {
      const handleSelect = vi.fn();
      render(
        <DropdownMenu trigger={<button>Open</button>}>
          <DropdownMenuItem onSelect={handleSelect}>Action</DropdownMenuItem>
        </DropdownMenu>,
      );
      fireEvent.click(screen.getByText("Open"));
      fireEvent.click(screen.getByText("Action"));
      expect(handleSelect).toHaveBeenCalled();
    });

    it("should not call onSelect when disabled", () => {
      const handleSelect = vi.fn();
      render(
        <DropdownMenu trigger={<button>Open</button>}>
          <DropdownMenuItem disabled onSelect={handleSelect}>
            Action
          </DropdownMenuItem>
        </DropdownMenu>,
      );
      fireEvent.click(screen.getByText("Open"));
      fireEvent.click(screen.getByText("Action"));
      expect(handleSelect).not.toHaveBeenCalled();
    });

    it("should have destructive styling", () => {
      renderDropdown();
      fireEvent.click(screen.getByText("Open Menu"));
      expect(screen.getByText("Delete")).toHaveClass("text-primary-600");
    });

    it("should have disabled styling", () => {
      render(
        <DropdownMenu trigger={<button>Open</button>}>
          <DropdownMenuItem disabled>Disabled</DropdownMenuItem>
        </DropdownMenu>,
      );
      fireEvent.click(screen.getByText("Open"));
      expect(screen.getByText("Disabled")).toHaveClass("opacity-50");
    });
  });

  describe("Keyboard Navigation", () => {
    it("should open menu with Enter key", () => {
      renderDropdown();
      const trigger = screen.getByText("Open Menu").parentElement!;
      fireEvent.keyDown(trigger, { key: "Enter" });
      expect(screen.getByRole("menu")).toBeInTheDocument();
    });

    it("should navigate items with ArrowDown", () => {
      renderDropdown();
      fireEvent.click(screen.getByText("Open Menu"));
      const firstItem = screen.getByText("Edit");
      firstItem.focus();
      fireEvent.keyDown(firstItem, { key: "ArrowDown" });
      expect(screen.getByText("Copy")).toHaveFocus();
    });
  });

  describe("Alignment", () => {
    it("should apply start alignment by default", () => {
      renderDropdown();
      fireEvent.click(screen.getByText("Open Menu"));
      expect(screen.getByRole("menu")).toHaveClass("left-0");
    });

    it("should apply end alignment", () => {
      renderDropdown({ align: "end" });
      fireEvent.click(screen.getByText("Open Menu"));
      expect(screen.getByRole("menu")).toHaveClass("right-0");
    });

    it("should apply bottom side by default", () => {
      renderDropdown();
      fireEvent.click(screen.getByText("Open Menu"));
      expect(screen.getByRole("menu")).toHaveClass("top-full");
    });

    it("should apply top side", () => {
      renderDropdown({ side: "top" });
      fireEvent.click(screen.getByText("Open Menu"));
      expect(screen.getByRole("menu")).toHaveClass("bottom-full");
    });
  });

  describe("Accessibility", () => {
    it("should have aria-haspopup on trigger", () => {
      renderDropdown();
      const trigger = screen.getByText("Open Menu").parentElement!;
      expect(trigger).toHaveAttribute("aria-haspopup", "true");
    });

    it("should have aria-expanded on trigger", () => {
      renderDropdown();
      const trigger = screen.getByText("Open Menu").parentElement!;
      expect(trigger).toHaveAttribute("aria-expanded", "false");
      fireEvent.click(screen.getByText("Open Menu"));
      expect(trigger).toHaveAttribute("aria-expanded", "true");
    });

    it("should have menuitem role on items", () => {
      renderDropdown();
      fireEvent.click(screen.getByText("Open Menu"));
      expect(screen.getAllByRole("menuitem")).toHaveLength(3);
    });
  });

  describe("Portal Mode", () => {
    it("should render menu in document.body when portal is true", () => {
      renderPortalDropdown();
      fireEvent.click(screen.getByText("Open Menu"));
      const menu = screen.getByRole("menu");
      expect(menu).toBeInTheDocument();
      // Menu should be a direct child of document.body (portaled)
      expect(menu.parentElement).toBe(document.body);
    });

    it("should render menu inside container when portal is false", () => {
      renderDropdown();
      fireEvent.click(screen.getByText("Open Menu"));
      const menu = screen.getByRole("menu");
      // Menu should NOT be a direct child of document.body
      expect(menu.parentElement).not.toBe(document.body);
    });

    it("should use fixed positioning in portal mode", () => {
      renderPortalDropdown();
      fireEvent.click(screen.getByText("Open Menu"));
      const menu = screen.getByRole("menu");
      expect(menu).toHaveClass("fixed");
      expect(menu).not.toHaveClass("absolute");
    });

    it("should close on outside click in portal mode", () => {
      renderPortalDropdown();
      fireEvent.click(screen.getByText("Open Menu"));
      expect(screen.getByRole("menu")).toBeInTheDocument();
      fireEvent.mouseDown(document.body);
      expect(screen.queryByRole("menu")).not.toBeInTheDocument();
    });

    it("should not close when clicking the menu itself in portal mode", () => {
      renderPortalDropdown();
      fireEvent.click(screen.getByText("Open Menu"));
      const menu = screen.getByRole("menu");
      fireEvent.mouseDown(menu);
      expect(screen.getByRole("menu")).toBeInTheDocument();
    });

    it("should close on Escape in portal mode", () => {
      renderPortalDropdown();
      fireEvent.click(screen.getByText("Open Menu"));
      expect(screen.getByRole("menu")).toBeInTheDocument();
      fireEvent.keyDown(document, { key: "Escape" });
      expect(screen.queryByRole("menu")).not.toBeInTheDocument();
    });

    it("should support keyboard navigation in portal mode", () => {
      renderPortalDropdown();
      fireEvent.click(screen.getByText("Open Menu"));
      const firstItem = screen.getByText("Edit");
      firstItem.focus();
      fireEvent.keyDown(firstItem, { key: "ArrowDown" });
      expect(screen.getByText("Copy")).toHaveFocus();
    });

    it("should toggle menu on trigger click in portal mode", () => {
      renderPortalDropdown();
      const trigger = screen.getByText("Open Menu");
      fireEvent.click(trigger);
      expect(screen.getByRole("menu")).toBeInTheDocument();
      fireEvent.click(trigger);
      expect(screen.queryByRole("menu")).not.toBeInTheDocument();
    });

    it("should default portal to false", () => {
      renderDropdown();
      fireEvent.click(screen.getByText("Open Menu"));
      const menu = screen.getByRole("menu");
      expect(menu).toHaveClass("absolute");
      expect(menu).not.toHaveClass("fixed");
    });
  });
});
