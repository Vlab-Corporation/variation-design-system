import { forwardRef, type ButtonHTMLAttributes } from "react";
import { Avatar } from "@/components/Avatar/Avatar";
import { Tooltip } from "@/components/Tooltip/Tooltip";
import { useSidebarContext } from "./Sidebar";
import { cn } from "@/utils/cn";

export interface SidebarUser {
  displayName: string;
  photoURL?: string;
  plan?: string;
}

export interface SidebarUserProfileProps
  extends ButtonHTMLAttributes<HTMLButtonElement> {
  user: SidebarUser;
}

export const SidebarUserProfile = forwardRef<
  HTMLButtonElement,
  SidebarUserProfileProps
>(({ user, className, ...props }, ref) => {
  const { collapsed } = useSidebarContext();

  const button = (
    <button
      ref={ref}
      type="button"
      className={cn(
        "flex h-[46px] w-full shrink-0 items-center gap-3 overflow-hidden rounded-button transition-[color,padding] hover:bg-accent-200",
        !collapsed && "pl-2",
        className,
      )}
      {...props}
    >
      <Avatar
        src={user.photoURL}
        alt={user.displayName}
        fallback={user.displayName.charAt(0)}
        size="sm"
        className="shrink-0"
      />
      <div className="flex min-w-0 flex-1 flex-col text-left">
        <span className="truncate text-sm font-medium text-gray-900">
          {user.displayName}
        </span>
        {user.plan && (
          <span className="truncate text-xs text-gray-500">
            {user.plan} 플랜 이용 중
          </span>
        )}
      </div>
    </button>
  );

  if (collapsed) {
    return (
      <Tooltip
        content={user.displayName}
        placement="right"
        wrapperClassName="block w-full"
        delayShow={200}
      >
        {button}
      </Tooltip>
    );
  }

  return button;
});

SidebarUserProfile.displayName = "SidebarUserProfile";
