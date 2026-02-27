/**
 * Design System Typography Tokens
 */
type FontSizeEntry = [string, { lineHeight: string }];

export const typography = {
  fontFamily: {
    sans: [
      "Pretendard",
      "-apple-system",
      "BlinkMacSystemFont",
      "system-ui",
      "Roboto",
      '"Helvetica Neue"',
      '"Segoe UI"',
      '"Apple SD Gothic Neo"',
      '"Noto Sans KR"',
      '"Malgun Gothic"',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
      "sans-serif",
    ],
    mono: [
      "JetBrains Mono",
      "ui-monospace",
      "SFMono-Regular",
      "Menlo",
      "Monaco",
      "Consolas",
      '"Liberation Mono"',
      '"Courier New"',
      "monospace",
    ],
  },

  fontSize: {
    // Generic scale (Tailwind-compatible)
    xs: ["0.75rem", { lineHeight: "1rem" }] as FontSizeEntry,
    sm: ["0.875rem", { lineHeight: "1.25rem" }] as FontSizeEntry,
    base: ["1rem", { lineHeight: "1.5rem" }] as FontSizeEntry,
    lg: ["1.125rem", { lineHeight: "1.75rem" }] as FontSizeEntry,
    xl: ["1.25rem", { lineHeight: "1.75rem" }] as FontSizeEntry,
    "2xl": ["1.5rem", { lineHeight: "2rem" }] as FontSizeEntry,
    "3xl": ["1.875rem", { lineHeight: "2.25rem" }] as FontSizeEntry,
    "4xl": ["2.25rem", { lineHeight: "2.5rem" }] as FontSizeEntry,
    "5xl": ["3rem", { lineHeight: "1" }] as FontSizeEntry,
    // Semantic scale (Figma Display spec)
    "display-lg": ["2.75rem", { lineHeight: "3.625rem" }] as FontSizeEntry,
    "display-md": ["2.25rem", { lineHeight: "2.75rem" }] as FontSizeEntry,
    "heading-1": ["1.875rem", { lineHeight: "2.5rem" }] as FontSizeEntry,
    "heading-2": ["1.75rem", { lineHeight: "2.25rem" }] as FontSizeEntry,
    "heading-3": ["1.625rem", { lineHeight: "2rem" }] as FontSizeEntry,
    "heading-4": ["1.375rem", { lineHeight: "1.875rem" }] as FontSizeEntry,
    "body-1": ["1.125rem", { lineHeight: "1.75rem" }] as FontSizeEntry,
    "body-2": ["1rem", { lineHeight: "1.625rem" }] as FontSizeEntry,
    "body-3": ["0.875rem", { lineHeight: "1.25rem" }] as FontSizeEntry,
    label: ["0.75rem", { lineHeight: "1rem" }] as FontSizeEntry,
  },

  fontWeight: {
    thin: "100",
    extralight: "200",
    light: "300",
    normal: "400",
    medium: "500",
    semibold: "600",
    bold: "700",
    extrabold: "800",
    black: "900",
  },

  lineHeight: {
    none: "1",
    tight: "1.25",
    snug: "1.375",
    normal: "1.5",
    relaxed: "1.625",
    loose: "2",
  },

  letterSpacing: {
    tighter: "-0.05em",
    tight: "-0.02em",
    normal: "0em",
    wide: "0.025em",
    wider: "0.05em",
    widest: "0.1em",
  },
};
