import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  forwardRef,
  type HTMLAttributes,
  type ReactNode,
  type KeyboardEvent,
} from "react";
import { cn } from "@/utils/cn";

/* Context */
interface IconPickerContextValue {
  isOpen: boolean;
  open: () => void;
  close: () => void;
  toggle: () => void;
}

const IconPickerContext = createContext<IconPickerContextValue | null>(null);

const useIconPickerContext = () => {
  const context = useContext(IconPickerContext);
  if (!context) {
    throw new Error("IconPicker components must be used within IconPicker");
  }
  return context;
};

/* IconPicker Root */
export interface IconPickerProps {
  children: ReactNode;
  defaultOpen?: boolean;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

export const IconPicker = ({
  children,
  defaultOpen = false,
  open: controlledOpen,
  onOpenChange,
}: IconPickerProps) => {
  const [internalOpen, setInternalOpen] = useState(defaultOpen);
  const isOpen = controlledOpen ?? internalOpen;

  const handleOpenChange = useCallback(
    (newOpen: boolean) => {
      if (controlledOpen === undefined) {
        setInternalOpen(newOpen);
      }
      onOpenChange?.(newOpen);
    },
    [controlledOpen, onOpenChange],
  );

  const contextValue: IconPickerContextValue = {
    isOpen,
    open: () => handleOpenChange(true),
    close: () => handleOpenChange(false),
    toggle: () => handleOpenChange(!isOpen),
  };

  return (
    <IconPickerContext.Provider value={contextValue}>
      <div className="relative inline-block">{children}</div>
    </IconPickerContext.Provider>
  );
};

/* IconPickerTrigger */
export interface IconPickerTriggerProps extends HTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
}

export const IconPickerTrigger = forwardRef<
  HTMLButtonElement,
  IconPickerTriggerProps
>(({ className, onClick, onKeyDown, children, ...props }, ref) => {
  const { toggle, isOpen } = useIconPickerContext();

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    toggle();
    onClick?.(e);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLButtonElement>) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      toggle();
    }
    onKeyDown?.(e);
  };

  return (
    <button
      ref={ref}
      type="button"
      aria-haspopup="true"
      aria-expanded={isOpen}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      className={cn(
        "flex items-center justify-center p-2 rounded-md",
        "hover:bg-gray-100 transition-colors",
        "focus:outline-none focus:ring-2 focus:ring-accent-500",
        className,
      )}
      {...props}
    >
      {children}
    </button>
  );
});

IconPickerTrigger.displayName = "IconPickerTrigger";

/* IconPickerContent */
export interface IconPickerContentProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
}

export const IconPickerContent = forwardRef<
  HTMLDivElement,
  IconPickerContentProps
>(({ className, children, ...props }, ref) => {
  const { isOpen } = useIconPickerContext();

  if (!isOpen) return null;

  return (
    <div
      ref={ref}
      className={cn(
        "absolute z-50 mt-1 p-2 bg-white rounded-lg shadow-lg border border-gray-200",
        "animate-fade-in",
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
});

IconPickerContent.displayName = "IconPickerContent";

/* IconPickerGrid */
export interface IconPickerGridProps extends Omit<
  HTMLAttributes<HTMLDivElement>,
  "onSelect"
> {
  icons: string[];
  onSelect: (icon: string) => void;
  columns?: number;
}

export const IconPickerGrid = forwardRef<HTMLDivElement, IconPickerGridProps>(
  ({ icons, onSelect, columns = 8, className, ...props }, ref) => {
    const { close } = useIconPickerContext();

    const handleSelect = (icon: string) => {
      onSelect(icon);
      close();
    };

    return (
      <div
        ref={ref}
        className={cn("grid gap-1", className)}
        style={{ gridTemplateColumns: `repeat(${columns}, 1fr)` }}
        {...props}
      >
        {icons.map((icon, index) => (
          <IconPickerItem
            key={`${icon}-${index}`}
            icon={icon}
            onClick={() => handleSelect(icon)}
          />
        ))}
      </div>
    );
  },
);

IconPickerGrid.displayName = "IconPickerGrid";

/* IconPickerItem */
export interface IconPickerItemProps extends HTMLAttributes<HTMLButtonElement> {
  icon: string;
}

export const IconPickerItem = forwardRef<
  HTMLButtonElement,
  IconPickerItemProps
>(({ icon, className, ...props }, ref) => {
  return (
    <button
      ref={ref}
      type="button"
      className={cn(
        "flex items-center justify-center w-8 h-8 text-lg rounded",
        "hover:bg-gray-100 transition-colors",
        "focus:outline-none focus:ring-2 focus:ring-accent-500",
        className,
      )}
      {...props}
    >
      {icon}
    </button>
  );
});

IconPickerItem.displayName = "IconPickerItem";
