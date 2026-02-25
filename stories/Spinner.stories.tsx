import type { Meta, StoryObj } from '@storybook/react';
import { Spinner } from '@/components/Spinner';

const meta: Meta<typeof Spinner> = {
  title: 'Components/Spinner',
  component: Spinner,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg', 'xl'],
      description: 'Spinner size',
    },
    color: {
      control: 'select',
      options: ['primary', 'white', 'current', 'gray'],
      description: 'Spinner color',
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
      <Spinner size="sm" />
      <Spinner size="md" />
      <Spinner size="lg" />
      <Spinner size="xl" />
    </div>
  ),
};

// Colors
export const Colors: Story = {
  render: () => (
    <div className="flex gap-4 items-center">
      <Spinner color="primary" />
      <Spinner color="gray" />
      <div className="bg-gray-800 p-4 rounded">
        <Spinner color="white" />
      </div>
    </div>
  ),
};

// Speeds
export const Speeds: Story = {
  render: () => (
    <div className="flex gap-8 items-center">
      <div className="text-center">
        <Spinner speed="slow" />
        <p className="text-sm text-gray-500 mt-2">Slow</p>
      </div>
      <div className="text-center">
        <Spinner speed="normal" />
        <p className="text-sm text-gray-500 mt-2">Normal</p>
      </div>
      <div className="text-center">
        <Spinner speed="fast" />
        <p className="text-sm text-gray-500 mt-2">Fast</p>
      </div>
    </div>
  ),
};

// In button
export const InButton: Story = {
  render: () => (
    <button className="inline-flex items-center gap-2 px-4 py-2 bg-accent-500 text-white rounded-md">
      <Spinner size="sm" color="white" />
      <span>Loading...</span>
    </button>
  ),
};

// Full page loader
export const FullPageLoader: Story = {
  render: () => (
    <div className="flex flex-col items-center gap-4">
      <Spinner size="xl" />
      <p className="text-gray-500">Loading content...</p>
    </div>
  ),
};
