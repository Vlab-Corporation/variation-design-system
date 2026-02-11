/**
 * Design System Color Tokens
 * Based on Variation Design System brand colors
 */
export const colors = {
  // Primary - Warm terracotta
  primary: {
    "50": "#FDF8F7",
    "100": "#FBEFED",
    "200": "#F5DCD7",
    "300": "#EEC3BB",
    "400": "#E29C8F",
    "500": "#D38475", // Main brand color
    "600": "#C06A59",
    "700": "#A15548",
    "800": "#84463C",
    "900": "#6D3B33",
    "950": "#3A1E1A",
  },

  // Secondary - Complementary palette
  secondary: {
    "50": "#F8F7F6",
    "100": "#EEE7DF", // Cream background
    "200": "#E5DCD2",
    "300": "#D4C8BA",
    "400": "#BBA898",
    "500": "#A28B78",
    "600": "#8D7565",
    "700": "#756054",
    "800": "#615047",
    "900": "#52443D",
    "950": "#2B231F",
  },

  // Gray scale
  gray: {
    "50": "#F9FAFB",
    "100": "#F3F4F6",
    "200": "#E5E7EB",
    "300": "#D1D5DB",
    "400": "#9CA3AF",
    "500": "#6B7280",
    "600": "#4B5563",
    "700": "#374151",
    "800": "#1F2937",
    "900": "#111827",
    "950": "#030712",
  },

  // Semantic colors
  success: {
    "50": "#F0FDF4",
    "100": "#DCFCE7",
    "200": "#BBF7D0",
    "300": "#86EFAC",
    "400": "#4ADE80",
    "500": "#22C55E",
    "600": "#16A34A",
    "700": "#15803D",
    "800": "#166534",
    "900": "#14532D",
    "950": "#052E16",
  },

  warning: {
    "50": "#FFFBEB",
    "100": "#FEF3C7",
    "200": "#FDE68A",
    "300": "#FCD34D",
    "400": "#FBBF24",
    "500": "#F59E0B",
    "600": "#D97706",
    "700": "#B45309",
    "800": "#92400E",
    "900": "#78350F",
    "950": "#451A03",
  },

  error: {
    "50": "#FEF2F2",
    "100": "#FEE2E2",
    "200": "#FECACA",
    "300": "#FCA5A5",
    "400": "#F87171",
    "500": "#EF4444",
    "600": "#DC2626",
    "700": "#B91C1C",
    "800": "#991B1B",
    "900": "#7F1D1D",
    "950": "#450A0A",
  },

  info: {
    "50": "#EFF6FF",
    "100": "#DBEAFE",
    "200": "#BFDBFE",
    "300": "#93C5FD",
    "400": "#60A5FA",
    "500": "#3B82F6",
    "600": "#2563EB",
    "700": "#1D4ED8",
    "800": "#1E40AF",
    "900": "#1E3A8A",
    "950": "#172554",
  },

  // Background colors
  background: {
    default: "#FFFFFF",
    card: "#FFFFFF",
    muted: "#F9FAFB",
    overlay: "rgba(0, 0, 0, 0.5)",
  },

  // Text colors
  text: {
    primary: "#111827",
    secondary: "#6B7280",
    muted: "#9CA3AF",
    inverse: "#FFFFFF",
  },

  // Border colors
  border: {
    default: "#E5E7EB",
    focus: "#D38475",
  },

  // Surface colors - Background layers for elevation hierarchy
  surface: {
    default: "#FFFFFF",
    raised: "#FFFFFF",
    sunken: "#F3F4F6",
    overlay: "rgba(0, 0, 0, 0.5)",
  },

  // Interactive colors - States for interactive elements
  interactive: {
    default: "#D38475",
    hover: "#C06A59",
    pressed: "#A15548",
    disabled: "#D1D5DB",
  },

  // Link colors
  link: {
    default: "#3B82F6",
    hover: "#2563EB",
    visited: "#7C3AED",
  },

  // Destructive colors - Danger/delete actions (distinct from error feedback)
  destructive: {
    default: "#EF4444",
    hover: "#DC2626",
    pressed: "#B91C1C",
    text: "#991B1B",
    bg: "#FEF2F2",
  },

  // Focus ring
  focus: {
    ring: "rgba(211, 132, 117, 0.2)",
    outline: "#D38475",
  },
};
