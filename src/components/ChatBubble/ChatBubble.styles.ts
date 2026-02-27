import { cn } from "@/utils/cn";

export interface ChatBubbleStyleProps {
  className?: string;
}

export function chatBubbleStyles(props: ChatBubbleStyleProps = {}): string {
  const { className } = props;

  return cn(
    "inline-flex items-center gap-2.5 p-5",
    "bg-gray-100",
    "rounded-tl-chat-bubble rounded-tr-none rounded-br-chat-bubble rounded-bl-chat-bubble",
    "text-body-2 font-normal tracking-tight text-gray-900",
    className,
  );
}
