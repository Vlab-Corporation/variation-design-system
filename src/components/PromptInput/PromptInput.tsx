import React, {
  forwardRef,
  useCallback,
  useEffect,
  useRef,
  useState,
  type TextareaHTMLAttributes,
} from "react";
import {
  promptInputContainerStyles,
  promptInputTextareaStyles,
  promptInputSendButtonStyles,
} from "./PromptInput.styles";

export type { PromptInputContainerStyleProps } from "./PromptInput.styles";
export type { PromptInputTextareaStyleProps } from "./PromptInput.styles";
export type { PromptInputSendButtonStyleProps } from "./PromptInput.styles";

export interface PromptInputProps extends Omit<
  TextareaHTMLAttributes<HTMLTextAreaElement>,
  "onSubmit"
> {
  /** Placeholder text */
  placeholder?: string;
  /** Called when user submits (Enter or send button click) */
  onSubmit?: (value: string) => void;
  /** Whether submission is in progress */
  loading?: boolean;
  /** Maximum number of visible rows before scrolling */
  maxRows?: number;
  /** Wrapper className */
  className?: string;
  /** Textarea element className */
  textareaClassName?: string;
}

const SINGLE_LINE_HEIGHT = 24;

export const PromptInput = forwardRef<HTMLTextAreaElement, PromptInputProps>(
  (
    {
      placeholder = "메시지를 입력하세요",
      onSubmit,
      loading = false,
      maxRows = 5,
      className,
      textareaClassName,
      disabled,
      value: controlledValue,
      onChange,
      onKeyDown,
      ...props
    },
    ref,
  ) => {
    const internalRef = useRef<HTMLTextAreaElement>(null);
    const textareaRef =
      (ref as React.RefObject<HTMLTextAreaElement>) || internalRef;
    const [internalValue, setInternalValue] = useState("");

    const isControlled = controlledValue !== undefined;
    const value = isControlled ? String(controlledValue) : internalValue;
    const hasValue = value.trim().length > 0;
    const [multiLine, setMultiLine] = useState(false);

    const adjustHeight = useCallback(() => {
      const textarea = textareaRef.current;
      if (!textarea) return;

      textarea.style.height = "auto";
      const maxHeight = SINGLE_LINE_HEIGHT * maxRows;
      const scrollHeight = textarea.scrollHeight;
      textarea.style.height = `${Math.min(scrollHeight, maxHeight)}px`;

      setMultiLine(scrollHeight > SINGLE_LINE_HEIGHT);
    }, [maxRows, textareaRef]);

    useEffect(() => {
      adjustHeight();
    }, [value, adjustHeight]);

    const resetHeight = useCallback(() => {
      const textarea = textareaRef.current;
      if (!textarea) return;
      textarea.style.height = "auto";
      setMultiLine(false);
    }, [textareaRef]);

    const handleSubmit = useCallback(() => {
      if (!hasValue || loading || disabled) return;
      onSubmit?.(value.trim());
      if (!isControlled) {
        setInternalValue("");
      }
      resetHeight();
    }, [
      hasValue,
      loading,
      disabled,
      onSubmit,
      value,
      isControlled,
      resetHeight,
    ]);

    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      if (!isControlled) {
        setInternalValue(e.target.value);
      }
      onChange?.(e);
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
      if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault();
        handleSubmit();
      }
      onKeyDown?.(e);
    };

    const canSend = hasValue && !loading && !disabled;

    return (
      <div
        className={promptInputContainerStyles({
          multiLine,
          disabled,
          className,
        })}
      >
        <textarea
          ref={textareaRef}
          value={value}
          placeholder={placeholder}
          disabled={disabled}
          rows={1}
          aria-label={props["aria-label"] || "메시지 입력"}
          className={promptInputTextareaStyles({
            className: textareaClassName,
          })}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          {...props}
        />
        <button
          type="button"
          aria-label="전송"
          disabled={!canSend}
          onClick={handleSubmit}
          className={promptInputSendButtonStyles({
            active: hasValue,
            disabled: !canSend,
          })}
        >
          <svg
            width="18"
            height="18"
            viewBox="0 0 18 18"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            <path
              d="M9 15V3M9 3L3 9M9 3L15 9"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </div>
    );
  },
);

PromptInput.displayName = "PromptInput";
