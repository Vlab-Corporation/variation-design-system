import { cn } from "@/utils/cn";

export type SyncState = "synced" | "syncing" | "error" | "offline";

export const syncStatusConfig: Record<
  SyncState,
  { color: string; text: string; animate?: boolean }
> = {
  synced: { color: "bg-success-500", text: "All changes saved" },
  syncing: { color: "bg-warning-500", text: "Saving...", animate: true },
  error: { color: "bg-error-500", text: "Error saving" },
  offline: { color: "bg-gray-400", text: "Offline" },
};

export function syncStatusIndicatorStyles(
  status: SyncState,
  className?: string,
): string {
  const config = syncStatusConfig[status];
  return cn(
    "w-2 h-2 rounded-full",
    config.color,
    config.animate && "animate-pulse",
    className,
  );
}

export function syncStatusTextForState(status: SyncState): string {
  return syncStatusConfig[status].text;
}
