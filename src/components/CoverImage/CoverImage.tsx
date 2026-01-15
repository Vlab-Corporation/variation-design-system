import {
  forwardRef,
  type HTMLAttributes,
  type ChangeEvent,
  type ReactNode,
} from "react";
import { cn } from "@/utils/cn";

/* CoverImage Root */
type CoverImageHeight = "sm" | "md" | "lg";

const heightStyles: Record<CoverImageHeight, string> = {
  sm: "h-32",
  md: "h-48",
  lg: "h-64",
};

export interface CoverImageProps extends HTMLAttributes<HTMLDivElement> {
  height?: CoverImageHeight;
  children?: ReactNode;
}

export const CoverImage = forwardRef<HTMLDivElement, CoverImageProps>(
  ({ height = "md", className, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "relative w-full overflow-hidden group",
          heightStyles[height],
          className,
        )}
        {...props}
      >
        {children}
      </div>
    );
  },
);

CoverImage.displayName = "CoverImage";

/* CoverImagePreview */
export interface CoverImagePreviewProps extends HTMLAttributes<HTMLDivElement> {
  src?: string;
  alt?: string;
  color?: string;
  overlay?: "none" | "gradient" | "dark";
  position?: string;
}

export const CoverImagePreview = forwardRef<
  HTMLDivElement,
  CoverImagePreviewProps
>(
  (
    {
      src,
      alt = "Cover image",
      color,
      overlay = "none",
      position = "center",
      className,
      ...props
    },
    ref,
  ) => {
    const overlayStyles: Record<string, string> = {
      none: "",
      gradient:
        "after:absolute after:inset-0 after:bg-gradient-to-t after:from-black/30 after:to-transparent",
      dark: "after:absolute after:inset-0 after:bg-black/20",
    };

    if (color && !src) {
      return (
        <div
          ref={ref}
          className={cn("w-full h-full", overlayStyles[overlay], className)}
          style={{ backgroundColor: color }}
          {...props}
        />
      );
    }

    return (
      <div
        ref={ref}
        className={cn(
          "relative w-full h-full",
          overlayStyles[overlay],
          className,
        )}
        {...props}
      >
        {src && (
          <img
            src={src}
            alt={alt}
            className="w-full h-full object-cover"
            style={{ objectPosition: position }}
          />
        )}
      </div>
    );
  },
);

CoverImagePreview.displayName = "CoverImagePreview";

/* Upload Icon */
const UploadIcon = ({ className }: { className?: string }) => (
  <svg
    className={cn("h-5 w-5", className)}
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
    <polyline points="17 8 12 3 7 8" />
    <line x1="12" y1="3" x2="12" y2="15" />
  </svg>
);

/* CoverImageUploader */
export interface CoverImageUploaderProps extends HTMLAttributes<HTMLDivElement> {
  onUpload: (file: File) => void;
  accept?: string;
}

export const CoverImageUploader = forwardRef<
  HTMLDivElement,
  CoverImageUploaderProps
>(({ onUpload, accept = "image/*", className, ...props }, ref) => {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      onUpload(file);
    }
  };

  return (
    <div
      ref={ref}
      className={cn(
        "flex flex-col items-center justify-center w-full h-full",
        "bg-gray-100 border-2 border-dashed border-gray-300",
        "hover:bg-gray-50 hover:border-gray-400 transition-colors cursor-pointer",
        className,
      )}
      {...props}
    >
      <label className="flex flex-col items-center justify-center cursor-pointer">
        <input
          type="file"
          accept={accept}
          onChange={handleChange}
          className="sr-only"
        />
        <button
          type="button"
          className="flex flex-col items-center gap-2 text-gray-500 hover:text-gray-700"
          onClick={() => {
            const input = document.querySelector(
              'input[type="file"]',
            ) as HTMLInputElement;
            input?.click();
          }}
        >
          <UploadIcon />
          <span className="text-sm font-medium">Add cover</span>
        </button>
      </label>
    </div>
  );
});

CoverImageUploader.displayName = "CoverImageUploader";

/* CoverImageActions */
export interface CoverImageActionsProps extends HTMLAttributes<HTMLDivElement> {
  onReposition?: () => void;
  onRemove?: () => void;
}

export const CoverImageActions = forwardRef<
  HTMLDivElement,
  CoverImageActionsProps
>(({ onReposition, onRemove, className, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cn(
        "absolute bottom-2 right-2 flex gap-1",
        "opacity-0 group-hover:opacity-100 transition-opacity",
        className,
      )}
      {...props}
    >
      {onReposition && (
        <button
          type="button"
          onClick={onReposition}
          className={cn(
            "px-2 py-1 text-xs font-medium text-white bg-black/50 rounded",
            "hover:bg-black/70 transition-colors",
          )}
        >
          Reposition
        </button>
      )}
      {onRemove && (
        <button
          type="button"
          onClick={onRemove}
          className={cn(
            "px-2 py-1 text-xs font-medium text-white bg-black/50 rounded",
            "hover:bg-black/70 transition-colors",
          )}
        >
          Remove
        </button>
      )}
    </div>
  );
});

CoverImageActions.displayName = "CoverImageActions";
