import React, {
  forwardRef,
  useState,
  useCallback,
  type HTMLAttributes,
  type ReactNode,
  type KeyboardEvent,
} from "react";
import { cn } from "@/utils/cn";
import { Spinner } from "@/components/Spinner";

/* Types */
export interface PageNode {
  id: string;
  title: string;
  icon?: string;
  children?: PageNode[];
}

/* Chevron Icon */
const ChevronRightIcon = ({ className }: { className?: string }) => (
  <svg
    className={cn("h-4 w-4 transition-transform", className)}
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="m9 18 6-6-6-6" />
  </svg>
);

/* PageTree Root */
export interface PageTreeProps extends Omit<
  HTMLAttributes<HTMLDivElement>,
  "onSelect"
> {
  pages: PageNode[];
  selectedId?: string;
  expandedIds?: string[];
  defaultExpandedIds?: string[];
  onSelect?: (page: PageNode) => void;
  onExpandedChange?: (expandedIds: string[]) => void;
  draggable?: boolean;
  loading?: boolean;
  emptyMessage?: string;
  children?: ReactNode;
}

export const PageTree = forwardRef<HTMLDivElement, PageTreeProps>(
  (
    {
      pages,
      selectedId,
      expandedIds: controlledExpandedIds,
      defaultExpandedIds = [],
      onSelect,
      onExpandedChange,
      draggable = false,
      loading = false,
      emptyMessage,
      className,
      children,
      ...props
    },
    ref,
  ) => {
    const [internalExpandedIds, setInternalExpandedIds] =
      useState<string[]>(defaultExpandedIds);
    const [focusedId, setFocusedId] = useState<string | null>(null);

    const expandedIds = controlledExpandedIds ?? internalExpandedIds;

    const toggleExpand = useCallback(
      (id: string) => {
        const newExpandedIds = expandedIds.includes(id)
          ? expandedIds.filter((eid) => eid !== id)
          : [...expandedIds, id];

        if (!controlledExpandedIds) {
          setInternalExpandedIds(newExpandedIds);
        }
        onExpandedChange?.(newExpandedIds);
      },
      [expandedIds, controlledExpandedIds, onExpandedChange],
    );

    const handleKeyDown = useCallback(
      (e: KeyboardEvent<HTMLDivElement>, page: PageNode, _level: number) => {
        switch (e.key) {
          case "ArrowRight":
            if (page.children?.length && !expandedIds.includes(page.id)) {
              toggleExpand(page.id);
            }
            break;
          case "ArrowLeft":
            if (page.children?.length && expandedIds.includes(page.id)) {
              toggleExpand(page.id);
            }
            break;
          case "Enter":
          case " ":
            e.preventDefault();
            onSelect?.(page);
            break;
          case "ArrowDown":
            e.preventDefault();
            // Move to next visible item (simplified)
            break;
          case "ArrowUp":
            e.preventDefault();
            // Move to previous visible item (simplified)
            break;
        }
      },
      [expandedIds, toggleExpand, onSelect],
    );

    const getAllVisibleIds = useCallback((): string[] => {
      const ids: string[] = [];
      const traverse = (nodes: PageNode[]) => {
        for (const node of nodes) {
          ids.push(node.id);
          if (node.children?.length && expandedIds.includes(node.id)) {
            traverse(node.children);
          }
        }
      };
      traverse(pages);
      return ids;
    }, [pages, expandedIds]);

    const handleTreeKeyDown = useCallback(
      (e: React.KeyboardEvent<HTMLDivElement>) => {
        if (e.key === "ArrowDown") {
          e.preventDefault();
          const visibleIds = getAllVisibleIds();
          if (visibleIds.length > 0) {
            const currentIndex = focusedId ? visibleIds.indexOf(focusedId) : -1;
            const nextIndex = Math.min(currentIndex + 1, visibleIds.length - 1);
            setFocusedId(visibleIds[nextIndex]);
            // Focus the element
            const nextElement = document.querySelector(
              `[data-tree-id="${visibleIds[nextIndex]}"]`,
            );
            (nextElement as HTMLElement)?.focus();
          }
        }
      },
      [focusedId, getAllVisibleIds],
    );

    const renderPage = (page: PageNode, level: number = 1) => {
      const isExpanded = expandedIds.includes(page.id);
      const isSelected = selectedId === page.id;
      const hasChildren = page.children && page.children.length > 0;
      const indent = 8 + (level - 1) * 16;

      return (
        <li
          key={page.id}
          role="treeitem"
          aria-expanded={hasChildren ? isExpanded : undefined}
          aria-level={level}
          aria-selected={isSelected}
        >
          <div
            data-tree-item-content
            data-tree-id={page.id}
            tabIndex={0}
            draggable={draggable}
            style={{ paddingLeft: `${indent}px` }}
            className={cn(
              "flex items-center gap-1 py-1.5 pr-2 rounded-md cursor-pointer",
              "transition-colors duration-150",
              "hover:bg-gray-100",
              isSelected && "bg-primary-100 text-primary-900",
              "focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-1",
            )}
            onClick={() => onSelect?.(page)}
            onKeyDown={(e) => handleKeyDown(e, page, level)}
          >
            {hasChildren ? (
              <button
                type="button"
                aria-label="Toggle expand"
                className={cn(
                  "flex items-center justify-center w-5 h-5 rounded hover:bg-gray-200",
                  "transition-transform",
                  isExpanded && "rotate-90",
                )}
                onClick={(e) => {
                  e.stopPropagation();
                  toggleExpand(page.id);
                }}
              >
                <ChevronRightIcon />
              </button>
            ) : (
              <span className="w-5" />
            )}
            {page.icon && (
              <span className="text-sm" data-tree-item-icon>
                {page.icon}
              </span>
            )}
            <span className="truncate text-sm font-medium" data-tree-item-label>
              {page.title}
            </span>
          </div>
          {hasChildren && isExpanded && (
            <ul role="group">
              {page.children!.map((child) => renderPage(child, level + 1))}
            </ul>
          )}
        </li>
      );
    };

    if (loading) {
      return (
        <div
          ref={ref}
          className={cn(
            "w-full flex items-center justify-center py-8",
            className,
          )}
          {...props}
        >
          <Spinner size="md" aria-label="Loading pages" />
        </div>
      );
    }

    if (pages.length === 0 && !children && emptyMessage) {
      return (
        <div
          ref={ref}
          role="tree"
          className={cn(
            "w-full text-sm text-gray-500 py-4 text-center",
            className,
          )}
          {...props}
        >
          {emptyMessage}
        </div>
      );
    }

    return (
      <div
        ref={ref}
        role="tree"
        tabIndex={0}
        className={cn("w-full", className)}
        onKeyDown={handleTreeKeyDown}
        {...props}
      >
        {(pages.length > 0 || children) && (
          <ul>
            {pages.map((page) => renderPage(page))}
            {children}
          </ul>
        )}
      </div>
    );
  },
);

PageTree.displayName = "PageTree";

/* PageTreeItem - for custom composition */
export interface PageTreeItemProps extends HTMLAttributes<HTMLLIElement> {
  id: string;
  hasChildren: boolean;
  expanded?: boolean;
  level?: number;
  selected?: boolean;
  children: ReactNode;
}

export const PageTreeItem = forwardRef<HTMLLIElement, PageTreeItemProps>(
  (
    {
      id: _id,
      hasChildren,
      expanded,
      level = 1,
      selected,
      className,
      children,
      ...props
    },
    ref,
  ) => {
    return (
      <li
        ref={ref}
        role="treeitem"
        aria-expanded={hasChildren ? expanded : undefined}
        aria-level={level}
        aria-selected={selected}
        className={cn("", className)}
        {...props}
      >
        <div
          data-tree-item-content
          className={cn(
            "flex items-center gap-1 py-1.5 px-2 rounded-md cursor-pointer",
            "transition-colors duration-150",
            "hover:bg-gray-100",
            selected && "bg-primary-100 text-primary-900",
          )}
        >
          {children}
        </div>
      </li>
    );
  },
);

PageTreeItem.displayName = "PageTreeItem";

/* PageTreeItemIcon */
export interface PageTreeItemIconProps extends HTMLAttributes<HTMLSpanElement> {
  children: ReactNode;
}

export const PageTreeItemIcon = forwardRef<
  HTMLSpanElement,
  PageTreeItemIconProps
>(({ className, children, ...props }, ref) => {
  return (
    <span
      ref={ref}
      data-tree-item-icon
      className={cn("text-sm", className)}
      {...props}
    >
      {children}
    </span>
  );
});

PageTreeItemIcon.displayName = "PageTreeItemIcon";

/* PageTreeItemLabel */
export interface PageTreeItemLabelProps extends HTMLAttributes<HTMLSpanElement> {
  children: ReactNode;
}

export const PageTreeItemLabel = forwardRef<
  HTMLSpanElement,
  PageTreeItemLabelProps
>(({ className, children, ...props }, ref) => {
  return (
    <span
      ref={ref}
      data-tree-item-label
      className={cn("truncate text-sm font-medium", className)}
      {...props}
    >
      {children}
    </span>
  );
});

PageTreeItemLabel.displayName = "PageTreeItemLabel";

/* PageTreeItemActions */
export interface PageTreeItemActionsProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
}

export const PageTreeItemActions = forwardRef<
  HTMLDivElement,
  PageTreeItemActionsProps
>(({ className, children, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cn("ml-auto flex items-center gap-1", className)}
      {...props}
    >
      {children}
    </div>
  );
});

PageTreeItemActions.displayName = "PageTreeItemActions";
