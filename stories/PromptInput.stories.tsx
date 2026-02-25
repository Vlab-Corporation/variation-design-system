import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { PromptInput } from "@/components/PromptInput";

const meta: Meta<typeof PromptInput> = {
  title: "Components/PromptInput",
  component: PromptInput,
  parameters: {
    layout: "padded",
  },
  tags: ["autodocs"],
  argTypes: {
    placeholder: {
      control: "text",
      description: "Placeholder text",
    },
    loading: {
      control: "boolean",
      description: "Loading state",
    },
    maxRows: {
      control: "number",
      description: "Maximum visible rows before scrolling",
    },
    disabled: {
      control: "boolean",
      description: "Disabled state",
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    placeholder: "메시지를 입력하세요",
  },
};

export const WithCustomPlaceholder: Story = {
  args: {
    placeholder: "Ask me anything...",
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
    placeholder: "입력이 비활성화되었습니다",
  },
};

export const Loading: Story = {
  render: () => {
    const [loading, setLoading] = useState(false);

    const handleSubmit = (value: string) => {
      setLoading(true);
      console.log("Submitted:", value);
      setTimeout(() => setLoading(false), 2000);
    };

    return (
      <div className="max-w-2xl">
        <PromptInput
          onSubmit={handleSubmit}
          loading={loading}
          placeholder="전송 후 2초간 로딩 상태가 됩니다"
        />
      </div>
    );
  },
};

export const AllStates: Story = {
  render: () => {
    const [messages, setMessages] = useState<string[]>([]);

    return (
      <div className="flex flex-col gap-8 max-w-2xl">
        <div>
          <p className="text-sm text-gray-500 mb-2">Default (Unfocused)</p>
          <PromptInput />
        </div>

        <div>
          <p className="text-sm text-gray-500 mb-2">
            Focus 상태 — 클릭하여 확인
          </p>
          <PromptInput placeholder="클릭하면 포커스됩니다" />
        </div>

        <div>
          <p className="text-sm text-gray-500 mb-2">Disabled</p>
          <PromptInput disabled />
        </div>

        <div>
          <p className="text-sm text-gray-500 mb-2">
            Interactive — 메시지를 입력하고 Enter로 전송
          </p>
          <PromptInput
            onSubmit={(value) => setMessages((prev) => [...prev, value])}
          />
          {messages.length > 0 && (
            <div className="mt-4 space-y-2">
              {messages.map((msg, i) => (
                <div
                  key={i}
                  className="bg-gray-100 rounded-lg px-4 py-2 text-sm"
                >
                  {msg}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    );
  },
};
