import type { Meta, StoryObj } from "@storybook/react";
import { Display } from "@/components/Typography";

const meta: Meta<typeof Display> = {
  title: "Components/Typography/Display",
  component: Display,
  parameters: {
    layout: "padded",
  },
  tags: ["autodocs"],
  argTypes: {
    size: {
      control: "select",
      options: ["lg", "md"],
      description: "Display size",
    },
    as: {
      control: "select",
      options: ["h1", "h2", "h3"],
      description: "Render as specific heading element",
    },
    color: {
      control: "select",
      options: [
        "default",
        "secondary",
        "muted",
        "inverse",
        "primary",
        "success",
        "warning",
        "error",
        "info",
      ],
      description: "Text color",
    },
    align: {
      control: "select",
      options: ["left", "center", "right"],
      description: "Text alignment",
    },
    truncate: {
      control: "boolean",
      description: "Truncate with ellipsis on overflow",
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: "Display Text",
    size: "lg",
  },
};

export const Sizes: Story = {
  render: () => (
    <div className="flex flex-col gap-6">
      <div>
        <p className="text-sm text-gray-500 mb-2">
          Display Lg — 44px / Semibold
        </p>
        <Display size="lg">Display Large</Display>
      </div>
      <div>
        <p className="text-sm text-gray-500 mb-2">
          Display Md — 36px / Semibold
        </p>
        <Display size="md">Display Medium</Display>
      </div>
    </div>
  ),
};

export const Colors: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <Display size="md" color="default">
        Default
      </Display>
      <Display size="md" color="primary">
        Primary
      </Display>
      <Display size="md" color="muted">
        Muted
      </Display>
    </div>
  ),
};
