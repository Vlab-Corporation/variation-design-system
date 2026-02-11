import type { Meta, StoryObj } from "@storybook/react";
import { Skeleton } from "@/components/Skeleton";

const meta: Meta<typeof Skeleton> = {
  title: "Components/Skeleton",
  component: Skeleton,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["text", "circular", "rectangular"],
      description: "Shape variant",
    },
    width: {
      control: "text",
      description: "Width (CSS value)",
    },
    height: {
      control: "text",
      description: "Height (CSS value)",
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// Default (text variant)
export const Default: Story = {
  args: {
    variant: "text",
    width: "200px",
  },
};

// Text variant
export const Text: Story = {
  args: {
    variant: "text",
    width: "300px",
  },
};

// Circular variant
export const Circular: Story = {
  args: {
    variant: "circular",
    width: 48,
    height: 48,
  },
};

// Rectangular variant
export const Rectangular: Story = {
  args: {
    variant: "rectangular",
    width: 200,
    height: 120,
  },
};

// Text lines
export const TextLines: Story = {
  render: () => (
    <div className="flex flex-col gap-2 w-80">
      <Skeleton variant="text" />
      <Skeleton variant="text" />
      <Skeleton variant="text" width="60%" />
    </div>
  ),
};

// Loading card pattern
export const LoadingCard: Story = {
  render: () => (
    <div className="w-80 rounded-lg border border-gray-200 p-4">
      <div className="flex items-center gap-3 mb-4">
        <Skeleton variant="circular" width={40} height={40} />
        <div className="flex flex-col gap-2 flex-1">
          <Skeleton variant="text" width="60%" />
          <Skeleton variant="text" width="40%" />
        </div>
      </div>
      <Skeleton variant="rectangular" width="100%" height={160} />
      <div className="mt-4 flex flex-col gap-2">
        <Skeleton variant="text" />
        <Skeleton variant="text" />
        <Skeleton variant="text" width="75%" />
      </div>
    </div>
  ),
};

// Loading profile pattern
export const LoadingProfile: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <Skeleton variant="circular" width={64} height={64} />
      <div className="flex flex-col gap-2">
        <Skeleton variant="text" width={160} />
        <Skeleton variant="text" width={120} />
        <Skeleton variant="text" width={200} />
      </div>
    </div>
  ),
};

// Loading list pattern
export const LoadingList: Story = {
  render: () => (
    <div className="w-80 flex flex-col gap-4">
      {Array.from({ length: 4 }).map((_, i) => (
        <div key={i} className="flex items-center gap-3">
          <Skeleton variant="circular" width={32} height={32} />
          <div className="flex flex-col gap-1 flex-1">
            <Skeleton variant="text" width="70%" />
            <Skeleton variant="text" width="50%" />
          </div>
        </div>
      ))}
    </div>
  ),
};

// All variants showcase
export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-col gap-8">
      <div>
        <p className="text-sm text-gray-500 mb-3">Text</p>
        <div className="flex flex-col gap-2 w-64">
          <Skeleton variant="text" />
          <Skeleton variant="text" width="80%" />
          <Skeleton variant="text" width="60%" />
        </div>
      </div>
      <div>
        <p className="text-sm text-gray-500 mb-3">Circular</p>
        <div className="flex gap-4">
          <Skeleton variant="circular" width={32} height={32} />
          <Skeleton variant="circular" width={48} height={48} />
          <Skeleton variant="circular" width={64} height={64} />
        </div>
      </div>
      <div>
        <p className="text-sm text-gray-500 mb-3">Rectangular</p>
        <div className="flex gap-4">
          <Skeleton variant="rectangular" width={80} height={60} />
          <Skeleton variant="rectangular" width={120} height={80} />
          <Skeleton variant="rectangular" width={160} height={100} />
        </div>
      </div>
    </div>
  ),
};
