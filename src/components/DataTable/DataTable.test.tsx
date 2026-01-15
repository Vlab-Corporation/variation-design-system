import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent, within } from "@testing-library/react";
import {
  DataTable,
  DataTableHeader,
  DataTableBody,
  DataTableRow,
  DataTableHead,
  DataTableCell,
  DataTableFooter,
  type ColumnDef,
} from "./DataTable";

interface TestData extends Record<string, unknown> {
  id: string;
  name: string;
  email: string;
  status: "active" | "inactive";
  age: number;
}

const mockData: TestData[] = [
  {
    id: "1",
    name: "Alice",
    email: "alice@example.com",
    status: "active",
    age: 25,
  },
  {
    id: "2",
    name: "Bob",
    email: "bob@example.com",
    status: "inactive",
    age: 30,
  },
  {
    id: "3",
    name: "Charlie",
    email: "charlie@example.com",
    status: "active",
    age: 35,
  },
];

const mockColumns: ColumnDef<TestData>[] = [
  { id: "name", header: "Name", accessorKey: "name" },
  { id: "email", header: "Email", accessorKey: "email" },
  { id: "status", header: "Status", accessorKey: "status" },
  { id: "age", header: "Age", accessorKey: "age" },
];

describe("DataTable Component", () => {
  describe("DataTable", () => {
    it("should render table element", () => {
      render(
        <DataTable data={mockData} columns={mockColumns} data-testid="table" />,
      );
      expect(screen.getByTestId("table").tagName.toLowerCase()).toBe("table");
    });

    it("should have base styling", () => {
      render(
        <DataTable data={mockData} columns={mockColumns} data-testid="table" />,
      );
      const table = screen.getByTestId("table");
      expect(table).toHaveClass("w-full");
      expect(table).toHaveClass("border-collapse");
    });

    it("should apply custom className", () => {
      render(
        <DataTable
          data={mockData}
          columns={mockColumns}
          className="custom-class"
          data-testid="table"
        />,
      );
      expect(screen.getByTestId("table")).toHaveClass("custom-class");
    });

    it("should render all column headers", () => {
      render(<DataTable data={mockData} columns={mockColumns} />);
      expect(screen.getByText("Name")).toBeInTheDocument();
      expect(screen.getByText("Email")).toBeInTheDocument();
      expect(screen.getByText("Status")).toBeInTheDocument();
      expect(screen.getByText("Age")).toBeInTheDocument();
    });

    it("should render all data rows", () => {
      render(<DataTable data={mockData} columns={mockColumns} />);
      expect(screen.getByText("Alice")).toBeInTheDocument();
      expect(screen.getByText("Bob")).toBeInTheDocument();
      expect(screen.getByText("Charlie")).toBeInTheDocument();
    });

    it("should display cell values correctly", () => {
      render(<DataTable data={mockData} columns={mockColumns} />);
      expect(screen.getByText("alice@example.com")).toBeInTheDocument();
      expect(screen.getAllByText("active").length).toBeGreaterThan(0);
      expect(screen.getByText("25")).toBeInTheDocument();
    });
  });

  describe("Variants", () => {
    it("should render default variant", () => {
      render(
        <DataTable data={mockData} columns={mockColumns} data-testid="table" />,
      );
      const table = screen.getByTestId("table");
      expect(table).toHaveClass("text-sm");
    });

    it("should render bordered variant", () => {
      render(
        <DataTable
          data={mockData}
          columns={mockColumns}
          variant="bordered"
          data-testid="table"
        />,
      );
      const table = screen.getByTestId("table");
      expect(table).toHaveClass("border");
    });

    it("should render striped variant", () => {
      render(
        <DataTable data={mockData} columns={mockColumns} variant="striped" />,
      );
      const rows = screen.getAllByRole("row");
      // Skip header row, check data rows for striped classes
      const dataRows = rows.slice(1);
      expect(dataRows[1]).toHaveClass("bg-gray-50");
    });
  });

  describe("Sizes", () => {
    it("should render small size", () => {
      render(<DataTable data={mockData} columns={mockColumns} size="sm" />);
      const cells = screen.getAllByRole("cell");
      expect(cells[0]).toHaveClass("py-1");
    });

    it("should render medium size by default", () => {
      render(<DataTable data={mockData} columns={mockColumns} />);
      const cells = screen.getAllByRole("cell");
      expect(cells[0]).toHaveClass("py-2");
    });

    it("should render large size", () => {
      render(<DataTable data={mockData} columns={mockColumns} size="lg" />);
      const cells = screen.getAllByRole("cell");
      expect(cells[0]).toHaveClass("py-3");
    });
  });

  describe("Selection", () => {
    it("should render checkbox when selectable", () => {
      render(<DataTable data={mockData} columns={mockColumns} selectable />);
      const checkboxes = screen.getAllByRole("checkbox");
      expect(checkboxes.length).toBeGreaterThan(0);
    });

    it("should render header checkbox for select all", () => {
      render(<DataTable data={mockData} columns={mockColumns} selectable />);
      const headerRow = screen.getAllByRole("row")[0];
      const headerCheckbox = within(headerRow).getByRole("checkbox");
      expect(headerCheckbox).toBeInTheDocument();
    });

    it("should call onSelectionChange when row selected", () => {
      const onSelectionChange = vi.fn();
      render(
        <DataTable
          data={mockData}
          columns={mockColumns}
          selectable
          onSelectionChange={onSelectionChange}
        />,
      );

      const rowCheckboxes = screen.getAllByRole("checkbox").slice(1); // Skip header checkbox
      fireEvent.click(rowCheckboxes[0]);

      expect(onSelectionChange).toHaveBeenCalled();
    });

    it("should select all rows when header checkbox clicked", () => {
      const onSelectionChange = vi.fn();
      render(
        <DataTable
          data={mockData}
          columns={mockColumns}
          selectable
          onSelectionChange={onSelectionChange}
        />,
      );

      const headerCheckbox = screen.getAllByRole("checkbox")[0];
      fireEvent.click(headerCheckbox);

      expect(onSelectionChange).toHaveBeenCalledWith(mockData);
    });

    it("should highlight selected rows", () => {
      render(
        <DataTable
          data={mockData}
          columns={mockColumns}
          selectable
          selectedIds={["1"]}
        />,
      );

      const rows = screen.getAllByRole("row");
      expect(rows[1]).toHaveClass("bg-primary-50");
    });
  });

  describe("Sorting", () => {
    it("should render sortable headers when sortable", () => {
      render(<DataTable data={mockData} columns={mockColumns} sortable />);
      const nameHeader = screen.getByText("Name").closest("th");
      expect(nameHeader).toHaveAttribute("aria-sort");
    });

    it("should call onSortChange when header clicked", () => {
      const onSortChange = vi.fn();
      render(
        <DataTable
          data={mockData}
          columns={mockColumns}
          sortable
          onSortChange={onSortChange}
        />,
      );

      fireEvent.click(screen.getByText("Name"));
      expect(onSortChange).toHaveBeenCalledWith({
        column: "name",
        direction: "asc",
      });
    });

    it("should toggle sort direction on subsequent clicks", () => {
      const onSortChange = vi.fn();
      render(
        <DataTable
          data={mockData}
          columns={mockColumns}
          sortable
          sortState={{ column: "name", direction: "asc" }}
          onSortChange={onSortChange}
        />,
      );

      fireEvent.click(screen.getByText("Name"));
      expect(onSortChange).toHaveBeenCalledWith({
        column: "name",
        direction: "desc",
      });
    });

    it("should show sort indicator on sorted column", () => {
      render(
        <DataTable
          data={mockData}
          columns={mockColumns}
          sortable
          sortState={{ column: "name", direction: "asc" }}
        />,
      );

      const nameHeader = screen.getByText("Name").closest("th");
      expect(nameHeader).toHaveAttribute("aria-sort", "ascending");
    });
  });

  describe("Empty State", () => {
    it("should show empty message when no data", () => {
      render(
        <DataTable
          data={[]}
          columns={mockColumns}
          emptyMessage="No data available"
        />,
      );
      expect(screen.getByText("No data available")).toBeInTheDocument();
    });

    it("should show default empty message", () => {
      render(<DataTable data={[]} columns={mockColumns} />);
      expect(screen.getByText("No data")).toBeInTheDocument();
    });

    it("should render custom empty component", () => {
      render(
        <DataTable
          data={[]}
          columns={mockColumns}
          emptyContent={<div data-testid="custom-empty">Custom Empty</div>}
        />,
      );
      expect(screen.getByTestId("custom-empty")).toBeInTheDocument();
    });
  });

  describe("Loading State", () => {
    it("should show loading indicator when loading", () => {
      render(<DataTable data={mockData} columns={mockColumns} loading />);
      expect(screen.getByRole("status")).toBeInTheDocument();
    });

    it("should not show data when loading", () => {
      render(<DataTable data={mockData} columns={mockColumns} loading />);
      expect(screen.queryByText("Alice")).not.toBeInTheDocument();
    });
  });

  describe("Row Click", () => {
    it("should call onRowClick when row is clicked", () => {
      const onRowClick = vi.fn();
      render(
        <DataTable
          data={mockData}
          columns={mockColumns}
          onRowClick={onRowClick}
        />,
      );

      const aliceRow = screen.getByText("Alice").closest("tr");
      fireEvent.click(aliceRow!);

      expect(onRowClick).toHaveBeenCalledWith(mockData[0]);
    });

    it("should have pointer cursor when clickable", () => {
      render(
        <DataTable
          data={mockData}
          columns={mockColumns}
          onRowClick={() => {}}
        />,
      );
      const aliceRow = screen.getByText("Alice").closest("tr");
      expect(aliceRow).toHaveClass("cursor-pointer");
    });
  });

  describe("Custom Cell Render", () => {
    it("should render custom cell content", () => {
      const columnsWithCustomCell: ColumnDef<TestData>[] = [
        ...mockColumns,
        {
          id: "actions",
          header: "Actions",
          cell: ({ row }) => <button type="button">Edit {row.name}</button>,
        },
      ];

      render(<DataTable data={mockData} columns={columnsWithCustomCell} />);
      expect(
        screen.getByRole("button", { name: "Edit Alice" }),
      ).toBeInTheDocument();
    });
  });

  describe("Compound Components", () => {
    it("should support custom table composition", () => {
      render(
        <DataTable data={[]} columns={[]}>
          <DataTableHeader>
            <DataTableRow>
              <DataTableHead>Custom Header</DataTableHead>
            </DataTableRow>
          </DataTableHeader>
          <DataTableBody>
            <DataTableRow>
              <DataTableCell>Custom Cell</DataTableCell>
            </DataTableRow>
          </DataTableBody>
          <DataTableFooter>
            <DataTableRow>
              <DataTableCell>Custom Footer</DataTableCell>
            </DataTableRow>
          </DataTableFooter>
        </DataTable>,
      );

      expect(screen.getByText("Custom Header")).toBeInTheDocument();
      expect(screen.getByText("Custom Cell")).toBeInTheDocument();
      expect(screen.getByText("Custom Footer")).toBeInTheDocument();
    });
  });

  describe("Accessibility", () => {
    it("should have proper table structure", () => {
      render(<DataTable data={mockData} columns={mockColumns} />);
      expect(screen.getByRole("table")).toBeInTheDocument();
      expect(screen.getAllByRole("columnheader").length).toBe(4);
      expect(screen.getAllByRole("row").length).toBe(4); // 1 header + 3 data rows
    });

    it('should have scope="col" on header cells', () => {
      render(<DataTable data={mockData} columns={mockColumns} />);
      const headers = screen.getAllByRole("columnheader");
      headers.forEach((header) => {
        expect(header).toHaveAttribute("scope", "col");
      });
    });

    it("should support aria-label", () => {
      render(
        <DataTable
          data={mockData}
          columns={mockColumns}
          aria-label="User data table"
        />,
      );
      expect(screen.getByRole("table")).toHaveAttribute(
        "aria-label",
        "User data table",
      );
    });
  });

  describe("Hover Effects", () => {
    it("should apply hover background on rows", () => {
      render(<DataTable data={mockData} columns={mockColumns} hoverable />);
      const dataRow = screen.getByText("Alice").closest("tr");
      expect(dataRow).toHaveClass("hover:bg-gray-50");
    });

    it("should not apply hover by default", () => {
      render(<DataTable data={mockData} columns={mockColumns} />);
      const dataRow = screen.getByText("Alice").closest("tr");
      expect(dataRow).not.toHaveClass("hover:bg-gray-50");
    });
  });

  describe("Stickyness", () => {
    it("should make header sticky when stickyHeader is true", () => {
      render(<DataTable data={mockData} columns={mockColumns} stickyHeader />);
      const thead = screen.getAllByRole("row")[0].closest("thead");
      expect(thead).toHaveClass("sticky");
      expect(thead).toHaveClass("top-0");
    });
  });
});
