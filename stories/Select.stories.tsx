import type { Meta, StoryObj } from "@storybook/react";
import { Select } from "@/components/Select";

const sampleOptions = [
  { value: "apple", label: "Apple" },
  { value: "banana", label: "Banana" },
  { value: "cherry", label: "Cherry" },
  { value: "dragonfruit", label: "Dragon Fruit" },
  { value: "elderberry", label: "Elderberry" },
];

const meta: Meta<typeof Select> = {
  title: "Components/Select",
  component: Select,
  parameters: {
    layout: "padded",
  },
  tags: ["autodocs"],
  argTypes: {
    size: {
      control: "select",
      options: ["sm", "md", "lg"],
      description: "Select size",
    },
    label: {
      control: "text",
      description: "Label text",
    },
    placeholder: {
      control: "text",
      description: "Placeholder option text",
    },
    helperText: {
      control: "text",
      description: "Helper text shown below select",
    },
    error: {
      control: "text",
      description: "Error message",
    },
    disabled: {
      control: "boolean",
      description: "Disables the select",
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// Default
export const Default: Story = {
  args: {
    options: sampleOptions,
  },
};

// With Label
export const WithLabel: Story = {
  args: {
    label: "Favorite Fruit",
    options: sampleOptions,
  },
};

// With Placeholder
export const WithPlaceholder: Story = {
  args: {
    label: "Favorite Fruit",
    placeholder: "Select a fruit...",
    options: sampleOptions,
    defaultValue: "",
  },
};

// With Error
export const WithError: Story = {
  args: {
    label: "Favorite Fruit",
    placeholder: "Select a fruit...",
    options: sampleOptions,
    error: "Please select a fruit",
    defaultValue: "",
  },
};

// With Helper Text
export const WithHelperText: Story = {
  args: {
    label: "Favorite Fruit",
    options: sampleOptions,
    helperText: "Choose the fruit you like the most",
  },
};

// Disabled
export const Disabled: Story = {
  args: {
    label: "Favorite Fruit",
    options: sampleOptions,
    disabled: true,
  },
};

// All Sizes
export const AllSizes: Story = {
  render: () => (
    <div className="flex flex-col gap-6 max-w-sm">
      <Select
        size="sm"
        label="Small"
        placeholder="Select an option..."
        options={sampleOptions}
      />
      <Select
        size="md"
        label="Medium (default)"
        placeholder="Select an option..."
        options={sampleOptions}
      />
      <Select
        size="lg"
        label="Large"
        placeholder="Select an option..."
        options={sampleOptions}
      />
    </div>
  ),
};
