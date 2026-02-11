import type { Meta, StoryObj } from "@storybook/react";
import { Stepper } from "@/components/Stepper";

const meta: Meta<typeof Stepper> = {
  title: "Components/Stepper",
  component: Stepper,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    activeStep: {
      control: { type: "number", min: 0 },
      description: "Current active step (0-based)",
    },
    orientation: {
      control: "select",
      options: ["horizontal", "vertical"],
      description: "Stepper orientation",
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

const basicSteps = [
  { label: "Account" },
  { label: "Profile" },
  { label: "Review" },
];

// Default (step 1 active)
export const Default: Story = {
  args: {
    steps: basicSteps,
    activeStep: 1,
  },
};

// Completed (last step reached)
export const Completed: Story = {
  args: {
    steps: basicSteps,
    activeStep: 2,
  },
};

// Vertical orientation
export const Vertical: Story = {
  args: {
    steps: basicSteps,
    activeStep: 1,
    orientation: "vertical",
  },
};

// With descriptions
export const WithDescriptions: Story = {
  args: {
    steps: [
      { label: "Account", description: "Create your account credentials" },
      { label: "Profile", description: "Set up your personal information" },
      { label: "Review", description: "Confirm and submit your details" },
    ],
    activeStep: 1,
  },
};
