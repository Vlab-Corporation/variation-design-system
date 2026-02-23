import type { Meta, StoryObj } from '@storybook/react';
import { Button } from '@/components/Button';

const meta: Meta<typeof Button> = {
  title: 'Components/Button',
  component: Button,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'ghost'],
      description: 'Visual style variant',
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Button size',
    },
    shape: {
      control: 'radio',
      options: ['rounded', 'pill'],
      description: 'Button shape',
    },
    loading: {
      control: 'boolean',
      description: 'Shows loading spinner',
    },
    disabled: {
      control: 'boolean',
      description: 'Disables the button',
    },
    onClick: { action: 'clicked' },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// Primary variant
export const Primary: Story = {
  args: {
    children: 'Button',
    variant: 'primary',
  },
};

// Secondary variant
export const Secondary: Story = {
  args: {
    children: 'Button',
    variant: 'secondary',
  },
};

// Ghost variant
export const Ghost: Story = {
  args: {
    children: 'Button',
    variant: 'ghost',
  },
};

// Sizes
export const Small: Story = {
  args: {
    children: 'Small Button',
    size: 'sm',
  },
};

export const Medium: Story = {
  args: {
    children: 'Medium Button',
    size: 'md',
  },
};

export const Large: Story = {
  args: {
    children: 'Large Button',
    size: 'lg',
  },
};

// Shapes
export const Pill: Story = {
  args: {
    children: 'Pill Button',
    shape: 'pill',
  },
};

export const Rounded: Story = {
  args: {
    children: 'Rounded Button',
    shape: 'rounded',
  },
};

// Icons
const ArrowIcon = () => (
  <svg viewBox="0 0 16 16" fill="currentColor">
    <path d="M8 1l7 7-7 7M1 8h14" stroke="currentColor" strokeWidth="2" fill="none" />
  </svg>
);

const PlusIcon = () => (
  <svg viewBox="0 0 16 16" fill="currentColor">
    <path d="M8 2v12M2 8h12" stroke="currentColor" strokeWidth="2" fill="none" />
  </svg>
);

export const WithLeftIcon: Story = {
  args: {
    children: 'Add Item',
    leftIcon: <PlusIcon />,
  },
};

export const WithRightIcon: Story = {
  args: {
    children: 'Continue',
    rightIcon: <ArrowIcon />,
  },
};

export const WithBothIcons: Story = {
  args: {
    children: 'Navigate',
    leftIcon: <PlusIcon />,
    rightIcon: <ArrowIcon />,
  },
};

// States
export const Loading: Story = {
  args: {
    children: 'Loading...',
    loading: true,
  },
};

export const Disabled: Story = {
  args: {
    children: 'Disabled',
    disabled: true,
  },
};

// All variants showcase
export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-col gap-6">
      <div>
        <p className="text-sm text-gray-500 mb-2">Variants</p>
        <div className="flex gap-4 items-center">
          <Button variant="primary">Primary</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="ghost">Ghost</Button>
        </div>
      </div>
      <div>
        <p className="text-sm text-gray-500 mb-2">Sizes</p>
        <div className="flex gap-4 items-center">
          <Button size="sm">Small</Button>
          <Button size="md">Medium</Button>
          <Button size="lg">Large</Button>
        </div>
      </div>
      <div>
        <p className="text-sm text-gray-500 mb-2">Shapes</p>
        <div className="flex gap-4 items-center">
          <Button shape="rounded">Rounded</Button>
          <Button shape="pill">Pill</Button>
          <Button variant="secondary" shape="rounded">Rounded</Button>
          <Button variant="secondary" shape="pill">Pill</Button>
        </div>
      </div>
      <div>
        <p className="text-sm text-gray-500 mb-2">With Icons</p>
        <div className="flex gap-4 items-center">
          <Button leftIcon={<PlusIcon />}>Add Item</Button>
          <Button rightIcon={<ArrowIcon />}>Continue</Button>
          <Button variant="secondary" leftIcon={<PlusIcon />}>Add</Button>
          <Button variant="ghost" rightIcon={<ArrowIcon />}>More</Button>
        </div>
      </div>
      <div>
        <p className="text-sm text-gray-500 mb-2">States</p>
        <div className="flex gap-4 items-center">
          <Button loading>Loading</Button>
          <Button disabled>Disabled</Button>
          <Button variant="secondary" disabled>Disabled</Button>
          <Button variant="ghost" disabled>Disabled</Button>
        </div>
      </div>
    </div>
  ),
};
