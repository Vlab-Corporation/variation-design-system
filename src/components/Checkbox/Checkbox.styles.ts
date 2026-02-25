import { cn } from "@/utils/cn";

export interface CheckboxStyleProps {
  disabled?: boolean;
  className?: string;
}

export function checkboxWrapperStyles(props: CheckboxStyleProps = {}): string {
  const { disabled = false, className } = props;

  return cn(
    "inline-flex flex-col gap-2",
    disabled ? "cursor-not-allowed" : "cursor-pointer",
    className,
  );
}

export interface CheckboxRowStyleProps {
  disabled?: boolean;
  className?: string;
}

export function checkboxRowStyles(props: CheckboxRowStyleProps = {}): string {
  const { disabled = false, className } = props;

  return cn(
    "inline-flex items-center gap-1.5",
    disabled ? "cursor-not-allowed" : "cursor-pointer",
    className,
  );
}

export interface CheckboxIndicatorStyleProps {
  checked?: boolean;
  indeterminate?: boolean;
  disabled?: boolean;
  className?: string;
}

export function checkboxIndicatorStyles(
  props: CheckboxIndicatorStyleProps = {},
): string {
  const {
    checked = false,
    indeterminate = false,
    disabled = false,
    className,
  } = props;

  const isActive = checked || indeterminate;

  return cn(
    "size-6 shrink-0 flex items-center justify-center rounded-full",
    "transition-colors duration-200",
    isActive ? "bg-accent-600" : "border border-gray-400",
    "peer-focus-visible:ring-2 peer-focus-visible:ring-accent-600/20 peer-focus-visible:ring-offset-1",
    disabled && "opacity-50",
    className,
  );
}

export function checkboxLabelStyles(props: CheckboxStyleProps = {}): string {
  const { disabled = false, className } = props;

  return cn(
    "text-base font-medium leading-6 tracking-tight text-gray-900 select-none",
    disabled && "opacity-50",
    className,
  );
}

export interface CheckboxTextFieldStyleProps {
  error?: boolean;
  className?: string;
}

export function checkboxTextFieldStyles(
  props: CheckboxTextFieldStyleProps = {},
): string {
  const { error = false, className } = props;

  return cn(
    "w-full text-base font-medium leading-6 tracking-tight",
    "border-0 border-b bg-transparent outline-none pb-2",
    "transition-colors duration-200",
    error
      ? "border-b-error-600 text-error-600 placeholder:text-error-600"
      : "border-b-accent-600 text-gray-900 placeholder:text-gray-500",
    className,
  );
}
