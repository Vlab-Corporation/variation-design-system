import { cn } from "@/utils/cn";

export interface PromptInputContainerStyleProps {
  multiLine?: boolean;
  disabled?: boolean;
  className?: string;
}

export interface PromptInputTextareaStyleProps {
  className?: string;
}

export interface PromptInputSendButtonStyleProps {
  active?: boolean;
  disabled?: boolean;
  className?: string;
}

export function promptInputContainerStyles(
  props: PromptInputContainerStyleProps = {},
): string {
  const { multiLine = false, disabled = false, className } = props;

  return cn(
    "relative flex gap-2 bg-white border border-[#E5E5E5]",
    "shadow-[0_0_20px_1px_rgba(0,0,0,0.07)]",
    "px-6 py-[18px]",
    "transition-[border-radius] duration-200 ease-out",
    multiLine ? "rounded-[20px] items-end" : "rounded-[40px] items-center",
    disabled && "opacity-50 cursor-not-allowed",
    className,
  );
}

export function promptInputTextareaStyles(
  props: PromptInputTextareaStyleProps = {},
): string {
  const { className } = props;

  return cn(
    "flex-1 resize-none bg-transparent",
    "text-[16px] leading-[24px] tracking-[-0.32px] font-sans",
    "text-[#262626] placeholder:text-gray-600",
    "focus:outline-none",
    "overflow-y-auto",
    className,
  );
}

export function promptInputSendButtonStyles(
  props: PromptInputSendButtonStyleProps = {},
): string {
  const { active = false, disabled = false, className } = props;

  return cn(
    "flex-shrink-0 flex items-center justify-center",
    "w-[34px] h-[34px] rounded-full",
    "transition-colors duration-200 ease-out",
    active ? "bg-accent-600 text-white" : "bg-gray-200 text-gray-500",
    disabled && "cursor-not-allowed opacity-50",
    className,
  );
}
