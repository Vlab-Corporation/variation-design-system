import type { Meta, StoryObj } from "@storybook/react";
import {
  DropdownMenu,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuLabel,
} from "@/components/DropdownMenu";
import { Button } from "@/components/Button";

const meta: Meta<typeof DropdownMenu> = {
  title: "Components/DropdownMenu",
  component: DropdownMenu,
  decorators: [
    (Story) => (
      <div style={{ minHeight: 360, display: "flex", alignItems: "start", justifyContent: "center", paddingTop: 40 }}>
        <Story />
      </div>
    ),
  ],
  parameters: {
    layout: "none",
  },
  tags: ["autodocs"],
  argTypes: {
    align: {
      control: "select",
      options: ["start", "end"],
      description: "Content alignment relative to trigger",
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// Placeholder icons (replace with your actual icons in production)
const SettingsIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" />
    <circle cx="12" cy="12" r="3" />
  </svg>
);

const CreditCardIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect width="20" height="14" x="2" y="5" rx="2" />
    <line x1="2" x2="22" y1="10" y2="10" />
  </svg>
);

const KeyIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="m15.5 7.5 2.3 2.3a1 1 0 0 0 1.4 0l2.1-2.1a1 1 0 0 0 0-1.4L19 4" />
    <path d="m21 2-9.6 9.6" />
    <circle cx="7.5" cy="15.5" r="5.5" />
  </svg>
);

const LogOutIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
    <polyline points="16 17 21 12 16 7" />
    <line x1="21" x2="9" y1="12" y2="12" />
  </svg>
);

// Setting Popup — Figma reference design
export const SettingPopup: Story = {
  render: () => (
    <DropdownMenu
      trigger={<Button variant="secondary">Settings</Button>}
      align="start"
    >
      <DropdownMenuItem
        icon={<SettingsIcon />}
        onSelect={() => console.log("계정 관리")}
      >
        계정 관리
      </DropdownMenuItem>
      <DropdownMenuItem
        icon={<CreditCardIcon />}
        onSelect={() => console.log("구독 문의")}
      >
        구독 문의
      </DropdownMenuItem>
      <DropdownMenuItem
        icon={<KeyIcon />}
        onSelect={() => console.log("API 및 연동")}
      >
        API 및 연동
      </DropdownMenuItem>
      <DropdownMenuSeparator />
      <DropdownMenuItem
        destructive
        icon={<LogOutIcon />}
        onSelect={() => console.log("로그아웃")}
      >
        로그아웃
      </DropdownMenuItem>
    </DropdownMenu>
  ),
};

// Default
export const Default: Story = {
  render: () => (
    <DropdownMenu trigger={<Button variant="secondary">Open Menu</Button>}>
      <DropdownMenuLabel>My Account</DropdownMenuLabel>
      <DropdownMenuSeparator />
      <DropdownMenuItem onSelect={() => console.log("Profile")}>
        Profile
      </DropdownMenuItem>
      <DropdownMenuItem onSelect={() => console.log("Settings")}>
        Settings
      </DropdownMenuItem>
      <DropdownMenuItem onSelect={() => console.log("Billing")}>
        Billing
      </DropdownMenuItem>
      <DropdownMenuSeparator />
      <DropdownMenuItem onSelect={() => console.log("Logout")}>
        Log out
      </DropdownMenuItem>
    </DropdownMenu>
  ),
};

// Align End
export const AlignEnd: Story = {
  render: () => (
    <div className="flex justify-end w-80">
      <DropdownMenu
        trigger={<Button variant="secondary">Align End</Button>}
        align="end"
      >
        <DropdownMenuLabel>Actions</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem onSelect={() => console.log("Edit")}>
          Edit
        </DropdownMenuItem>
        <DropdownMenuItem onSelect={() => console.log("Duplicate")}>
          Duplicate
        </DropdownMenuItem>
        <DropdownMenuItem onSelect={() => console.log("Archive")}>
          Archive
        </DropdownMenuItem>
      </DropdownMenu>
    </div>
  ),
};

// With Destructive Item
export const WithDestructiveItem: Story = {
  render: () => (
    <DropdownMenu trigger={<Button variant="secondary">More Actions</Button>}>
      <DropdownMenuLabel>File Actions</DropdownMenuLabel>
      <DropdownMenuSeparator />
      <DropdownMenuItem onSelect={() => console.log("Download")}>
        Download
      </DropdownMenuItem>
      <DropdownMenuItem onSelect={() => console.log("Rename")}>
        Rename
      </DropdownMenuItem>
      <DropdownMenuItem onSelect={() => console.log("Share")}>
        Share
      </DropdownMenuItem>
      <DropdownMenuSeparator />
      <DropdownMenuItem destructive onSelect={() => console.log("Delete")}>
        Delete
      </DropdownMenuItem>
    </DropdownMenu>
  ),
};

// Side Top
export const SideTop: Story = {
  decorators: [
    (Story) => (
      <div style={{ minHeight: 360, display: "flex", alignItems: "end", justifyContent: "center", paddingBottom: 40 }}>
        <Story />
      </div>
    ),
  ],
  render: () => (
    <DropdownMenu
      trigger={<Button variant="secondary">Open Upward</Button>}
      side="top"
    >
      <DropdownMenuItem
        icon={<SettingsIcon />}
        onSelect={() => console.log("계정 관리")}
      >
        계정 관리
      </DropdownMenuItem>
      <DropdownMenuItem
        icon={<CreditCardIcon />}
        onSelect={() => console.log("구독 문의")}
      >
        구독 문의
      </DropdownMenuItem>
      <DropdownMenuSeparator />
      <DropdownMenuItem
        destructive
        icon={<LogOutIcon />}
        onSelect={() => console.log("로그아웃")}
      >
        로그아웃
      </DropdownMenuItem>
    </DropdownMenu>
  ),
};

// Portal — overflow:hidden 컨테이너에서도 드롭다운이 잘리지 않음
export const Portal: Story = {
  decorators: [
    (Story) => (
      <div style={{ minHeight: 360, display: "flex", alignItems: "start", justifyContent: "center", paddingTop: 40 }}>
        <Story />
      </div>
    ),
  ],
  render: () => (
    <div
      style={{
        overflow: "hidden",
        border: "2px dashed #D38475",
        borderRadius: 8,
        padding: 16,
        width: 240,
      }}
    >
      <p style={{ fontSize: 12, color: "#888", marginBottom: 8 }}>
        overflow: hidden container
      </p>
      <DropdownMenu
        trigger={<Button variant="secondary">Portal Menu</Button>}
        portal
      >
        <DropdownMenuItem
          icon={<SettingsIcon />}
          onSelect={() => console.log("Settings")}
        >
          Settings
        </DropdownMenuItem>
        <DropdownMenuItem
          icon={<CreditCardIcon />}
          onSelect={() => console.log("Billing")}
        >
          Billing
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          destructive
          icon={<LogOutIcon />}
          onSelect={() => console.log("Logout")}
        >
          Log out
        </DropdownMenuItem>
      </DropdownMenu>
    </div>
  ),
};

// Portal Side Top — overflow:hidden에서 위로 열기
export const PortalSideTop: Story = {
  decorators: [
    (Story) => (
      <div style={{ minHeight: 360, display: "flex", alignItems: "end", justifyContent: "center", paddingBottom: 40 }}>
        <Story />
      </div>
    ),
  ],
  render: () => (
    <div
      style={{
        overflow: "hidden",
        border: "2px dashed #D38475",
        borderRadius: 8,
        padding: 16,
        width: 240,
      }}
    >
      <p style={{ fontSize: 12, color: "#888", marginBottom: 8 }}>
        overflow: hidden container
      </p>
      <DropdownMenu
        trigger={<Button variant="secondary">Portal Top</Button>}
        portal
        side="top"
      >
        <DropdownMenuItem
          icon={<SettingsIcon />}
          onSelect={() => console.log("Settings")}
        >
          Settings
        </DropdownMenuItem>
        <DropdownMenuItem
          icon={<CreditCardIcon />}
          onSelect={() => console.log("Billing")}
        >
          Billing
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          destructive
          icon={<LogOutIcon />}
          onSelect={() => console.log("Logout")}
        >
          Log out
        </DropdownMenuItem>
      </DropdownMenu>
    </div>
  ),
};

// With Icons
export const WithIcons: Story = {
  render: () => (
    <DropdownMenu trigger={<Button variant="secondary">Menu with Icons</Button>}>
      <DropdownMenuItem
        icon={<SettingsIcon />}
        onSelect={() => console.log("Settings")}
      >
        Settings
      </DropdownMenuItem>
      <DropdownMenuItem
        icon={<CreditCardIcon />}
        onSelect={() => console.log("Billing")}
      >
        Billing
      </DropdownMenuItem>
      <DropdownMenuItem
        icon={<KeyIcon />}
        onSelect={() => console.log("API Keys")}
      >
        API Keys
      </DropdownMenuItem>
      <DropdownMenuSeparator />
      <DropdownMenuItem
        destructive
        icon={<LogOutIcon />}
        onSelect={() => console.log("Logout")}
      >
        Log out
      </DropdownMenuItem>
    </DropdownMenu>
  ),
};
