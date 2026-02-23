import type { Meta, StoryObj } from '@storybook/react';
import { colors } from '@/tokens';

const meta: Meta = {
  title: 'Foundation/Colors',
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

const Swatch = ({
  color,
  name,
  isLight = false,
}: {
  color: string;
  name: string;
  isLight?: boolean;
}) => (
  <div className="flex flex-col items-center gap-1">
    <div
      className="w-16 h-16 rounded-lg"
      style={{
        backgroundColor: color,
        border: isLight ? '1px solid #DEE2E6' : undefined,
      }}
    />
    <span className="text-xs font-mono text-gray-500">{name}</span>
    <span className="text-xs font-mono text-gray-400">{color}</span>
  </div>
);

const PaletteStrip = ({
  name,
  palette,
}: {
  name: string;
  palette: Record<string, string>;
}) => (
  <div className="space-y-2">
    <h3 className="text-sm font-semibold capitalize">{name}</h3>
    <div className="flex flex-wrap gap-3">
      {Object.entries(palette).map(([scale, hex]) => (
        <Swatch
          key={scale}
          color={hex}
          name={`${name}-${scale}`}
          isLight={parseInt(scale) <= 100}
        />
      ))}
    </div>
  </div>
);

const RoleSection = ({
  title,
  tokens,
}: {
  title: string;
  tokens: Record<string, string>;
}) => (
  <div className="space-y-2">
    <h3 className="text-sm font-semibold">{title}</h3>
    <div className="flex flex-wrap gap-3">
      {Object.entries(tokens).map(([key, value]) => (
        <Swatch
          key={key}
          color={value}
          name={key}
          isLight={
            value === '#FFFFFF' ||
            value === '#F8F9FA' ||
            value === '#F1F3F5' ||
            value.startsWith('rgba')
          }
        />
      ))}
    </div>
  </div>
);

export const PaletteScales: Story = {
  render: () => (
    <div className="w-full max-w-5xl mx-auto space-y-8">
      <h2 className="text-lg font-semibold">Palette Scales</h2>
      <PaletteStrip name="primary" palette={colors.primary} />
      <PaletteStrip name="secondary" palette={colors.secondary} />
      <PaletteStrip name="gray" palette={colors.gray} />
    </div>
  ),
};

export const SemanticColors: Story = {
  render: () => (
    <div className="w-full max-w-5xl mx-auto space-y-8">
      <h2 className="text-lg font-semibold">Semantic Colors</h2>
      <PaletteStrip name="success" palette={colors.success} />
      <PaletteStrip name="warning" palette={colors.warning} />
      <PaletteStrip name="error" palette={colors.error} />
      <PaletteStrip name="info" palette={colors.info} />
    </div>
  ),
};

export const RoleBasedColors: Story = {
  render: () => (
    <div className="w-full max-w-5xl mx-auto space-y-8">
      <h2 className="text-lg font-semibold">Role-Based Colors</h2>
      <RoleSection title="Background" tokens={colors.background} />
      <RoleSection title="Text" tokens={colors.text} />
      <RoleSection title="Border" tokens={colors.border} />
      <RoleSection title="Surface" tokens={colors.surface} />
      <RoleSection title="Interactive" tokens={colors.interactive} />
      <RoleSection title="Link" tokens={colors.link} />
      <RoleSection title="Destructive" tokens={colors.destructive} />
      <RoleSection title="Focus" tokens={colors.focus} />
    </div>
  ),
};

export const BaseColors: Story = {
  render: () => (
    <div className="w-full max-w-5xl mx-auto space-y-8">
      <h2 className="text-lg font-semibold">Base Colors</h2>
      <div className="flex gap-3">
        <Swatch color={colors.white} name="white" isLight />
        <Swatch color={colors.black} name="black" />
      </div>
    </div>
  ),
};
