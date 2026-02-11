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
export { shadows } from "./tokens/shadows";
export { zIndex } from "./tokens/zIndex";
export {
  textStyles as textStylePresets,
  type TextStylePreset,
} from "./tokens/textStyles";

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

// Phase 1 Style Functions
export {
  headingStyles,
  textStyles,
  headingLevelStyles,
  textSizes,
  textWeights,
  textColors,
  textAligns,
  type HeadingStyleProps,
  type TextStyleProps,
  type HeadingLevel,
  type TextSize,
  type TextWeight,
  type TextColor,
  type TextAlign,
} from "./components/Typography/Typography.styles";

export {
  checkboxStyles,
  checkboxWrapperStyles,
  checkboxSizes,
  checkboxLabelSizes,
  checkboxIconSizes,
  type CheckboxStyleProps,
  type CheckboxWrapperStyleProps,
  type CheckboxSize,
} from "./components/Checkbox/Checkbox.styles";

export {
  radioStyles,
  radioGroupStyles,
  radioSizes,
  radioLabelSizes,
  radioInnerSizes,
  type RadioStyleProps,
  type RadioGroupStyleProps,
  type RadioSize,
  type RadioGroupOrientation,
} from "./components/Radio/Radio.styles";

export {
  selectStyles,
  selectSizes,
  selectIconSizes,
  type SelectStyleProps,
  type SelectSize,
} from "./components/Select/Select.styles";

export {
  textareaStyles,
  textareaSizes,
  type TextareaStyleProps,
  type TextareaSize,
} from "./components/Textarea/Textarea.styles";

export {
  switchTrackStyles,
  switchThumbStyles,
  switchTrackSizes,
  switchThumbSizes,
  switchThumbTranslate,
  switchLabelSizes,
  type SwitchTrackStyleProps,
  type SwitchThumbStyleProps,
  type SwitchSize,
} from "./components/Switch/Switch.styles";

export {
  modalOverlayStyles,
  modalContentStyles,
  modalHeaderStyles,
  modalBodyStyles,
  modalFooterStyles,
  modalCloseStyles,
  modalSizes,
  type ModalOverlayStyleProps,
  type ModalContentStyleProps,
  type ModalSize,
} from "./components/Modal/Modal.styles";

export {
  toastStyles,
  toastContainerStyles,
  toastVariants,
  toastIconColors,
  toastPositions,
  type ToastStyleProps,
  type ToastContainerStyleProps,
  type ToastVariant,
  type ToastPosition,
} from "./components/Toast/Toast.styles";

export {
  dropdownMenuContentStyles,
  dropdownMenuItemStyles,
  dropdownMenuSeparatorStyles,
  dropdownMenuLabelStyles,
  dropdownMenuAligns,
  type DropdownMenuContentStyleProps,
  type DropdownMenuAlign,
} from "./components/DropdownMenu/DropdownMenu.styles";

export {
  tooltipStyles,
  tooltipPlacements,
  tooltipArrows,
  type TooltipStyleProps,
  type TooltipPlacement,
} from "./components/Tooltip/Tooltip.styles";

// Phase 2 Style Functions
export {
  stackStyles,
  stackDirections,
  stackAligns,
  stackJustifies,
  stackGaps,
  type StackStyleProps,
  type StackDirection,
  type StackAlign,
  type StackJustify,
  type StackGap,
} from "./components/Stack/Stack.styles";

export {
  tabsListStyles,
  tabStyles,
  tabPanelStyles,
  tabsListVariants,
  tabVariants,
  tabSizes,
  type TabsListStyleProps,
  type TabStyleProps,
  type TabsVariant,
  type TabsSize,
} from "./components/Tabs/Tabs.styles";

export {
  paginationStyles,
  paginationItemStyles,
  paginationSizes,
  type PaginationStyleProps,
  type PaginationItemStyleProps,
  type PaginationSize,
} from "./components/Pagination/Pagination.styles";

export {
  avatarStyles,
  avatarImageStyles,
  avatarSizes,
  avatarShapes,
  type AvatarStyleProps,
  type AvatarSize,
  type AvatarShape,
} from "./components/Avatar/Avatar.styles";

export {
  skeletonStyles,
  skeletonVariants,
  type SkeletonStyleProps,
  type SkeletonVariant,
} from "./components/Skeleton/Skeleton.styles";

export {
  popoverStyles,
  popoverPlacements,
  type PopoverStyleProps,
  type PopoverPlacement,
} from "./components/Popover/Popover.styles";

export {
  separatorStyles,
  separatorOrientations,
  type SeparatorStyleProps,
  type SeparatorOrientation,
} from "./components/Separator/Separator.styles";

// Phase 4 Style Functions
export {
  accordionStyles,
  accordionTriggerStyles,
  accordionContentStyles,
  accordionContentInnerStyles,
  accordionItemSeparatedStyles,
  accordionVariants,
  type AccordionStyleProps,
  type AccordionVariant,
} from "./components/Accordion/Accordion.styles";

export {
  progressTrackStyles,
  progressBarStyles,
  progressSizes,
  progressVariants,
  type ProgressStyleProps,
  type ProgressBarStyleProps,
  type ProgressSize,
  type ProgressVariant,
} from "./components/Progress/Progress.styles";

export {
  tagStyles,
  tagRemoveStyles,
  tagVariants,
  tagSizes,
  type TagStyleProps,
  type TagVariant,
  type TagSize,
} from "./components/Tag/Tag.styles";

export {
  stepperStyles,
  stepStyles,
  stepIndicatorStyles,
  stepConnectorStyles,
  stepLabelStyles,
  stepDescriptionStyles,
  type StepperStyleProps,
  type StepperOrientation,
  type StepStatus,
} from "./components/Stepper/Stepper.styles";

export {
  calendarStyles,
  calendarHeaderStyles,
  calendarNavButtonStyles,
  calendarTitleStyles,
  calendarGridStyles,
  calendarWeekdayStyles,
  calendarDayStyles,
  type CalendarStyleProps,
} from "./components/Calendar/Calendar.styles";

export {
  emptyStateStyles,
  emptyStateIconStyles,
  emptyStateTitleStyles,
  emptyStateDescriptionStyles,
  emptyStateSizes,
  type EmptyStateStyleProps,
  type EmptyStateSize,
} from "./components/EmptyState/EmptyState.styles";

export {
  commandPaletteOverlayStyles,
  commandPaletteStyles,
  commandPaletteInputStyles,
  commandPaletteListStyles,
  commandPaletteGroupStyles,
  commandPaletteItemStyles,
  commandPaletteEmptyStyles,
  commandPaletteShortcutStyles,
  type CommandPaletteStyleProps,
} from "./components/CommandPalette/CommandPalette.styles";
