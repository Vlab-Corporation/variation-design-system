import type { Meta, StoryObj } from "@storybook/react";
import { Tag } from "@/components/Tag";

const meta: Meta<typeof Tag> = {
  title: "Components/Tag",
  component: Tag,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["default", "primary", "success", "warning", "error", "info"],
      description: "Visual variant",
    },
    size: {
      control: "select",
      options: ["sm", "md", "lg"],
      description: "Tag size",
    },
    removable: {
      control: "boolean",
      description: "Show remove button",
    },
    onRemove: { action: "removed" },
    onClick: { action: "clicked" },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// Default
export const Default: Story = {
  args: {
    children: "Tag",
  },
};

// Variants
export const Variants: Story = {
  render: () => (
    <div className="flex gap-2 flex-wrap">
      <Tag variant="default">Default</Tag>
      <Tag variant="primary">Primary</Tag>
      <Tag variant="success">Success</Tag>
      <Tag variant="warning">Warning</Tag>
      <Tag variant="error">Error</Tag>
      <Tag variant="info">Info</Tag>
    </div>
  ),
};

// Sizes
export const Sizes: Story = {
  render: () => (
    <div className="flex gap-2 items-center">
      <Tag size="sm">Small</Tag>
      <Tag size="md">Medium</Tag>
      <Tag size="lg">Large</Tag>
    </div>
  ),
};

// Removable
export const Removable: Story = {
  render: () => (
    <div className="flex gap-2 flex-wrap">
      <Tag variant="primary" removable onRemove={() => {}}>
        React
      </Tag>
      <Tag variant="success" removable onRemove={() => {}}>
        TypeScript
      </Tag>
      <Tag variant="info" removable onRemove={() => {}}>
        Tailwind
      </Tag>
    </div>
  ),
};

// Clickable
export const Clickable: Story = {
  render: () => (
    <div className="flex gap-2 flex-wrap">
      <Tag variant="primary" onClick={() => {}}>
        Clickable
      </Tag>
      <Tag variant="success" onClick={() => {}}>
        Interactive
      </Tag>
      <Tag variant="warning" onClick={() => {}}>
        Selectable
      </Tag>
    </div>
  ),
};
