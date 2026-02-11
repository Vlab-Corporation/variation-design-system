import type { Meta, StoryObj } from "@storybook/react";
import { SimpleAccordion } from "@/components/Accordion";

const meta: Meta<typeof SimpleAccordion> = {
  title: "Components/Accordion",
  component: SimpleAccordion,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["default", "bordered", "separated"],
      description: "Visual variant",
    },
    multiple: {
      control: "boolean",
      description: "Allow multiple items open",
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

const defaultItems = [
  {
    value: "item-1",
    trigger: "What is a design system?",
    content:
      "A design system is a collection of reusable components, guided by clear standards, that can be assembled to build any number of applications.",
  },
  {
    value: "item-2",
    trigger: "Why use a design system?",
    content:
      "Design systems help teams build products faster and more consistently by providing shared components and design patterns.",
  },
  {
    value: "item-3",
    trigger: "How do I get started?",
    content:
      "Install the package, import the components you need, and start building. Check the documentation for detailed guides.",
  },
];

// Default variant
export const Default: Story = {
  args: {
    items: defaultItems,
  },
};

// Bordered variant
export const Bordered: Story = {
  args: {
    items: defaultItems,
    variant: "bordered",
  },
};

// Separated variant
export const Separated: Story = {
  args: {
    items: defaultItems,
    variant: "separated",
  },
};

// Multiple items open
export const Multiple: Story = {
  args: {
    items: defaultItems,
    multiple: true,
    defaultValue: ["item-1", "item-2"],
  },
};

// With disabled item
export const WithDisabledItem: Story = {
  args: {
    items: [
      {
        value: "item-1",
        trigger: "Available section",
        content: "This section can be expanded and collapsed.",
      },
      {
        value: "item-2",
        trigger: "Disabled section",
        content: "This content should not be accessible.",
        disabled: true,
      },
      {
        value: "item-3",
        trigger: "Another available section",
        content: "This section is also interactive.",
      },
    ],
  },
};
