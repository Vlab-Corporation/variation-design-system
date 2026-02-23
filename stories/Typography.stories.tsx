import type { Meta, StoryObj } from "@storybook/react";
import { Display, Heading, Text } from "@/components/Typography";

const headingMeta: Meta<typeof Heading> = {
  title: "Components/Typography/Heading",
  component: Heading,
  parameters: {
    layout: "padded",
  },
  tags: ["autodocs"],
  argTypes: {
    level: {
      control: "select",
      options: ["h1", "h2", "h3", "h4", "h5", "h6"],
      description: "Heading level — determines HTML tag and default size",
    },
    color: {
      control: "select",
      options: [
        "default",
        "secondary",
        "muted",
        "inverse",
        "primary",
        "success",
        "warning",
        "error",
        "info",
      ],
      description: "Text color",
    },
    align: {
      control: "select",
      options: ["left", "center", "right"],
      description: "Text alignment",
    },
    truncate: {
      control: "boolean",
      description: "Truncate with ellipsis on overflow",
    },
  },
};

export default headingMeta;
type HeadingStory = StoryObj<typeof headingMeta>;

export const Default: HeadingStory = {
  args: {
    children: "Heading",
    level: "h2",
  },
};

export const AllLevels: HeadingStory = {
  render: () => (
    <div className="flex flex-col gap-4">
      <Heading level="h1">Heading Level 1</Heading>
      <Heading level="h2">Heading Level 2</Heading>
      <Heading level="h3">Heading Level 3</Heading>
      <Heading level="h4">Heading Level 4</Heading>
      <Heading level="h5">Heading Level 5</Heading>
      <Heading level="h6">Heading Level 6</Heading>
    </div>
  ),
};

export const Colors: HeadingStory = {
  render: () => (
    <div className="flex flex-col gap-3">
      <Heading level="h3" color="default">
        Default Color
      </Heading>
      <Heading level="h3" color="primary">
        Primary Color
      </Heading>
      <Heading level="h3" color="secondary">
        Secondary Color
      </Heading>
      <Heading level="h3" color="muted">
        Muted Color
      </Heading>
      <Heading level="h3" color="success">
        Success Color
      </Heading>
      <Heading level="h3" color="error">
        Error Color
      </Heading>
    </div>
  ),
};

export const Truncated: HeadingStory = {
  render: () => (
    <div className="w-64">
      <Heading level="h3" truncate>
        This is a very long heading that should be truncated with ellipsis
      </Heading>
    </div>
  ),
};

// Display stories
export const DisplaySizes: HeadingStory = {
  name: "Display / Sizes",
  render: () => (
    <div className="flex flex-col gap-6">
      <div>
        <p className="text-sm text-gray-500 mb-2">Display Lg — 44px / Semibold</p>
        <Display size="lg">Display Large</Display>
      </div>
      <div>
        <p className="text-sm text-gray-500 mb-2">Display Md — 36px / Semibold</p>
        <Display size="md">Display Medium</Display>
      </div>
    </div>
  ),
};

export const DisplayColors: HeadingStory = {
  name: "Display / Colors",
  render: () => (
    <div className="flex flex-col gap-4">
      <Display size="md" color="default">Default</Display>
      <Display size="md" color="primary">Primary</Display>
      <Display size="md" color="muted">Muted</Display>
    </div>
  ),
};

// Figma Typography Scale showcase
export const FigmaScale: HeadingStory = {
  name: "Figma / Full Scale",
  render: () => (
    <div className="flex flex-col gap-4">
      <div className="border-b pb-2 mb-2">
        <p className="text-sm text-gray-400 mb-1">Display</p>
        <Display size="lg">Display Lg — 44px</Display>
        <Display size="md">Display Md — 36px</Display>
      </div>
      <div className="border-b pb-2 mb-2">
        <p className="text-sm text-gray-400 mb-1">Headings</p>
        <Heading level="h1">Heading 1 — 30px / Semibold</Heading>
        <Heading level="h2">Heading 2 — 28px / Medium</Heading>
        <Heading level="h3">Heading 3 — 26px / Semibold</Heading>
        <Heading level="h4">Heading 4 — 22px / Regular</Heading>
      </div>
      <div className="border-b pb-2 mb-2">
        <p className="text-sm text-gray-400 mb-1">Body</p>
        <Text size="lg" weight="semibold">Body 1 / SB — 18px / Semibold</Text>
        <Text size="lg">Body 1 / R — 18px / Regular</Text>
        <Text weight="medium">Body 2 — 16px / Medium</Text>
        <Text size="sm" weight="medium">Body 3 — 14px / Medium</Text>
      </div>
      <div>
        <p className="text-sm text-gray-400 mb-1">Label</p>
        <Text size="xs">Label / R — 12px / Regular</Text>
        <Text size="xs" weight="medium">Label / M — 12px / Medium</Text>
      </div>
    </div>
  ),
};

// Text component stories
export const TextSizes: HeadingStory = {
  name: "Text / Sizes",
  render: () => (
    <div className="flex flex-col gap-3">
      <Text size="xs">Extra Small Text (xs)</Text>
      <Text size="sm">Small Text (sm)</Text>
      <Text size="base">Base Text (base)</Text>
      <Text size="lg">Large Text (lg)</Text>
      <Text size="xl">Extra Large Text (xl)</Text>
      <Text size="2xl">2XL Text</Text>
    </div>
  ),
};

export const TextWeights: HeadingStory = {
  name: "Text / Weights",
  render: () => (
    <div className="flex flex-col gap-3">
      <Text weight="light">Light Weight</Text>
      <Text weight="normal">Normal Weight</Text>
      <Text weight="medium">Medium Weight</Text>
      <Text weight="semibold">Semibold Weight</Text>
      <Text weight="bold">Bold Weight</Text>
      <Text weight="extrabold">Extrabold Weight</Text>
    </div>
  ),
};

export const TextColors: HeadingStory = {
  name: "Text / Colors",
  render: () => (
    <div className="flex flex-col gap-3">
      <Text color="default">Default Color</Text>
      <Text color="secondary">Secondary Color</Text>
      <Text color="muted">Muted Color</Text>
      <Text color="primary">Primary Color</Text>
      <Text color="success">Success Color</Text>
      <Text color="warning">Warning Color</Text>
      <Text color="error">Error Color</Text>
      <Text color="info">Info Color</Text>
    </div>
  ),
};

export const TextMono: HeadingStory = {
  name: "Text / Monospace",
  render: () => (
    <div className="flex flex-col gap-3">
      <Text>Regular text with sans-serif font</Text>
      <Text mono>Monospace text with JetBrains Mono</Text>
      <Text mono size="sm" color="muted">
        const greeting = &quot;Hello, World!&quot;;
      </Text>
    </div>
  ),
};
