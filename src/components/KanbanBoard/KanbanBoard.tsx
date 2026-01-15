import {
  forwardRef,
  useState,
  useCallback,
  type HTMLAttributes,
  type ReactNode,
  type DragEvent,
} from "react";
import { cn } from "@/utils/cn";
import { Spinner } from "@/components/Spinner";

/* Types */
export interface KanbanCardData {
  id: string;
  title: string;
  description?: string;
  columnId: string;
  [key: string]: unknown;
}

export interface KanbanColumnData {
  id: string;
  title: string;
  color?: string;
  [key: string]: unknown;
}

export interface CardMoveEvent {
  cardId: string;
  sourceColumnId: string;
  targetColumnId: string;
  targetIndex: number;
}

/* Plus Icon */
const PlusIcon = ({ className }: { className?: string }) => (
  <svg
    className={cn("h-4 w-4", className)}
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <line x1="12" y1="5" x2="12" y2="19" />
    <line x1="5" y1="12" x2="19" y2="12" />
  </svg>
);

/* KanbanBoard Root */
export interface KanbanBoardProps extends HTMLAttributes<HTMLDivElement> {
  columns: KanbanColumnData[];
  cards: KanbanCardData[];
  onCardClick?: (card: KanbanCardData) => void;
  onAddCard?: (columnId: string) => void;
  onCardMove?: (event: CardMoveEvent) => void;
  draggable?: boolean;
  loading?: boolean;
  emptyColumnMessage?: string;
  mobileLayout?: "horizontal" | "vertical";
  children?: ReactNode;
}

export const KanbanBoard = forwardRef<HTMLDivElement, KanbanBoardProps>(
  (
    {
      columns,
      cards,
      onCardClick,
      onAddCard,
      onCardMove,
      draggable = false,
      loading = false,
      emptyColumnMessage = "No cards",
      mobileLayout = "horizontal",
      className,
      children,
      ...props
    },
    ref,
  ) => {
    const [draggedCardId, setDraggedCardId] = useState<string | null>(null);
    const [dragOverColumnId, setDragOverColumnId] = useState<string | null>(
      null,
    );

    const getCardsForColumn = useCallback(
      (columnId: string) => cards.filter((card) => card.columnId === columnId),
      [cards],
    );

    const handleDragStart = useCallback(
      (e: DragEvent<HTMLDivElement>, card: KanbanCardData) => {
        setDraggedCardId(card.id);
        e.dataTransfer.setData("text/plain", card.id);
        e.dataTransfer.effectAllowed = "move";
      },
      [],
    );

    const handleDragOver = useCallback(
      (e: DragEvent<HTMLDivElement>, columnId: string) => {
        e.preventDefault();
        if (e.dataTransfer) {
          e.dataTransfer.dropEffect = "move";
        }
        setDragOverColumnId(columnId);
      },
      [],
    );

    const handleDragLeave = useCallback(() => {
      setDragOverColumnId(null);
    }, []);

    const handleDrop = useCallback(
      (e: DragEvent<HTMLDivElement>, targetColumnId: string) => {
        e.preventDefault();
        const cardId = e.dataTransfer.getData("text/plain");
        const sourceCard = cards.find((c) => c.id === cardId);

        if (sourceCard && sourceCard.columnId !== targetColumnId) {
          const targetCards = getCardsForColumn(targetColumnId);
          onCardMove?.({
            cardId,
            sourceColumnId: sourceCard.columnId,
            targetColumnId,
            targetIndex: targetCards.length,
          });
        }

        setDraggedCardId(null);
        setDragOverColumnId(null);
      },
      [cards, getCardsForColumn, onCardMove],
    );

    if (loading) {
      return (
        <div
          ref={ref}
          role="region"
          className={cn("flex items-center justify-center py-12", className)}
          {...props}
        >
          <Spinner size="lg" aria-label="Loading board" />
        </div>
      );
    }

    // If children provided, use custom composition
    if (children) {
      return (
        <div
          ref={ref}
          role="region"
          className={cn(
            "flex gap-4 overflow-x-auto pb-4",
            mobileLayout === "vertical" && "flex-col md:flex-row",
            className,
          )}
          {...props}
        >
          {children}
        </div>
      );
    }

    return (
      <div
        ref={ref}
        role="region"
        className={cn(
          "flex gap-4 overflow-x-auto pb-4",
          mobileLayout === "vertical" && "flex-col md:flex-row",
          className,
        )}
        {...props}
      >
        {columns.map((column) => {
          const columnCards = getCardsForColumn(column.id);
          const isDragOver = dragOverColumnId === column.id;

          return (
            <div
              key={column.id}
              data-column
              className={cn(
                "flex flex-col min-w-[280px] max-w-[320px] bg-gray-100 rounded-lg flex-shrink-0",
              )}
            >
              <div
                data-column-header
                className="flex items-center justify-between p-3 pb-2"
              >
                <div className="flex items-center gap-2">
                  <div
                    data-color-indicator
                    className="w-2 h-2 rounded-full"
                    style={{ backgroundColor: column.color || "#6B7280" }}
                  />
                  <h3 className="font-medium text-sm text-gray-900">
                    {column.title}
                  </h3>
                  <span className="text-xs text-gray-500 bg-gray-200 px-1.5 py-0.5 rounded">
                    {columnCards.length}
                  </span>
                </div>
                {onAddCard && (
                  <button
                    type="button"
                    onClick={() => onAddCard(column.id)}
                    className="p-1 rounded hover:bg-gray-200 text-gray-500 hover:text-gray-700 transition-colors"
                    aria-label={`Add card to ${column.title}`}
                  >
                    <PlusIcon />
                  </button>
                )}
              </div>

              <div
                data-column-content
                className={cn(
                  "flex-1 overflow-y-auto p-2 pt-0 space-y-2 min-h-[100px] transition-colors",
                  isDragOver && "bg-primary-50",
                )}
                onDragOver={(e) => handleDragOver(e, column.id)}
                onDragLeave={handleDragLeave}
                onDrop={(e) => handleDrop(e, column.id)}
              >
                {columnCards.length === 0 ? (
                  <p className="text-xs text-gray-400 text-center py-4">
                    {emptyColumnMessage}
                  </p>
                ) : (
                  columnCards.map((card) => (
                    <div
                      key={card.id}
                      data-card
                      tabIndex={0}
                      draggable={draggable}
                      className={cn(
                        "bg-white rounded-md shadow-sm p-3 cursor-pointer",
                        "transition-all duration-150",
                        "hover:shadow-md",
                        "focus:outline-none focus:ring-2 focus:ring-primary-500",
                        draggedCardId === card.id && "opacity-50",
                      )}
                      onClick={() => onCardClick?.(card)}
                      onDragStart={(e) => handleDragStart(e, card)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" || e.key === " ") {
                          e.preventDefault();
                          onCardClick?.(card);
                        }
                      }}
                    >
                      <h4 className="text-sm font-medium text-gray-900">
                        {card.title}
                      </h4>
                      {card.description && (
                        <p className="text-xs text-gray-500 mt-1 line-clamp-2">
                          {card.description}
                        </p>
                      )}
                    </div>
                  ))
                )}
              </div>
            </div>
          );
        })}
      </div>
    );
  },
);

KanbanBoard.displayName = "KanbanBoard";

/* KanbanColumn */
export interface KanbanColumnProps extends HTMLAttributes<HTMLDivElement> {
  id: string;
  children: ReactNode;
}

export const KanbanColumn = forwardRef<HTMLDivElement, KanbanColumnProps>(
  ({ id, className, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        data-column
        data-column-id={id}
        className={cn(
          "flex flex-col min-w-[280px] max-w-[320px] bg-gray-100 rounded-lg flex-shrink-0",
          className,
        )}
        {...props}
      >
        {children}
      </div>
    );
  },
);

KanbanColumn.displayName = "KanbanColumn";

/* KanbanColumnHeader */
export interface KanbanColumnHeaderProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
}

export const KanbanColumnHeader = forwardRef<
  HTMLDivElement,
  KanbanColumnHeaderProps
>(({ className, children, ...props }, ref) => {
  return (
    <div
      ref={ref}
      data-column-header
      className={cn("flex items-center justify-between p-3 pb-2", className)}
      {...props}
    >
      {children}
    </div>
  );
});

KanbanColumnHeader.displayName = "KanbanColumnHeader";

/* KanbanColumnContent */
export interface KanbanColumnContentProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
}

export const KanbanColumnContent = forwardRef<
  HTMLDivElement,
  KanbanColumnContentProps
>(({ className, children, ...props }, ref) => {
  return (
    <div
      ref={ref}
      data-column-content
      className={cn(
        "flex-1 overflow-y-auto p-2 pt-0 space-y-2 min-h-[100px]",
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
});

KanbanColumnContent.displayName = "KanbanColumnContent";

/* KanbanCard */
export interface KanbanCardProps extends HTMLAttributes<HTMLDivElement> {
  id: string;
  title: string;
  description?: string;
  draggable?: boolean;
}

export const KanbanCard = forwardRef<HTMLDivElement, KanbanCardProps>(
  ({ id, title, description, draggable = false, className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        data-card
        data-card-id={id}
        tabIndex={0}
        draggable={draggable}
        className={cn(
          "bg-white rounded-md shadow-sm p-3 cursor-pointer",
          "transition-all duration-150",
          "hover:shadow-md",
          "focus:outline-none focus:ring-2 focus:ring-primary-500",
          className,
        )}
        {...props}
      >
        <h4 className="text-sm font-medium text-gray-900">{title}</h4>
        {description && (
          <p className="text-xs text-gray-500 mt-1 line-clamp-2">
            {description}
          </p>
        )}
      </div>
    );
  },
);

KanbanCard.displayName = "KanbanCard";
