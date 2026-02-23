/**
 * Design System Semantic Text Style Presets (Figma Display spec)
 *
 * Typography scale defines SIZE only (fontSize + lineHeight + letterSpacing).
 * Font weight is orthogonal — specify it separately via component props.
 *
 * Figma reference weights (for documentation, not enforced here):
 *   Display Lg/Md: Semibold (600)
 *   Heading 1: Semibold (600), Heading 2: Medium (500)
 *   Heading 3: Semibold (600), Heading 4: Regular (400)
 *   Body 1: Semibold (600) or Regular (400)
 *   Body 2/3: Medium (500)
 *   Label: Regular (400) or Medium (500)
 */

export interface TextStylePreset {
  fontSize: string;
  lineHeight: string;
  letterSpacing: string;
}

export const textStyles = {
  /** Display styles - Hero sections, landing pages */
  display: {
    lg: {
      fontSize: "2.75rem", // 44px
      lineHeight: "3.625rem", // 58px
      letterSpacing: "-0.02em",
    },
    md: {
      fontSize: "2.25rem", // 36px
      lineHeight: "2.75rem", // 44px
      letterSpacing: "-0.02em",
    },
  } satisfies Record<string, TextStylePreset>,

  /** Heading styles - Section headings */
  heading: {
    h1: {
      fontSize: "1.875rem", // 30px
      lineHeight: "2.5rem", // 40px
      letterSpacing: "-0.02em",
    },
    h2: {
      fontSize: "1.75rem", // 28px
      lineHeight: "2.25rem", // 36px
      letterSpacing: "-0.02em",
    },
    h3: {
      fontSize: "1.625rem", // 26px
      lineHeight: "2rem", // 32px
      letterSpacing: "-0.02em",
    },
    h4: {
      fontSize: "1.375rem", // 22px
      lineHeight: "1.875rem", // 30px
      letterSpacing: "-0.02em",
    },
  } satisfies Record<string, TextStylePreset>,

  /** Body 1 - 18px, primary reading text */
  body1: {
    fontSize: "1.125rem", // 18px
    lineHeight: "1.75rem", // 28px
    letterSpacing: "-0.02em",
  } satisfies TextStylePreset,

  /** Body 2 - 16px, secondary text */
  body2: {
    fontSize: "1rem", // 16px
    lineHeight: "1.625rem", // 26px
    letterSpacing: "-0.02em",
  } satisfies TextStylePreset,

  /** Body 3 - 14px, supporting text */
  body3: {
    fontSize: "0.875rem", // 14px
    lineHeight: "1.25rem", // 20px
    letterSpacing: "-0.02em",
  } satisfies TextStylePreset,

  /** Label - 12px, form labels and small UI text */
  label: {
    fontSize: "0.75rem", // 12px
    lineHeight: "1rem", // 16px
    letterSpacing: "-0.02em",
  } satisfies TextStylePreset,

  /** Caption - 12px, small supplementary text */
  caption: {
    fontSize: "0.75rem", // 12px
    lineHeight: "1rem", // 16px
    letterSpacing: "-0.02em",
  } satisfies TextStylePreset,

  /** Overline - 12px, uppercase label text */
  overline: {
    fontSize: "0.75rem", // 12px
    lineHeight: "1rem", // 16px
    letterSpacing: "0.05em",
  } satisfies TextStylePreset,
};
