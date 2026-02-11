/**
 * Design System Z-Index Tokens
 * Consistent stacking context scale for layered UI elements
 */
export const zIndex = {
  /** Hidden below normal flow */
  hide: -1,
  /** Default stacking (auto) */
  base: 0,
  /** Slightly raised elements */
  docked: 10,
  /** Dropdown menus */
  dropdown: 1000,
  /** Sticky headers/sidebars */
  sticky: 1020,
  /** Fixed elements (e.g., floating action buttons) */
  fixed: 1030,
  /** Modal backdrop overlay */
  modalBackdrop: 1040,
  /** Modal dialog */
  modal: 1050,
  /** Popover content */
  popover: 1060,
  /** Tooltip content */
  tooltip: 1070,
  /** Toast notifications */
  toast: 1080,
};
