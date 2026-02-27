import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import {
  SidebarProvider,
  Sidebar,
  SidebarTrigger,
  SidebarHeader,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarMenuSub,
  SidebarMenuSubItem,
  SidebarMenuSubButton,
  useSidebarContext,
} from "../src/components/Sidebar";
import { Avatar } from "../src/components/Avatar";
import {
  DropdownMenu,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "../src/components/DropdownMenu";

// --- Icon helpers ---

function UsersIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  );
}

function SettingsIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="3" />
      <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
    </svg>
  );
}

function EditIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
      <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
    </svg>
  );
}

function CreditCardIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="1" y="4" width="22" height="16" rx="2" ry="2" />
      <line x1="1" y1="10" x2="23" y2="10" />
    </svg>
  );
}

function LinkIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
      <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
    </svg>
  );
}

function LogOutIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
      <polyline points="16 17 21 12 16 7" />
      <line x1="21" y1="12" x2="9" y2="12" />
    </svg>
  );
}

// --- Footer (adapts to collapsed/expanded) ---

function SidebarProfileFooter() {
  const { collapsed } = useSidebarContext();

  if (collapsed) {
    return (
      <SidebarFooter>
        <div className="flex justify-center">
          <DropdownMenu
            trigger={
              <button
                type="button"
                className="inline-flex items-center justify-center rounded-button p-1 transition-colors duration-fast hover:bg-accent-200"
              >
                <Avatar size="sm" alt="User" />
              </button>
            }
            side="top"
            align="start"
          >
            <DropdownMenuItem icon={<CreditCardIcon />}>
              구독 문의
            </DropdownMenuItem>
            <DropdownMenuItem icon={<LinkIcon />}>
              API 및 연동
            </DropdownMenuItem>
            <DropdownMenuItem icon={<SettingsIcon />}>
              계정 관리
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem icon={<LogOutIcon />} destructive>
              로그아웃
            </DropdownMenuItem>
          </DropdownMenu>
        </div>
      </SidebarFooter>
    );
  }

  return (
    <SidebarFooter>
      <div className="flex items-center gap-3">
        <Avatar
          size="sm"
          alt="Hani"
          fallback="H"
          className="bg-accent-600 text-white"
        />
        <div className="flex flex-col">
          <span className="text-body-2 font-semibold">Hani</span>
          <span className="text-body-3 text-gray-500">
            무료 플랜 이용 중
          </span>
        </div>
      </div>
    </SidebarFooter>
  );
}

// --- Meta ---

const meta: Meta<typeof Sidebar> = {
  title: "Components/Sidebar",
  component: Sidebar,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
  },
  decorators: [
    (Story) => (
      <div style={{ display: "flex", height: "100vh", background: "#f8f9fa" }}>
        <Story />
        <div style={{ flex: 1, padding: 24 }}>
          <h1>Main Content</h1>
          <p>This area represents the main content.</p>
        </div>
      </div>
    ),
  ],
};

export default meta;

// --- Stories ---

export const Default: StoryObj = {
  render: function DefaultStory() {
    const [selectedMember, setSelectedMember] = useState("류한희");

    return (
      <SidebarProvider>
        <Sidebar>
          <SidebarHeader>
            <div className="flex items-center">
              <SidebarTrigger tooltip="메뉴 접기" />
            </div>
          </SidebarHeader>
          <SidebarContent>
            <SidebarGroup>
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton
                    variant="action"
                    icon={<EditIcon />}
                    tooltip="새로운 기초 설문"
                  >
                    새로운 기초 설문
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem defaultExpanded>
                  <SidebarMenuButton icon={<UsersIcon />} hasSub tooltip="회원 목록">
                    회원 목록
                  </SidebarMenuButton>
                  <SidebarMenuSub>
                    <SidebarMenuSubItem>
                      <SidebarMenuSubButton
                        isHeader
                        active={selectedMember === "김용현"}
                        onClick={() => setSelectedMember("김용현")}
                      >
                        김용현 19950211
                      </SidebarMenuSubButton>
                    </SidebarMenuSubItem>
                    <SidebarMenuSubItem
                      defaultExpanded={selectedMember === "류한희"}
                    >
                      <SidebarMenuSubButton
                        isHeader
                        hasSub
                        active={selectedMember === "류한희"}
                        onClick={() => setSelectedMember("류한희")}
                      >
                        류한희 19800421
                      </SidebarMenuSubButton>
                      <SidebarMenuSub nested>
                        <SidebarMenuSubItem>
                          <SidebarMenuSubButton>
                            초진 결과 요약본
                          </SidebarMenuSubButton>
                        </SidebarMenuSubItem>
                        <SidebarMenuSubItem>
                          <SidebarMenuSubButton>
                            원인 추정 분석 결과 요약본
                          </SidebarMenuSubButton>
                        </SidebarMenuSubItem>
                      </SidebarMenuSub>
                    </SidebarMenuSubItem>
                    <SidebarMenuSubItem>
                      <SidebarMenuSubButton
                        isHeader
                        active={selectedMember === "임재혁"}
                        onClick={() => setSelectedMember("임재혁")}
                      >
                        임재혁 19631014
                      </SidebarMenuSubButton>
                    </SidebarMenuSubItem>
                  </SidebarMenuSub>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroup>
          </SidebarContent>
          <SidebarProfileFooter />
        </Sidebar>
      </SidebarProvider>
    );
  },
};
