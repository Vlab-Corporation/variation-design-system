/**
 * Design System Animation Tokens
 * Subtle, purposeful animations that enhance UX without being distracting
 */
export const animations = {
  // Keyframes definitions
  keyframes: {
    fadeIn: {
      "0%": { opacity: "0" },
      "100%": { opacity: "1" },
    },
    fadeOut: {
      "0%": { opacity: "1" },
      "100%": { opacity: "0" },
    },
    slideUp: {
      "0%": { opacity: "0", transform: "translateY(8px)" },
      "100%": { opacity: "1", transform: "translateY(0)" },
    },
    slideDown: {
      "0%": { opacity: "0", transform: "translateY(-8px)" },
      "100%": { opacity: "1", transform: "translateY(0)" },
    },
    slideLeft: {
      "0%": { opacity: "0", transform: "translateX(8px)" },
      "100%": { opacity: "1", transform: "translateX(0)" },
    },
    slideRight: {
      "0%": { opacity: "0", transform: "translateX(-8px)" },
      "100%": { opacity: "1", transform: "translateX(0)" },
    },
    scaleIn: {
      "0%": { opacity: "0", transform: "scale(0.95)" },
      "100%": { opacity: "1", transform: "scale(1)" },
    },
    scaleOut: {
      "0%": { opacity: "1", transform: "scale(1)" },
      "100%": { opacity: "0", transform: "scale(0.95)" },
    },
    pulseSubtle: {
      "0%, 100%": { opacity: "1" },
      "50%": { opacity: "0.7" },
    },
    shimmer: {
      "0%": { backgroundPosition: "-200% 0" },
      "100%": { backgroundPosition: "200% 0" },
    },
    // Spin keyframe is built into Tailwind, but we define speeds
    spinSlow: {
      "0%": { transform: "rotate(0deg)" },
      "100%": { transform: "rotate(360deg)" },
    },
    spinFast: {
      "0%": { transform: "rotate(0deg)" },
      "100%": { transform: "rotate(360deg)" },
    },
  },

  // Animation definitions (name: duration timing-function)
  animation: {
    "fade-in": "fadeIn 200ms ease-out",
    "fade-out": "fadeOut 200ms ease-out",
    "slide-up": "slideUp 300ms ease-out",
    "slide-down": "slideDown 300ms ease-out",
    "slide-left": "slideLeft 300ms ease-out",
    "slide-right": "slideRight 300ms ease-out",
    "scale-in": "scaleIn 200ms ease-out",
    "scale-out": "scaleOut 200ms ease-out",
    "pulse-subtle": "pulseSubtle 2s ease-in-out infinite",
    shimmer: "shimmer 2s ease-in-out infinite",
    "spin-slow": "spin 1.5s linear infinite",
    "spin-fast": "spin 0.5s linear infinite",
  },

  // Transition durations
  transitionDuration: {
    "0": "0ms",
    fast: "150ms",
    normal: "200ms",
    slow: "300ms",
    slower: "500ms",
  },

  // Transition timing functions
  transitionTimingFunction: {
    DEFAULT: "cubic-bezier(0.4, 0, 0.2, 1)",
    linear: "linear",
    in: "cubic-bezier(0.4, 0, 1, 1)",
    out: "cubic-bezier(0, 0, 0.2, 1)",
    "in-out": "cubic-bezier(0.4, 0, 0.2, 1)",
    bounce: "cubic-bezier(0.68, -0.55, 0.265, 1.55)",
  },
};
