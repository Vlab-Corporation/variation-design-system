import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Switch } from "@/components/Switch";

const meta: Meta<typeof Switch> = {
  title: "Components/Switch",
  component: Switch,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    size: {
      control: "select",
      options: ["sm", "md", "lg"],
      description: "Switch size",
    },
    label: {
      control: "text",
      description: "Label text or element",
    },
    description: {
      control: "text",
      description: "Description text",
    },
    checked: {
      control: "boolean",
      description: "Whether the switch is on",
    },
    disabled: {
      control: "boolean",
      description: "Disables the switch",
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// Default
export const Default: Story = {
  render: () => {
    const Component = () => {
      const [checked, setChecked] = useState(false);
      return <Switch checked={checked} onChange={setChecked} />;
    };
    return <Component />;
  },
};

// Checked
export const Checked: Story = {
  render: () => {
    const Component = () => {
      const [checked, setChecked] = useState(true);
      return <Switch checked={checked} onChange={setChecked} />;
    };
    return <Component />;
  },
};

// With Label
export const WithLabel: Story = {
  render: () => {
    const Component = () => {
      const [checked, setChecked] = useState(false);
      return (
        <Switch
          checked={checked}
          onChange={setChecked}
          label="Enable notifications"
        />
      );
    };
    return <Component />;
  },
};

// With Description
export const WithDescription: Story = {
  render: () => {
    const Component = () => {
      const [checked, setChecked] = useState(false);
      return (
        <Switch
          checked={checked}
          onChange={setChecked}
          label="Airplane Mode"
          description="Disable all wireless connections"
        />
      );
    };
    return <Component />;
  },
};

// Disabled
export const Disabled: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <Switch disabled label="Disabled off" />
      <Switch checked disabled label="Disabled on" />
    </div>
  ),
};

// All Sizes
export const AllSizes: Story = {
  render: () => {
    const Component = () => {
      const [sm, setSm] = useState(true);
      const [md, setMd] = useState(true);
      const [lg, setLg] = useState(true);
      return (
        <div className="flex flex-col gap-6">
          <Switch
            size="sm"
            checked={sm}
            onChange={setSm}
            label="Small"
            description="Small switch"
          />
          <Switch
            size="md"
            checked={md}
            onChange={setMd}
            label="Medium (default)"
            description="Medium switch"
          />
          <Switch
            size="lg"
            checked={lg}
            onChange={setLg}
            label="Large"
            description="Large switch"
          />
        </div>
      );
    };
    return <Component />;
  },
};
