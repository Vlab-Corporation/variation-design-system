import {
  createContext,
  useContext,
  useState,
  useCallback,
  forwardRef,
  type HTMLAttributes,
  type ReactNode,
  type ChangeEvent,
} from "react";
import { cn } from "@/utils/cn";

/* Context */
interface FilterContextValue {
  isOpen: boolean;
  toggle: () => void;
  close: () => void;
}

const FilterContext = createContext<FilterContextValue | null>(null);

const useFilterContext = () => {
  const context = useContext(FilterContext);
  if (!context) {
    throw new Error("Filter components must be used within Filter");
  }
  return context;
};

/* Filter Root */
export interface FilterProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  defaultOpen?: boolean;
}

export const Filter = forwardRef<HTMLDivElement, FilterProps>(
  ({ children, defaultOpen = false, className, ...props }, ref) => {
    const [isOpen, setIsOpen] = useState(defaultOpen);

    const toggle = useCallback(() => setIsOpen((prev) => !prev), []);
    const close = useCallback(() => setIsOpen(false), []);

    return (
      <FilterContext.Provider value={{ isOpen, toggle, close }}>
        <div
          ref={ref}
          className={cn("relative inline-block", className)}
          {...props}
        >
          {children}
        </div>
      </FilterContext.Provider>
    );
  },
);

Filter.displayName = "Filter";

/* FilterTrigger */
export interface FilterTriggerProps extends HTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
}

export const FilterTrigger = forwardRef<HTMLButtonElement, FilterTriggerProps>(
  ({ className, children, ...props }, ref) => {
    const { isOpen, toggle } = useFilterContext();

    return (
      <button
        ref={ref}
        type="button"
        aria-haspopup="true"
        aria-expanded={isOpen}
        onClick={toggle}
        className={cn(
          "flex items-center gap-2 px-3 py-1.5 text-sm font-medium",
          "border border-gray-200 rounded-md",
          "hover:bg-gray-50 transition-colors",
          "focus:outline-none focus:ring-2 focus:ring-accent-500",
          className,
        )}
        {...props}
      >
        {children}
      </button>
    );
  },
);

FilterTrigger.displayName = "FilterTrigger";

/* FilterContent */
export interface FilterContentProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
}

export const FilterContent = forwardRef<HTMLDivElement, FilterContentProps>(
  ({ className, children, ...props }, ref) => {
    const { isOpen } = useFilterContext();

    if (!isOpen) return null;

    return (
      <div
        ref={ref}
        className={cn(
          "absolute z-50 mt-1 min-w-[200px] p-2",
          "bg-white border border-gray-200 rounded-lg shadow-lg",
          "animate-fade-in",
          className,
        )}
        {...props}
      >
        {children}
      </div>
    );
  },
);

FilterContent.displayName = "FilterContent";

/* FilterGroup */
export interface FilterGroupProps extends HTMLAttributes<HTMLDivElement> {
  label: string;
  children: ReactNode;
}

export const FilterGroup = forwardRef<HTMLDivElement, FilterGroupProps>(
  ({ label, className, children, ...props }, ref) => {
    return (
      <div ref={ref} className={cn("mb-3 last:mb-0", className)} {...props}>
        <div className="text-xs font-medium text-gray-500 uppercase mb-1.5">
          {label}
        </div>
        <div className="space-y-1">{children}</div>
      </div>
    );
  },
);

FilterGroup.displayName = "FilterGroup";

/* FilterItem */
export interface FilterItemProps extends Omit<
  HTMLAttributes<HTMLLabelElement>,
  "onChange"
> {
  value: string;
  label: string;
  checked?: boolean;
  onChange?: (value: string, checked: boolean) => void;
}

export const FilterItem = forwardRef<HTMLLabelElement, FilterItemProps>(
  ({ value, label, checked = false, onChange, className, ...props }, ref) => {
    const [isChecked, setIsChecked] = useState(checked);

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
      const newChecked = e.target.checked;
      setIsChecked(newChecked);
      onChange?.(value, newChecked);
    };

    return (
      <label
        ref={ref}
        className={cn(
          "flex items-center gap-2 px-2 py-1 rounded cursor-pointer",
          "hover:bg-gray-50 transition-colors",
          className,
        )}
        {...props}
      >
        <input
          type="checkbox"
          checked={isChecked}
          onChange={handleChange}
          className="rounded border-gray-300 text-accent-600 focus:ring-accent-500"
        />
        <span className="text-sm text-gray-700">{label}</span>
      </label>
    );
  },
);

FilterItem.displayName = "FilterItem";

/* FilterInput */
export interface FilterInputProps extends HTMLAttributes<HTMLInputElement> {
  value?: string;
  onValueChange?: (value: string) => void;
  placeholder?: string;
}

export const FilterInput = forwardRef<HTMLInputElement, FilterInputProps>(
  (
    { value, onValueChange, placeholder = "Search...", className, ...props },
    ref,
  ) => {
    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
      onValueChange?.(e.target.value);
    };

    return (
      <input
        ref={ref}
        type="text"
        value={value}
        onChange={handleChange}
        placeholder={placeholder}
        className={cn(
          "w-full px-2 py-1.5 text-sm border border-gray-200 rounded",
          "focus:outline-none focus:ring-2 focus:ring-accent-500 focus:border-transparent",
          className,
        )}
        {...props}
      />
    );
  },
);

FilterInput.displayName = "FilterInput";
