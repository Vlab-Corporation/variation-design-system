import type { Meta, StoryObj } from "@storybook/react";
import { Tooltip } from "@/components/Tooltip";
import { Button } from "@/components/Button";

const meta: Meta<typeof Tooltip> = {
  title: "Components/Tooltip",
  component: Tooltip,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    content: {
      control: "text",
      description: "Tooltip content",
    },
    placement: {
      control: "select",
      options: ["top", "bottom", "left", "right"],
      description: "Placement relative to trigger",
    },
    arrow: {
      control: "boolean",
      description: "Show arrow indicator",
    },
    delayShow: {
      control: "number",
      description: "Delay before showing (ms)",
    },
    delayHide: {
      control: "number",
      description: "Delay before hiding (ms)",
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// Default
export const Default: Story = {
  args: {
    content: "This is a tooltip",
    children: <Button variant="outline">Hover me</Button>,
  },
};

// Placements
export const Placements: Story = {
  render: () => (
    <div className="flex flex-col items-center gap-12 py-16">
      <Tooltip content="Tooltip on top" placement="top">
        <Button variant="outline">Top</Button>
      </Tooltip>
      <div className="flex gap-24">
        <Tooltip content="Tooltip on left" placement="left">
          <Button variant="outline">Left</Button>
        </Tooltip>
        <Tooltip content="Tooltip on right" placement="right">
          <Button variant="outline">Right</Button>
        </Tooltip>
      </div>
      <Tooltip content="Tooltip on bottom" placement="bottom">
        <Button variant="outline">Bottom</Button>
      </Tooltip>
    </div>
  ),
};

// No Arrow
export const NoArrow: Story = {
  args: {
    content: "Tooltip without arrow",
    arrow: false,
    children: <Button variant="outline">No arrow</Button>,
  },
};
