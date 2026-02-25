/**
 * Theme system for accent color customization.
 * Provides pre-built themes and a utility to apply them at runtime.
 */

export interface AccentTheme {
  name: string;
  variables: Record<string, string>;
}

export const variationTheme: AccentTheme = {
  name: "variation",
  variables: {
    "--accent-50": "255 245 245",
    "--accent-100": "255 232 232",
    "--accent-200": "255 222 222",
    "--accent-300": "255 211 211",
    "--accent-400": "255 180 180",
    "--accent-500": "255 146 146",
    "--accent-600": "254 112 112",
    "--accent-700": "246 95 95",
    "--accent-800": "238 78 78",
    "--accent-900": "201 54 54",
    "--accent-950": "122 32 32",
  },
};

export const rehabworksTheme: AccentTheme = {
  name: "rehabworks",
  variables: {
    "--accent-50": "250 250 255",
    "--accent-100": "245 245 255",
    "--accent-200": "238 238 255",
    "--accent-300": "219 219 255",
    "--accent-400": "183 183 255",
    "--accent-500": "148 148 254",
    "--accent-600": "112 112 254",
    "--accent-700": "88 88 255",
    "--accent-800": "65 65 255",
    "--accent-900": "47 47 217",
    "--accent-950": "30 30 138",
  },
};

/**
 * Apply a theme to an element by setting CSS custom properties.
 * Typically called with `document.documentElement` as the target.
 *
 * @example
 * ```ts
 * import { applyTheme, rehabworksTheme } from '@vlab-corporation/design-system/core';
 * applyTheme(document.documentElement, rehabworksTheme);
 * ```
 */
export function applyTheme(element: HTMLElement, theme: AccentTheme): void {
  for (const [prop, value] of Object.entries(theme.variables)) {
    element.style.setProperty(prop, value);
  }
}
