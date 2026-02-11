import { describe, it, expect } from "vitest";
import {
  colors,
  typography,
  spacing,
  animations,
  borderRadius,
  shadows,
  zIndex,
  textStyles,
} from "./index";

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

    it("should export surface colors", () => {
      expect(colors.surface).toBeDefined();
      expect(colors.surface.default).toBeDefined();
      expect(colors.surface.raised).toBeDefined();
      expect(colors.surface.sunken).toBeDefined();
      expect(colors.surface.overlay).toBeDefined();
    });

    it("should export interactive colors", () => {
      expect(colors.interactive).toBeDefined();
      expect(colors.interactive.default).toBe("#D38475");
      expect(colors.interactive.hover).toBeDefined();
      expect(colors.interactive.pressed).toBeDefined();
      expect(colors.interactive.disabled).toBeDefined();
    });

    it("should export link colors", () => {
      expect(colors.link).toBeDefined();
      expect(colors.link.default).toBeDefined();
      expect(colors.link.hover).toBeDefined();
      expect(colors.link.visited).toBeDefined();
    });

    it("should export destructive colors", () => {
      expect(colors.destructive).toBeDefined();
      expect(colors.destructive.default).toBe("#EF4444");
      expect(colors.destructive.hover).toBeDefined();
      expect(colors.destructive.bg).toBeDefined();
    });

    it("should export focus colors", () => {
      expect(colors.focus).toBeDefined();
      expect(colors.focus.ring).toBeDefined();
      expect(colors.focus.outline).toBe("#D38475");
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

  describe("Shadows", () => {
    it("should export shadow scale", () => {
      expect(shadows).toBeDefined();
      expect(shadows.none).toBe("none");
      expect(shadows.sm).toBeDefined();
      expect(shadows.md).toBeDefined();
      expect(shadows.lg).toBeDefined();
      expect(shadows.xl).toBeDefined();
      expect(shadows["2xl"]).toBeDefined();
    });

    it("should export focus shadow", () => {
      expect(shadows.focus).toBeDefined();
      expect(shadows.focus).toContain("rgba(211, 132, 117");
    });

    it("should export inner shadow", () => {
      expect(shadows.inner).toBeDefined();
      expect(shadows.inner).toContain("inset");
    });
  });

  describe("Z-Index", () => {
    it("should export z-index scale", () => {
      expect(zIndex).toBeDefined();
      expect(zIndex.base).toBe(0);
      expect(zIndex.dropdown).toBe(1000);
      expect(zIndex.modal).toBe(1050);
      expect(zIndex.tooltip).toBe(1070);
      expect(zIndex.toast).toBe(1080);
    });

    it("should have ascending order for overlapping elements", () => {
      expect(zIndex.dropdown).toBeLessThan(zIndex.sticky);
      expect(zIndex.sticky).toBeLessThan(zIndex.modal);
      expect(zIndex.modal).toBeLessThan(zIndex.popover);
      expect(zIndex.popover).toBeLessThan(zIndex.tooltip);
      expect(zIndex.tooltip).toBeLessThan(zIndex.toast);
    });
  });

  describe("Text Styles", () => {
    it("should export display styles", () => {
      expect(textStyles.display).toBeDefined();
      expect(textStyles.display.lg.fontSize).toBe("3.75rem");
      expect(textStyles.display.md.fontSize).toBe("3rem");
      expect(textStyles.display.sm.fontSize).toBe("2.25rem");
    });

    it("should export heading styles h1-h6", () => {
      expect(textStyles.heading).toBeDefined();
      expect(textStyles.heading.h1).toBeDefined();
      expect(textStyles.heading.h2).toBeDefined();
      expect(textStyles.heading.h3).toBeDefined();
      expect(textStyles.heading.h4).toBeDefined();
      expect(textStyles.heading.h5).toBeDefined();
      expect(textStyles.heading.h6).toBeDefined();
    });

    it("should export body styles", () => {
      expect(textStyles.body).toBeDefined();
      expect(textStyles.body.lg.fontSize).toBe("1.125rem");
      expect(textStyles.body.md.fontSize).toBe("1rem");
      expect(textStyles.body.sm.fontSize).toBe("0.875rem");
    });

    it("should export caption style", () => {
      expect(textStyles.caption).toBeDefined();
      expect(textStyles.caption.fontSize).toBe("0.75rem");
    });

    it("should export overline style", () => {
      expect(textStyles.overline).toBeDefined();
      expect(textStyles.overline.letterSpacing).toBe("0.05em");
      expect(textStyles.overline.fontWeight).toBe("600");
    });

    it("should export label styles", () => {
      expect(textStyles.label).toBeDefined();
      expect(textStyles.label.lg).toBeDefined();
      expect(textStyles.label.md).toBeDefined();
      expect(textStyles.label.sm).toBeDefined();
    });

    it("should include all required properties in each preset", () => {
      const requiredKeys = [
        "fontSize",
        "lineHeight",
        "fontWeight",
        "letterSpacing",
      ];
      requiredKeys.forEach((key) => {
        expect(textStyles.heading.h1).toHaveProperty(key);
        expect(textStyles.body.md).toHaveProperty(key);
        expect(textStyles.caption).toHaveProperty(key);
      });
    });
  });
});
