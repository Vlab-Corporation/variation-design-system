import type { Meta, StoryObj } from "@storybook/react";
import { Text } from "@/components/Typography";

const meta: Meta<typeof Text> = {
  title: "Components/Typography/Text",
  component: Text,
  parameters: {
    layout: "padded",
  },
  tags: ["autodocs"],
  argTypes: {
    as: {
      control: "select",
      options: ["p", "span", "div", "label"],
      description: "Render as a different HTML element",
    },
    size: {
      control: "select",
      options: ["xs", "sm", "base", "lg", "xl", "2xl", "3xl", "4xl", "5xl"],
      description: "Text size",
    },
    weight: {
      control: "select",
      options: [
        "thin",
        "light",
        "normal",
        "medium",
        "semibold",
        "bold",
        "extrabold",
        "black",
      ],
      description: "Font weight",
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
    mono: {
      control: "boolean",
      description: "Use monospace font",
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: "Body text",
    size: "base",
  },
};

export const Sizes: Story = {
  render: () => (
    <div className="flex flex-col gap-3">
      <Text size="xs">Extra Small Text (xs)</Text>
      <Text size="sm">Small Text (sm)</Text>
      <Text size="base">Base Text (base)</Text>
      <Text size="lg">Large Text (lg)</Text>
      <Text size="xl">Extra Large Text (xl)</Text>
      <Text size="2xl">2XL Text</Text>
    </div>
  ),
};

export const Weights: Story = {
  render: () => (
    <div className="flex flex-col gap-3">
      <Text weight="light">Light Weight</Text>
      <Text weight="normal">Normal Weight</Text>
      <Text weight="medium">Medium Weight</Text>
      <Text weight="semibold">Semibold Weight</Text>
      <Text weight="bold">Bold Weight</Text>
      <Text weight="extrabold">Extrabold Weight</Text>
    </div>
  ),
};

export const Colors: Story = {
  render: () => (
    <div className="flex flex-col gap-3">
      <Text color="default">Default Color</Text>
      <Text color="secondary">Secondary Color</Text>
      <Text color="muted">Muted Color</Text>
      <Text color="primary">Primary Color</Text>
      <Text color="success">Success Color</Text>
      <Text color="warning">Warning Color</Text>
      <Text color="error">Error Color</Text>
      <Text color="info">Info Color</Text>
    </div>
  ),
};

export const Monospace: Story = {
  render: () => (
    <div className="flex flex-col gap-3">
      <Text>Regular text with sans-serif font</Text>
      <Text mono>Monospace text with JetBrains Mono</Text>
      <Text mono size="sm" color="muted">
        const greeting = &quot;Hello, World!&quot;;
      </Text>
    </div>
  ),
};
