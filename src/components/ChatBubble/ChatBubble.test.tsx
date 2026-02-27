import { describe, it, expect } from "vitest";
import { createRef } from "react";
import { render, screen } from "@testing-library/react";
import { ChatBubble } from "./ChatBubble";
import { chatBubbleStyles } from "./ChatBubble.styles";

describe("ChatBubble", () => {
  describe("Rendering", () => {
    it("renders children correctly", () => {
      render(<ChatBubble>Hello</ChatBubble>);
      expect(screen.getByText("Hello")).toBeInTheDocument();
    });

    it("renders complex children", () => {
      render(
        <ChatBubble>
          <span>Complex</span> content
        </ChatBubble>,
      );
      expect(screen.getByText("Complex")).toBeInTheDocument();
    });
  });

  describe("Styling", () => {
    it("applies default styles", () => {
      render(<ChatBubble>Test</ChatBubble>);
      const bubble = screen.getByText("Test").closest("div")!;
      const expectedClasses = chatBubbleStyles().split(" ");

      for (const cls of expectedClasses) {
        expect(bubble).toHaveClass(cls);
      }
    });

    it("includes background color class", () => {
      render(<ChatBubble>Test</ChatBubble>);
      const bubble = screen.getByText("Test").closest("div")!;
      expect(bubble).toHaveClass("bg-gray-100");
    });

    it("includes border-radius classes", () => {
      render(<ChatBubble>Test</ChatBubble>);
      const bubble = screen.getByText("Test").closest("div")!;
      expect(bubble).toHaveClass("rounded-tl-chat-bubble");
      expect(bubble).toHaveClass("rounded-tr-none");
      expect(bubble).toHaveClass("rounded-br-chat-bubble");
      expect(bubble).toHaveClass("rounded-bl-chat-bubble");
    });

    it("includes padding class", () => {
      render(<ChatBubble>Test</ChatBubble>);
      const bubble = screen.getByText("Test").closest("div")!;
      expect(bubble).toHaveClass("p-5");
    });

    it("includes typography classes", () => {
      render(<ChatBubble>Test</ChatBubble>);
      const bubble = screen.getByText("Test").closest("div")!;
      expect(bubble).toHaveClass("text-body-2");
      expect(bubble).toHaveClass("font-normal");
      expect(bubble).toHaveClass("tracking-tight");
      expect(bubble).toHaveClass("text-gray-900");
    });
  });

  describe("HTML Attributes", () => {
    it("merges custom className", () => {
      render(<ChatBubble className="custom-class">Test</ChatBubble>);
      const bubble = screen.getByText("Test").closest("div")!;
      expect(bubble).toHaveClass("custom-class");
      expect(bubble).toHaveClass("bg-gray-100");
    });

    it("passes data attributes", () => {
      render(<ChatBubble data-testid="chat">Test</ChatBubble>);
      expect(screen.getByTestId("chat")).toBeInTheDocument();
    });

    it("forwards ref", () => {
      const ref = createRef<HTMLDivElement>();
      render(<ChatBubble ref={ref}>Test</ChatBubble>);
      expect(ref.current).toBeInstanceOf(HTMLDivElement);
    });

    it("passes aria attributes", () => {
      render(<ChatBubble aria-label="chat message">Test</ChatBubble>);
      expect(screen.getByLabelText("chat message")).toBeInTheDocument();
    });
  });
});
