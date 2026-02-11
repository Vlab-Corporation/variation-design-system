import type { Meta, StoryObj } from "@storybook/react";
import { EmptyState } from "@/components/EmptyState";
import { Button } from "@/components/Button";

const meta: Meta<typeof EmptyState> = {
  title: "Components/EmptyState",
  component: EmptyState,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    title: {
      control: "text",
      description: "Title text",
    },
    description: {
      control: "text",
      description: "Description text",
    },
    size: {
      control: "select",
      options: ["sm", "md", "lg"],
      description: "Size variant",
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// Default
export const Default: Story = {
  args: {
    title: "No results found",
    description: "Try adjusting your search or filter to find what you need.",
  },
};

// With icon
export const WithIcon: Story = {
  args: {
    icon: (
      <svg
        className="w-12 h-12 text-gray-400"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={1.5}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
        />
      </svg>
    ),
    title: "No messages",
    description: "Your inbox is empty. New messages will appear here.",
  },
};

// With action
export const WithAction: Story = {
  args: {
    icon: (
      <svg
        className="w-12 h-12 text-gray-400"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={1.5}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M12 4.5v15m7.5-7.5h-15"
        />
      </svg>
    ),
    title: "No projects yet",
    description: "Get started by creating your first project.",
    action: <Button variant="primary">Create Project</Button>,
  },
};

// Sizes
export const Sizes: Story = {
  render: () => (
    <div className="flex flex-col gap-8">
      <div>
        <p className="text-sm text-gray-500 mb-3">Small</p>
        <EmptyState
          size="sm"
          title="No items"
          description="Nothing to show here."
        />
      </div>
      <div>
        <p className="text-sm text-gray-500 mb-3">Medium</p>
        <EmptyState
          size="md"
          title="No items"
          description="Nothing to show here."
        />
      </div>
      <div>
        <p className="text-sm text-gray-500 mb-3">Large</p>
        <EmptyState
          size="lg"
          title="No items"
          description="Nothing to show here."
        />
      </div>
    </div>
  ),
};
