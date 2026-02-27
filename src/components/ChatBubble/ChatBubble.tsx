import React, { forwardRef, type HTMLAttributes } from "react";
import { chatBubbleStyles } from "./ChatBubble.styles";

export interface ChatBubbleProps extends HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export const ChatBubble = forwardRef<HTMLDivElement, ChatBubbleProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <div ref={ref} className={chatBubbleStyles({ className })} {...props}>
        {children}
      </div>
    );
  },
);

ChatBubble.displayName = "ChatBubble";
