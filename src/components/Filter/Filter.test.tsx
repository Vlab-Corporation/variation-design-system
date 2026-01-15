import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import {
  Filter,
  FilterTrigger,
  FilterContent,
  FilterGroup,
  FilterItem,
  FilterInput,
} from "./Filter";

describe("Filter Component", () => {
  describe("Filter", () => {
    it("should render filter container", () => {
      render(
        <Filter>
          <FilterTrigger data-testid="trigger">Filter</FilterTrigger>
        </Filter>,
      );
      expect(screen.getByTestId("trigger")).toBeInTheDocument();
    });

    it("should open dropdown on click", () => {
      render(
        <Filter>
          <FilterTrigger>Filter</FilterTrigger>
          <FilterContent data-testid="content">
            <FilterGroup label="Status">
              <FilterItem value="active" label="Active" />
            </FilterGroup>
          </FilterContent>
        </Filter>,
      );

      fireEvent.click(screen.getByText("Filter"));
      expect(screen.getByTestId("content")).toBeInTheDocument();
    });
  });

  describe("FilterGroup", () => {
    it("should render group label", () => {
      render(
        <Filter defaultOpen>
          <FilterTrigger>Filter</FilterTrigger>
          <FilterContent>
            <FilterGroup label="Status">
              <FilterItem value="active" label="Active" />
            </FilterGroup>
          </FilterContent>
        </Filter>,
      );

      expect(screen.getByText("Status")).toBeInTheDocument();
    });
  });

  describe("FilterItem", () => {
    it("should render checkbox filter item", () => {
      render(
        <Filter defaultOpen>
          <FilterTrigger>Filter</FilterTrigger>
          <FilterContent>
            <FilterGroup label="Status">
              <FilterItem value="active" label="Active" />
            </FilterGroup>
          </FilterContent>
        </Filter>,
      );

      expect(screen.getByLabelText("Active")).toBeInTheDocument();
    });

    it("should call onChange when checked", () => {
      const onChange = vi.fn();
      render(
        <Filter defaultOpen>
          <FilterTrigger>Filter</FilterTrigger>
          <FilterContent>
            <FilterGroup label="Status">
              <FilterItem value="active" label="Active" onChange={onChange} />
            </FilterGroup>
          </FilterContent>
        </Filter>,
      );

      fireEvent.click(screen.getByLabelText("Active"));
      expect(onChange).toHaveBeenCalledWith("active", true);
    });
  });

  describe("FilterInput", () => {
    it("should render text input", () => {
      render(
        <Filter defaultOpen>
          <FilterTrigger>Filter</FilterTrigger>
          <FilterContent>
            <FilterInput placeholder="Search..." data-testid="input" />
          </FilterContent>
        </Filter>,
      );

      expect(screen.getByTestId("input")).toBeInTheDocument();
    });

    it("should call onValueChange when typing", () => {
      const onValueChange = vi.fn();
      render(
        <Filter defaultOpen>
          <FilterTrigger>Filter</FilterTrigger>
          <FilterContent>
            <FilterInput
              placeholder="Search..."
              onValueChange={onValueChange}
            />
          </FilterContent>
        </Filter>,
      );

      fireEvent.change(screen.getByPlaceholderText("Search..."), {
        target: { value: "test" },
      });
      expect(onValueChange).toHaveBeenCalledWith("test");
    });
  });

  describe("Accessibility", () => {
    it("should have proper aria attributes", () => {
      render(
        <Filter>
          <FilterTrigger data-testid="trigger">Filter</FilterTrigger>
          <FilterContent>
            <FilterItem value="test" label="Test" />
          </FilterContent>
        </Filter>,
      );

      expect(screen.getByTestId("trigger")).toHaveAttribute(
        "aria-haspopup",
        "true",
      );
    });
  });
});
