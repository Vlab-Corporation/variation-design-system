import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
  useRef,
  type ReactNode,
  type HTMLAttributes,
  type KeyboardEvent,
  type MouseEvent,
} from "react";
import { cn } from "@/utils/cn";

/* Types */
export interface DragStartEvent {
  draggableId: string;
  source: {
    droppableId: string;
    index: number;
  };
}

export interface DragEndEvent {
  draggableId: string;
  source: {
    droppableId: string;
    index: number;
  };
  destination: {
    droppableId: string;
    index: number;
  } | null;
  reason: "DROP" | "CANCEL";
}

export interface DroppableProvided {
  innerRef: React.RefCallback<HTMLElement>;
  droppableProps: {
    "data-droppable-id": string;
    "data-direction": string;
    "data-drop-disabled"?: string;
  };
  placeholder?: ReactNode;
}

export interface DroppableSnapshot {
  isDraggingOver: boolean;
  draggingFromThisWith: string | null;
}

export interface DraggableProvided {
  innerRef: React.RefCallback<HTMLElement>;
  draggableProps: {
    "data-draggable-id": string;
    "data-index": number;
    "data-drag-disabled"?: string;
  };
  dragHandleProps: {
    role: "button";
    tabIndex: number;
    "aria-grabbed": boolean;
    "aria-label": string;
    onMouseDown: (e: MouseEvent) => void;
    onKeyDown: (e: KeyboardEvent) => void;
  };
}

export interface DraggableSnapshot {
  isDragging: boolean;
  isDropAnimating: boolean;
}

/* Context */
interface DragDropContextValue {
  activeId: string | null;
  activeIndex: number;
  activeDroppableId: string | null;
  overDroppableId: string | null;
  startDrag: (id: string, droppableId: string, index: number) => void;
  endDrag: (
    destinationDroppableId: string | null,
    destinationIndex: number | null,
  ) => void;
  cancelDrag: () => void;
  setOverDroppable: (id: string | null) => void;
  registerDroppable: (id: string, direction: "horizontal" | "vertical") => void;
  unregisterDroppable: (id: string) => void;
}

const DragDropContext = createContext<DragDropContextValue | null>(null);

const useDragDropContext = () => {
  const context = useContext(DragDropContext);
  if (!context) {
    throw new Error("useDragDropContext must be used within DragDropProvider");
  }
  return context;
};

/* DragDropProvider */
export interface DragDropProviderProps {
  children: ReactNode;
  onDragStart?: (event: DragStartEvent) => void;
  onDragEnd: (event: DragEndEvent) => void;
}

export const DragDropProvider = ({
  children,
  onDragStart,
  onDragEnd,
}: DragDropProviderProps) => {
  const [activeId, setActiveId] = useState<string | null>(null);
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [activeDroppableId, setActiveDroppableId] = useState<string | null>(
    null,
  );
  const [overDroppableId, setOverDroppableId] = useState<string | null>(null);
  const droppablesRef = useRef<
    Map<string, { direction: "horizontal" | "vertical" }>
  >(new Map());

  const startDrag = useCallback(
    (id: string, droppableId: string, index: number) => {
      setActiveId(id);
      setActiveIndex(index);
      setActiveDroppableId(droppableId);

      onDragStart?.({
        draggableId: id,
        source: {
          droppableId,
          index,
        },
      });
    },
    [onDragStart],
  );

  const endDrag = useCallback(
    (
      destinationDroppableId: string | null,
      destinationIndex: number | null,
    ) => {
      if (activeId && activeDroppableId !== null) {
        onDragEnd({
          draggableId: activeId,
          source: {
            droppableId: activeDroppableId,
            index: activeIndex,
          },
          destination:
            destinationDroppableId !== null && destinationIndex !== null
              ? {
                  droppableId: destinationDroppableId,
                  index: destinationIndex,
                }
              : null,
          reason: "DROP",
        });
      }

      setActiveId(null);
      setActiveIndex(0);
      setActiveDroppableId(null);
      setOverDroppableId(null);
    },
    [activeId, activeDroppableId, activeIndex, onDragEnd],
  );

  const cancelDrag = useCallback(() => {
    if (activeId && activeDroppableId !== null) {
      onDragEnd({
        draggableId: activeId,
        source: {
          droppableId: activeDroppableId,
          index: activeIndex,
        },
        destination: null,
        reason: "CANCEL",
      });
    }

    setActiveId(null);
    setActiveIndex(0);
    setActiveDroppableId(null);
    setOverDroppableId(null);
  }, [activeId, activeDroppableId, activeIndex, onDragEnd]);

  const registerDroppable = useCallback(
    (id: string, direction: "horizontal" | "vertical") => {
      droppablesRef.current.set(id, { direction });
    },
    [],
  );

  const unregisterDroppable = useCallback((id: string) => {
    droppablesRef.current.delete(id);
  }, []);

  // Handle global events for drag
  useEffect(() => {
    if (!activeId) return;

    const handleMouseUp = () => {
      endDrag(overDroppableId, overDroppableId ? 0 : null);
    };

    const handleKeyDown = (e: globalThis.KeyboardEvent) => {
      if (e.key === "Escape") {
        cancelDrag();
      }
    };

    window.addEventListener("mouseup", handleMouseUp);
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("mouseup", handleMouseUp);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [activeId, overDroppableId, endDrag, cancelDrag]);

  return (
    <DragDropContext.Provider
      value={{
        activeId,
        activeIndex,
        activeDroppableId,
        overDroppableId,
        startDrag,
        endDrag,
        cancelDrag,
        setOverDroppable: setOverDroppableId,
        registerDroppable,
        unregisterDroppable,
      }}
    >
      {/* Live region for screen reader announcements */}
      <div aria-live="polite" aria-atomic="true" className="sr-only">
        {activeId ? `Dragging item ${activeId}` : ""}
      </div>
      {children}
    </DragDropContext.Provider>
  );
};

// Re-export for API compatibility
export { DragDropProvider as DragDropContext };

/* Droppable */
export interface DroppableProps {
  id: string;
  direction?: "horizontal" | "vertical";
  isDropDisabled?: boolean;
  children: (
    provided: DroppableProvided,
    snapshot: DroppableSnapshot,
  ) => ReactNode;
}

export const Droppable = ({
  id,
  direction = "vertical",
  isDropDisabled = false,
  children,
}: DroppableProps) => {
  const context = useDragDropContext();
  const elementRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    context.registerDroppable(id, direction);
    return () => context.unregisterDroppable(id);
  }, [id, direction, context]);

  const innerRef = useCallback((element: HTMLElement | null) => {
    elementRef.current = element;
  }, []);

  const provided: DroppableProvided = {
    innerRef,
    droppableProps: {
      "data-droppable-id": id,
      "data-direction": direction,
      ...(isDropDisabled && { "data-drop-disabled": "true" }),
    },
  };

  const snapshot: DroppableSnapshot = {
    isDraggingOver: context.overDroppableId === id,
    draggingFromThisWith:
      context.activeDroppableId === id ? context.activeId : null,
  };

  return <>{children(provided, snapshot)}</>;
};

/* Draggable */
export interface DraggableProps {
  id: string;
  index: number;
  isDragDisabled?: boolean;
  children: (
    provided: DraggableProvided,
    snapshot: DraggableSnapshot,
  ) => ReactNode;
}

export const Draggable = ({
  id,
  index,
  isDragDisabled = false,
  children,
}: DraggableProps) => {
  const context = useDragDropContext();
  const elementRef = useRef<HTMLElement | null>(null);
  const droppableIdRef = useRef<string | null>(null);

  const innerRef = useCallback((element: HTMLElement | null) => {
    elementRef.current = element;
    if (element) {
      // Find parent droppable
      const droppableParent = element.closest("[data-droppable-id]");
      droppableIdRef.current =
        droppableParent?.getAttribute("data-droppable-id") ?? null;
    }
  }, []);

  const handleMouseDown = useCallback(
    (e: MouseEvent) => {
      if (isDragDisabled) return;
      e.preventDefault();

      if (droppableIdRef.current) {
        context.startDrag(id, droppableIdRef.current, index);
      }
    },
    [id, index, isDragDisabled, context],
  );

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (isDragDisabled) return;

      if (e.key === " " || e.key === "Enter") {
        e.preventDefault();
        if (context.activeId === id) {
          // End drag
          context.endDrag(context.overDroppableId, 0);
        } else {
          // Start drag
          if (droppableIdRef.current) {
            context.startDrag(id, droppableIdRef.current, index);
          }
        }
      }
    },
    [id, index, isDragDisabled, context],
  );

  const isDragging = context.activeId === id;

  const provided: DraggableProvided = {
    innerRef,
    draggableProps: {
      "data-draggable-id": id,
      "data-index": index,
      ...(isDragDisabled && { "data-drag-disabled": "true" }),
    },
    dragHandleProps: {
      role: "button",
      tabIndex: 0,
      "aria-grabbed": isDragging,
      "aria-label": `Draggable item ${id}. Press space to ${isDragging ? "drop" : "pick up"}.`,
      onMouseDown: handleMouseDown,
      onKeyDown: handleKeyDown,
    },
  };

  const snapshot: DraggableSnapshot = {
    isDragging,
    isDropAnimating: false,
  };

  return <>{children(provided, snapshot)}</>;
};

/* DragOverlay */
export interface DragOverlayProps extends Omit<
  HTMLAttributes<HTMLDivElement>,
  "children"
> {
  children: (activeId: string | null) => ReactNode;
}

export const DragOverlay = ({
  children,
  className,
  ...props
}: DragOverlayProps) => {
  const context = useDragDropContext();

  if (!context.activeId) {
    return null;
  }

  return (
    <div className={cn("fixed pointer-events-none z-popover", className)} {...props}>
      {children(context.activeId)}
    </div>
  );
};
