/**
 * Design System Typography Tokens
 */
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
    xs: ["0.75rem", { lineHeight: "1rem" }],
    sm: ["0.875rem", { lineHeight: "1.25rem" }],
    base: ["1rem", { lineHeight: "1.5rem" }],
    lg: ["1.125rem", { lineHeight: "1.75rem" }],
    xl: ["1.25rem", { lineHeight: "1.75rem" }],
    "2xl": ["1.5rem", { lineHeight: "2rem" }],
    "3xl": ["1.875rem", { lineHeight: "2.25rem" }],
    "4xl": ["2.25rem", { lineHeight: "2.5rem" }],
    "5xl": ["3rem", { lineHeight: "1" }],
    // Semantic scale (Figma Display spec)
    "display-lg": ["2.75rem", { lineHeight: "3.625rem" }],
    "display-md": ["2.25rem", { lineHeight: "2.75rem" }],
    "heading-1": ["1.875rem", { lineHeight: "2.5rem" }],
    "heading-2": ["1.75rem", { lineHeight: "2.25rem" }],
    "heading-3": ["1.625rem", { lineHeight: "2rem" }],
    "heading-4": ["1.375rem", { lineHeight: "1.875rem" }],
    "body-1": ["1.125rem", { lineHeight: "1.75rem" }],
    "body-2": ["1rem", { lineHeight: "1.625rem" }],
    "body-3": ["0.875rem", { lineHeight: "1.25rem" }],
    label: ["0.75rem", { lineHeight: "1rem" }],
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
