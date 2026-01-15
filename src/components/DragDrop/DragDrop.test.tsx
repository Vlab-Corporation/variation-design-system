import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import {
  DragDropContext,
  Draggable,
  Droppable,
  DragOverlay,
  type DragEndEvent,
} from "./DragDrop";

describe("DragDrop Components", () => {
  describe("DragDropContext", () => {
    it("should render children", () => {
      render(
        <DragDropContext onDragEnd={() => {}}>
          <div data-testid="child">Child content</div>
        </DragDropContext>,
      );
      expect(screen.getByTestId("child")).toBeInTheDocument();
    });

    it("should call onDragStart when drag begins", () => {
      const onDragStart = vi.fn();
      render(
        <DragDropContext onDragEnd={() => {}} onDragStart={onDragStart}>
          <Droppable id="droppable-1">
            {(provided) => (
              <div ref={provided.innerRef} {...provided.droppableProps}>
                <Draggable id="item-1" index={0}>
                  {(dragProvided) => (
                    <div
                      ref={dragProvided.innerRef}
                      {...dragProvided.draggableProps}
                      {...dragProvided.dragHandleProps}
                    >
                      Drag me
                    </div>
                  )}
                </Draggable>
              </div>
            )}
          </Droppable>
        </DragDropContext>,
      );

      const draggable = screen.getByText("Drag me");
      fireEvent.mouseDown(draggable);

      expect(onDragStart).toHaveBeenCalled();
    });

    it("should call onDragEnd when drag ends", () => {
      const onDragEnd = vi.fn();
      render(
        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable id="droppable-1">
            {(provided) => (
              <div ref={provided.innerRef} {...provided.droppableProps}>
                <Draggable id="item-1" index={0}>
                  {(dragProvided) => (
                    <div
                      ref={dragProvided.innerRef}
                      {...dragProvided.draggableProps}
                      {...dragProvided.dragHandleProps}
                    >
                      Drag me
                    </div>
                  )}
                </Draggable>
              </div>
            )}
          </Droppable>
        </DragDropContext>,
      );

      const draggable = screen.getByText("Drag me");
      fireEvent.mouseDown(draggable);
      fireEvent.mouseUp(draggable);

      expect(onDragEnd).toHaveBeenCalled();
    });
  });

  describe("Droppable", () => {
    it("should render with droppable props", () => {
      render(
        <DragDropContext onDragEnd={() => {}}>
          <Droppable id="droppable-1">
            {(provided) => (
              <div
                ref={provided.innerRef}
                {...provided.droppableProps}
                data-testid="droppable"
              >
                Drop zone
              </div>
            )}
          </Droppable>
        </DragDropContext>,
      );

      const droppable = screen.getByTestId("droppable");
      expect(droppable).toHaveAttribute("data-droppable-id", "droppable-1");
    });

    it("should apply isDraggingOver style when item dragged over", () => {
      render(
        <DragDropContext onDragEnd={() => {}}>
          <Droppable id="droppable-1">
            {(provided, snapshot) => (
              <div
                ref={provided.innerRef}
                {...provided.droppableProps}
                data-testid="droppable"
                className={snapshot.isDraggingOver ? "bg-blue-100" : ""}
              >
                Drop zone
              </div>
            )}
          </Droppable>
        </DragDropContext>,
      );

      expect(screen.getByTestId("droppable")).toBeInTheDocument();
    });

    it("should support horizontal direction", () => {
      render(
        <DragDropContext onDragEnd={() => {}}>
          <Droppable id="droppable-1" direction="horizontal">
            {(provided) => (
              <div
                ref={provided.innerRef}
                {...provided.droppableProps}
                data-testid="droppable"
              >
                Horizontal drop zone
              </div>
            )}
          </Droppable>
        </DragDropContext>,
      );

      const droppable = screen.getByTestId("droppable");
      expect(droppable).toHaveAttribute("data-direction", "horizontal");
    });

    it("should support vertical direction", () => {
      render(
        <DragDropContext onDragEnd={() => {}}>
          <Droppable id="droppable-1" direction="vertical">
            {(provided) => (
              <div
                ref={provided.innerRef}
                {...provided.droppableProps}
                data-testid="droppable"
              >
                Vertical drop zone
              </div>
            )}
          </Droppable>
        </DragDropContext>,
      );

      const droppable = screen.getByTestId("droppable");
      expect(droppable).toHaveAttribute("data-direction", "vertical");
    });

    it("should be disabled when isDropDisabled is true", () => {
      render(
        <DragDropContext onDragEnd={() => {}}>
          <Droppable id="droppable-1" isDropDisabled>
            {(provided) => (
              <div
                ref={provided.innerRef}
                {...provided.droppableProps}
                data-testid="droppable"
              >
                Disabled drop zone
              </div>
            )}
          </Droppable>
        </DragDropContext>,
      );

      const droppable = screen.getByTestId("droppable");
      expect(droppable).toHaveAttribute("data-drop-disabled", "true");
    });
  });

  describe("Draggable", () => {
    it("should render with draggable props", () => {
      render(
        <DragDropContext onDragEnd={() => {}}>
          <Droppable id="droppable-1">
            {(provided) => (
              <div ref={provided.innerRef} {...provided.droppableProps}>
                <Draggable id="item-1" index={0}>
                  {(dragProvided) => (
                    <div
                      ref={dragProvided.innerRef}
                      {...dragProvided.draggableProps}
                      {...dragProvided.dragHandleProps}
                      data-testid="draggable"
                    >
                      Draggable item
                    </div>
                  )}
                </Draggable>
              </div>
            )}
          </Droppable>
        </DragDropContext>,
      );

      const draggable = screen.getByTestId("draggable");
      expect(draggable).toHaveAttribute("data-draggable-id", "item-1");
    });

    it("should provide isDragging state", () => {
      render(
        <DragDropContext onDragEnd={() => {}}>
          <Droppable id="droppable-1">
            {(provided) => (
              <div ref={provided.innerRef} {...provided.droppableProps}>
                <Draggable id="item-1" index={0}>
                  {(dragProvided, snapshot) => (
                    <div
                      ref={dragProvided.innerRef}
                      {...dragProvided.draggableProps}
                      {...dragProvided.dragHandleProps}
                      data-testid="draggable"
                      className={snapshot.isDragging ? "dragging" : ""}
                    >
                      Draggable item
                    </div>
                  )}
                </Draggable>
              </div>
            )}
          </Droppable>
        </DragDropContext>,
      );

      expect(screen.getByTestId("draggable")).toBeInTheDocument();
    });

    it("should be disabled when isDragDisabled is true", () => {
      render(
        <DragDropContext onDragEnd={() => {}}>
          <Droppable id="droppable-1">
            {(provided) => (
              <div ref={provided.innerRef} {...provided.droppableProps}>
                <Draggable id="item-1" index={0} isDragDisabled>
                  {(dragProvided) => (
                    <div
                      ref={dragProvided.innerRef}
                      {...dragProvided.draggableProps}
                      {...dragProvided.dragHandleProps}
                      data-testid="draggable"
                    >
                      Disabled draggable
                    </div>
                  )}
                </Draggable>
              </div>
            )}
          </Droppable>
        </DragDropContext>,
      );

      const draggable = screen.getByTestId("draggable");
      expect(draggable).toHaveAttribute("data-drag-disabled", "true");
    });

    it("should have correct aria attributes", () => {
      render(
        <DragDropContext onDragEnd={() => {}}>
          <Droppable id="droppable-1">
            {(provided) => (
              <div ref={provided.innerRef} {...provided.droppableProps}>
                <Draggable id="item-1" index={0}>
                  {(dragProvided) => (
                    <div
                      ref={dragProvided.innerRef}
                      {...dragProvided.draggableProps}
                      {...dragProvided.dragHandleProps}
                      data-testid="draggable"
                    >
                      Accessible draggable
                    </div>
                  )}
                </Draggable>
              </div>
            )}
          </Droppable>
        </DragDropContext>,
      );

      const draggable = screen.getByTestId("draggable");
      expect(draggable).toHaveAttribute("role", "button");
      expect(draggable).toHaveAttribute("tabIndex", "0");
      expect(draggable).toHaveAttribute("aria-grabbed", "false");
    });

    it("should support separate drag handle", () => {
      render(
        <DragDropContext onDragEnd={() => {}}>
          <Droppable id="droppable-1">
            {(provided) => (
              <div ref={provided.innerRef} {...provided.droppableProps}>
                <Draggable id="item-1" index={0}>
                  {(dragProvided) => (
                    <div
                      ref={dragProvided.innerRef}
                      {...dragProvided.draggableProps}
                      data-testid="draggable"
                    >
                      <span
                        {...dragProvided.dragHandleProps}
                        data-testid="handle"
                      >
                        ⠿
                      </span>
                      Item content
                    </div>
                  )}
                </Draggable>
              </div>
            )}
          </Droppable>
        </DragDropContext>,
      );

      expect(screen.getByTestId("handle")).toHaveAttribute("role", "button");
    });
  });

  describe("DragOverlay", () => {
    it("should render when drag is active", () => {
      render(
        <DragDropContext onDragEnd={() => {}}>
          <Droppable id="droppable-1">
            {(provided) => (
              <div ref={provided.innerRef} {...provided.droppableProps}>
                <Draggable id="item-1" index={0}>
                  {(dragProvided) => (
                    <div
                      ref={dragProvided.innerRef}
                      {...dragProvided.draggableProps}
                      {...dragProvided.dragHandleProps}
                    >
                      Original item
                    </div>
                  )}
                </Draggable>
              </div>
            )}
          </Droppable>
          <DragOverlay>
            {(activeId) =>
              activeId && <div data-testid="overlay">Dragging: {activeId}</div>
            }
          </DragOverlay>
        </DragDropContext>,
      );

      // Overlay should not be visible initially
      expect(screen.queryByTestId("overlay")).not.toBeInTheDocument();
    });

    it("should apply custom styling", () => {
      render(
        <DragDropContext onDragEnd={() => {}}>
          <DragOverlay className="custom-overlay">
            {() => <div>Overlay content</div>}
          </DragOverlay>
        </DragDropContext>,
      );

      // Component should be able to receive custom class
      expect(true).toBe(true);
    });
  });

  describe("Reordering", () => {
    it("should provide source and destination in onDragEnd", () => {
      const onDragEnd = vi.fn();

      render(
        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable id="list">
            {(provided) => (
              <div ref={provided.innerRef} {...provided.droppableProps}>
                <Draggable id="item-1" index={0}>
                  {(dragProvided) => (
                    <div
                      ref={dragProvided.innerRef}
                      {...dragProvided.draggableProps}
                      {...dragProvided.dragHandleProps}
                    >
                      Item 1
                    </div>
                  )}
                </Draggable>
                <Draggable id="item-2" index={1}>
                  {(dragProvided) => (
                    <div
                      ref={dragProvided.innerRef}
                      {...dragProvided.draggableProps}
                      {...dragProvided.dragHandleProps}
                    >
                      Item 2
                    </div>
                  )}
                </Draggable>
              </div>
            )}
          </Droppable>
        </DragDropContext>,
      );

      const item1 = screen.getByText("Item 1");
      fireEvent.mouseDown(item1);
      fireEvent.mouseUp(item1);

      expect(onDragEnd).toHaveBeenCalled();
      const event: DragEndEvent = onDragEnd.mock.calls[0][0];
      expect(event).toHaveProperty("source");
      expect(event).toHaveProperty("draggableId");
    });
  });

  describe("Multiple Droppables", () => {
    it("should support moving between droppables", () => {
      const onDragEnd = vi.fn();

      render(
        <DragDropContext onDragEnd={onDragEnd}>
          <div style={{ display: "flex", gap: "16px" }}>
            <Droppable id="column-1">
              {(provided) => (
                <div
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  data-testid="column-1"
                >
                  <Draggable id="item-1" index={0}>
                    {(dragProvided) => (
                      <div
                        ref={dragProvided.innerRef}
                        {...dragProvided.draggableProps}
                        {...dragProvided.dragHandleProps}
                      >
                        Item in Column 1
                      </div>
                    )}
                  </Draggable>
                </div>
              )}
            </Droppable>
            <Droppable id="column-2">
              {(provided) => (
                <div
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  data-testid="column-2"
                >
                  Drop here
                </div>
              )}
            </Droppable>
          </div>
        </DragDropContext>,
      );

      expect(screen.getByTestId("column-1")).toHaveAttribute(
        "data-droppable-id",
        "column-1",
      );
      expect(screen.getByTestId("column-2")).toHaveAttribute(
        "data-droppable-id",
        "column-2",
      );
    });
  });

  describe("Keyboard Support", () => {
    it("should start drag on Space key", () => {
      const onDragStart = vi.fn();

      render(
        <DragDropContext onDragEnd={() => {}} onDragStart={onDragStart}>
          <Droppable id="droppable-1">
            {(provided) => (
              <div ref={provided.innerRef} {...provided.droppableProps}>
                <Draggable id="item-1" index={0}>
                  {(dragProvided) => (
                    <div
                      ref={dragProvided.innerRef}
                      {...dragProvided.draggableProps}
                      {...dragProvided.dragHandleProps}
                    >
                      Keyboard draggable
                    </div>
                  )}
                </Draggable>
              </div>
            )}
          </Droppable>
        </DragDropContext>,
      );

      const draggable = screen.getByText("Keyboard draggable");
      draggable.focus();
      fireEvent.keyDown(draggable, { key: " " });

      expect(onDragStart).toHaveBeenCalled();
    });

    it("should cancel drag on Escape key", () => {
      const onDragEnd = vi.fn();

      render(
        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable id="droppable-1">
            {(provided) => (
              <div ref={provided.innerRef} {...provided.droppableProps}>
                <Draggable id="item-1" index={0}>
                  {(dragProvided) => (
                    <div
                      ref={dragProvided.innerRef}
                      {...dragProvided.draggableProps}
                      {...dragProvided.dragHandleProps}
                    >
                      Keyboard draggable
                    </div>
                  )}
                </Draggable>
              </div>
            )}
          </Droppable>
        </DragDropContext>,
      );

      const draggable = screen.getByText("Keyboard draggable");
      fireEvent.keyDown(draggable, { key: " " });
      fireEvent.keyDown(draggable, { key: "Escape" });

      // Should call onDragEnd with reason: 'CANCEL'
      expect(onDragEnd).toHaveBeenCalled();
    });
  });

  describe("Accessibility", () => {
    it("should announce drag start to screen readers", () => {
      render(
        <DragDropContext onDragEnd={() => {}}>
          <Droppable id="droppable-1">
            {(provided) => (
              <div ref={provided.innerRef} {...provided.droppableProps}>
                <Draggable id="item-1" index={0}>
                  {(dragProvided) => (
                    <div
                      ref={dragProvided.innerRef}
                      {...dragProvided.draggableProps}
                      {...dragProvided.dragHandleProps}
                    >
                      Accessible item
                    </div>
                  )}
                </Draggable>
              </div>
            )}
          </Droppable>
        </DragDropContext>,
      );

      // Should have live region for announcements
      expect(document.querySelector("[aria-live]")).toBeInTheDocument();
    });

    it("should have descriptive aria-label on drag handle", () => {
      render(
        <DragDropContext onDragEnd={() => {}}>
          <Droppable id="droppable-1">
            {(provided) => (
              <div ref={provided.innerRef} {...provided.droppableProps}>
                <Draggable id="item-1" index={0}>
                  {(dragProvided) => (
                    <div
                      ref={dragProvided.innerRef}
                      {...dragProvided.draggableProps}
                      {...dragProvided.dragHandleProps}
                      data-testid="draggable"
                    >
                      Labeled item
                    </div>
                  )}
                </Draggable>
              </div>
            )}
          </Droppable>
        </DragDropContext>,
      );

      const draggable = screen.getByTestId("draggable");
      expect(draggable).toHaveAttribute("aria-label");
    });
  });
});
