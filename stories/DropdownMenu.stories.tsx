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
  parameters: {
    layout: "centered",
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

// Default
export const Default: Story = {
  render: () => (
    <DropdownMenu trigger={<Button variant="outline">Open Menu</Button>}>
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
        trigger={<Button variant="outline">Align End</Button>}
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
    <DropdownMenu trigger={<Button variant="outline">More Actions</Button>}>
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
