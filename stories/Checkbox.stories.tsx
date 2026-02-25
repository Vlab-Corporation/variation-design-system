import { useState } from "react";
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
    label: {
      control: "text",
      description: "Label text or element",
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
    withTextField: {
      control: "boolean",
      description: "Show text field when checked",
    },
    textFieldPlaceholder: {
      control: "text",
      description: "Text field placeholder",
    },
    textFieldError: {
      control: "boolean",
      description: "Text field error state",
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// Default (unchecked)
export const Default: Story = {
  args: {
    label: "Label",
  },
};

// Checked (active)
export const Checked: Story = {
  args: {
    label: "Label",
    defaultChecked: true,
  },
};

// Indeterminate
export const Indeterminate: Story = {
  args: {
    label: "Label",
    indeterminate: true,
  },
};

// Disabled
export const Disabled: Story = {
  args: {
    label: "Label",
    disabled: true,
  },
};

// With TextField
const WithTextFieldTemplate = () => {
  const [value, setValue] = useState("");

  return (
    <Checkbox
      label="기타"
      defaultChecked
      withTextField
      textFieldValue={value}
      onTextFieldChange={(e) => setValue(e.target.value)}
      textFieldPlaceholder="기타 내용을 입력해주세요."
    />
  );
};

export const WithTextField: Story = {
  render: () => <WithTextFieldTemplate />,
};

// With TextField Error
export const WithTextFieldError: Story = {
  args: {
    label: "기타",
    checked: true,
    onChange: () => {},
    withTextField: true,
    textFieldPlaceholder: "기타 내용을 입력해주세요.",
    textFieldError: true,
  },
};

// All States
export const AllStates: Story = {
  render: () => (
    <div className="flex flex-col gap-6">
      <div className="flex items-center gap-8">
        <Checkbox label="Label" />
        <Checkbox label="Label" defaultChecked />
      </div>
      <Checkbox
        label="기타"
        defaultChecked
        withTextField
        textFieldPlaceholder="기타 내용을 입력해주세요."
      />
      <Checkbox
        label="기타"
        checked
        onChange={() => {}}
        withTextField
        textFieldValue="기타 내용을 입력함"
        textFieldPlaceholder="기타 내용을 입력해주세요."
      />
      <Checkbox
        label="기타"
        checked
        onChange={() => {}}
        withTextField
        textFieldPlaceholder="기타 내용을 입력해주세요."
        textFieldError
      />
    </div>
  ),
};
