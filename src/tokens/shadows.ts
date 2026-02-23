/**
 * Design System Shadow Tokens
 * Elevation system for consistent depth hierarchy
 */
export const shadows = {
  /** No shadow */
  none: "none",
  /** Subtle shadow for cards, inputs */
  sm: "0 1px 2px 0 rgba(0, 0, 0, 0.05)",
  /** Default shadow for dropdowns, popovers */
  md: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -2px rgba(0, 0, 0, 0.1)",
  /** Elevated shadow for modals, floating elements */
  lg: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -4px rgba(0, 0, 0, 0.1)",
  /** Highest elevation for toasts, tooltips */
  xl: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)",
  /** 2XL for dramatic elevation */
  "2xl": "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
  /** Focus ring shadow (primary color) */
  focus: "0 0 0 3px rgba(254, 112, 112, 0.2)",
  /** Inner shadow for pressed/sunken states */
  inner: "inset 0 2px 4px 0 rgba(0, 0, 0, 0.06)",
};
