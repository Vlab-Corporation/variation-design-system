import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { type ComponentProps } from "react";
import { Tabs, TabList, Tab, TabPanel } from "./Tabs";

function renderTabs(props?: Partial<ComponentProps<typeof Tabs>>) {
  return render(
    <Tabs defaultValue="tab1" {...props}>
      <TabList>
        <Tab value="tab1">Tab 1</Tab>
        <Tab value="tab2">Tab 2</Tab>
        <Tab value="tab3">Tab 3</Tab>
      </TabList>
      <TabPanel value="tab1">Content 1</TabPanel>
      <TabPanel value="tab2">Content 2</TabPanel>
      <TabPanel value="tab3">Content 3</TabPanel>
    </Tabs>,
  );
}

describe("Tabs Component", () => {
  describe("Rendering", () => {
    it("should render tab list", () => {
      renderTabs();
      expect(screen.getByRole("tablist")).toBeInTheDocument();
    });

    it("should render all tabs", () => {
      renderTabs();
      expect(screen.getAllByRole("tab")).toHaveLength(3);
    });

    it("should render active panel", () => {
      renderTabs();
      expect(screen.getByText("Content 1")).toBeInTheDocument();
    });

    it("should not render inactive panels", () => {
      renderTabs();
      expect(screen.queryByText("Content 2")).not.toBeInTheDocument();
      expect(screen.queryByText("Content 3")).not.toBeInTheDocument();
    });
  });

  describe("Tab Switching", () => {
    it("should switch panel when tab is clicked", () => {
      renderTabs();
      fireEvent.click(screen.getByText("Tab 2"));
      expect(screen.getByText("Content 2")).toBeInTheDocument();
      expect(screen.queryByText("Content 1")).not.toBeInTheDocument();
    });

    it("should call onChange when tab changes", () => {
      const handleChange = vi.fn();
      renderTabs({ onChange: handleChange });
      fireEvent.click(screen.getByText("Tab 2"));
      expect(handleChange).toHaveBeenCalledWith("tab2");
    });

    it("should support controlled value", () => {
      render(
        <Tabs value="tab2">
          <TabList>
            <Tab value="tab1">Tab 1</Tab>
            <Tab value="tab2">Tab 2</Tab>
          </TabList>
          <TabPanel value="tab1">Content 1</TabPanel>
          <TabPanel value="tab2">Content 2</TabPanel>
        </Tabs>,
      );
      expect(screen.getByText("Content 2")).toBeInTheDocument();
    });
  });

  describe("Variants", () => {
    it("should apply underline variant by default", () => {
      renderTabs();
      expect(screen.getByRole("tablist")).toHaveClass("border-b");
    });

    it("should apply pill variant", () => {
      renderTabs({ variant: "pill" });
      expect(screen.getByRole("tablist")).toHaveClass("bg-gray-100");
    });
  });

  describe("Sizes", () => {
    it("should apply medium size by default", () => {
      renderTabs();
      expect(screen.getByText("Tab 1")).toHaveClass("text-base");
    });

    it("should apply small size", () => {
      renderTabs({ size: "sm" });
      expect(screen.getByText("Tab 1")).toHaveClass("text-sm");
    });

    it("should apply large size", () => {
      renderTabs({ size: "lg" });
      expect(screen.getByText("Tab 1")).toHaveClass("text-lg");
    });
  });

  describe("Disabled Tab", () => {
    it("should not switch to disabled tab", () => {
      render(
        <Tabs defaultValue="tab1">
          <TabList>
            <Tab value="tab1">Tab 1</Tab>
            <Tab value="tab2" disabled>
              Tab 2
            </Tab>
          </TabList>
          <TabPanel value="tab1">Content 1</TabPanel>
          <TabPanel value="tab2">Content 2</TabPanel>
        </Tabs>,
      );
      fireEvent.click(screen.getByText("Tab 2"));
      expect(screen.getByText("Content 1")).toBeInTheDocument();
    });

    it("should have disabled styling", () => {
      render(
        <Tabs defaultValue="tab1">
          <TabList>
            <Tab value="tab1">Tab 1</Tab>
            <Tab value="tab2" disabled>
              Tab 2
            </Tab>
          </TabList>
          <TabPanel value="tab1">Content 1</TabPanel>
        </Tabs>,
      );
      expect(screen.getByText("Tab 2")).toHaveClass("opacity-50");
    });
  });

  describe("Keyboard Navigation", () => {
    it("should navigate with ArrowRight", () => {
      renderTabs();
      const tab1 = screen.getByText("Tab 1");
      tab1.focus();
      fireEvent.keyDown(tab1, { key: "ArrowRight" });
      expect(screen.getByText("Tab 2")).toHaveFocus();
    });

    it("should navigate with ArrowLeft", () => {
      renderTabs();
      const tab2 = screen.getByText("Tab 2");
      fireEvent.click(tab2);
      fireEvent.keyDown(tab2, { key: "ArrowLeft" });
      expect(screen.getByText("Tab 1")).toHaveFocus();
    });
  });

  describe("Accessibility", () => {
    it("should have tablist role", () => {
      renderTabs();
      expect(screen.getByRole("tablist")).toBeInTheDocument();
    });

    it("should have tab role on tabs", () => {
      renderTabs();
      expect(screen.getAllByRole("tab")).toHaveLength(3);
    });

    it("should have tabpanel role on panel", () => {
      renderTabs();
      expect(screen.getByRole("tabpanel")).toBeInTheDocument();
    });

    it("should have aria-selected on active tab", () => {
      renderTabs();
      expect(screen.getByText("Tab 1")).toHaveAttribute(
        "aria-selected",
        "true",
      );
      expect(screen.getByText("Tab 2")).toHaveAttribute(
        "aria-selected",
        "false",
      );
    });
  });
});
