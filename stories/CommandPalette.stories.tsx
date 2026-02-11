import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { CommandPalette } from "@/components/CommandPalette";
import { Button } from "@/components/Button";

const meta: Meta<typeof CommandPalette> = {
  title: "Components/CommandPalette",
  component: CommandPalette,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    placeholder: {
      control: "text",
      description: "Search input placeholder",
    },
    emptyText: {
      control: "text",
      description: "Text shown when no results match",
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

const basicItems = [
  { id: "1", label: "Go to Dashboard" },
  { id: "2", label: "Search Files" },
  { id: "3", label: "Create New Document" },
  { id: "4", label: "Open Settings" },
  { id: "5", label: "Sign Out" },
];

const groupedItems = [
  { id: "1", label: "Go to Dashboard", group: "Navigation", shortcut: "G D" },
  { id: "2", label: "Go to Projects", group: "Navigation", shortcut: "G P" },
  { id: "3", label: "Go to Settings", group: "Navigation", shortcut: "G S" },
  { id: "4", label: "Create New File", group: "Actions", shortcut: "Ctrl+N" },
  {
    id: "5",
    label: "Search Files",
    group: "Actions",
    shortcut: "Ctrl+Shift+F",
  },
  { id: "6", label: "Toggle Dark Mode", group: "Actions" },
  {
    id: "7",
    label: "Disabled Action",
    group: "Actions",
    disabled: true,
  },
];

// Default
export const Default: Story = {
  render: () => {
    const Component = () => {
      const [open, setOpen] = useState(false);
      return (
        <>
          <Button onClick={() => setOpen(true)}>Open Command Palette</Button>
          <CommandPalette
            open={open}
            onOpenChange={setOpen}
            items={basicItems}
          />
        </>
      );
    };
    return <Component />;
  },
};

// With groups and shortcuts
export const WithGroups: Story = {
  render: () => {
    const Component = () => {
      const [open, setOpen] = useState(false);
      return (
        <>
          <Button onClick={() => setOpen(true)}>
            Open Command Palette (Ctrl+K)
          </Button>
          <CommandPalette
            open={open}
            onOpenChange={setOpen}
            items={groupedItems}
            placeholder="Search commands..."
          />
        </>
      );
    };
    return <Component />;
  },
};
