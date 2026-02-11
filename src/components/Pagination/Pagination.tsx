import { forwardRef, useCallback, type HTMLAttributes } from "react";
import {
  paginationStyles,
  paginationItemStyles,
  type PaginationSize,
} from "./Pagination.styles";

export type { PaginationSize } from "./Pagination.styles";

export interface PaginationProps extends Omit<
  HTMLAttributes<HTMLElement>,
  "onChange"
> {
  /** Current page (1-based) */
  page: number;
  /** Total number of pages */
  totalPages: number;
  /** Called when page changes */
  onChange?: (page: number) => void;
  /** Number of sibling pages shown around current */
  siblingCount?: number;
  /** Size variant */
  size?: PaginationSize;
  /** Show first/last buttons */
  showEdges?: boolean;
}

function getPageRange(
  page: number,
  totalPages: number,
  siblingCount: number,
): (number | "ellipsis")[] {
  const totalSlots = siblingCount * 2 + 5; // siblings + current + 2 edges + 2 ellipsis

  if (totalPages <= totalSlots) {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }

  const leftSibling = Math.max(page - siblingCount, 1);
  const rightSibling = Math.min(page + siblingCount, totalPages);

  const showLeftEllipsis = leftSibling > 2;
  const showRightEllipsis = rightSibling < totalPages - 1;

  const items: (number | "ellipsis")[] = [];

  items.push(1);

  if (showLeftEllipsis) {
    items.push("ellipsis");
  } else {
    for (let i = 2; i < leftSibling; i++) {
      items.push(i);
    }
  }

  for (let i = leftSibling; i <= rightSibling; i++) {
    if (i !== 1 && i !== totalPages) {
      items.push(i);
    }
  }

  if (showRightEllipsis) {
    items.push("ellipsis");
  } else {
    for (let i = rightSibling + 1; i < totalPages; i++) {
      items.push(i);
    }
  }

  if (totalPages > 1) {
    items.push(totalPages);
  }

  return items;
}

export const Pagination = forwardRef<HTMLElement, PaginationProps>(
  (
    {
      page,
      totalPages,
      onChange,
      siblingCount = 1,
      size = "md",
      showEdges = false,
      className,
      ...props
    },
    ref,
  ) => {
    const goTo = useCallback(
      (p: number) => {
        if (p >= 1 && p <= totalPages) onChange?.(p);
      },
      [totalPages, onChange],
    );

    const pages = getPageRange(page, totalPages, siblingCount);

    return (
      <nav
        ref={ref}
        role="navigation"
        aria-label="Pagination"
        className={paginationStyles({ className })}
        {...props}
      >
        {showEdges && (
          <button
            type="button"
            aria-label="First page"
            disabled={page === 1}
            onClick={() => goTo(1)}
            className={paginationItemStyles({
              size,
              disabled: page === 1,
            })}
          >
            &laquo;
          </button>
        )}

        <button
          type="button"
          aria-label="Previous page"
          disabled={page === 1}
          onClick={() => goTo(page - 1)}
          className={paginationItemStyles({
            size,
            disabled: page === 1,
          })}
        >
          &lsaquo;
        </button>

        {pages.map((item, idx) =>
          item === "ellipsis" ? (
            <span
              key={`ellipsis-${idx}`}
              className={paginationItemStyles({ size })}
              aria-hidden="true"
            >
              &hellip;
            </span>
          ) : (
            <button
              key={item}
              type="button"
              aria-label={`Page ${item}`}
              aria-current={item === page ? "page" : undefined}
              onClick={() => goTo(item)}
              className={paginationItemStyles({
                size,
                active: item === page,
              })}
            >
              {item}
            </button>
          ),
        )}

        <button
          type="button"
          aria-label="Next page"
          disabled={page === totalPages}
          onClick={() => goTo(page + 1)}
          className={paginationItemStyles({
            size,
            disabled: page === totalPages,
          })}
        >
          &rsaquo;
        </button>

        {showEdges && (
          <button
            type="button"
            aria-label="Last page"
            disabled={page === totalPages}
            onClick={() => goTo(totalPages)}
            className={paginationItemStyles({
              size,
              disabled: page === totalPages,
            })}
          >
            &raquo;
          </button>
        )}
      </nav>
    );
  },
);

Pagination.displayName = "Pagination";
