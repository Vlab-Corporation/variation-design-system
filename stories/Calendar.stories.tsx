import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Calendar } from "@/components/Calendar";

const meta: Meta<typeof Calendar> = {
  title: "Components/Calendar",
  component: Calendar,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    locale: {
      control: "text",
      description: "Locale for month/day names",
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// Default (uncontrolled)
export const Default: Story = {};

// With default value
export const WithDefaultValue: Story = {
  args: {
    defaultValue: new Date(2025, 0, 15),
  },
};

// Controlled with state
export const Controlled: Story = {
  render: (args) => {
    const Component = () => {
      const [date, setDate] = useState<Date | null>(new Date());
      return (
        <div className="flex flex-col items-center gap-4">
          <Calendar {...args} value={date} onChange={setDate} />
          <p className="text-sm text-gray-600">
            Selected: {date ? date.toLocaleDateString() : "None"}
          </p>
        </div>
      );
    };
    return <Component />;
  },
};
