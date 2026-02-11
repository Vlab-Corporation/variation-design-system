import type { Meta, StoryObj } from "@storybook/react";
import { Avatar } from "@/components/Avatar";

const meta: Meta<typeof Avatar> = {
  title: "Components/Avatar",
  component: Avatar,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    src: {
      control: "text",
      description: "Image source URL",
    },
    alt: {
      control: "text",
      description: "Alt text for the image",
    },
    fallback: {
      control: "text",
      description: "Fallback content (initials or icon)",
    },
    size: {
      control: "select",
      options: ["xs", "sm", "md", "lg", "xl"],
      description: "Size variant",
    },
    shape: {
      control: "select",
      options: ["circle", "square"],
      description: "Shape variant",
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// Default with image
export const Default: Story = {
  args: {
    src: "https://i.pravatar.cc/150?img=1",
    alt: "John Doe",
    size: "md",
    shape: "circle",
  },
};

// With initials (no src, auto-generated from alt)
export const WithInitials: Story = {
  args: {
    alt: "John Doe",
    size: "md",
    shape: "circle",
  },
};

// With custom fallback
export const WithFallback: Story = {
  args: {
    fallback: "JD",
    size: "md",
    shape: "circle",
  },
};

// Broken image (falls back to initials)
export const BrokenImage: Story = {
  args: {
    src: "https://broken-url.example/avatar.jpg",
    alt: "Jane Smith",
    size: "md",
  },
};

// Circle shape
export const Circle: Story = {
  args: {
    src: "https://i.pravatar.cc/150?img=2",
    alt: "User",
    shape: "circle",
    size: "lg",
  },
};

// Square shape
export const Square: Story = {
  args: {
    src: "https://i.pravatar.cc/150?img=3",
    alt: "User",
    shape: "square",
    size: "lg",
  },
};

// All sizes
export const AllSizes: Story = {
  render: () => (
    <div className="flex items-end gap-4">
      <div className="flex flex-col items-center gap-2">
        <Avatar src="https://i.pravatar.cc/150?img=4" alt="User" size="xs" />
        <span className="text-xs text-gray-500">xs</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <Avatar src="https://i.pravatar.cc/150?img=4" alt="User" size="sm" />
        <span className="text-xs text-gray-500">sm</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <Avatar src="https://i.pravatar.cc/150?img=4" alt="User" size="md" />
        <span className="text-xs text-gray-500">md</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <Avatar src="https://i.pravatar.cc/150?img=4" alt="User" size="lg" />
        <span className="text-xs text-gray-500">lg</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <Avatar src="https://i.pravatar.cc/150?img=4" alt="User" size="xl" />
        <span className="text-xs text-gray-500">xl</span>
      </div>
    </div>
  ),
};

// All shapes
export const AllShapes: Story = {
  render: () => (
    <div className="flex items-center gap-6">
      <div className="flex flex-col items-center gap-2">
        <Avatar src="https://i.pravatar.cc/150?img=5" alt="User" shape="circle" size="lg" />
        <span className="text-xs text-gray-500">circle</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <Avatar src="https://i.pravatar.cc/150?img=5" alt="User" shape="square" size="lg" />
        <span className="text-xs text-gray-500">square</span>
      </div>
    </div>
  ),
};

// Initials showcase
export const InitialsShowcase: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <Avatar alt="Alice Brown" size="lg" />
      <Avatar alt="Bob Carter" size="lg" />
      <Avatar alt="Charlie Davis" size="lg" />
      <Avatar alt="Diana Evans" size="lg" />
      <Avatar alt="Frank Green" size="lg" />
    </div>
  ),
};

// Mixed variants
export const MixedVariants: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <Avatar src="https://i.pravatar.cc/150?img=10" alt="With Image" size="lg" />
      <Avatar alt="With Initials" size="lg" />
      <Avatar fallback="?" size="lg" />
      <Avatar src="https://i.pravatar.cc/150?img=11" alt="Square" size="lg" shape="square" />
      <Avatar alt="Square Init" size="lg" shape="square" />
    </div>
  ),
};
