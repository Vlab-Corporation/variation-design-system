import type { Meta, StoryObj } from "@storybook/react";
import { Checkbox } from "@/components/Checkbox";

const meta: Meta<typeof Checkbox> = {
  title: "Components/Checkbox",
  component: Checkbox,
  parameters: {
    layout: "padded",
  },
  tags: ["autodocs"],
  argTypes: {
    size: {
      control: "select",
      options: ["sm", "md", "lg"],
      description: "Checkbox size",
    },
    label: {
      control: "text",
      description: "Label text or element",
    },
    description: {
      control: "text",
      description: "Description text shown below label",
    },
    indeterminate: {
      control: "boolean",
      description: "Indeterminate state",
    },
    disabled: {
      control: "boolean",
      description: "Disables the checkbox",
    },
    checked: {
      control: "boolean",
      description: "Checked state",
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// Default
export const Default: Story = {
  args: {},
};

// Checked
export const Checked: Story = {
  args: {
    defaultChecked: true,
  },
};

// Indeterminate
export const Indeterminate: Story = {
  args: {
    indeterminate: true,
  },
};

// With Label
export const WithLabel: Story = {
  args: {
    label: "Accept terms and conditions",
  },
};

// With Description
export const WithDescription: Story = {
  args: {
    label: "Marketing emails",
    description: "Receive emails about new products, features, and more.",
  },
};

// Disabled
export const Disabled: Story = {
  args: {
    label: "Disabled checkbox",
    disabled: true,
  },
};

// All Sizes
export const AllSizes: Story = {
  render: () => (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-4">
        <Checkbox size="sm" label="Small checkbox" defaultChecked />
        <Checkbox size="md" label="Medium checkbox (default)" defaultChecked />
        <Checkbox size="lg" label="Large checkbox" defaultChecked />
      </div>
      <div className="flex flex-col gap-4">
        <Checkbox size="sm" label="Small" description="Small description" />
        <Checkbox size="md" label="Medium" description="Medium description" />
        <Checkbox size="lg" label="Large" description="Large description" />
      </div>
      <div className="flex flex-col gap-4">
        <Checkbox size="sm" indeterminate label="Small indeterminate" />
        <Checkbox size="md" indeterminate label="Medium indeterminate" />
        <Checkbox size="lg" indeterminate label="Large indeterminate" />
      </div>
      <div className="flex flex-col gap-4">
        <Checkbox size="sm" disabled label="Small disabled" />
        <Checkbox size="md" disabled label="Medium disabled" />
        <Checkbox size="lg" disabled label="Large disabled" />
      </div>
    </div>
  ),
};
