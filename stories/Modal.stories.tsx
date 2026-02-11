import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Modal } from "@/components/Modal";
import { Button } from "@/components/Button";

const meta: Meta<typeof Modal> = {
  title: "Components/Modal",
  component: Modal,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    size: {
      control: "select",
      options: ["sm", "md", "lg", "xl", "full"],
      description: "Modal size",
    },
    title: {
      control: "text",
      description: "Modal title",
    },
    closeOnOverlayClick: {
      control: "boolean",
      description: "Close on overlay click",
    },
    closeOnEscape: {
      control: "boolean",
      description: "Close on Escape key",
    },
    showCloseButton: {
      control: "boolean",
      description: "Show close button",
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// Default
export const Default: Story = {
  render: () => {
    const Component = () => {
      const [open, setOpen] = useState(false);
      return (
        <>
          <Button onClick={() => setOpen(true)}>Open Modal</Button>
          <Modal
            open={open}
            onClose={() => setOpen(false)}
            title="Default Modal"
          >
            <p className="text-gray-600">
              This is a default modal with a title and close button. Click the
              overlay or press Escape to close.
            </p>
          </Modal>
        </>
      );
    };
    return <Component />;
  },
};

// With Footer
export const WithFooter: Story = {
  render: () => {
    const Component = () => {
      const [open, setOpen] = useState(false);
      return (
        <>
          <Button onClick={() => setOpen(true)}>Open Modal with Footer</Button>
          <Modal
            open={open}
            onClose={() => setOpen(false)}
            title="Confirm Action"
            footer={
              <div className="flex justify-end gap-3">
                <Button variant="outline" onClick={() => setOpen(false)}>
                  Cancel
                </Button>
                <Button variant="primary" onClick={() => setOpen(false)}>
                  Confirm
                </Button>
              </div>
            }
          >
            <p className="text-gray-600">
              Are you sure you want to proceed with this action? This cannot be
              undone.
            </p>
          </Modal>
        </>
      );
    };
    return <Component />;
  },
};

// Small
export const Small: Story = {
  render: () => {
    const Component = () => {
      const [open, setOpen] = useState(false);
      return (
        <>
          <Button onClick={() => setOpen(true)}>Open Small Modal</Button>
          <Modal
            open={open}
            onClose={() => setOpen(false)}
            title="Small Modal"
            size="sm"
          >
            <p className="text-gray-600">
              This is a small-sized modal, suitable for simple confirmations or
              short messages.
            </p>
          </Modal>
        </>
      );
    };
    return <Component />;
  },
};

// Large
export const Large: Story = {
  render: () => {
    const Component = () => {
      const [open, setOpen] = useState(false);
      return (
        <>
          <Button onClick={() => setOpen(true)}>Open Large Modal</Button>
          <Modal
            open={open}
            onClose={() => setOpen(false)}
            title="Large Modal"
            size="lg"
          >
            <div className="space-y-4 text-gray-600">
              <p>
                This is a large modal that provides more space for content. It
                is suitable for forms, detailed information, or complex
                interactions.
              </p>
              <p>
                You can include multiple paragraphs, lists, form fields, and
                other content within the modal body.
              </p>
              <ul className="list-disc pl-5 space-y-1">
                <li>Feature one description</li>
                <li>Feature two description</li>
                <li>Feature three description</li>
              </ul>
            </div>
          </Modal>
        </>
      );
    };
    return <Component />;
  },
};

// No Close Button
export const NoCloseButton: Story = {
  render: () => {
    const Component = () => {
      const [open, setOpen] = useState(false);
      return (
        <>
          <Button onClick={() => setOpen(true)}>
            Open Modal without Close Button
          </Button>
          <Modal
            open={open}
            onClose={() => setOpen(false)}
            title="No Close Button"
            showCloseButton={false}
            footer={
              <div className="flex justify-end">
                <Button variant="primary" onClick={() => setOpen(false)}>
                  Acknowledge
                </Button>
              </div>
            }
          >
            <p className="text-gray-600">
              This modal does not show the close button in the header. Users
              must use the footer action or press Escape to close it.
            </p>
          </Modal>
        </>
      );
    };
    return <Component />;
  },
};
