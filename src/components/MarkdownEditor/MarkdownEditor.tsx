import React, {
  forwardRef,
  useState,
  type TextareaHTMLAttributes,
  type HTMLAttributes,
  type KeyboardEvent,
} from "react";
import { cn } from "@/utils/cn";

/* Format types */
export type MarkdownFormat =
  | "bold"
  | "italic"
  | "strikethrough"
  | "code"
  | "link"
  | "heading"
  | "list"
  | "quote";

/* Icons */
const BoldIcon = ({ className }: { className?: string }) => (
  <svg
    className={cn("h-4 w-4", className)}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
  >
    <path d="M6 4h8a4 4 0 0 1 4 4 4 4 0 0 1-4 4H6z" />
    <path d="M6 12h9a4 4 0 0 1 4 4 4 4 0 0 1-4 4H6z" />
  </svg>
);

const ItalicIcon = ({ className }: { className?: string }) => (
  <svg
    className={cn("h-4 w-4", className)}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
  >
    <line x1="19" y1="4" x2="10" y2="4" />
    <line x1="14" y1="20" x2="5" y2="20" />
    <line x1="15" y1="4" x2="9" y2="20" />
  </svg>
);

const CodeIcon = ({ className }: { className?: string }) => (
  <svg
    className={cn("h-4 w-4", className)}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
  >
    <polyline points="16 18 22 12 16 6" />
    <polyline points="8 6 2 12 8 18" />
  </svg>
);

const LinkIcon = ({ className }: { className?: string }) => (
  <svg
    className={cn("h-4 w-4", className)}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
  >
    <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
    <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
  </svg>
);

const ListIcon = ({ className }: { className?: string }) => (
  <svg
    className={cn("h-4 w-4", className)}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
  >
    <line x1="8" y1="6" x2="21" y2="6" />
    <line x1="8" y1="12" x2="21" y2="12" />
    <line x1="8" y1="18" x2="21" y2="18" />
    <line x1="3" y1="6" x2="3.01" y2="6" />
    <line x1="3" y1="12" x2="3.01" y2="12" />
    <line x1="3" y1="18" x2="3.01" y2="18" />
  </svg>
);

/* MarkdownEditor */
export interface MarkdownEditorProps extends Omit<
  TextareaHTMLAttributes<HTMLTextAreaElement>,
  "onChange"
> {
  value?: string;
  onChange?: (value: string) => void;
}

export const MarkdownEditor = forwardRef<
  HTMLTextAreaElement,
  MarkdownEditorProps
>(({ value, onChange, className, ...props }, ref) => {
  const [internalValue, setInternalValue] = useState(value ?? "");
  const effectiveValue = value ?? internalValue;

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newValue = e.target.value;
    setInternalValue(newValue);
    onChange?.(newValue);
  };

  return (
    <textarea
      ref={ref}
      value={effectiveValue}
      onChange={handleChange}
      className={cn(
        "w-full min-h-[200px] p-3 text-sm font-mono",
        "border border-gray-200 rounded-lg resize-y",
        "focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent",
        className,
      )}
      {...props}
    />
  );
});

MarkdownEditor.displayName = "MarkdownEditor";

/* MarkdownToolbar */
export interface MarkdownToolbarProps extends HTMLAttributes<HTMLDivElement> {
  onFormat: (format: MarkdownFormat) => void;
}

export const MarkdownToolbar = forwardRef<HTMLDivElement, MarkdownToolbarProps>(
  ({ onFormat, className, ...props }, ref) => {
    const formats: {
      format: MarkdownFormat;
      icon: React.FC<{ className?: string }>;
      label: string;
    }[] = [
      { format: "bold", icon: BoldIcon, label: "Bold" },
      { format: "italic", icon: ItalicIcon, label: "Italic" },
      { format: "code", icon: CodeIcon, label: "Code" },
      { format: "link", icon: LinkIcon, label: "Link" },
      { format: "list", icon: ListIcon, label: "List" },
    ];

    return (
      <div
        ref={ref}
        className={cn(
          "flex items-center gap-1 p-1 border border-gray-200 rounded-lg bg-gray-50",
          className,
        )}
        {...props}
      >
        {formats.map(({ format, icon: Icon, label }) => (
          <MarkdownFormatButton
            key={format}
            format={format}
            onClick={() => onFormat(format)}
            aria-label={label}
          >
            <Icon />
          </MarkdownFormatButton>
        ))}
      </div>
    );
  },
);

MarkdownToolbar.displayName = "MarkdownToolbar";

/* MarkdownFormatButton */
export interface MarkdownFormatButtonProps extends HTMLAttributes<HTMLButtonElement> {
  format: MarkdownFormat;
  children?: React.ReactNode;
}

export const MarkdownFormatButton = forwardRef<
  HTMLButtonElement,
  MarkdownFormatButtonProps
>(({ format, className, onClick, children, ...props }, ref) => {
  const handleKeyDown = (e: KeyboardEvent<HTMLButtonElement>) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      onClick?.(e as unknown as React.MouseEvent<HTMLButtonElement>);
    }
  };

  return (
    <button
      ref={ref}
      type="button"
      onClick={onClick}
      onKeyDown={handleKeyDown}
      className={cn(
        "flex items-center justify-center w-8 h-8 rounded",
        "hover:bg-gray-200 transition-colors",
        "focus:outline-none focus:ring-2 focus:ring-primary-500",
        className,
      )}
      {...props}
    >
      {children || format.charAt(0).toUpperCase()}
    </button>
  );
});

MarkdownFormatButton.displayName = "MarkdownFormatButton";

/* MarkdownPreview */
export interface MarkdownPreviewProps extends HTMLAttributes<HTMLDivElement> {
  content: string;
}

export const MarkdownPreview = forwardRef<HTMLDivElement, MarkdownPreviewProps>(
  ({ content, className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "prose prose-sm max-w-none",
          "p-4 border border-gray-200 rounded-lg bg-white",
          className,
        )}
        {...props}
      >
        {/* In a real implementation, this would parse and render markdown */}
        <div className="whitespace-pre-wrap">{content}</div>
      </div>
    );
  },
);

MarkdownPreview.displayName = "MarkdownPreview";
