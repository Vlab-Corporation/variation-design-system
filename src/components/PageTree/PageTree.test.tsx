import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent, within } from "@testing-library/react";
import {
  PageTree,
  PageTreeItem,
  PageTreeItemIcon,
  PageTreeItemLabel,
  PageTreeItemActions,
  type PageNode,
} from "./PageTree";

const mockPages: PageNode[] = [
  {
    id: "1",
    title: "Home",
    icon: "🏠",
    children: [
      {
        id: "1-1",
        title: "Getting Started",
        icon: "📖",
        children: [],
      },
      {
        id: "1-2",
        title: "Features",
        icon: "✨",
        children: [
          {
            id: "1-2-1",
            title: "Feature A",
            children: [],
          },
        ],
      },
    ],
  },
  {
    id: "2",
    title: "Settings",
    icon: "⚙️",
    children: [],
  },
];

describe("PageTree Component", () => {
  describe("PageTree", () => {
    it("should render tree container", () => {
      render(<PageTree pages={mockPages} data-testid="tree" />);
      expect(screen.getByTestId("tree")).toBeInTheDocument();
    });

    it("should have tree role", () => {
      render(<PageTree pages={mockPages} />);
      expect(screen.getByRole("tree")).toBeInTheDocument();
    });

    it("should render all top-level pages", () => {
      render(<PageTree pages={mockPages} />);
      expect(screen.getByText("Home")).toBeInTheDocument();
      expect(screen.getByText("Settings")).toBeInTheDocument();
    });

    it("should apply custom className", () => {
      render(
        <PageTree
          pages={mockPages}
          className="custom-class"
          data-testid="tree"
        />,
      );
      expect(screen.getByTestId("tree")).toHaveClass("custom-class");
    });

    it("should have base styling", () => {
      render(<PageTree pages={mockPages} data-testid="tree" />);
      const tree = screen.getByTestId("tree");
      expect(tree).toHaveClass("w-full");
    });

    it("should handle empty pages array", () => {
      render(<PageTree pages={[]} data-testid="tree" />);
      expect(screen.getByTestId("tree")).toBeInTheDocument();
      expect(screen.getByRole("tree").children.length).toBe(0);
    });
  });

  describe("PageTreeItem", () => {
    it("should render as treeitem role", () => {
      render(<PageTree pages={mockPages} />);
      const treeItems = screen.getAllByRole("treeitem");
      expect(treeItems.length).toBeGreaterThan(0);
    });

    it("should show page title", () => {
      render(<PageTree pages={mockPages} />);
      expect(screen.getByText("Home")).toBeInTheDocument();
    });

    it("should show page icon", () => {
      render(<PageTree pages={mockPages} />);
      expect(screen.getByText("🏠")).toBeInTheDocument();
    });

    it("should have hover styles", () => {
      render(<PageTree pages={mockPages} />);
      const homeItem = screen.getByText("Home").closest('[role="treeitem"]');
      expect(homeItem?.querySelector("[data-tree-item-content]")).toHaveClass(
        "hover:bg-gray-100",
      );
    });

    it("should have rounded corners", () => {
      render(<PageTree pages={mockPages} />);
      const homeItem = screen.getByText("Home").closest('[role="treeitem"]');
      expect(homeItem?.querySelector("[data-tree-item-content]")).toHaveClass(
        "rounded-md",
      );
    });
  });

  describe("Expand/Collapse Behavior", () => {
    it("should render expand button for items with children", () => {
      render(<PageTree pages={mockPages} />);
      const homeItem = screen.getByText("Home").closest('[role="treeitem"]');
      const expandButton = within(homeItem as HTMLElement).getByRole("button", {
        name: /toggle/i,
      });
      expect(expandButton).toBeInTheDocument();
    });

    it("should not render expand button for items without children", () => {
      render(<PageTree pages={mockPages} />);
      const settingsItem = screen
        .getByText("Settings")
        .closest('[role="treeitem"]');
      const buttons = within(settingsItem as HTMLElement).queryAllByRole(
        "button",
        { name: /toggle/i },
      );
      expect(buttons.length).toBe(0);
    });

    it("should toggle children visibility on expand button click", () => {
      render(<PageTree pages={mockPages} />);

      // Children should be hidden initially
      expect(screen.queryByText("Getting Started")).not.toBeInTheDocument();

      // Click expand
      const homeItem = screen.getByText("Home").closest('[role="treeitem"]');
      const expandButton = within(homeItem as HTMLElement).getByRole("button", {
        name: /toggle/i,
      });
      fireEvent.click(expandButton);

      // Children should be visible
      expect(screen.getByText("Getting Started")).toBeInTheDocument();
    });

    it("should have aria-expanded attribute", () => {
      render(<PageTree pages={mockPages} />);
      const homeItem = screen.getByText("Home").closest('[role="treeitem"]');
      expect(homeItem).toHaveAttribute("aria-expanded", "false");

      const expandButton = within(homeItem as HTMLElement).getByRole("button", {
        name: /toggle/i,
      });
      fireEvent.click(expandButton);

      expect(homeItem).toHaveAttribute("aria-expanded", "true");
    });

    it("should show chevron icon pointing right when collapsed", () => {
      render(<PageTree pages={mockPages} />);
      const homeItem = screen.getByText("Home").closest('[role="treeitem"]');
      const expandButton = within(homeItem as HTMLElement).getByRole("button", {
        name: /toggle/i,
      });
      const svg = expandButton.querySelector("svg");
      expect(svg).toBeInTheDocument();
    });

    it("should rotate chevron when expanded", () => {
      render(<PageTree pages={mockPages} />);
      const homeItem = screen.getByText("Home").closest('[role="treeitem"]');
      const expandButton = within(homeItem as HTMLElement).getByRole("button", {
        name: /toggle/i,
      });
      fireEvent.click(expandButton);

      // Check for rotation class
      expect(expandButton).toHaveClass("rotate-90");
    });
  });

  describe("Selection", () => {
    it("should call onSelect when page is clicked", () => {
      const onSelect = vi.fn();
      render(<PageTree pages={mockPages} onSelect={onSelect} />);

      fireEvent.click(screen.getByText("Home"));
      expect(onSelect).toHaveBeenCalledWith(mockPages[0]);
    });

    it("should highlight selected page", () => {
      render(<PageTree pages={mockPages} selectedId="1" />);
      const homeItem = screen.getByText("Home").closest('[role="treeitem"]');
      expect(homeItem?.querySelector("[data-tree-item-content]")).toHaveClass(
        "bg-primary-100",
      );
    });

    it("should not highlight unselected pages", () => {
      render(<PageTree pages={mockPages} selectedId="1" />);
      const settingsItem = screen
        .getByText("Settings")
        .closest('[role="treeitem"]');
      expect(
        settingsItem?.querySelector("[data-tree-item-content]"),
      ).not.toHaveClass("bg-primary-100");
    });

    it("should call onSelect with child page", () => {
      const onSelect = vi.fn();
      render(
        <PageTree
          pages={mockPages}
          onSelect={onSelect}
          defaultExpandedIds={["1"]}
        />,
      );

      fireEvent.click(screen.getByText("Getting Started"));
      expect(onSelect).toHaveBeenCalledWith(mockPages[0].children![0]);
    });
  });

  describe("Indentation", () => {
    it("should indent nested items", () => {
      render(<PageTree pages={mockPages} defaultExpandedIds={["1", "1-2"]} />);

      // First level (Home) should have no indent
      const homeContent = screen
        .getByText("Home")
        .closest("[data-tree-item-content]");
      expect(homeContent).toHaveStyle({ paddingLeft: "8px" });

      // Second level (Getting Started) should be indented
      const gettingStartedContent = screen
        .getByText("Getting Started")
        .closest("[data-tree-item-content]");
      expect(gettingStartedContent).toHaveStyle({ paddingLeft: "24px" });

      // Third level (Feature A) should be more indented
      const featureAContent = screen
        .getByText("Feature A")
        .closest("[data-tree-item-content]");
      expect(featureAContent).toHaveStyle({ paddingLeft: "40px" });
    });
  });

  describe("Default Expanded", () => {
    it("should expand items in defaultExpandedIds", () => {
      render(<PageTree pages={mockPages} defaultExpandedIds={["1"]} />);
      expect(screen.getByText("Getting Started")).toBeInTheDocument();
    });

    it("should support multiple default expanded ids", () => {
      render(<PageTree pages={mockPages} defaultExpandedIds={["1", "1-2"]} />);
      expect(screen.getByText("Getting Started")).toBeInTheDocument();
      expect(screen.getByText("Feature A")).toBeInTheDocument();
    });
  });

  describe("Controlled Expanded State", () => {
    it("should respect expandedIds prop", () => {
      const { rerender } = render(
        <PageTree pages={mockPages} expandedIds={[]} />,
      );
      expect(screen.queryByText("Getting Started")).not.toBeInTheDocument();

      rerender(<PageTree pages={mockPages} expandedIds={["1"]} />);
      expect(screen.getByText("Getting Started")).toBeInTheDocument();
    });

    it("should call onExpandedChange when expanding", () => {
      const onExpandedChange = vi.fn();
      render(
        <PageTree pages={mockPages} onExpandedChange={onExpandedChange} />,
      );

      const homeItem = screen.getByText("Home").closest('[role="treeitem"]');
      const expandButton = within(homeItem as HTMLElement).getByRole("button", {
        name: /toggle/i,
      });
      fireEvent.click(expandButton);

      expect(onExpandedChange).toHaveBeenCalled();
    });
  });

  describe("Compound Components", () => {
    it("should support custom PageTreeItem composition", () => {
      render(
        <PageTree pages={[]}>
          <PageTreeItem id="custom-1" hasChildren={false}>
            <PageTreeItemIcon>🎨</PageTreeItemIcon>
            <PageTreeItemLabel>Custom Page</PageTreeItemLabel>
            <PageTreeItemActions>
              <button type="button">Action</button>
            </PageTreeItemActions>
          </PageTreeItem>
        </PageTree>,
      );

      expect(screen.getByText("🎨")).toBeInTheDocument();
      expect(screen.getByText("Custom Page")).toBeInTheDocument();
      expect(
        screen.getByRole("button", { name: "Action" }),
      ).toBeInTheDocument();
    });
  });

  describe("Drag and Drop Preparation", () => {
    it("should render items as draggable when draggable prop is true", () => {
      render(<PageTree pages={mockPages} draggable />);
      const homeItem = screen.getByText("Home").closest('[role="treeitem"]');
      expect(
        homeItem?.querySelector("[data-tree-item-content]"),
      ).toHaveAttribute("draggable", "true");
    });

    it("should not be draggable by default", () => {
      render(<PageTree pages={mockPages} />);
      const homeItem = screen.getByText("Home").closest('[role="treeitem"]');
      expect(
        homeItem?.querySelector("[data-tree-item-content]"),
      ).not.toHaveAttribute("draggable", "true");
    });
  });

  describe("Keyboard Navigation", () => {
    it("should support arrow down to move to next item", () => {
      render(<PageTree pages={mockPages} />);
      const tree = screen.getByRole("tree");

      // Focus the tree
      tree.focus();
      fireEvent.keyDown(tree, { key: "ArrowDown" });

      // First item should be focused
      const homeItem = screen.getByText("Home").closest('[role="treeitem"]');
      expect(document.activeElement).toBe(
        homeItem?.querySelector("[data-tree-item-content]"),
      );
    });

    it("should support arrow right to expand item", () => {
      render(<PageTree pages={mockPages} />);
      const homeItem = screen.getByText("Home").closest('[role="treeitem"]');
      const content = homeItem?.querySelector(
        "[data-tree-item-content]",
      ) as HTMLElement;

      content?.focus();
      fireEvent.keyDown(content, { key: "ArrowRight" });

      expect(screen.getByText("Getting Started")).toBeInTheDocument();
    });

    it("should support arrow left to collapse item", () => {
      render(<PageTree pages={mockPages} defaultExpandedIds={["1"]} />);
      const homeItem = screen.getByText("Home").closest('[role="treeitem"]');
      const content = homeItem?.querySelector(
        "[data-tree-item-content]",
      ) as HTMLElement;

      content?.focus();
      fireEvent.keyDown(content, { key: "ArrowLeft" });

      expect(screen.queryByText("Getting Started")).not.toBeInTheDocument();
    });

    it("should support Enter to select item", () => {
      const onSelect = vi.fn();
      render(<PageTree pages={mockPages} onSelect={onSelect} />);

      const homeItem = screen.getByText("Home").closest('[role="treeitem"]');
      const content = homeItem?.querySelector(
        "[data-tree-item-content]",
      ) as HTMLElement;

      content?.focus();
      fireEvent.keyDown(content, { key: "Enter" });

      expect(onSelect).toHaveBeenCalledWith(mockPages[0]);
    });
  });

  describe("Accessibility", () => {
    it("should have proper tree structure", () => {
      render(<PageTree pages={mockPages} defaultExpandedIds={["1"]} />);

      const tree = screen.getByRole("tree");
      expect(tree).toBeInTheDocument();

      const treeItems = screen.getAllByRole("treeitem");
      expect(treeItems.length).toBeGreaterThan(0);
    });

    it("should use group role for nested lists", () => {
      render(<PageTree pages={mockPages} defaultExpandedIds={["1"]} />);

      const groups = screen.getAllByRole("group");
      expect(groups.length).toBeGreaterThan(0);
    });

    it("should have aria-level for nested items", () => {
      render(<PageTree pages={mockPages} defaultExpandedIds={["1", "1-2"]} />);

      const homeItem = screen.getByText("Home").closest('[role="treeitem"]');
      expect(homeItem).toHaveAttribute("aria-level", "1");

      const gettingStartedItem = screen
        .getByText("Getting Started")
        .closest('[role="treeitem"]');
      expect(gettingStartedItem).toHaveAttribute("aria-level", "2");

      const featureAItem = screen
        .getByText("Feature A")
        .closest('[role="treeitem"]');
      expect(featureAItem).toHaveAttribute("aria-level", "3");
    });
  });

  describe("Loading State", () => {
    it("should show loading indicator when loading prop is true", () => {
      render(<PageTree pages={[]} loading />);
      expect(screen.getByRole("status")).toBeInTheDocument();
    });

    it("should not show loading indicator by default", () => {
      render(<PageTree pages={mockPages} />);
      expect(screen.queryByRole("status")).not.toBeInTheDocument();
    });
  });

  describe("Empty State", () => {
    it("should show empty message when no pages", () => {
      render(<PageTree pages={[]} emptyMessage="No pages yet" />);
      expect(screen.getByText("No pages yet")).toBeInTheDocument();
    });

    it("should not show empty message when loading", () => {
      render(<PageTree pages={[]} loading emptyMessage="No pages yet" />);
      expect(screen.queryByText("No pages yet")).not.toBeInTheDocument();
    });
  });
});
