/**
 * Design System Color Tokens
 * Based on Variation Design System brand colors
 */
export const colors = {
  // Primary - Variation Coral Red
  primary: {
    "50": "#FFF5F5",
    "100": "#FFE8E8",
    "200": "#FFDEDE",
    "300": "#FFD3D3", // From spec
    "400": "#FFB4B4", // From spec
    "500": "#FF9292", // From spec
    "600": "#FE7070", // Main brand color (from spec)
    "700": "#F65F5F",
    "800": "#EE4E4E", // From spec
    "900": "#C93636",
    "950": "#7A2020",
  },

  // Secondary - Complementary palette
  secondary: {
    "50": "#F8F7F6",
    "100": "#EEE7DF",
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

  // Gray scale - Neutral colors for backgrounds, icons, and division lines
  gray: {
    "50": "#F8F9FA",
    "100": "#F1F3F5",
    "200": "#E9ECEF",
    "300": "#DEE2E6",
    "400": "#CED4DA",
    "500": "#ADB5BD",
    "600": "#868E96",
    "700": "#495057",
    "800": "#343A40",
    "900": "#212529",
    "950": "#121416",
  },

  // RW Primary - RehabWorks violet-blue palette
  rwPrimary: {
    "100": "#F5F5FF",
    "200": "#EEEEFF",
    "300": "#DBDBFF",
    "400": "#B7B7FF",
    "600": "#7070FE",
    "800": "#4141FF",
  },

  // Base colors
  white: "#FFFFFF",
  black: "#000000",

  // Semantic colors
  success: {
    "50": "#F0FFF9",
    "100": "#E6FCF5", // From spec
    "200": "#B2F5E0",
    "300": "#76EDCC",
    "400": "#38E5B4",
    "500": "#12DCA0",
    "600": "#00D897", // From spec
    "700": "#00B37D",
    "800": "#008F64",
    "900": "#006B4C",
    "950": "#003D2B",
  },

  warning: {
    "50": "#FFFCF0",
    "100": "#FFF9DB", // From spec
    "200": "#FFE8A3",
    "300": "#FFD666",
    "400": "#FFC233",
    "500": "#FF8C00",
    "600": "#F76707", // From spec
    "700": "#CC5500",
    "800": "#A34400",
    "900": "#7A3300",
    "950": "#421C00",
  },

  error: {
    "50": "#FFF5F5",
    "100": "#FFE3E4", // From spec
    "200": "#FFC9CA",
    "300": "#FFA3A4",
    "400": "#F87171",
    "500": "#F45252",
    "600": "#F13E3E", // From spec
    "700": "#D32F2F",
    "800": "#B71C1C",
    "900": "#8B1A1A",
    "950": "#4A0E0E",
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
    muted: "#F8F9FA",
    overlay: "rgba(0, 0, 0, 0.5)",
  },

  // Text colors
  text: {
    primary: "#212529",
    secondary: "#868E96",
    muted: "#ADB5BD",
    inverse: "#FFFFFF",
  },

  // Border colors
  border: {
    default: "#DEE2E6",
    focus: "#FE7070",
  },

  // Surface colors - Background layers for elevation hierarchy
  surface: {
    default: "#FFFFFF",
    raised: "#FFFFFF",
    sunken: "#F1F3F5",
    overlay: "rgba(0, 0, 0, 0.5)",
  },

  // Interactive colors - States for interactive elements
  interactive: {
    default: "#FE7070",
    hover: "#F65F5F",
    pressed: "#EE4E4E",
    disabled: "#CED4DA",
  },

  // Link colors
  link: {
    default: "#3B82F6",
    hover: "#2563EB",
    visited: "#7C3AED",
  },

  // Destructive colors - Danger/delete actions (distinct from error feedback)
  destructive: {
    default: "#F13E3E",
    hover: "#D32F2F",
    pressed: "#B71C1C",
    text: "#8B1A1A",
    bg: "#FFE3E4",
  },

  // Focus ring
  focus: {
    ring: "rgba(254, 112, 112, 0.2)",
    outline: "#FE7070",
  },
};
