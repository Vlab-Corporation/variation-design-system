import React, {
  forwardRef,
  useState,
  useMemo,
  type HTMLAttributes,
  type ReactNode,
  type ThHTMLAttributes,
  type TdHTMLAttributes,
} from "react";
import { cn } from "@/utils/cn";
import { Spinner } from "@/components/Spinner";

/* Types */
export interface ColumnDef<T> {
  id: string;
  header: string | ReactNode;
  accessorKey?: keyof T;
  cell?: (props: { row: T; value: unknown }) => ReactNode;
  sortable?: boolean;
  width?: string;
}

export interface SortState {
  column: string;
  direction: "asc" | "desc";
}

type DataTableVariant = "default" | "bordered" | "striped";
type DataTableSize = "sm" | "md" | "lg";

/* DataTable Root */
export interface DataTableProps<T> extends HTMLAttributes<HTMLTableElement> {
  data: T[];
  columns: ColumnDef<T>[];
  variant?: DataTableVariant;
  size?: DataTableSize;
  selectable?: boolean;
  selectedIds?: string[];
  onSelectionChange?: (selectedItems: T[]) => void;
  sortable?: boolean;
  sortState?: SortState;
  onSortChange?: (state: SortState) => void;
  loading?: boolean;
  emptyMessage?: string;
  emptyContent?: ReactNode;
  onRowClick?: (row: T) => void;
  hoverable?: boolean;
  stickyHeader?: boolean;
  getRowId?: (row: T) => string;
  children?: ReactNode;
}

const sizeStyles: Record<DataTableSize, { cell: string; header: string }> = {
  sm: { cell: "py-1 px-2", header: "py-1.5 px-2" },
  md: { cell: "py-2 px-3", header: "py-2.5 px-3" },
  lg: { cell: "py-3 px-4", header: "py-3.5 px-4" },
};

export const DataTable = forwardRef<
  HTMLTableElement,
  DataTableProps<Record<string, unknown>>
>(
  <T extends Record<string, unknown>>(
    {
      data,
      columns,
      variant = "default",
      size = "md",
      selectable = false,
      selectedIds = [],
      onSelectionChange,
      sortable = false,
      sortState,
      onSortChange,
      loading = false,
      emptyMessage = "No data",
      emptyContent,
      onRowClick,
      hoverable = false,
      stickyHeader = false,
      getRowId = (row) => (row as { id?: string }).id ?? String(row),
      className,
      children,
      ...props
    }: DataTableProps<T>,
    ref: React.ForwardedRef<HTMLTableElement>,
  ) => {
    const [internalSelectedIds, setInternalSelectedIds] = useState<string[]>(
      [],
    );
    const effectiveSelectedIds =
      selectedIds.length > 0 ? selectedIds : internalSelectedIds;

    const allSelected = useMemo(
      () =>
        data.length > 0 &&
        data.every((row) => effectiveSelectedIds.includes(getRowId(row))),
      [data, effectiveSelectedIds, getRowId],
    );

    const handleSelectAll = () => {
      if (allSelected) {
        setInternalSelectedIds([]);
        onSelectionChange?.([]);
      } else {
        const allIds = data.map(getRowId);
        setInternalSelectedIds(allIds);
        onSelectionChange?.(data);
      }
    };

    const handleSelectRow = (row: T) => {
      const rowId = getRowId(row);
      const isSelected = effectiveSelectedIds.includes(rowId);
      const newSelectedIds = isSelected
        ? effectiveSelectedIds.filter((id) => id !== rowId)
        : [...effectiveSelectedIds, rowId];

      setInternalSelectedIds(newSelectedIds);
      onSelectionChange?.(
        data.filter((r) => newSelectedIds.includes(getRowId(r))),
      );
    };

    const handleSort = (columnId: string) => {
      if (!sortable) return;

      const newDirection =
        sortState?.column === columnId && sortState.direction === "asc"
          ? "desc"
          : "asc";

      onSortChange?.({ column: columnId, direction: newDirection });
    };

    const getSortDirection = (
      columnId: string,
    ): "ascending" | "descending" | "none" => {
      if (sortState?.column !== columnId) return "none";
      return sortState.direction === "asc" ? "ascending" : "descending";
    };

    // If custom children provided, render them
    if (children) {
      return (
        <table
          ref={ref}
          className={cn(
            "w-full border-collapse text-sm",
            variant === "bordered" && "border border-gray-200",
            className,
          )}
          {...props}
        >
          {children}
        </table>
      );
    }

    if (loading) {
      return (
        <div className="flex items-center justify-center py-12">
          <Spinner size="lg" aria-label="Loading data" />
        </div>
      );
    }

    if (data.length === 0) {
      if (emptyContent) {
        return <>{emptyContent}</>;
      }
      return (
        <table
          ref={ref}
          className={cn("w-full border-collapse text-sm", className)}
          {...props}
        >
          <thead>
            <tr>
              {columns.map((column) => (
                <th
                  key={column.id}
                  scope="col"
                  className={cn(
                    sizeStyles[size].header,
                    "text-left font-medium text-gray-700",
                  )}
                >
                  {column.header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            <tr>
              <td
                colSpan={columns.length}
                className="text-center py-8 text-gray-500"
              >
                {emptyMessage}
              </td>
            </tr>
          </tbody>
        </table>
      );
    }

    return (
      <table
        ref={ref}
        className={cn(
          "w-full border-collapse text-sm",
          variant === "bordered" && "border border-gray-200",
          className,
        )}
        {...props}
      >
        <thead className={cn(stickyHeader && "sticky top-0 bg-white z-10")}>
          <tr className="border-b border-gray-200">
            {selectable && (
              <th scope="col" className={cn(sizeStyles[size].header, "w-10")}>
                <input
                  type="checkbox"
                  checked={allSelected}
                  onChange={handleSelectAll}
                  className="rounded border-gray-300"
                  aria-label="Select all rows"
                />
              </th>
            )}
            {columns.map((column) => (
              <th
                key={column.id}
                scope="col"
                aria-sort={sortable ? getSortDirection(column.id) : undefined}
                className={cn(
                  sizeStyles[size].header,
                  "text-left font-medium text-gray-700",
                  sortable && "cursor-pointer select-none hover:bg-gray-50",
                )}
                onClick={() => handleSort(column.id)}
                style={column.width ? { width: column.width } : undefined}
              >
                <div className="flex items-center gap-1">
                  {column.header}
                  {sortable && sortState?.column === column.id && (
                    <span className="text-xs">
                      {sortState.direction === "asc" ? "↑" : "↓"}
                    </span>
                  )}
                </div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, rowIndex) => {
            const rowId = getRowId(row);
            const isSelected = effectiveSelectedIds.includes(rowId);
            const isStriped = variant === "striped" && rowIndex % 2 === 1;

            return (
              <tr
                key={rowId}
                className={cn(
                  "border-b border-gray-100 transition-colors",
                  isSelected && "bg-primary-50",
                  isStriped && "bg-gray-50",
                  hoverable && "hover:bg-gray-50",
                  onRowClick && "cursor-pointer",
                )}
                onClick={() => onRowClick?.(row)}
              >
                {selectable && (
                  <td className={cn(sizeStyles[size].cell, "w-10")}>
                    <input
                      type="checkbox"
                      checked={isSelected}
                      onChange={(e) => {
                        e.stopPropagation();
                        handleSelectRow(row);
                      }}
                      className="rounded border-gray-300"
                      aria-label={`Select row ${rowId}`}
                    />
                  </td>
                )}
                {columns.map((column) => {
                  const value = column.accessorKey
                    ? (row[column.accessorKey as keyof T] as unknown)
                    : undefined;

                  return (
                    <td
                      key={column.id}
                      className={cn(sizeStyles[size].cell, "text-gray-900")}
                    >
                      {column.cell
                        ? column.cell({ row, value })
                        : String(value ?? "")}
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    );
  },
) as (<T extends Record<string, unknown>>(
  props: DataTableProps<T> & { ref?: React.ForwardedRef<HTMLTableElement> },
) => React.JSX.Element) & { displayName?: string };

DataTable.displayName = "DataTable";

/* DataTableHeader */
export interface DataTableHeaderProps extends HTMLAttributes<HTMLTableSectionElement> {
  children: ReactNode;
}

export const DataTableHeader = forwardRef<
  HTMLTableSectionElement,
  DataTableHeaderProps
>(({ className, children, ...props }, ref) => {
  return (
    <thead ref={ref} className={cn("", className)} {...props}>
      {children}
    </thead>
  );
});

DataTableHeader.displayName = "DataTableHeader";

/* DataTableBody */
export interface DataTableBodyProps extends HTMLAttributes<HTMLTableSectionElement> {
  children: ReactNode;
}

export const DataTableBody = forwardRef<
  HTMLTableSectionElement,
  DataTableBodyProps
>(({ className, children, ...props }, ref) => {
  return (
    <tbody ref={ref} className={cn("", className)} {...props}>
      {children}
    </tbody>
  );
});

DataTableBody.displayName = "DataTableBody";

/* DataTableRow */
export interface DataTableRowProps extends HTMLAttributes<HTMLTableRowElement> {
  children: ReactNode;
  selected?: boolean;
}

export const DataTableRow = forwardRef<HTMLTableRowElement, DataTableRowProps>(
  ({ className, selected, children, ...props }, ref) => {
    return (
      <tr
        ref={ref}
        className={cn(
          "border-b border-gray-100 transition-colors",
          selected && "bg-primary-50",
          className,
        )}
        {...props}
      >
        {children}
      </tr>
    );
  },
);

DataTableRow.displayName = "DataTableRow";

/* DataTableHead */
export interface DataTableHeadProps extends ThHTMLAttributes<HTMLTableCellElement> {
  children: ReactNode;
}

export const DataTableHead = forwardRef<
  HTMLTableCellElement,
  DataTableHeadProps
>(({ className, children, scope = "col", ...props }, ref) => {
  return (
    <th
      ref={ref}
      scope={scope}
      className={cn(
        "py-2.5 px-3 text-left font-medium text-gray-700",
        className,
      )}
      {...props}
    >
      {children}
    </th>
  );
});

DataTableHead.displayName = "DataTableHead";

/* DataTableCell */
export interface DataTableCellProps extends TdHTMLAttributes<HTMLTableCellElement> {
  children: ReactNode;
}

export const DataTableCell = forwardRef<
  HTMLTableCellElement,
  DataTableCellProps
>(({ className, children, ...props }, ref) => {
  return (
    <td
      ref={ref}
      className={cn("py-2 px-3 text-gray-900", className)}
      {...props}
    >
      {children}
    </td>
  );
});

DataTableCell.displayName = "DataTableCell";

/* DataTableFooter */
export interface DataTableFooterProps extends HTMLAttributes<HTMLTableSectionElement> {
  children: ReactNode;
}

export const DataTableFooter = forwardRef<
  HTMLTableSectionElement,
  DataTableFooterProps
>(({ className, children, ...props }, ref) => {
  return (
    <tfoot
      ref={ref}
      className={cn("border-t border-gray-200", className)}
      {...props}
    >
      {children}
    </tfoot>
  );
});

DataTableFooter.displayName = "DataTableFooter";
