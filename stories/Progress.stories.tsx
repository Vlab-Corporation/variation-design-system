import type { Meta, StoryObj } from "@storybook/react";
import { Progress } from "@/components/Progress";

const meta: Meta<typeof Progress> = {
  title: "Components/Progress",
  component: Progress,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    value: {
      control: { type: "range", min: 0, max: 100 },
      description: "Current progress value",
    },
    max: {
      control: "number",
      description: "Maximum value",
    },
    size: {
      control: "select",
      options: ["sm", "md", "lg"],
      description: "Progress bar size",
    },
    variant: {
      control: "select",
      options: ["default", "success", "warning", "error"],
      description: "Color variant",
    },
    indeterminate: {
      control: "boolean",
      description: "Show indeterminate animation",
    },
    showLabel: {
      control: "boolean",
      description: "Show percentage label",
    },
  },
  decorators: [
    (Story) => (
      <div style={{ width: 320 }}>
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof meta>;

// Default
export const Default: Story = {
  args: {
    value: 60,
  },
};

// Sizes
export const Sizes: Story = {
  render: () => (
    <div className="flex flex-col gap-4 w-80">
      <div>
        <p className="text-sm text-gray-500 mb-2">Small</p>
        <Progress value={40} size="sm" />
      </div>
      <div>
        <p className="text-sm text-gray-500 mb-2">Medium</p>
        <Progress value={60} size="md" />
      </div>
      <div>
        <p className="text-sm text-gray-500 mb-2">Large</p>
        <Progress value={80} size="lg" />
      </div>
    </div>
  ),
};

// Variants
export const Variants: Story = {
  render: () => (
    <div className="flex flex-col gap-4 w-80">
      <div>
        <p className="text-sm text-gray-500 mb-2">Default</p>
        <Progress value={50} variant="default" />
      </div>
      <div>
        <p className="text-sm text-gray-500 mb-2">Success</p>
        <Progress value={100} variant="success" />
      </div>
      <div>
        <p className="text-sm text-gray-500 mb-2">Warning</p>
        <Progress value={65} variant="warning" />
      </div>
      <div>
        <p className="text-sm text-gray-500 mb-2">Error</p>
        <Progress value={30} variant="error" />
      </div>
    </div>
  ),
};

// With label
export const WithLabel: Story = {
  args: {
    value: 75,
    showLabel: true,
  },
};

// Indeterminate
export const Indeterminate: Story = {
  args: {
    indeterminate: true,
  },
};
