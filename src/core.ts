/**
 * Core exports - Framework-agnostic
 * This entry point has NO React dependency.
 * Use this for Astro, Vue, Svelte, vanilla HTML, or any non-React project.
 *
 * Includes: design tokens, utilities, and component style functions.
 */

// Utilities
export { cn } from "./utils/cn";

// Design Tokens
export { colors } from "./tokens/colors";
export { typography } from "./tokens/typography";
export { spacing, borderRadius } from "./tokens/spacing";
export { animations } from "./tokens/animations";

// Component Style Functions (framework-agnostic class generators)
export {
  buttonStyles,
  buttonVariants,
  buttonSizes,
  type ButtonStyleProps,
  type ButtonVariant,
  type ButtonSize,
} from "./components/Button/Button.styles";

export {
  badgeStyles,
  badgeDotStyles,
  badgeVariants,
  badgeSizes,
  badgeShapes,
  type BadgeStyleProps,
  type BadgeVariant,
  type BadgeSize,
  type BadgeShape,
} from "./components/Badge/Badge.styles";

export {
  spinnerStyles,
  spinnerSizes,
  spinnerColors,
  spinnerSpeeds,
  type SpinnerStyleProps,
  type SpinnerSize,
  type SpinnerColor,
  type SpinnerSpeed,
} from "./components/Spinner/Spinner.styles";

export {
  alertStyles,
  alertIconStyles,
  alertDismissStyles,
  alertVariants,
  alertIconColors,
  alertAnimations,
  type AlertStyleProps,
  type AlertVariant,
  type AlertAnimation,
} from "./components/Alert/Alert.styles";

export {
  cardStyles,
  cardVariants,
  cardPaddings,
  type CardStyleProps,
  type CardVariant,
  type CardPadding,
} from "./components/Card/Card.styles";

export {
  inputStyles,
  inputSizes,
  type InputStyleProps,
  type InputSize,
} from "./components/Input/Input.styles";

export {
  syncStatusIndicatorStyles,
  syncStatusTextForState,
  syncStatusConfig,
  type SyncState,
} from "./components/SyncStatus/SyncStatus.styles";
