import type { Meta, StoryObj } from '@storybook/react';
import { LoadingDots } from '@/components/LoadingDots';

const meta: Meta<typeof LoadingDots> = {
  title: 'Components/LoadingDots',
  component: LoadingDots,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg', 'xl'],
      description: 'Dot size',
    },
    color: {
      control: 'select',
      options: ['primary', 'white', 'current', 'gray'],
      description: 'Dot color',
    },
    speed: {
      control: 'select',
      options: ['normal', 'slow', 'fast'],
      description: 'Animation speed',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// Default
export const Default: Story = {};

// Sizes
export const Sizes: Story = {
  render: () => (
    <div className="flex gap-4 items-center">
      <LoadingDots size="sm" />
      <LoadingDots size="md" />
      <LoadingDots size="lg" />
      <LoadingDots size="xl" />
    </div>
  ),
};

// Colors
export const Colors: Story = {
  render: () => (
    <div className="flex gap-4 items-center">
      <LoadingDots color="primary" />
      <LoadingDots color="gray" />
      <div className="bg-gray-800 p-4 rounded">
        <LoadingDots color="white" />
      </div>
    </div>
  ),
};

// Speeds
export const Speeds: Story = {
  render: () => (
    <div className="flex gap-8 items-center">
      <div className="text-center">
        <LoadingDots speed="slow" />
        <p className="text-sm text-gray-500 mt-2">Slow</p>
      </div>
      <div className="text-center">
        <LoadingDots speed="normal" />
        <p className="text-sm text-gray-500 mt-2">Normal</p>
      </div>
      <div className="text-center">
        <LoadingDots speed="fast" />
        <p className="text-sm text-gray-500 mt-2">Fast</p>
      </div>
    </div>
  ),
};

// In button
export const InButton: Story = {
  render: () => (
    <button className="inline-flex items-center gap-2 px-4 py-2 bg-accent-500 text-white rounded-md">
      <LoadingDots size="sm" color="white" />
      <span>Loading...</span>
    </button>
  ),
};
