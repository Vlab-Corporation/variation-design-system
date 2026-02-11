import {
  forwardRef,
  useState,
  createContext,
  useContext,
  useCallback,
  type HTMLAttributes,
  type ReactNode,
  type KeyboardEvent,
} from "react";
import {
  tabsListStyles,
  tabStyles,
  tabPanelStyles,
  type TabsVariant,
  type TabsSize,
} from "./Tabs.styles";

export type { TabsVariant, TabsSize } from "./Tabs.styles";

// --- Tabs Context ---

interface TabsContextValue {
  activeTab: string;
  setActiveTab: (value: string) => void;
  variant: TabsVariant;
  size: TabsSize;
}

const TabsContext = createContext<TabsContextValue | null>(null);

function useTabsContext() {
  const ctx = useContext(TabsContext);
  if (!ctx) throw new Error("Tabs components must be used within <Tabs>");
  return ctx;
}

// --- Tabs ---

export interface TabsProps extends Omit<
  HTMLAttributes<HTMLDivElement>,
  "onChange"
> {
  /** Currently active tab value */
  value?: string;
  /** Default active tab (uncontrolled) */
  defaultValue?: string;
  /** Called when active tab changes */
  onChange?: (value: string) => void;
  /** Visual variant */
  variant?: TabsVariant;
  /** Tab size */
  size?: TabsSize;
  children: ReactNode;
}

export const Tabs = forwardRef<HTMLDivElement, TabsProps>(
  (
    {
      value: controlledValue,
      defaultValue = "",
      onChange,
      variant = "underline",
      size = "md",
      className,
      children,
      ...props
    },
    ref,
  ) => {
    const [internalValue, setInternalValue] = useState(defaultValue);
    const isControlled = controlledValue !== undefined;
    const activeTab = isControlled ? controlledValue : internalValue;

    const setActiveTab = useCallback(
      (val: string) => {
        if (!isControlled) setInternalValue(val);
        onChange?.(val);
      },
      [isControlled, onChange],
    );

    return (
      <TabsContext.Provider value={{ activeTab, setActiveTab, variant, size }}>
        <div ref={ref} className={className} {...props}>
          {children}
        </div>
      </TabsContext.Provider>
    );
  },
);

Tabs.displayName = "Tabs";

// --- TabList ---

export type TabListProps = HTMLAttributes<HTMLDivElement>;

export const TabList = forwardRef<HTMLDivElement, TabListProps>(
  ({ className, children, ...props }, ref) => {
    const { variant } = useTabsContext();

    const handleKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
      const tabs = Array.from(
        (e.currentTarget as HTMLElement).querySelectorAll<HTMLElement>(
          '[role="tab"]:not([disabled])',
        ),
      );
      const current = tabs.indexOf(e.target as HTMLElement);

      let next = -1;
      if (e.key === "ArrowRight") {
        next = current < tabs.length - 1 ? current + 1 : 0;
      } else if (e.key === "ArrowLeft") {
        next = current > 0 ? current - 1 : tabs.length - 1;
      } else if (e.key === "Home") {
        next = 0;
      } else if (e.key === "End") {
        next = tabs.length - 1;
      }

      if (next >= 0) {
        e.preventDefault();
        tabs[next]?.focus();
        tabs[next]?.click();
      }
    };

    return (
      <div
        ref={ref}
        role="tablist"
        className={tabsListStyles({ variant, className })}
        onKeyDown={handleKeyDown}
        {...props}
      >
        {children}
      </div>
    );
  },
);

TabList.displayName = "TabList";

// --- Tab ---

export interface TabProps extends HTMLAttributes<HTMLButtonElement> {
  /** Tab identifier value */
  value: string;
  /** Disabled state */
  disabled?: boolean;
}

export const Tab = forwardRef<HTMLButtonElement, TabProps>(
  ({ value, disabled = false, className, children, ...props }, ref) => {
    const { activeTab, setActiveTab, variant, size } = useTabsContext();
    const isActive = activeTab === value;

    return (
      <button
        ref={ref}
        type="button"
        role="tab"
        aria-selected={isActive}
        data-active={isActive}
        tabIndex={isActive ? 0 : -1}
        disabled={disabled}
        onClick={() => !disabled && setActiveTab(value)}
        className={tabStyles({ variant, size, disabled, className })}
        {...props}
      >
        {children}
      </button>
    );
  },
);

Tab.displayName = "Tab";

// --- TabPanel ---

export interface TabPanelProps extends HTMLAttributes<HTMLDivElement> {
  /** Corresponding tab value */
  value: string;
}

export const TabPanel = forwardRef<HTMLDivElement, TabPanelProps>(
  ({ value, className, children, ...props }, ref) => {
    const { activeTab } = useTabsContext();

    if (activeTab !== value) return null;

    return (
      <div
        ref={ref}
        role="tabpanel"
        tabIndex={0}
        className={tabPanelStyles(className)}
        {...props}
      >
        {children}
      </div>
    );
  },
);

TabPanel.displayName = "TabPanel";
