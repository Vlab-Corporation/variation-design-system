import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { TextField } from "@/components/TextField";

const meta: Meta<typeof TextField> = {
  title: "Components/TextField",
  component: TextField,
  parameters: {
    layout: "padded",
  },
  tags: ["autodocs"],
  argTypes: {
    size: {
      control: "select",
      options: ["sm", "md", "lg"],
      description: "TextField size",
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
      description: "Helper text shown below input",
    },
    error: {
      control: "text",
      description: "Error message",
    },
    clearable: {
      control: "boolean",
      description: "Show clear button when input has value",
    },
    disabled: {
      control: "boolean",
      description: "Disables the input",
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// Default
export const Default: Story = {
  args: {
    placeholder: "이름을 입력해주세요.",
  },
};

// With Label
export const WithLabel: Story = {
  args: {
    label: "이름",
    placeholder: "이름을 입력해주세요.",
  },
};

// With Error
export const WithError: Story = {
  args: {
    label: "이름",
    placeholder: "이름을 입력해주세요.",
    error: "필수 답변입니다.",
  },
};

// With Helper Text
export const WithHelperText: Story = {
  args: {
    label: "이름",
    placeholder: "이름을 입력해주세요.",
    helperText: "실명을 입력해주세요.",
  },
};

// Disabled
export const Disabled: Story = {
  args: {
    label: "이름",
    placeholder: "이름을 입력해주세요.",
    disabled: true,
  },
};

// All Sizes
export const AllSizes: Story = {
  render: () => (
    <div className="flex flex-col gap-6 max-w-md">
      <TextField
        size="sm"
        label="Small"
        placeholder="이름을 입력해주세요."
      />
      <TextField
        size="md"
        label="Medium (default)"
        placeholder="이름을 입력해주세요."
      />
      <TextField
        size="lg"
        label="Large"
        placeholder="이름을 입력해주세요."
      />
    </div>
  ),
};

// All States
export const AllStates: Story = {
  render: () => {
    const ControlledFilled = () => {
      const [value, setValue] = useState("류한희");
      return (
        <TextField
          label="Typing (filled)"
          placeholder="이름을 입력해주세요."
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onClear={() => setValue("")}
        />
      );
    };

    return (
      <div className="flex flex-col gap-6 max-w-[772px]">
        <TextField placeholder="이름을 입력해주세요." />
        <ControlledFilled />
        <TextField
          placeholder="이름을 입력해주세요."
          error="필수 답변입니다."
        />
        <TextField
          placeholder="이름을 입력해주세요."
          disabled
        />
      </div>
    );
  },
};
