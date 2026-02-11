import type { Meta, StoryObj } from "@storybook/react";
import { Stack, VStack, HStack } from "@/components/Stack";

const meta: Meta<typeof Stack> = {
  title: "Components/Stack",
  component: Stack,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    direction: {
      control: "select",
      options: ["row", "column"],
      description: "Flex direction",
    },
    gap: {
      control: "select",
      options: ["0", "1", "2", "3", "4", "5", "6", "8", "10", "12", "16"],
      description: "Gap between children",
    },
    align: {
      control: "select",
      options: ["start", "center", "end", "stretch", "baseline"],
      description: "Align items",
    },
    justify: {
      control: "select",
      options: ["start", "center", "end", "between", "around", "evenly"],
      description: "Justify content",
    },
    wrap: {
      control: "boolean",
      description: "Enable flex-wrap",
    },
    inline: {
      control: "boolean",
      description: "Use inline-flex instead of flex",
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

const Box = ({ children }: { children: React.ReactNode }) => (
  <div className="bg-primary/20 border border-primary/40 rounded-md px-4 py-2 text-sm font-medium">
    {children}
  </div>
);

// Default (column)
export const Default: Story = {
  args: {
    direction: "column",
    gap: "4",
  },
  render: (args) => (
    <Stack {...args}>
      <Box>Item 1</Box>
      <Box>Item 2</Box>
      <Box>Item 3</Box>
    </Stack>
  ),
};

// Row direction
export const Row: Story = {
  args: {
    direction: "row",
    gap: "4",
  },
  render: (args) => (
    <Stack {...args}>
      <Box>Item 1</Box>
      <Box>Item 2</Box>
      <Box>Item 3</Box>
    </Stack>
  ),
};

// Column direction
export const Column: Story = {
  args: {
    direction: "column",
    gap: "4",
  },
  render: (args) => (
    <Stack {...args}>
      <Box>Item 1</Box>
      <Box>Item 2</Box>
      <Box>Item 3</Box>
    </Stack>
  ),
};

// Different gap sizes
export const GapSizes: Story = {
  render: () => (
    <VStack gap="8">
      <div>
        <p className="text-sm text-gray-500 mb-2">gap=&quot;0&quot;</p>
        <HStack gap="0">
          <Box>A</Box>
          <Box>B</Box>
          <Box>C</Box>
        </HStack>
      </div>
      <div>
        <p className="text-sm text-gray-500 mb-2">gap=&quot;2&quot;</p>
        <HStack gap="2">
          <Box>A</Box>
          <Box>B</Box>
          <Box>C</Box>
        </HStack>
      </div>
      <div>
        <p className="text-sm text-gray-500 mb-2">gap=&quot;4&quot;</p>
        <HStack gap="4">
          <Box>A</Box>
          <Box>B</Box>
          <Box>C</Box>
        </HStack>
      </div>
      <div>
        <p className="text-sm text-gray-500 mb-2">gap=&quot;8&quot;</p>
        <HStack gap="8">
          <Box>A</Box>
          <Box>B</Box>
          <Box>C</Box>
        </HStack>
      </div>
    </VStack>
  ),
};

// Alignment
export const Alignment: Story = {
  render: () => (
    <VStack gap="6">
      <div>
        <p className="text-sm text-gray-500 mb-2">align=&quot;start&quot;</p>
        <HStack align="start" className="h-24 border border-gray-200 rounded-md p-2">
          <Box>Short</Box>
          <Box>Medium height</Box>
          <Box>Tall item here</Box>
        </HStack>
      </div>
      <div>
        <p className="text-sm text-gray-500 mb-2">align=&quot;center&quot;</p>
        <HStack align="center" className="h-24 border border-gray-200 rounded-md p-2">
          <Box>Short</Box>
          <Box>Medium height</Box>
          <Box>Tall item here</Box>
        </HStack>
      </div>
      <div>
        <p className="text-sm text-gray-500 mb-2">align=&quot;end&quot;</p>
        <HStack align="end" className="h-24 border border-gray-200 rounded-md p-2">
          <Box>Short</Box>
          <Box>Medium height</Box>
          <Box>Tall item here</Box>
        </HStack>
      </div>
    </VStack>
  ),
};

// Justify content
export const Justify: Story = {
  render: () => (
    <VStack gap="6" className="w-96">
      <div>
        <p className="text-sm text-gray-500 mb-2">justify=&quot;start&quot;</p>
        <HStack justify="start" className="border border-gray-200 rounded-md p-2">
          <Box>A</Box>
          <Box>B</Box>
          <Box>C</Box>
        </HStack>
      </div>
      <div>
        <p className="text-sm text-gray-500 mb-2">justify=&quot;center&quot;</p>
        <HStack justify="center" className="border border-gray-200 rounded-md p-2">
          <Box>A</Box>
          <Box>B</Box>
          <Box>C</Box>
        </HStack>
      </div>
      <div>
        <p className="text-sm text-gray-500 mb-2">justify=&quot;between&quot;</p>
        <HStack justify="between" className="border border-gray-200 rounded-md p-2">
          <Box>A</Box>
          <Box>B</Box>
          <Box>C</Box>
        </HStack>
      </div>
      <div>
        <p className="text-sm text-gray-500 mb-2">justify=&quot;evenly&quot;</p>
        <HStack justify="evenly" className="border border-gray-200 rounded-md p-2">
          <Box>A</Box>
          <Box>B</Box>
          <Box>C</Box>
        </HStack>
      </div>
    </VStack>
  ),
};

// VStack convenience component
export const VStackExample: Story = {
  render: () => (
    <VStack gap="4">
      <Box>Vertical Item 1</Box>
      <Box>Vertical Item 2</Box>
      <Box>Vertical Item 3</Box>
    </VStack>
  ),
};

// HStack convenience component
export const HStackExample: Story = {
  render: () => (
    <HStack gap="4">
      <Box>Horizontal Item 1</Box>
      <Box>Horizontal Item 2</Box>
      <Box>Horizontal Item 3</Box>
    </HStack>
  ),
};

// Wrap enabled
export const WithWrap: Story = {
  render: () => (
    <HStack gap="4" wrap className="w-64 border border-gray-200 rounded-md p-2">
      <Box>Item 1</Box>
      <Box>Item 2</Box>
      <Box>Item 3</Box>
      <Box>Item 4</Box>
      <Box>Item 5</Box>
      <Box>Item 6</Box>
    </HStack>
  ),
};

// Inline mode
export const Inline: Story = {
  render: () => (
    <div>
      <span className="text-sm">Before </span>
      <Stack direction="row" gap="2" inline>
        <Box>A</Box>
        <Box>B</Box>
      </Stack>
      <span className="text-sm"> After</span>
    </div>
  ),
};
