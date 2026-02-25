import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent, within } from "@testing-library/react";
import {
  KanbanBoard,
  KanbanColumn,
  KanbanColumnHeader,
  KanbanColumnContent,
  KanbanCard,
  type KanbanColumnData,
  type KanbanCardData,
} from "./KanbanBoard";

const mockCards: KanbanCardData[] = [
  { id: "1", title: "Task 1", description: "Description 1", columnId: "todo" },
  { id: "2", title: "Task 2", description: "Description 2", columnId: "todo" },
  {
    id: "3",
    title: "Task 3",
    description: "Description 3",
    columnId: "in-progress",
  },
  { id: "4", title: "Task 4", columnId: "done" },
];

const mockColumns: KanbanColumnData[] = [
  { id: "todo", title: "To Do", color: "#6B7280" },
  { id: "in-progress", title: "In Progress", color: "#3B82F6" },
  { id: "done", title: "Done", color: "#10B981" },
];

describe("KanbanBoard Component", () => {
  describe("KanbanBoard", () => {
    it("should render board container", () => {
      render(
        <KanbanBoard
          columns={mockColumns}
          cards={mockCards}
          data-testid="board"
        />,
      );
      expect(screen.getByTestId("board")).toBeInTheDocument();
    });

    it("should have horizontal layout", () => {
      render(
        <KanbanBoard
          columns={mockColumns}
          cards={mockCards}
          data-testid="board"
        />,
      );
      const board = screen.getByTestId("board");
      expect(board).toHaveClass("flex");
      expect(board).toHaveClass("gap-4");
    });

    it("should render all columns", () => {
      render(<KanbanBoard columns={mockColumns} cards={mockCards} />);
      expect(screen.getByText("To Do")).toBeInTheDocument();
      expect(screen.getByText("In Progress")).toBeInTheDocument();
      expect(screen.getByText("Done")).toBeInTheDocument();
    });

    it("should apply custom className", () => {
      render(
        <KanbanBoard
          columns={mockColumns}
          cards={mockCards}
          className="custom-class"
          data-testid="board"
        />,
      );
      expect(screen.getByTestId("board")).toHaveClass("custom-class");
    });

    it("should allow horizontal scrolling", () => {
      render(
        <KanbanBoard
          columns={mockColumns}
          cards={mockCards}
          data-testid="board"
        />,
      );
      const board = screen.getByTestId("board");
      expect(board).toHaveClass("overflow-x-auto");
    });
  });

  describe("KanbanColumn", () => {
    it("should render column container", () => {
      render(<KanbanBoard columns={mockColumns} cards={mockCards} />);
      const todoColumn = screen.getByText("To Do").closest("[data-column]");
      expect(todoColumn).toBeInTheDocument();
    });

    it("should have flex column layout", () => {
      render(<KanbanBoard columns={mockColumns} cards={mockCards} />);
      const todoColumn = screen.getByText("To Do").closest("[data-column]");
      expect(todoColumn).toHaveClass("flex");
      expect(todoColumn).toHaveClass("flex-col");
    });

    it("should have min width", () => {
      render(<KanbanBoard columns={mockColumns} cards={mockCards} />);
      const todoColumn = screen.getByText("To Do").closest("[data-column]");
      expect(todoColumn).toHaveClass("min-w-[280px]");
    });

    it("should have background color", () => {
      render(<KanbanBoard columns={mockColumns} cards={mockCards} />);
      const todoColumn = screen.getByText("To Do").closest("[data-column]");
      expect(todoColumn).toHaveClass("bg-gray-100");
    });

    it("should have rounded corners", () => {
      render(<KanbanBoard columns={mockColumns} cards={mockCards} />);
      const todoColumn = screen.getByText("To Do").closest("[data-column]");
      expect(todoColumn).toHaveClass("rounded-lg");
    });
  });

  describe("KanbanColumnHeader", () => {
    it("should display column title", () => {
      render(<KanbanBoard columns={mockColumns} cards={mockCards} />);
      expect(screen.getByText("To Do")).toBeInTheDocument();
    });

    it("should display card count", () => {
      render(<KanbanBoard columns={mockColumns} cards={mockCards} />);
      // To Do has 2 cards
      const todoColumn = screen
        .getByText("To Do")
        .closest("[data-column]") as HTMLElement;
      expect(within(todoColumn).getByText("2")).toBeInTheDocument();
    });

    it("should show column color indicator", () => {
      render(<KanbanBoard columns={mockColumns} cards={mockCards} />);
      const todoHeader = screen
        .getByText("To Do")
        .closest("[data-column-header]");
      const colorIndicator = todoHeader?.querySelector(
        "[data-color-indicator]",
      );
      expect(colorIndicator).toBeInTheDocument();
    });

    it("should render add card button when onAddCard provided", () => {
      const onAddCard = vi.fn();
      render(
        <KanbanBoard
          columns={mockColumns}
          cards={mockCards}
          onAddCard={onAddCard}
        />,
      );
      const addButtons = screen.getAllByRole("button", { name: /add/i });
      expect(addButtons.length).toBe(3); // One per column
    });

    it("should call onAddCard with column id when add button clicked", () => {
      const onAddCard = vi.fn();
      render(
        <KanbanBoard
          columns={mockColumns}
          cards={mockCards}
          onAddCard={onAddCard}
        />,
      );

      const todoColumn = screen
        .getByText("To Do")
        .closest("[data-column]") as HTMLElement;
      const addButton = within(todoColumn).getByRole("button", {
        name: /add/i,
      });
      fireEvent.click(addButton);

      expect(onAddCard).toHaveBeenCalledWith("todo");
    });
  });

  describe("KanbanColumnContent", () => {
    it("should render cards in correct columns", () => {
      render(<KanbanBoard columns={mockColumns} cards={mockCards} />);

      const todoColumn = screen
        .getByText("To Do")
        .closest("[data-column]") as HTMLElement;
      expect(within(todoColumn).getByText("Task 1")).toBeInTheDocument();
      expect(within(todoColumn).getByText("Task 2")).toBeInTheDocument();

      const inProgressColumn = screen
        .getByText("In Progress")
        .closest("[data-column]") as HTMLElement;
      expect(within(inProgressColumn).getByText("Task 3")).toBeInTheDocument();

      const doneColumn = screen
        .getByText("Done")
        .closest("[data-column]") as HTMLElement;
      expect(within(doneColumn).getByText("Task 4")).toBeInTheDocument();
    });

    it("should have scrollable content area", () => {
      render(<KanbanBoard columns={mockColumns} cards={mockCards} />);
      const todoColumn = screen.getByText("To Do").closest("[data-column]");
      const content = todoColumn?.querySelector("[data-column-content]");
      expect(content).toHaveClass("overflow-y-auto");
    });

    it("should show empty state when no cards", () => {
      const columnsWithEmptyCards = mockColumns.filter((c) => c.id === "todo");
      const cardsNotInTodo = mockCards.filter((c) => c.columnId !== "todo");
      render(
        <KanbanBoard
          columns={columnsWithEmptyCards}
          cards={cardsNotInTodo}
          emptyColumnMessage="No cards yet"
        />,
      );
      expect(screen.getByText("No cards yet")).toBeInTheDocument();
    });
  });

  describe("KanbanCard", () => {
    it("should display card title", () => {
      render(<KanbanBoard columns={mockColumns} cards={mockCards} />);
      expect(screen.getByText("Task 1")).toBeInTheDocument();
    });

    it("should display card description when provided", () => {
      render(<KanbanBoard columns={mockColumns} cards={mockCards} />);
      expect(screen.getByText("Description 1")).toBeInTheDocument();
    });

    it("should not show description when not provided", () => {
      render(<KanbanBoard columns={mockColumns} cards={mockCards} />);
      const task4Card = screen.getByText("Task 4").closest("[data-card]");
      expect(task4Card?.textContent).not.toContain("Description");
    });

    it("should have card styling", () => {
      render(<KanbanBoard columns={mockColumns} cards={mockCards} />);
      const card = screen.getByText("Task 1").closest("[data-card]");
      expect(card).toHaveClass("bg-white");
      expect(card).toHaveClass("rounded-md");
      expect(card).toHaveClass("shadow-sm");
    });

    it("should have hover effect", () => {
      render(<KanbanBoard columns={mockColumns} cards={mockCards} />);
      const card = screen.getByText("Task 1").closest("[data-card]");
      expect(card).toHaveClass("hover:shadow-md");
    });

    it("should call onCardClick when card is clicked", () => {
      const onCardClick = vi.fn();
      render(
        <KanbanBoard
          columns={mockColumns}
          cards={mockCards}
          onCardClick={onCardClick}
        />,
      );

      fireEvent.click(screen.getByText("Task 1").closest("[data-card]")!);
      expect(onCardClick).toHaveBeenCalledWith(mockCards[0]);
    });

    it("should be draggable when draggable prop is true", () => {
      render(<KanbanBoard columns={mockColumns} cards={mockCards} draggable />);
      const card = screen.getByText("Task 1").closest("[data-card]");
      expect(card).toHaveAttribute("draggable", "true");
    });
  });

  describe("Compound Components", () => {
    it("should support custom column composition", () => {
      render(
        <KanbanBoard columns={[]} cards={[]}>
          <KanbanColumn id="custom" data-testid="custom-column">
            <KanbanColumnHeader>
              <span>Custom Column</span>
            </KanbanColumnHeader>
            <KanbanColumnContent>
              <KanbanCard id="custom-card" title="Custom Card" />
            </KanbanColumnContent>
          </KanbanColumn>
        </KanbanBoard>,
      );

      expect(screen.getByText("Custom Column")).toBeInTheDocument();
      expect(screen.getByText("Custom Card")).toBeInTheDocument();
    });
  });

  describe("Drag and Drop Preparation", () => {
    it("should call onCardMove when card is dropped", () => {
      const onCardMove = vi.fn();
      render(
        <KanbanBoard
          columns={mockColumns}
          cards={mockCards}
          draggable
          onCardMove={onCardMove}
        />,
      );

      const card = screen.getByText("Task 1").closest("[data-card]")!;

      // Simulate drag start
      fireEvent.dragStart(card, {
        dataTransfer: { setData: vi.fn(), effectAllowed: "move" },
      });

      // Simulate drop on in-progress column
      const inProgressColumn = screen
        .getByText("In Progress")
        .closest("[data-column]")!;
      const dropZone = inProgressColumn.querySelector("[data-column-content]")!;

      fireEvent.dragOver(dropZone, {
        preventDefault: vi.fn(),
        dataTransfer: { dropEffect: "move" },
      });

      fireEvent.drop(dropZone, {
        preventDefault: vi.fn(),
        dataTransfer: { getData: () => "1" },
      });

      expect(onCardMove).toHaveBeenCalledWith({
        cardId: "1",
        sourceColumnId: "todo",
        targetColumnId: "in-progress",
        targetIndex: expect.any(Number),
      });
    });

    it("should show drop indicator when dragging over column", () => {
      render(<KanbanBoard columns={mockColumns} cards={mockCards} draggable />);

      const card = screen.getByText("Task 1").closest("[data-card]")!;
      fireEvent.dragStart(card, {
        dataTransfer: { setData: vi.fn() },
      });

      const inProgressColumn = screen
        .getByText("In Progress")
        .closest("[data-column]")!;
      const dropZone = inProgressColumn.querySelector("[data-column-content]")!;

      fireEvent.dragOver(dropZone);

      expect(dropZone).toHaveClass("bg-accent-50");
    });
  });

  describe("Loading State", () => {
    it("should show loading indicator when loading", () => {
      render(<KanbanBoard columns={mockColumns} cards={mockCards} loading />);
      expect(screen.getByRole("status")).toBeInTheDocument();
    });
  });

  describe("Accessibility", () => {
    it("should have proper landmark structure", () => {
      render(
        <KanbanBoard
          columns={mockColumns}
          cards={mockCards}
          aria-label="Project board"
        />,
      );
      expect(screen.getByRole("region")).toBeInTheDocument();
    });

    it("should have accessible column headings", () => {
      render(<KanbanBoard columns={mockColumns} cards={mockCards} />);
      expect(
        screen.getByRole("heading", { name: "To Do" }),
      ).toBeInTheDocument();
      expect(
        screen.getByRole("heading", { name: "In Progress" }),
      ).toBeInTheDocument();
      expect(screen.getByRole("heading", { name: "Done" })).toBeInTheDocument();
    });

    it("should support keyboard navigation on cards", () => {
      render(<KanbanBoard columns={mockColumns} cards={mockCards} />);
      const card = screen.getByText("Task 1").closest("[data-card]");
      expect(card).toHaveAttribute("tabIndex", "0");
    });
  });

  describe("Responsive Behavior", () => {
    it("should support vertical layout on mobile", () => {
      render(
        <KanbanBoard
          columns={mockColumns}
          cards={mockCards}
          mobileLayout="vertical"
          data-testid="board"
        />,
      );
      const board = screen.getByTestId("board");
      expect(board).toHaveClass("md:flex-row");
      expect(board).toHaveClass("flex-col");
    });
  });
});
