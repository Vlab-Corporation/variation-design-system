import { describe, it, expect } from "vitest";
import { colors, typography, spacing, animations, borderRadius } from "./index";

describe("Design Tokens", () => {
  describe("Colors", () => {
    it("should export primary color scale", () => {
      expect(colors.primary).toBeDefined();
      expect(colors.primary["500"]).toBe("#D38475");
    });

    it("should export full primary color scale (50-950)", () => {
      const scales = [
        "50",
        "100",
        "200",
        "300",
        "400",
        "500",
        "600",
        "700",
        "800",
        "900",
        "950",
      ] as const;
      scales.forEach((scale) => {
        expect(colors.primary[scale]).toBeDefined();
      });
    });

    it("should export secondary color scale", () => {
      expect(colors.secondary).toBeDefined();
      expect(colors.secondary["100"]).toBeDefined();
    });

    it("should export semantic colors", () => {
      expect(colors.success).toBeDefined();
      expect(colors.warning).toBeDefined();
      expect(colors.error).toBeDefined();
      expect(colors.info).toBeDefined();
    });

    it("should export gray scale", () => {
      expect(colors.gray).toBeDefined();
      expect(colors.gray["500"]).toBeDefined();
    });

    it("should export background colors", () => {
      expect(colors.background).toBeDefined();
      expect(colors.background.default).toBeDefined();
      expect(colors.background.card).toBeDefined();
    });
  });

  describe("Typography", () => {
    it("should export font family", () => {
      expect(typography.fontFamily).toBeDefined();
      expect(typography.fontFamily.sans).toBeDefined();
    });

    it("should export font sizes", () => {
      expect(typography.fontSize).toBeDefined();
      expect(typography.fontSize.sm).toBeDefined();
      expect(typography.fontSize.base).toBeDefined();
      expect(typography.fontSize.lg).toBeDefined();
    });

    it("should export font weights", () => {
      expect(typography.fontWeight).toBeDefined();
      expect(typography.fontWeight.normal).toBeDefined();
      expect(typography.fontWeight.medium).toBeDefined();
      expect(typography.fontWeight.semibold).toBeDefined();
      expect(typography.fontWeight.bold).toBeDefined();
    });

    it("should export line heights", () => {
      expect(typography.lineHeight).toBeDefined();
      expect(typography.lineHeight.tight).toBeDefined();
      expect(typography.lineHeight.normal).toBeDefined();
      expect(typography.lineHeight.relaxed).toBeDefined();
    });
  });

  describe("Spacing", () => {
    it("should export base spacing units", () => {
      expect(spacing).toBeDefined();
      expect(spacing["1"]).toBe("0.25rem");
      expect(spacing["2"]).toBe("0.5rem");
      expect(spacing["4"]).toBe("1rem");
    });

    it("should export extended spacing", () => {
      expect(spacing["0.5"]).toBe("0.125rem");
      expect(spacing["1.5"]).toBe("0.375rem");
      expect(spacing["2.5"]).toBe("0.625rem");
    });
  });

  describe("Animations", () => {
    it("should export animation keyframes", () => {
      expect(animations.keyframes).toBeDefined();
      expect(animations.keyframes.fadeIn).toBeDefined();
      expect(animations.keyframes.fadeOut).toBeDefined();
      expect(animations.keyframes.slideUp).toBeDefined();
      expect(animations.keyframes.slideDown).toBeDefined();
    });

    it("should export animation definitions", () => {
      expect(animations.animation).toBeDefined();
      expect(animations.animation["fade-in"]).toBeDefined();
      expect(animations.animation["fade-out"]).toBeDefined();
      expect(animations.animation["slide-up"]).toBeDefined();
      expect(animations.animation["slide-down"]).toBeDefined();
    });

    it("should export subtle pulse animation", () => {
      expect(animations.animation["pulse-subtle"]).toBeDefined();
    });

    it("should export spin animations", () => {
      expect(animations.animation["spin-slow"]).toBeDefined();
      expect(animations.animation["spin-fast"]).toBeDefined();
    });

    it("should export transition durations", () => {
      expect(animations.transitionDuration).toBeDefined();
      expect(animations.transitionDuration.fast).toBe("150ms");
      expect(animations.transitionDuration.normal).toBe("200ms");
      expect(animations.transitionDuration.slow).toBe("300ms");
    });

    it("should export scale-in animation", () => {
      expect(animations.animation["scale-in"]).toBeDefined();
    });
  });

  describe("Border Radius", () => {
    it("should export border radius tokens", () => {
      expect(borderRadius).toBeDefined();
      expect(borderRadius.none).toBe("0");
      expect(borderRadius.sm).toBeDefined();
      expect(borderRadius.md).toBeDefined();
      expect(borderRadius.lg).toBeDefined();
      expect(borderRadius.full).toBe("9999px");
    });

    it("should export semantic border radius", () => {
      expect(borderRadius.card).toBeDefined();
      expect(borderRadius.button).toBeDefined();
    });
  });
});
