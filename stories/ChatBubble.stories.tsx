import type { Meta, StoryObj } from "@storybook/react";
import { ChatBubble } from "@/components/ChatBubble";

const meta: Meta<typeof ChatBubble> = {
  title: "Components/ChatBubble",
  component: ChatBubble,
  parameters: {
    layout: "padded",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: "베리에이션 기초 설문지 작성을 완료하였습니다.",
  },
};

export const ShortMessage: Story = {
  args: {
    children: "안녕하세요!",
  },
};

export const LongMessage: Story = {
  args: {
    children:
      "이것은 긴 메시지를 테스트하기 위한 예시입니다. 채팅 버블은 내용에 맞게 자동으로 크기가 조정됩니다.",
  },
};

export const MultipleMessages: Story = {
  render: () => (
    <div className="flex flex-col items-end gap-3 max-w-md">
      <ChatBubble>안녕하세요!</ChatBubble>
      <ChatBubble>베리에이션 기초 설문지 작성을 완료하였습니다.</ChatBubble>
      <ChatBubble>확인 부탁드립니다.</ChatBubble>
    </div>
  ),
};
