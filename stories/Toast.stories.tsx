import type { Meta, StoryObj } from "@storybook/react";
import { ToastProvider, useToast } from "@/components/Toast";
import { Button } from "@/components/Button";

const meta: Meta = {
  title: "Components/Toast",
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <ToastProvider position="top-right">
        <Story />
      </ToastProvider>
    ),
  ],
};

export default meta;
type Story = StoryObj;

function ToastTriggers() {
  const { addToast } = useToast();

  return (
    <div className="flex flex-wrap gap-4">
      <Button
        variant="primary"
        onClick={() =>
          addToast({
            variant: "success",
            title: "Success",
            message: "Your changes have been saved successfully.",
          })
        }
      >
        Show Success
      </Button>
      <Button
        variant="outline"
        onClick={() =>
          addToast({
            variant: "error",
            title: "Error",
            message: "Something went wrong. Please try again.",
          })
        }
      >
        Show Error
      </Button>
      <Button
        variant="outline"
        onClick={() =>
          addToast({
            variant: "warning",
            title: "Warning",
            message: "Your session is about to expire.",
          })
        }
      >
        Show Warning
      </Button>
      <Button
        variant="secondary"
        onClick={() =>
          addToast({
            variant: "info",
            title: "Info",
            message: "A new version is available for download.",
          })
        }
      >
        Show Info
      </Button>
    </div>
  );
}

function ToastTriggersNoTitle() {
  const { addToast } = useToast();

  return (
    <div className="flex flex-wrap gap-4">
      <Button
        variant="primary"
        onClick={() =>
          addToast({
            variant: "success",
            message: "File uploaded successfully.",
          })
        }
      >
        Success (no title)
      </Button>
      <Button
        variant="outline"
        onClick={() =>
          addToast({
            variant: "error",
            message: "Failed to delete the file.",
          })
        }
      >
        Error (no title)
      </Button>
    </div>
  );
}

function ToastTriggersCustomDuration() {
  const { addToast } = useToast();

  return (
    <div className="flex flex-wrap gap-4">
      <Button
        variant="secondary"
        onClick={() =>
          addToast({
            variant: "info",
            title: "Quick toast",
            message: "This disappears in 2 seconds.",
            duration: 2000,
          })
        }
      >
        2s Duration
      </Button>
      <Button
        variant="secondary"
        onClick={() =>
          addToast({
            variant: "warning",
            title: "Persistent toast",
            message: "This toast will not auto-dismiss. Close it manually.",
            duration: 0,
          })
        }
      >
        Persistent
      </Button>
    </div>
  );
}

// All Variants
export const AllVariants: Story = {
  render: () => <ToastTriggers />,
};

// Without Title
export const WithoutTitle: Story = {
  render: () => <ToastTriggersNoTitle />,
};

// Custom Duration
export const CustomDuration: Story = {
  render: () => <ToastTriggersCustomDuration />,
};
