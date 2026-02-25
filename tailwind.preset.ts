/**
 * vlab Corporation Design System - Tailwind CSS Preset
 * Use this preset in your tailwind.config.js:
 *
 * module.exports = {
 *   presets: [require('@vlab-corporation/design-system/tailwind-preset')],
 *   // your config...
 * }
 *
 * All values are sourced from src/tokens/* — do NOT duplicate here.
 */

import { colors } from "./src/tokens/colors";
import { typography } from "./src/tokens/typography";
import { borderRadius } from "./src/tokens/spacing";
import { animations } from "./src/tokens/animations";
import { shadows } from "./src/tokens/shadows";
import { zIndex } from "./src/tokens/zIndex";

/** Convert `default` key to Tailwind's `DEFAULT` convention */
function withDefault<T extends Record<string, unknown>>(
  obj: T,
): T & { DEFAULT?: unknown } {
  if (!("default" in obj)) return obj;
  const { default: defaultVal, ...rest } = obj;
  return { ...rest, DEFAULT: defaultVal } as T & { DEFAULT?: unknown };
}

/** @type {import('tailwindcss').Config} */
const config = {
  theme: {
    extend: {
      colors: {
        primary: colors.primary,
        secondary: colors.secondary,
        gray: colors.gray,
        rwPrimary: colors.rwPrimary,
        accent: colors.accent,
        success: colors.success,
        warning: colors.warning,
        error: colors.error,
        info: colors.info,
        surface: withDefault(colors.surface),
        interactive: withDefault(colors.interactive),
        link: withDefault(colors.link),
        destructive: withDefault(colors.destructive),
      },

      fontFamily: typography.fontFamily,

      // Semantic typography scale only (Tailwind provides generic xs-5xl defaults)
      fontSize: {
        "display-lg": typography.fontSize["display-lg"],
        "display-md": typography.fontSize["display-md"],
        "heading-1": typography.fontSize["heading-1"],
        "heading-2": typography.fontSize["heading-2"],
        "heading-3": typography.fontSize["heading-3"],
        "heading-4": typography.fontSize["heading-4"],
        "body-1": typography.fontSize["body-1"],
        "body-2": typography.fontSize["body-2"],
        "body-3": typography.fontSize["body-3"],
        label: typography.fontSize["label"],
      },

      letterSpacing: {
        tight: typography.letterSpacing.tight,
      },

      borderRadius: {
        card: borderRadius.card,
        button: borderRadius.button,
        pill: borderRadius.pill,
        input: borderRadius.input,
      },

      keyframes: animations.keyframes,
      animation: animations.animation,

      transitionDuration: {
        fast: animations.transitionDuration.fast,
        normal: animations.transitionDuration.normal,
        slow: animations.transitionDuration.slow,
      },

      boxShadow: shadows,

      zIndex: {
        hide: String(zIndex.hide),
        docked: String(zIndex.docked),
        dropdown: String(zIndex.dropdown),
        sticky: String(zIndex.sticky),
        fixed: String(zIndex.fixed),
        "modal-backdrop": String(zIndex.modalBackdrop),
        modal: String(zIndex.modal),
        popover: String(zIndex.popover),
        tooltip: String(zIndex.tooltip),
        toast: String(zIndex.toast),
      },
    },
  },
};

export default config;
