import React, {
  forwardRef,
  type HTMLAttributes,
  type AnchorHTMLAttributes,
  type ButtonHTMLAttributes,
  type ReactNode,
} from "react";
import { cn } from "@/utils/cn";

/* Breadcrumb Root */
export interface BreadcrumbProps extends HTMLAttributes<HTMLElement> {
  children: ReactNode;
}

export const Breadcrumb = forwardRef<HTMLElement, BreadcrumbProps>(
  ({ className, "aria-label": ariaLabel = "Breadcrumb", ...props }, ref) => {
    return (
      <nav
        ref={ref}
        aria-label={ariaLabel}
        className={cn("", className)}
        {...props}
      />
    );
  },
);

Breadcrumb.displayName = "Breadcrumb";

/* Breadcrumb List */
export interface BreadcrumbListProps extends HTMLAttributes<HTMLOListElement> {
  children: ReactNode;
}

export const BreadcrumbList = forwardRef<HTMLOListElement, BreadcrumbListProps>(
  ({ className, ...props }, ref) => {
    return (
      <ol
        ref={ref}
        className={cn(
          "flex flex-wrap items-center gap-1.5 break-words text-sm text-gray-500",
          className,
        )}
        {...props}
      />
    );
  },
);

BreadcrumbList.displayName = "BreadcrumbList";

/* Breadcrumb Item */
export interface BreadcrumbItemProps extends HTMLAttributes<HTMLLIElement> {
  children: ReactNode;
}

export const BreadcrumbItem = forwardRef<HTMLLIElement, BreadcrumbItemProps>(
  ({ className, ...props }, ref) => {
    return (
      <li
        ref={ref}
        className={cn("inline-flex items-center gap-1.5", className)}
        {...props}
      />
    );
  },
);

BreadcrumbItem.displayName = "BreadcrumbItem";

/* Breadcrumb Link */
export interface BreadcrumbLinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  asChild?: boolean;
  children: ReactNode;
}

export const BreadcrumbLink = forwardRef<
  HTMLAnchorElement,
  BreadcrumbLinkProps
>(({ className, asChild, children, ...props }, ref) => {
  if (asChild && React.isValidElement(children)) {
    return React.cloneElement(
      children as React.ReactElement<{ className?: string }>,
      {
        className: cn(
          "transition-colors hover:text-gray-900",
          className,
          (children as React.ReactElement<{ className?: string }>).props
            .className,
        ),
      },
    );
  }

  return (
    <a
      ref={ref}
      className={cn("transition-colors hover:text-gray-900", className)}
      {...props}
    >
      {children}
    </a>
  );
});

BreadcrumbLink.displayName = "BreadcrumbLink";

/* Breadcrumb Page (current page) */
export interface BreadcrumbPageProps extends HTMLAttributes<HTMLSpanElement> {
  children: ReactNode;
}

export const BreadcrumbPage = forwardRef<HTMLSpanElement, BreadcrumbPageProps>(
  ({ className, ...props }, ref) => {
    return (
      <span
        ref={ref}
        aria-current="page"
        className={cn("font-medium text-gray-900", className)}
        {...props}
      />
    );
  },
);

BreadcrumbPage.displayName = "BreadcrumbPage";

/* Chevron Right Icon */
const ChevronRightIcon = ({ className }: { className?: string }) => (
  <svg
    className={cn("h-3.5 w-3.5", className)}
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="m9 18 6-6-6-6" />
  </svg>
);

/* Breadcrumb Separator */
export interface BreadcrumbSeparatorProps extends HTMLAttributes<HTMLLIElement> {
  children?: ReactNode;
}

export const BreadcrumbSeparator = forwardRef<
  HTMLLIElement,
  BreadcrumbSeparatorProps
>(({ className, children, ...props }, ref) => {
  return (
    <li
      ref={ref}
      role="presentation"
      aria-hidden="true"
      className={cn("[&>svg]:size-3.5", className)}
      {...props}
    >
      {children ?? <ChevronRightIcon />}
    </li>
  );
});

BreadcrumbSeparator.displayName = "BreadcrumbSeparator";

/* Ellipsis Icon */
const EllipsisIcon = ({ className }: { className?: string }) => (
  <svg
    className={cn("h-4 w-4", className)}
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="12" cy="12" r="1" />
    <circle cx="19" cy="12" r="1" />
    <circle cx="5" cy="12" r="1" />
  </svg>
);

/* Breadcrumb Ellipsis */
export interface BreadcrumbEllipsisProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
}

export const BreadcrumbEllipsis = forwardRef<
  HTMLButtonElement,
  BreadcrumbEllipsisProps
>(({ className, ...props }, ref) => {
  return (
    <button
      ref={ref}
      type="button"
      aria-label="Toggle more breadcrumb items"
      className={cn(
        "flex h-6 w-6 items-center justify-center rounded-md hover:bg-gray-100 transition-colors",
        className,
      )}
      {...props}
    >
      <EllipsisIcon />
      <span className="sr-only">More</span>
    </button>
  );
});

BreadcrumbEllipsis.displayName = "BreadcrumbEllipsis";
