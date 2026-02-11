import type { Meta, StoryObj } from "@storybook/react";
import { Separator } from "@/components/Separator";

const meta: Meta<typeof Separator> = {
  title: "Components/Separator",
  component: Separator,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    orientation: {
      control: "select",
      options: ["horizontal", "vertical"],
      description: "Separator orientation",
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// Default (horizontal)
export const Default: Story = {
  render: () => (
    <div className="w-80">
      <Separator />
    </div>
  ),
};

// Horizontal
export const Horizontal: Story = {
  render: () => (
    <div className="w-80 space-y-4">
      <p className="text-sm text-gray-600">Content above the separator</p>
      <Separator orientation="horizontal" />
      <p className="text-sm text-gray-600">Content below the separator</p>
    </div>
  ),
};

// Vertical
export const Vertical: Story = {
  render: () => (
    <div className="flex items-center gap-4 h-8">
      <span className="text-sm text-gray-600">Left</span>
      <Separator orientation="vertical" />
      <span className="text-sm text-gray-600">Right</span>
    </div>
  ),
};

// In a list
export const InAList: Story = {
  render: () => (
    <div className="w-80">
      <div className="py-3">
        <p className="text-sm font-medium">Profile</p>
        <p className="text-xs text-gray-500">Manage your account settings</p>
      </div>
      <Separator />
      <div className="py-3">
        <p className="text-sm font-medium">Notifications</p>
        <p className="text-xs text-gray-500">Configure notification preferences</p>
      </div>
      <Separator />
      <div className="py-3">
        <p className="text-sm font-medium">Security</p>
        <p className="text-xs text-gray-500">Update password and security options</p>
      </div>
    </div>
  ),
};

// Vertical in toolbar
export const VerticalInToolbar: Story = {
  render: () => (
    <div className="flex items-center gap-3 h-8">
      <button className="text-sm text-gray-600 hover:text-gray-900">Bold</button>
      <button className="text-sm text-gray-600 hover:text-gray-900">Italic</button>
      <Separator orientation="vertical" />
      <button className="text-sm text-gray-600 hover:text-gray-900">Left</button>
      <button className="text-sm text-gray-600 hover:text-gray-900">Center</button>
      <button className="text-sm text-gray-600 hover:text-gray-900">Right</button>
      <Separator orientation="vertical" />
      <button className="text-sm text-gray-600 hover:text-gray-900">Link</button>
      <button className="text-sm text-gray-600 hover:text-gray-900">Image</button>
    </div>
  ),
};

// Both orientations
export const BothOrientations: Story = {
  render: () => (
    <div className="flex flex-col gap-8">
      <div>
        <p className="text-sm text-gray-500 mb-3">Horizontal</p>
        <div className="w-64">
          <p className="text-sm text-gray-600 mb-2">Above</p>
          <Separator orientation="horizontal" />
          <p className="text-sm text-gray-600 mt-2">Below</p>
        </div>
      </div>
      <div>
        <p className="text-sm text-gray-500 mb-3">Vertical</p>
        <div className="flex items-center gap-4 h-8">
          <span className="text-sm text-gray-600">Item 1</span>
          <Separator orientation="vertical" />
          <span className="text-sm text-gray-600">Item 2</span>
          <Separator orientation="vertical" />
          <span className="text-sm text-gray-600">Item 3</span>
        </div>
      </div>
    </div>
  ),
};
