import { forwardRef, type HTMLAttributes } from "react";
import { cn } from "@/utils/cn";
import {
  syncStatusIndicatorStyles,
  syncStatusTextForState,
  type SyncState,
} from "./SyncStatus.styles";

export type { SyncState } from "./SyncStatus.styles";

/* SyncStatus */
export interface SyncStatusProps extends HTMLAttributes<HTMLDivElement> {
  status: SyncState;
  showText?: boolean;
}

export const SyncStatus = forwardRef<HTMLDivElement, SyncStatusProps>(
  ({ status, showText = true, className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        aria-live="polite"
        className={cn("flex items-center gap-2", className)}
        {...props}
      >
        <SyncStatusIndicator status={status} />
        {showText && <SyncStatusText status={status} />}
      </div>
    );
  },
);

SyncStatus.displayName = "SyncStatus";

/* SyncStatusIndicator */
export interface SyncStatusIndicatorProps extends HTMLAttributes<HTMLSpanElement> {
  status: SyncState;
}

export const SyncStatusIndicator = forwardRef<
  HTMLSpanElement,
  SyncStatusIndicatorProps
>(({ status, className, ...props }, ref) => {
  return (
    <span
      ref={ref}
      className={syncStatusIndicatorStyles(status, className)}
      {...props}
    />
  );
});

SyncStatusIndicator.displayName = "SyncStatusIndicator";

/* SyncStatusText */
export interface SyncStatusTextProps extends HTMLAttributes<HTMLSpanElement> {
  status: SyncState;
  text?: string;
}

export const SyncStatusText = forwardRef<HTMLSpanElement, SyncStatusTextProps>(
  ({ status, text, className, ...props }, ref) => {
    const displayText = text ?? syncStatusTextForState(status);

    return (
      <span
        ref={ref}
        className={cn("text-xs text-gray-500", className)}
        {...props}
      >
        {displayText}
      </span>
    );
  },
);

SyncStatusText.displayName = "SyncStatusText";

/* AutoSaveIndicator */
export interface AutoSaveIndicatorProps extends HTMLAttributes<HTMLDivElement> {
  enabled: boolean;
  lastSaved?: Date;
}

export const AutoSaveIndicator = forwardRef<
  HTMLDivElement,
  AutoSaveIndicatorProps
>(({ enabled, lastSaved, className, ...props }, ref) => {
  const formatTime = (date: Date) => {
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const seconds = Math.floor(diff / 1000);

    if (seconds < 60) return "just now";
    if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`;
    return date.toLocaleTimeString();
  };

  return (
    <div
      ref={ref}
      className={cn("flex items-center gap-1 text-xs text-gray-500", className)}
      {...props}
    >
      <span className={cn(enabled ? "text-green-600" : "text-gray-400")}>
        Auto-save {enabled ? "on" : "off"}
      </span>
      {enabled && lastSaved && (
        <span className="text-gray-400">· Saved {formatTime(lastSaved)}</span>
      )}
    </div>
  );
});

AutoSaveIndicator.displayName = "AutoSaveIndicator";
