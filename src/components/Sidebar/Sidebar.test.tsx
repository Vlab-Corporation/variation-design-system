import { describe, it, expect, vi } from "vitest";
import { createRef } from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import {
  SidebarProvider,
  Sidebar,
  SidebarTrigger,
  SidebarHeader,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarMenuSub,
  SidebarMenuSubItem,
  SidebarMenuSubButton,
} from ".";

function renderSidebar(
  props: {
    defaultCollapsed?: boolean;
    collapsed?: boolean;
    onCollapsedChange?: (v: boolean) => void;
  } = {},
) {
  return render(
    <SidebarProvider {...props}>
      <Sidebar>
        <SidebarHeader>Header</SidebarHeader>
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel>Group Label</SidebarGroupLabel>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton icon={<span>📊</span>} tooltip="Dashboard">
                  Dashboard
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem defaultExpanded>
                <SidebarMenuButton
                  icon={<span>👥</span>}
                  hasSub
                  tooltip="Members"
                >
                  Members
                </SidebarMenuButton>
                <SidebarMenuSub>
                  <SidebarMenuSubItem>
                    <SidebarMenuSubButton isHeader>
                      John Doe
                    </SidebarMenuSubButton>
                  </SidebarMenuSubItem>
                  <SidebarMenuSubItem>
                    <SidebarMenuSubButton active>
                      Bookmarks
                    </SidebarMenuSubButton>
                  </SidebarMenuSubItem>
                </SidebarMenuSub>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroup>
        </SidebarContent>
        <SidebarFooter>Footer</SidebarFooter>
      </Sidebar>
      <SidebarTrigger tooltip="Toggle sidebar" />
    </SidebarProvider>,
  );
}

// --- Rendering ---
describe("Rendering", () => {
  it("renders all structural components", () => {
    renderSidebar();
    expect(screen.getByRole("navigation")).toBeInTheDocument();
    expect(screen.getByText("Header")).toBeInTheDocument();
    expect(screen.getByText("Footer")).toBeInTheDocument();
    expect(screen.getByText("Group Label")).toBeInTheDocument();
    expect(screen.getByText("Dashboard")).toBeInTheDocument();
    expect(screen.getByText("Members")).toBeInTheDocument();
  });

  it("renders nav with correct aria-label", () => {
    renderSidebar();
    expect(screen.getByRole("navigation")).toHaveAttribute(
      "aria-label",
      "Sidebar navigation",
    );
  });

  it("renders menu lists", () => {
    renderSidebar();
    const lists = screen.getAllByRole("list");
    expect(lists.length).toBeGreaterThanOrEqual(1);
  });

  it("renders group with role=group", () => {
    renderSidebar();
    expect(screen.getByRole("group")).toBeInTheDocument();
  });
});

// --- Collapsed / Expanded ---
describe("Collapsed/Expanded", () => {
  it("applies expanded width by default", () => {
    renderSidebar();
    expect(screen.getByRole("navigation").className).toContain("w-[284px]");
  });

  it("applies collapsed width when defaultCollapsed", () => {
    renderSidebar({ defaultCollapsed: true });
    expect(screen.getByRole("navigation").className).toContain("w-16");
  });

  it("hides group label when collapsed", () => {
    renderSidebar({ defaultCollapsed: true });
    expect(screen.queryByText("Group Label")).not.toBeInTheDocument();
  });

  it("toggles collapsed state via SidebarTrigger", () => {
    renderSidebar();
    const nav = screen.getByRole("navigation");
    expect(nav.className).toContain("w-[284px]");

    // The SidebarTrigger is rendered outside <nav>, find it by aria-expanded
    const allButtons = screen.getAllByRole("button");
    const trigger = allButtons.find(
      (b) => b.getAttribute("aria-expanded") !== null && !b.closest("nav"),
    )!;

    fireEvent.click(trigger);
    expect(nav.className).toContain("w-16");
  });
});

// --- Sub-menu ---
describe("Sub-menu", () => {
  it("shows sub-menu when defaultExpanded", () => {
    renderSidebar();
    expect(screen.getByText("John Doe")).toBeVisible();
    expect(screen.getByText("Bookmarks")).toBeVisible();
  });

  it("toggles sub-menu on button click", () => {
    renderSidebar();
    const membersBtn = screen.getByText("Members").closest("button")!;

    expect(membersBtn).toHaveAttribute("aria-expanded", "true");
    fireEvent.click(membersBtn);
    expect(membersBtn).toHaveAttribute("aria-expanded", "false");
    fireEvent.click(membersBtn);
    expect(membersBtn).toHaveAttribute("aria-expanded", "true");
  });

  it("sets aria-controls on menu button with sub", () => {
    renderSidebar();
    const membersBtn = screen.getByText("Members").closest("button")!;
    const controlsId = membersBtn.getAttribute("aria-controls");
    expect(controlsId).toBeTruthy();
    expect(document.getElementById(controlsId!)).toBeInTheDocument();
  });
});

// --- Active States ---
describe("Active States", () => {
  it("applies active classes to SidebarMenuButton", () => {
    render(
      <SidebarProvider>
        <Sidebar>
          <SidebarContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton active>Active Item</SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarContent>
        </Sidebar>
      </SidebarProvider>,
    );
    const btn = screen.getByText("Active Item").closest("button")!;
    expect(btn.className).toContain("bg-accent-300");
    expect(btn.className).toContain("text-accent-800");
    expect(btn).toHaveAttribute("aria-current", "page");
  });

  it("applies active classes to SidebarMenuSubButton", () => {
    renderSidebar();
    const btn = screen.getByText("Bookmarks").closest("button")!;
    expect(btn.className).toContain("bg-accent-200");
    expect(btn.className).toContain("text-accent-800");
    expect(btn).toHaveAttribute("aria-current", "page");
  });

  it("applies isHeader styles to SidebarMenuSubButton", () => {
    renderSidebar();
    const btn = screen.getByText("John Doe").closest("button")!;
    expect(btn.className).toContain("font-medium");
  });
});

// --- Events ---
describe("Events", () => {
  it("calls onCollapsedChange when trigger clicked", () => {
    const handler = vi.fn();
    render(
      <SidebarProvider onCollapsedChange={handler}>
        <Sidebar>
          <SidebarContent>Content</SidebarContent>
        </Sidebar>
        <SidebarTrigger />
      </SidebarProvider>,
    );

    fireEvent.click(screen.getAllByRole("button")[0]);
    expect(handler).toHaveBeenCalledWith(true);
  });

  it("calls onExpandedChange on SidebarMenuItem", () => {
    const handler = vi.fn();
    render(
      <SidebarProvider>
        <Sidebar>
          <SidebarContent>
            <SidebarMenu>
              <SidebarMenuItem onExpandedChange={handler}>
                <SidebarMenuButton hasSub>Toggle Me</SidebarMenuButton>
                <SidebarMenuSub>
                  <SidebarMenuSubItem>
                    <SidebarMenuSubButton>Sub</SidebarMenuSubButton>
                  </SidebarMenuSubItem>
                </SidebarMenuSub>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarContent>
        </Sidebar>
      </SidebarProvider>,
    );

    fireEvent.click(screen.getByText("Toggle Me").closest("button")!);
    expect(handler).toHaveBeenCalledWith(true);
  });

  it("calls onExpandedChange on SidebarMenuSubItem", () => {
    const handler = vi.fn();
    render(
      <SidebarProvider>
        <Sidebar>
          <SidebarContent>
            <SidebarMenu>
              <SidebarMenuItem defaultExpanded>
                <SidebarMenuButton hasSub>Members</SidebarMenuButton>
                <SidebarMenuSub>
                  <SidebarMenuSubItem onExpandedChange={handler}>
                    <SidebarMenuSubButton isHeader hasSub>
                      Member A
                    </SidebarMenuSubButton>
                    <SidebarMenuSub nested>
                      <SidebarMenuSubItem>
                        <SidebarMenuSubButton>Page 1</SidebarMenuSubButton>
                      </SidebarMenuSubItem>
                    </SidebarMenuSub>
                  </SidebarMenuSubItem>
                </SidebarMenuSub>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarContent>
        </Sidebar>
      </SidebarProvider>,
    );

    fireEvent.click(screen.getByText("Member A").closest("button")!);
    expect(handler).toHaveBeenCalledWith(true);
  });

  it("calls onClick on SidebarMenuButton", () => {
    const handler = vi.fn();
    render(
      <SidebarProvider>
        <Sidebar>
          <SidebarContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton onClick={handler}>Click</SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarContent>
        </Sidebar>
      </SidebarProvider>,
    );

    fireEvent.click(screen.getByText("Click").closest("button")!);
    expect(handler).toHaveBeenCalledOnce();
  });
});

// --- Keyboard ---
describe("Keyboard", () => {
  it("moves focus with ArrowDown/ArrowUp", () => {
    render(
      <SidebarProvider>
        <Sidebar>
          <SidebarContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton>First</SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton>Second</SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton>Third</SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarContent>
        </Sidebar>
      </SidebarProvider>,
    );

    const first = screen.getByText("First").closest("button")!;
    first.focus();

    const list = screen.getByRole("list");
    fireEvent.keyDown(list, { key: "ArrowDown" });
    expect(document.activeElement).toBe(
      screen.getByText("Second").closest("button"),
    );

    fireEvent.keyDown(list, { key: "ArrowDown" });
    expect(document.activeElement).toBe(
      screen.getByText("Third").closest("button"),
    );

    fireEvent.keyDown(list, { key: "ArrowUp" });
    expect(document.activeElement).toBe(
      screen.getByText("Second").closest("button"),
    );
  });

  it("moves focus with Home/End", () => {
    render(
      <SidebarProvider>
        <Sidebar>
          <SidebarContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton>First</SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton>Second</SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton>Third</SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarContent>
        </Sidebar>
      </SidebarProvider>,
    );

    const first = screen.getByText("First").closest("button")!;
    first.focus();

    const list = screen.getByRole("list");
    fireEvent.keyDown(list, { key: "End" });
    expect(document.activeElement).toBe(
      screen.getByText("Third").closest("button"),
    );

    fireEvent.keyDown(list, { key: "Home" });
    expect(document.activeElement).toBe(
      screen.getByText("First").closest("button"),
    );
  });
});

// --- Accessibility ---
describe("Accessibility", () => {
  it("has role=navigation on sidebar", () => {
    renderSidebar();
    expect(screen.getByRole("navigation")).toBeInTheDocument();
  });

  it("has role=list on menus", () => {
    renderSidebar();
    expect(screen.getAllByRole("list").length).toBeGreaterThanOrEqual(1);
  });

  it("sets aria-current=page on active buttons", () => {
    renderSidebar();
    const activeBtn = screen.getByText("Bookmarks").closest("button")!;
    expect(activeBtn).toHaveAttribute("aria-current", "page");
  });

  it("SidebarTrigger has aria-expanded", () => {
    renderSidebar();
    const triggers = screen
      .getAllByRole("button")
      .filter((b) => b.getAttribute("aria-expanded") !== null);
    expect(triggers.length).toBeGreaterThanOrEqual(1);
  });
});

// --- forwardRef ---
describe("forwardRef", () => {
  it("forwards ref on Sidebar", () => {
    const ref = createRef<HTMLElement>();
    render(
      <SidebarProvider>
        <Sidebar ref={ref}>
          <SidebarContent>Content</SidebarContent>
        </Sidebar>
      </SidebarProvider>,
    );
    expect(ref.current).toBeInstanceOf(HTMLElement);
  });

  it("forwards ref on SidebarHeader", () => {
    const ref = createRef<HTMLDivElement>();
    render(
      <SidebarProvider>
        <Sidebar>
          <SidebarHeader ref={ref}>Header</SidebarHeader>
        </Sidebar>
      </SidebarProvider>,
    );
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });

  it("forwards ref on SidebarMenuButton", () => {
    const ref = createRef<HTMLButtonElement>();
    render(
      <SidebarProvider>
        <Sidebar>
          <SidebarContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton ref={ref}>Btn</SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarContent>
        </Sidebar>
      </SidebarProvider>,
    );
    expect(ref.current).toBeInstanceOf(HTMLButtonElement);
  });

  it("forwards ref on SidebarMenuSubButton", () => {
    const ref = createRef<HTMLButtonElement>();
    render(
      <SidebarProvider>
        <Sidebar>
          <SidebarContent>
            <SidebarMenu>
              <SidebarMenuItem defaultExpanded>
                <SidebarMenuButton hasSub>Parent</SidebarMenuButton>
                <SidebarMenuSub>
                  <SidebarMenuSubItem>
                    <SidebarMenuSubButton ref={ref}>Sub</SidebarMenuSubButton>
                  </SidebarMenuSubItem>
                </SidebarMenuSub>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarContent>
        </Sidebar>
      </SidebarProvider>,
    );
    expect(ref.current).toBeInstanceOf(HTMLButtonElement);
  });
});

// --- 3-Level Menu ---
describe("3-Level Menu", () => {
  function renderThreeLevel() {
    return render(
      <SidebarProvider>
        <Sidebar>
          <SidebarContent>
            <SidebarMenu>
              <SidebarMenuItem defaultExpanded>
                <SidebarMenuButton icon={<span>👥</span>} hasSub>
                  회원 목록
                </SidebarMenuButton>
                <SidebarMenuSub>
                  <SidebarMenuSubItem defaultExpanded>
                    <SidebarMenuSubButton isHeader hasSub active>
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
                    <SidebarMenuSubButton isHeader>
                      임재혁 19631014
                    </SidebarMenuSubButton>
                  </SidebarMenuSubItem>
                </SidebarMenuSub>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarContent>
        </Sidebar>
      </SidebarProvider>,
    );
  }

  it("renders Level 3 items when parent sub-item is expanded", () => {
    renderThreeLevel();
    expect(screen.getByText("초진 결과 요약본")).toBeVisible();
    expect(screen.getByText("원인 추정 분석 결과 요약본")).toBeVisible();
  });

  it("toggles Level 2 sub-item independently of Level 1", () => {
    renderThreeLevel();
    const memberBtn = screen.getByText("류한희 19800421").closest("button")!;
    expect(memberBtn).toHaveAttribute("aria-expanded", "true");

    fireEvent.click(memberBtn);
    expect(memberBtn).toHaveAttribute("aria-expanded", "false");

    // Level 3 items should be hidden
    const level3List = screen.getByText("초진 결과 요약본").closest("ul")!;
    expect(level3List).toHaveAttribute("aria-hidden", "true");

    // Level 1 should still be expanded
    const level1Btn = screen.getByText("회원 목록").closest("button")!;
    expect(level1Btn).toHaveAttribute("aria-expanded", "true");
  });

  it("sets aria-controls on Level 2 sub-button with hasSub", () => {
    renderThreeLevel();
    const memberBtn = screen.getByText("류한희 19800421").closest("button")!;
    const controlsId = memberBtn.getAttribute("aria-controls");
    expect(controlsId).toBeTruthy();
    expect(document.getElementById(controlsId!)).toBeInTheDocument();
  });

  it("applies active state to Level 2 sub-button", () => {
    renderThreeLevel();
    const btn = screen.getByText("류한희 19800421").closest("button")!;
    // When expanded with sub-items, group background is on the parent li instead
    expect(btn.className).toContain("text-accent-800");
    expect(btn).toHaveAttribute("aria-current", "page");
  });

  it("applies nested indentation class", () => {
    renderThreeLevel();
    const nestedList = screen.getByText("초진 결과 요약본").closest("ul")!;
    expect(nestedList.className).toContain("pl-6");
  });
});

// --- Collapsed mode: layout & visibility ---
describe("Collapsed mode layout", () => {
  it("applies px-2 on SidebarGroup when collapsed", () => {
    renderSidebar({ defaultCollapsed: true });
    const group = screen.getByRole("group");
    expect(group.className).toContain("px-2");
  });

  it("applies px-4 on SidebarGroup when expanded", () => {
    renderSidebar();
    const group = screen.getByRole("group");
    expect(group.className).toContain("px-4");
  });

  it("hides nav variant SidebarMenuButton when collapsed", () => {
    renderSidebar({ defaultCollapsed: true });
    expect(screen.queryByText("Dashboard")).not.toBeInTheDocument();
    expect(screen.queryByText("Members")).not.toBeInTheDocument();
  });

  it("shows action variant SidebarMenuButton when collapsed", () => {
    render(
      <SidebarProvider defaultCollapsed>
        <Sidebar>
          <SidebarContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton
                  variant="action"
                  icon={<span>+</span>}
                  tooltip="Create"
                >
                  New Item
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarContent>
        </Sidebar>
      </SidebarProvider>,
    );
    // action button should still render (icon visible via tooltip wrapper)
    expect(screen.getByRole("button")).toBeInTheDocument();
  });

  it("hides SidebarMenuSub when collapsed", () => {
    renderSidebar({ defaultCollapsed: true });
    expect(screen.queryByText("John Doe")).not.toBeInTheDocument();
    expect(screen.queryByText("Bookmarks")).not.toBeInTheDocument();
  });
});

// --- Controlled mode ---
describe("Controlled mode", () => {
  it("respects controlled collapsed state", () => {
    const { rerender } = render(
      <SidebarProvider collapsed={false}>
        <Sidebar>
          <SidebarContent>Content</SidebarContent>
        </Sidebar>
      </SidebarProvider>,
    );
    expect(screen.getByRole("navigation").className).toContain("w-[284px]");

    rerender(
      <SidebarProvider collapsed={true}>
        <Sidebar>
          <SidebarContent>Content</SidebarContent>
        </Sidebar>
      </SidebarProvider>,
    );
    expect(screen.getByRole("navigation").className).toContain("w-16");
  });

  it("respects controlled expanded state on SidebarMenuItem", () => {
    const { rerender } = render(
      <SidebarProvider>
        <Sidebar>
          <SidebarContent>
            <SidebarMenu>
              <SidebarMenuItem expanded={false}>
                <SidebarMenuButton hasSub>Parent</SidebarMenuButton>
                <SidebarMenuSub>
                  <SidebarMenuSubItem>
                    <SidebarMenuSubButton>Child</SidebarMenuSubButton>
                  </SidebarMenuSubItem>
                </SidebarMenuSub>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarContent>
        </Sidebar>
      </SidebarProvider>,
    );

    const sub = screen.getByText("Child").closest("ul")!;
    expect(sub).toHaveAttribute("aria-hidden", "true");

    rerender(
      <SidebarProvider>
        <Sidebar>
          <SidebarContent>
            <SidebarMenu>
              <SidebarMenuItem expanded={true}>
                <SidebarMenuButton hasSub>Parent</SidebarMenuButton>
                <SidebarMenuSub>
                  <SidebarMenuSubItem>
                    <SidebarMenuSubButton>Child</SidebarMenuSubButton>
                  </SidebarMenuSubItem>
                </SidebarMenuSub>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarContent>
        </Sidebar>
      </SidebarProvider>,
    );
    expect(sub).not.toHaveAttribute("aria-hidden", "true");
  });

  it("respects controlled expanded state on SidebarMenuSubItem", () => {
    const { rerender } = render(
      <SidebarProvider>
        <Sidebar>
          <SidebarContent>
            <SidebarMenu>
              <SidebarMenuItem defaultExpanded>
                <SidebarMenuButton hasSub>Members</SidebarMenuButton>
                <SidebarMenuSub>
                  <SidebarMenuSubItem expanded={false}>
                    <SidebarMenuSubButton isHeader hasSub>
                      Member A
                    </SidebarMenuSubButton>
                    <SidebarMenuSub nested>
                      <SidebarMenuSubItem>
                        <SidebarMenuSubButton>Page 1</SidebarMenuSubButton>
                      </SidebarMenuSubItem>
                    </SidebarMenuSub>
                  </SidebarMenuSubItem>
                </SidebarMenuSub>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarContent>
        </Sidebar>
      </SidebarProvider>,
    );

    const nestedList = screen.getByText("Page 1").closest("ul")!;
    expect(nestedList).toHaveAttribute("aria-hidden", "true");

    rerender(
      <SidebarProvider>
        <Sidebar>
          <SidebarContent>
            <SidebarMenu>
              <SidebarMenuItem defaultExpanded>
                <SidebarMenuButton hasSub>Members</SidebarMenuButton>
                <SidebarMenuSub>
                  <SidebarMenuSubItem expanded={true}>
                    <SidebarMenuSubButton isHeader hasSub>
                      Member A
                    </SidebarMenuSubButton>
                    <SidebarMenuSub nested>
                      <SidebarMenuSubItem>
                        <SidebarMenuSubButton>Page 1</SidebarMenuSubButton>
                      </SidebarMenuSubItem>
                    </SidebarMenuSub>
                  </SidebarMenuSubItem>
                </SidebarMenuSub>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarContent>
        </Sidebar>
      </SidebarProvider>,
    );
    expect(nestedList).not.toHaveAttribute("aria-hidden", "true");
  });
});
