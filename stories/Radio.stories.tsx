import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Radio, RadioGroup } from "@/components/Radio";

const meta: Meta<typeof Radio> = {
  title: "Components/Radio",
  component: Radio,
  parameters: {
    layout: "padded",
  },
  tags: ["autodocs"],
  argTypes: {
    size: {
      control: "select",
      options: ["sm", "md", "lg"],
      description: "Radio size",
    },
    label: {
      control: "text",
      description: "Label text or element",
    },
    description: {
      control: "text",
      description: "Description text shown below label",
    },
    disabled: {
      control: "boolean",
      description: "Disables the radio",
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// Default
export const Default: Story = {
  args: {
    label: "Option",
    name: "default-radio",
  },
};

// RadioGroup Vertical
export const RadioGroupVertical: Story = {
  render: () => {
    const Component = () => {
      const [value, setValue] = useState("option1");
      return (
        <RadioGroup
          name="vertical-group"
          value={value}
          onChange={setValue}
          orientation="vertical"
          label="Choose an option"
        >
          <Radio value="option1" label="Option 1" />
          <Radio value="option2" label="Option 2" />
          <Radio value="option3" label="Option 3" />
        </RadioGroup>
      );
    };
    return <Component />;
  },
};

// RadioGroup Horizontal
export const RadioGroupHorizontal: Story = {
  render: () => {
    const Component = () => {
      const [value, setValue] = useState("option1");
      return (
        <RadioGroup
          name="horizontal-group"
          value={value}
          onChange={setValue}
          orientation="horizontal"
          label="Choose an option"
        >
          <Radio value="option1" label="Option 1" />
          <Radio value="option2" label="Option 2" />
          <Radio value="option3" label="Option 3" />
        </RadioGroup>
      );
    };
    return <Component />;
  },
};

// With Descriptions
export const WithDescriptions: Story = {
  render: () => {
    const Component = () => {
      const [value, setValue] = useState("startup");
      return (
        <RadioGroup
          name="plan-group"
          value={value}
          onChange={setValue}
          orientation="vertical"
          label="Select a plan"
        >
          <Radio
            value="startup"
            label="Startup"
            description="12GB / 6 CPUs / 160 GB SSD disk"
          />
          <Radio
            value="business"
            label="Business"
            description="16GB / 8 CPUs / 512 GB SSD disk"
          />
          <Radio
            value="enterprise"
            label="Enterprise"
            description="32GB / 12 CPUs / 1024 GB SSD disk"
          />
        </RadioGroup>
      );
    };
    return <Component />;
  },
};

// Disabled
export const Disabled: Story = {
  render: () => {
    const Component = () => {
      const [value, setValue] = useState("option1");
      return (
        <RadioGroup
          name="disabled-group"
          value={value}
          onChange={setValue}
          orientation="vertical"
          disabled
          label="Disabled group"
        >
          <Radio value="option1" label="Option 1" />
          <Radio value="option2" label="Option 2" />
          <Radio value="option3" label="Option 3" />
        </RadioGroup>
      );
    };
    return <Component />;
  },
};

// All Sizes
export const AllSizes: Story = {
  render: () => {
    const Component = () => {
      const [smValue, setSmValue] = useState("a");
      const [mdValue, setMdValue] = useState("a");
      const [lgValue, setLgValue] = useState("a");
      return (
        <div className="flex flex-col gap-8">
          <RadioGroup
            name="sm-group"
            value={smValue}
            onChange={setSmValue}
            size="sm"
            orientation="vertical"
            label="Small"
          >
            <Radio value="a" label="Option A" />
            <Radio value="b" label="Option B" />
          </RadioGroup>
          <RadioGroup
            name="md-group"
            value={mdValue}
            onChange={setMdValue}
            size="md"
            orientation="vertical"
            label="Medium (default)"
          >
            <Radio value="a" label="Option A" />
            <Radio value="b" label="Option B" />
          </RadioGroup>
          <RadioGroup
            name="lg-group"
            value={lgValue}
            onChange={setLgValue}
            size="lg"
            orientation="vertical"
            label="Large"
          >
            <Radio value="a" label="Option A" />
            <Radio value="b" label="Option B" />
          </RadioGroup>
        </div>
      );
    };
    return <Component />;
  },
};
