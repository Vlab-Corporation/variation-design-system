/**
 * Design System Shadow Tokens
 * Elevation system for consistent depth hierarchy
 */
export const shadows = {
  /** No shadow */
  none: "none",
  /** Subtle shadow for cards, inputs */
  sm: "0 0px 2px 0 rgba(0, 0, 0, 0.05)",
  /** Default shadow for dropdowns, popovers */
  md: "0 0px 6px 0px rgba(0, 0, 0, 0.1), 0 0px 4px -2px rgba(0, 0, 0, 0.1)",
  /** Elevated shadow for modals, floating elements */
  lg: "0 0px 15px -2px rgba(0, 0, 0, 0.1), 0 0px 6px -4px rgba(0, 0, 0, 0.1)",
  /** Highest elevation for toasts, tooltips */
  xl: "0 0px 25px -4px rgba(0, 0, 0, 0.1), 0 0px 10px -6px rgba(0, 0, 0, 0.1)",
  /** 2XL for dramatic elevation */
  "2xl": "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
  /** Focus ring shadow (primary color) */
  focus: "0 0 0 3px rgba(254, 112, 112, 0.2)",
  /** Inner shadow for pressed/sunken states */
  inner: "inset 0 2px 4px 0 rgba(0, 0, 0, 0.05)",
  /** Soft uniform shadow for dropdowns and popups */
  dropdown: "0 0 14px 0 rgba(0, 0, 0, 0.1)",
};
