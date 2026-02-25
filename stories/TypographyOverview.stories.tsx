import type { Meta, StoryObj } from "@storybook/react";
import { Display, Heading, Text } from "@/components/Typography";

const meta: Meta = {
  title: "Components/Typography/Overview",
  parameters: {
    layout: "padded",
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const FigmaFullScale: Story = {
  name: "Figma Full Scale",
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
        <Text size="lg" weight="semibold">
          Body 1 / SB — 18px / Semibold
        </Text>
        <Text size="lg">Body 1 / R — 18px / Regular</Text>
        <Text weight="medium">Body 2 — 16px / Medium</Text>
        <Text size="sm" weight="medium">
          Body 3 — 14px / Medium
        </Text>
      </div>
      <div>
        <p className="text-sm text-gray-400 mb-1">Label</p>
        <Text size="xs">Label / R — 12px / Regular</Text>
        <Text size="xs" weight="medium">
          Label / M — 12px / Medium
        </Text>
      </div>
    </div>
  ),
};
