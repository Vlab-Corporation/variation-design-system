import type { Meta, StoryObj } from "@storybook/react";
import { Textarea } from "@/components/Textarea";

const meta: Meta<typeof Textarea> = {
  title: "Components/Textarea",
  component: Textarea,
  parameters: {
    layout: "padded",
  },
  tags: ["autodocs"],
  argTypes: {
    size: {
      control: "select",
      options: ["sm", "md", "lg"],
      description: "Textarea size",
    },
    label: {
      control: "text",
      description: "Label text",
    },
    placeholder: {
      control: "text",
      description: "Placeholder text",
    },
    helperText: {
      control: "text",
      description: "Helper text shown below textarea",
    },
    error: {
      control: "text",
      description: "Error message",
    },
    resize: {
      control: "select",
      options: ["none", "vertical", "horizontal", "both"],
      description: "Resize behavior",
    },
    disabled: {
      control: "boolean",
      description: "Disables the textarea",
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// Default
export const Default: Story = {
  args: {
    placeholder: "Type something...",
  },
};

// With Label
export const WithLabel: Story = {
  args: {
    label: "Description",
    placeholder: "Enter a description...",
  },
};

// With Error
export const WithError: Story = {
  args: {
    label: "Bio",
    placeholder: "Tell us about yourself...",
    error: "Bio must be at least 10 characters",
  },
};

// With Helper Text
export const WithHelperText: Story = {
  args: {
    label: "Comments",
    placeholder: "Leave your comments here...",
    helperText: "Maximum 500 characters",
  },
};

// Disabled
export const Disabled: Story = {
  args: {
    label: "Notes",
    placeholder: "This field is disabled",
    disabled: true,
  },
};

// All Sizes
export const AllSizes: Story = {
  render: () => (
    <div className="flex flex-col gap-6 max-w-md">
      <Textarea size="sm" label="Small" placeholder="Small textarea..." />
      <Textarea
        size="md"
        label="Medium (default)"
        placeholder="Medium textarea..."
      />
      <Textarea size="lg" label="Large" placeholder="Large textarea..." />
    </div>
  ),
};

// No Resize
export const NoResize: Story = {
  args: {
    label: "Fixed size textarea",
    placeholder: "This textarea cannot be resized...",
    resize: "none",
  },
};
