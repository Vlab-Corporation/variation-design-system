import {
  forwardRef,
  useState,
  useRef,
  useCallback,
  useEffect,
  type HTMLAttributes,
  type ReactNode,
  type ChangeEvent,
  type KeyboardEvent,
} from "react";
import { Portal } from "@/utils/Portal";
import {
  commandPaletteOverlayStyles,
  commandPaletteStyles,
  commandPaletteInputStyles,
  commandPaletteListStyles,
  commandPaletteGroupStyles,
  commandPaletteItemStyles,
  commandPaletteEmptyStyles,
  commandPaletteShortcutStyles,
} from "./CommandPalette.styles";

export interface CommandItem {
  /** Unique identifier */
  id: string;
  /** Display label */
  label: string;
  /** Optional group name */
  group?: string;
  /** Optional icon */
  icon?: ReactNode;
  /** Optional keyboard shortcut label */
  shortcut?: string;
  /** Called when item is selected */
  onSelect?: () => void;
  /** Disabled state */
  disabled?: boolean;
}

export interface CommandPaletteProps extends Omit<
  HTMLAttributes<HTMLDivElement>,
  "onSelect"
> {
  /** Whether the palette is open */
  open: boolean;
  /** Called when open state changes */
  onOpenChange: (open: boolean) => void;
  /** Command items */
  items: CommandItem[];
  /** Placeholder text */
  placeholder?: string;
  /** Empty state text */
  emptyText?: string;
  /** Called when an item is selected */
  onSelect?: (item: CommandItem) => void;
}

export const CommandPalette = forwardRef<HTMLDivElement, CommandPaletteProps>(
  (
    {
      open,
      onOpenChange,
      items,
      placeholder = "Type a command or search...",
      emptyText = "No results found.",
      onSelect,
      className,
      ...props
    },
    ref,
  ) => {
    const [query, setQuery] = useState("");
    const [activeIndex, setActiveIndex] = useState(0);
    const inputRef = useRef<HTMLInputElement>(null);

    const filteredItems = items.filter(
      (item) =>
        !item.disabled &&
        item.label.toLowerCase().includes(query.toLowerCase()),
    );

    // Group items
    const groups = new Map<string, CommandItem[]>();
    for (const item of filteredItems) {
      const group = item.group ?? "";
      if (!groups.has(group)) groups.set(group, []);
      groups.get(group)!.push(item);
    }

    const flatFiltered = filteredItems;

    const close = useCallback(() => {
      onOpenChange(false);
      setQuery("");
      setActiveIndex(0);
    }, [onOpenChange]);

    const selectItem = useCallback(
      (item: CommandItem) => {
        item.onSelect?.();
        onSelect?.(item);
        close();
      },
      [onSelect, close],
    );

    // Focus input when opened
    useEffect(() => {
      if (open) {
        setTimeout(() => inputRef.current?.focus(), 0);
      }
    }, [open]);

    // Global keyboard shortcut
    useEffect(() => {
      const handleKeyDown = (e: globalThis.KeyboardEvent) => {
        if ((e.metaKey || e.ctrlKey) && e.key === "k") {
          e.preventDefault();
          onOpenChange(!open);
        }
      };
      document.addEventListener("keydown", handleKeyDown);
      return () => document.removeEventListener("keydown", handleKeyDown);
    }, [open, onOpenChange]);

    const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "ArrowDown") {
        e.preventDefault();
        setActiveIndex((i) => (i < flatFiltered.length - 1 ? i + 1 : 0));
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setActiveIndex((i) => (i > 0 ? i - 1 : flatFiltered.length - 1));
      } else if (e.key === "Enter" && flatFiltered[activeIndex]) {
        e.preventDefault();
        selectItem(flatFiltered[activeIndex]);
      } else if (e.key === "Escape") {
        close();
      }
    };

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
      setQuery(e.target.value);
      setActiveIndex(0);
    };

    if (!open) return null;

    let itemIndex = 0;

    return (
      <Portal>
        <div
          className={commandPaletteOverlayStyles()}
          onClick={(e) => {
            if (e.target === e.currentTarget) close();
          }}
        >
          <div
            ref={ref}
            role="dialog"
            aria-label="Command palette"
            className={commandPaletteStyles({ className })}
            {...props}
          >
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={handleInputChange}
              onKeyDown={handleKeyDown}
              placeholder={placeholder}
              className={commandPaletteInputStyles()}
              aria-label="Search commands"
            />
            <div role="listbox" className={commandPaletteListStyles()}>
              {flatFiltered.length === 0 ? (
                <div className={commandPaletteEmptyStyles()}>{emptyText}</div>
              ) : (
                Array.from(groups.entries()).map(([group, groupItems]) => (
                  <div key={group || "__default"}>
                    {group && (
                      <div className={commandPaletteGroupStyles()}>{group}</div>
                    )}
                    {groupItems.map((item) => {
                      const currentIndex = itemIndex++;
                      return (
                        <div
                          key={item.id}
                          role="option"
                          aria-selected={currentIndex === activeIndex}
                          className={commandPaletteItemStyles(
                            currentIndex === activeIndex,
                          )}
                          onClick={() => selectItem(item)}
                          onMouseEnter={() => setActiveIndex(currentIndex)}
                        >
                          {item.icon && (
                            <span className="shrink-0">{item.icon}</span>
                          )}
                          <span>{item.label}</span>
                          {item.shortcut && (
                            <span className={commandPaletteShortcutStyles()}>
                              {item.shortcut}
                            </span>
                          )}
                        </div>
                      );
                    })}
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </Portal>
    );
  },
);

CommandPalette.displayName = "CommandPalette";
