import {
  forwardRef,
  useState,
  createContext,
  useContext,
  useCallback,
  type HTMLAttributes,
  type ReactNode,
} from "react";
import {
  accordionStyles,
  accordionTriggerStyles,
  accordionContentStyles,
  accordionContentInnerStyles,
  accordionItemSeparatedStyles,
  type AccordionVariant,
} from "./Accordion.styles";

export type { AccordionVariant } from "./Accordion.styles";

// --- Accordion Context ---

interface AccordionContextValue {
  expandedItems: string[];
  toggle: (value: string) => void;
  variant: AccordionVariant;
}

const AccordionContext = createContext<AccordionContextValue | null>(null);

function useAccordionContext() {
  const ctx = useContext(AccordionContext);
  if (!ctx)
    throw new Error("Accordion components must be used within <Accordion>");
  return ctx;
}

// --- Accordion ---

export interface AccordionProps extends Omit<
  HTMLAttributes<HTMLDivElement>,
  "onChange"
> {
  /** Allow multiple items to be open */
  multiple?: boolean;
  /** Default expanded items */
  defaultValue?: string[];
  /** Controlled expanded items */
  value?: string[];
  /** Called when expanded items change */
  onChange?: (value: string[]) => void;
  /** Visual variant */
  variant?: AccordionVariant;
  children: ReactNode;
}

export const Accordion = forwardRef<HTMLDivElement, AccordionProps>(
  (
    {
      multiple = false,
      defaultValue = [],
      value: controlledValue,
      onChange,
      variant = "default",
      className,
      children,
      ...props
    },
    ref,
  ) => {
    const [internalValue, setInternalValue] = useState(defaultValue);
    const isControlled = controlledValue !== undefined;
    const expandedItems = isControlled ? controlledValue : internalValue;

    const toggle = useCallback(
      (item: string) => {
        const next = expandedItems.includes(item)
          ? expandedItems.filter((v) => v !== item)
          : multiple
            ? [...expandedItems, item]
            : [item];
        if (!isControlled) setInternalValue(next);
        onChange?.(next);
      },
      [expandedItems, multiple, isControlled, onChange],
    );

    return (
      <AccordionContext.Provider value={{ expandedItems, toggle, variant }}>
        <div
          ref={ref}
          className={accordionStyles({ variant, className })}
          {...props}
        >
          {children}
        </div>
      </AccordionContext.Provider>
    );
  },
);

Accordion.displayName = "Accordion";

// --- AccordionItem ---

export interface AccordionItemProps extends HTMLAttributes<HTMLDivElement> {
  /** Unique item value */
  value: string;
  /** Disable this item */
  disabled?: boolean;
  children: ReactNode;
}

export const AccordionItem = forwardRef<HTMLDivElement, AccordionItemProps>(
  (
    { value, disabled: _disabled = false, className, children, ...props },
    ref,
  ) => {
    const { variant } = useAccordionContext();
    return (
      <div
        ref={ref}
        data-value={value}
        className={
          variant === "separated"
            ? `${accordionItemSeparatedStyles} ${className ?? ""}`
            : className
        }
        {...props}
      >
        {children}
      </div>
    );
  },
);

AccordionItem.displayName = "AccordionItem";

// --- AccordionTrigger ---

export interface AccordionTriggerProps extends HTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
}

export const AccordionTrigger = forwardRef<
  HTMLButtonElement,
  AccordionTriggerProps
>(({ className, children, ...props }, ref) => {
  const { expandedItems, toggle } = useAccordionContext();

  // Find parent AccordionItem value
  const itemValue = (props as { "data-accordion-value"?: string })[
    "data-accordion-value"
  ];

  return (
    <button
      ref={ref}
      type="button"
      className={`${accordionTriggerStyles(false)} ${className ?? ""}`}
      {...props}
      onClick={() => itemValue && toggle(itemValue)}
    >
      {children}
      <ChevronIcon
        open={itemValue ? expandedItems.includes(itemValue) : false}
      />
    </button>
  );
});

AccordionTrigger.displayName = "AccordionTrigger";

// --- AccordionContent ---

export interface AccordionContentProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
}

export const AccordionContent = forwardRef<
  HTMLDivElement,
  AccordionContentProps
>(({ className, children, ...props }, ref) => {
  const itemValue = (props as { "data-accordion-value"?: string })[
    "data-accordion-value"
  ];
  const { expandedItems } = useAccordionContext();
  const open = itemValue ? expandedItems.includes(itemValue) : false;

  return (
    <div
      ref={ref}
      role="region"
      className={`${accordionContentStyles(open)} ${className ?? ""}`}
      {...props}
    >
      <div className={accordionContentInnerStyles()}>{children}</div>
    </div>
  );
});

AccordionContent.displayName = "AccordionContent";

// --- Simplified API: Accordion with items prop ---

export interface AccordionItemData {
  value: string;
  trigger: ReactNode;
  content: ReactNode;
  disabled?: boolean;
}

export interface SimpleAccordionProps extends Omit<AccordionProps, "children"> {
  items: AccordionItemData[];
}

export const SimpleAccordion = forwardRef<HTMLDivElement, SimpleAccordionProps>(
  ({ items, ...props }, ref) => {
    return (
      <Accordion ref={ref} {...props}>
        {items.map((item) => (
          <AccordionItemInner
            key={item.value}
            value={item.value}
            trigger={item.trigger}
            content={item.content}
            disabled={item.disabled}
          />
        ))}
      </Accordion>
    );
  },
);

SimpleAccordion.displayName = "SimpleAccordion";

// Internal component that has access to context
function AccordionItemInner({
  value,
  trigger,
  content,
  disabled,
}: AccordionItemData) {
  const { expandedItems, toggle } = useAccordionContext();
  const open = expandedItems.includes(value);

  return (
    <AccordionItem value={value} disabled={disabled}>
      <button
        type="button"
        aria-expanded={open}
        disabled={disabled}
        className={accordionTriggerStyles(disabled)}
        onClick={() => !disabled && toggle(value)}
      >
        {trigger}
        <ChevronIcon open={open} />
      </button>
      {open && (
        <div role="region" className={accordionContentStyles(open)}>
          <div className={accordionContentInnerStyles()}>{content}</div>
        </div>
      )}
    </AccordionItem>
  );
}

// --- Chevron Icon ---

function ChevronIcon({ open }: { open: boolean }) {
  return (
    <svg
      className={`w-4 h-4 shrink-0 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2}
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
    </svg>
  );
}
