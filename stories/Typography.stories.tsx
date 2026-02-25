import type { Meta, StoryObj } from "@storybook/react";
import { Display, Heading, Text } from "@/components/Typography";

// ── Heading ──────────────────────────────────────────────

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
