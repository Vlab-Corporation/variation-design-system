import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Popover } from "@/components/Popover";
import { Button } from "@/components/Button";

const meta: Meta<typeof Popover> = {
  title: "Components/Popover",
  component: Popover,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    placement: {
      control: "select",
      options: ["top", "bottom", "left", "right"],
      description: "Placement relative to trigger",
    },
    open: {
      control: "boolean",
      description: "Controlled open state",
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

const PopoverContent = () => (
  <div className="p-3 w-56">
    <p className="text-sm font-medium mb-1">Popover Title</p>
    <p className="text-xs text-gray-500">
      This is the popover content. Click outside or press Escape to close.
    </p>
  </div>
);

// Default (bottom placement)
export const Default: Story = {
  render: () => (
    <Popover content={<PopoverContent />}>
      <Button>Open Popover</Button>
    </Popover>
  ),
};

// Top placement
export const Top: Story = {
  render: () => (
    <div className="pt-40">
      <Popover content={<PopoverContent />} placement="top">
        <Button>Top Popover</Button>
      </Popover>
    </div>
  ),
};

// Bottom placement
export const Bottom: Story = {
  render: () => (
    <Popover content={<PopoverContent />} placement="bottom">
      <Button>Bottom Popover</Button>
    </Popover>
  ),
};

// Left placement
export const Left: Story = {
  render: () => (
    <div className="pl-72">
      <Popover content={<PopoverContent />} placement="left">
        <Button>Left Popover</Button>
      </Popover>
    </div>
  ),
};

// Right placement
export const Right: Story = {
  render: () => (
    <Popover content={<PopoverContent />} placement="right">
      <Button>Right Popover</Button>
    </Popover>
  ),
};

// Controlled open state
export const Controlled: Story = {
  render: () => {
    const Component = () => {
      const [open, setOpen] = useState(false);
      return (
        <div className="flex flex-col items-center gap-4">
          <div className="flex gap-2">
            <Button variant="outline" onClick={() => setOpen(true)}>
              Open
            </Button>
            <Button variant="outline" onClick={() => setOpen(false)}>
              Close
            </Button>
          </div>
          <Popover
            content={<PopoverContent />}
            open={open}
            onOpenChange={setOpen}
          >
            <Button>Controlled Popover</Button>
          </Popover>
        </div>
      );
    };
    return <Component />;
  },
};

// Rich content
export const RichContent: Story = {
  render: () => (
    <Popover
      content={
        <div className="p-4 w-64">
          <h4 className="text-sm font-semibold mb-2">User Settings</h4>
          <ul className="space-y-2 text-sm text-gray-600">
            <li className="hover:text-gray-900 cursor-pointer">Profile</li>
            <li className="hover:text-gray-900 cursor-pointer">Preferences</li>
            <li className="hover:text-gray-900 cursor-pointer">Notifications</li>
            <li className="border-t pt-2 mt-2 text-red-500 hover:text-red-600 cursor-pointer">
              Sign out
            </li>
          </ul>
        </div>
      }
    >
      <Button variant="outline">User Menu</Button>
    </Popover>
  ),
};

// All placements showcase
export const AllPlacements: Story = {
  render: () => (
    <div className="grid grid-cols-3 gap-8 p-20">
      <div />
      <div className="flex justify-center">
        <Popover content={<PopoverContent />} placement="top">
          <Button variant="outline" size="sm">Top</Button>
        </Popover>
      </div>
      <div />
      <div className="flex justify-end">
        <Popover content={<PopoverContent />} placement="left">
          <Button variant="outline" size="sm">Left</Button>
        </Popover>
      </div>
      <div />
      <div className="flex justify-start">
        <Popover content={<PopoverContent />} placement="right">
          <Button variant="outline" size="sm">Right</Button>
        </Popover>
      </div>
      <div />
      <div className="flex justify-center">
        <Popover content={<PopoverContent />} placement="bottom">
          <Button variant="outline" size="sm">Bottom</Button>
        </Popover>
      </div>
      <div />
    </div>
  ),
};
