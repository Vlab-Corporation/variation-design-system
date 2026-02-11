/**
 * Design System Semantic Text Style Presets
 * Predefined text style combinations for consistent typography
 *
 * Each preset defines: fontSize, lineHeight, fontWeight, letterSpacing
 * Use these in components or apply via Tailwind classes.
 */

export interface TextStylePreset {
  fontSize: string;
  lineHeight: string;
  fontWeight: string;
  letterSpacing: string;
}

export const textStyles = {
  /** Display styles - Hero sections, landing pages */
  display: {
    lg: {
      fontSize: "3.75rem", // 60px
      lineHeight: "1",
      fontWeight: "700",
      letterSpacing: "-0.025em",
    },
    md: {
      fontSize: "3rem", // 48px
      lineHeight: "1",
      fontWeight: "700",
      letterSpacing: "-0.025em",
    },
    sm: {
      fontSize: "2.25rem", // 36px
      lineHeight: "1.1",
      fontWeight: "700",
      letterSpacing: "-0.025em",
    },
  } satisfies Record<string, TextStylePreset>,

  /** Heading styles - Section headings */
  heading: {
    h1: {
      fontSize: "2.25rem", // 36px
      lineHeight: "2.5rem",
      fontWeight: "700",
      letterSpacing: "-0.025em",
    },
    h2: {
      fontSize: "1.875rem", // 30px
      lineHeight: "2.25rem",
      fontWeight: "600",
      letterSpacing: "-0.025em",
    },
    h3: {
      fontSize: "1.5rem", // 24px
      lineHeight: "2rem",
      fontWeight: "600",
      letterSpacing: "-0.025em",
    },
    h4: {
      fontSize: "1.25rem", // 20px
      lineHeight: "1.75rem",
      fontWeight: "600",
      letterSpacing: "0em",
    },
    h5: {
      fontSize: "1.125rem", // 18px
      lineHeight: "1.75rem",
      fontWeight: "600",
      letterSpacing: "0em",
    },
    h6: {
      fontSize: "1rem", // 16px
      lineHeight: "1.5rem",
      fontWeight: "600",
      letterSpacing: "0em",
    },
  } satisfies Record<string, TextStylePreset>,

  /** Body styles - Paragraph text */
  body: {
    lg: {
      fontSize: "1.125rem", // 18px
      lineHeight: "1.75rem",
      fontWeight: "400",
      letterSpacing: "0em",
    },
    md: {
      fontSize: "1rem", // 16px
      lineHeight: "1.5rem",
      fontWeight: "400",
      letterSpacing: "0em",
    },
    sm: {
      fontSize: "0.875rem", // 14px
      lineHeight: "1.25rem",
      fontWeight: "400",
      letterSpacing: "0em",
    },
  } satisfies Record<string, TextStylePreset>,

  /** Caption - Small supplementary text */
  caption: {
    fontSize: "0.75rem", // 12px
    lineHeight: "1rem",
    fontWeight: "400",
    letterSpacing: "0em",
  } satisfies TextStylePreset,

  /** Overline - Uppercase label text */
  overline: {
    fontSize: "0.75rem", // 12px
    lineHeight: "1rem",
    fontWeight: "600",
    letterSpacing: "0.05em",
  } satisfies TextStylePreset,

  /** Label - Form labels */
  label: {
    lg: {
      fontSize: "1rem",
      lineHeight: "1.5rem",
      fontWeight: "500",
      letterSpacing: "0em",
    },
    md: {
      fontSize: "0.875rem",
      lineHeight: "1.25rem",
      fontWeight: "500",
      letterSpacing: "0em",
    },
    sm: {
      fontSize: "0.75rem",
      lineHeight: "1rem",
      fontWeight: "500",
      letterSpacing: "0em",
    },
  } satisfies Record<string, TextStylePreset>,
};
