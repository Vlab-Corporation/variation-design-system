import type { Meta, StoryObj } from '@storybook/react';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from '@/components/Card';
import { Button } from '@/components/Button';

const meta: Meta<typeof Card> = {
  title: 'Components/Card',
  component: Card,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'elevated', 'outlined', 'filled'],
      description: 'Visual style variant',
    },
    padding: {
      control: 'select',
      options: ['none', 'sm', 'md', 'lg'],
      description: 'Padding size',
    },
    interactive: {
      control: 'boolean',
      description: 'Enable hover effects',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// Default
export const Default: Story = {
  args: {
    children: 'Card content',
    className: 'w-80',
  },
};

// Variants
export const Variants: Story = {
  render: () => (
    <div className="flex gap-4">
      <Card variant="default" className="w-48 p-4">
        <p className="font-medium">Default</p>
        <p className="text-sm text-gray-500">With shadow</p>
      </Card>
      <Card variant="elevated" className="w-48 p-4">
        <p className="font-medium">Elevated</p>
        <p className="text-sm text-gray-500">More shadow</p>
      </Card>
      <Card variant="outlined" className="w-48 p-4">
        <p className="font-medium">Outlined</p>
        <p className="text-sm text-gray-500">With border</p>
      </Card>
      <Card variant="filled" className="w-48 p-4">
        <p className="font-medium">Filled</p>
        <p className="text-sm text-gray-500">Background fill</p>
      </Card>
    </div>
  ),
};

// Interactive
export const Interactive: Story = {
  args: {
    interactive: true,
    children: 'Hover me for effect',
    className: 'w-80',
  },
};

// Full composition
export const FullComposition: Story = {
  render: () => (
    <Card className="w-96">
      <CardHeader>
        <CardTitle>Card Title</CardTitle>
        <CardDescription>
          This is a description that explains what this card is about.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p>
          Main content goes here. This can be any content including text,
          images, or other components.
        </p>
      </CardContent>
      <CardFooter>
        <Button variant="secondary" size="sm">
          Cancel
        </Button>
        <Button size="sm">Confirm</Button>
      </CardFooter>
    </Card>
  ),
};

// Profile card example
export const ProfileCard: Story = {
  render: () => (
    <Card className="w-80" interactive>
      <CardContent className="flex items-center gap-4">
        <div className="w-12 h-12 rounded-full bg-accent-100 flex items-center justify-center">
          <span className="text-accent-600 font-semibold">JD</span>
        </div>
        <div>
          <p className="font-medium">John Doe</p>
          <p className="text-sm text-gray-500">john@example.com</p>
        </div>
      </CardContent>
    </Card>
  ),
};

// Action Card (Figma hover design)
export const ActionCard: Story = {
  render: () => (
    <div className="flex gap-6">
      <Card variant="filled" interactive className="w-72">
        <CardHeader>
          <CardTitle>Action Card</CardTitle>
          <CardDescription>
            Hover to see the accent color effect from the Figma design.
          </CardDescription>
        </CardHeader>
      </Card>
      <Card variant="filled" interactive className="w-72">
        <CardHeader>
          <CardTitle>Another Action</CardTitle>
          <CardDescription>
            Cards change border and background color on hover.
          </CardDescription>
        </CardHeader>
      </Card>
    </div>
  ),
};

// Padding variations
export const Paddings: Story = {
  render: () => (
    <div className="flex gap-4">
      <Card padding="none" variant="outlined" className="w-32">
        <div className="bg-accent-100 p-2 text-center">None</div>
      </Card>
      <Card padding="sm" variant="outlined" className="w-32">
        <span>Small</span>
      </Card>
      <Card padding="md" variant="outlined" className="w-32">
        <span>Medium</span>
      </Card>
      <Card padding="lg" variant="outlined" className="w-32">
        <span>Large</span>
      </Card>
    </div>
  ),
};
