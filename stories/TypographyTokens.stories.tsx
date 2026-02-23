import type { Meta, StoryObj } from '@storybook/react';
import { typography, textStyles } from '@/tokens';

const meta: Meta = {
  title: 'Foundation/Typography',
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const FontFamily: Story = {
  render: () => (
    <div className="w-full max-w-5xl mx-auto space-y-8">
      <h2 className="text-lg font-semibold">Font Families</h2>
      <div className="space-y-6">
        <div className="space-y-1">
          <span className="text-xs font-mono text-gray-500">
            sans — {typography.fontFamily.sans[0]}
          </span>
          <p
            style={{ fontFamily: typography.fontFamily.sans.join(', ') }}
            className="text-2xl"
          >
            The quick brown fox jumps over the lazy dog. 다람쥐 헌 쳇바퀴에 타고파
          </p>
        </div>
        <div className="space-y-1">
          <span className="text-xs font-mono text-gray-500">
            mono — {typography.fontFamily.mono[0]}
          </span>
          <p
            style={{ fontFamily: typography.fontFamily.mono.join(', ') }}
            className="text-2xl"
          >
            const x = 42; // 0xDEADBEEF
          </p>
        </div>
      </div>
    </div>
  ),
};

export const FontSizeScale: Story = {
  render: () => {
    const generic = Object.entries(typography.fontSize).filter(
      ([key]) => !key.includes('-') && key !== 'label'
    );
    const semantic = Object.entries(typography.fontSize).filter(
      ([key]) => key.includes('-') || key === 'label'
    );

    return (
      <div className="w-full max-w-5xl mx-auto space-y-8">
        <h2 className="text-lg font-semibold">Font Size Scale</h2>

        <div className="space-y-4">
          <h3 className="text-sm font-semibold text-gray-600">Generic Scale</h3>
          {generic.map(([name, value]) => {
            const [size] = value as [string, { lineHeight: string }];
            return (
              <div key={name} className="flex items-baseline gap-4">
                <span className="text-xs font-mono text-gray-500 w-12 text-right shrink-0">
                  {name}
                </span>
                <span className="text-xs font-mono text-gray-400 w-16 shrink-0">
                  {size}
                </span>
                <span style={{ fontSize: size }}>Almost before we knew it</span>
              </div>
            );
          })}
        </div>

        <div className="space-y-4">
          <h3 className="text-sm font-semibold text-gray-600">Semantic Scale</h3>
          {semantic.map(([name, value]) => {
            const [size] = value as [string, { lineHeight: string }];
            return (
              <div key={name} className="flex items-baseline gap-4">
                <span className="text-xs font-mono text-gray-500 w-24 text-right shrink-0">
                  {name}
                </span>
                <span className="text-xs font-mono text-gray-400 w-16 shrink-0">
                  {size}
                </span>
                <span style={{ fontSize: size }}>Almost before we knew it</span>
              </div>
            );
          })}
        </div>
      </div>
    );
  },
};

export const FontWeights: Story = {
  render: () => (
    <div className="w-full max-w-5xl mx-auto space-y-8">
      <h2 className="text-lg font-semibold">Font Weights</h2>
      <div className="space-y-3">
        {Object.entries(typography.fontWeight).map(([name, weight]) => (
          <div key={name} className="flex items-baseline gap-4">
            <span className="text-xs font-mono text-gray-500 w-24 text-right shrink-0">
              {name}
            </span>
            <span className="text-xs font-mono text-gray-400 w-8 shrink-0">
              {weight}
            </span>
            <span className="text-xl" style={{ fontWeight: weight }}>
              The quick brown fox jumps over the lazy dog
            </span>
          </div>
        ))}
      </div>
    </div>
  ),
};

export const LineHeightAndLetterSpacing: Story = {
  render: () => (
    <div className="w-full max-w-5xl mx-auto space-y-8">
      <h2 className="text-lg font-semibold">Line Height & Letter Spacing</h2>

      <div className="space-y-6">
        <h3 className="text-sm font-semibold text-gray-600">Line Heights</h3>
        <div className="grid grid-cols-2 gap-6">
          {Object.entries(typography.lineHeight).map(([name, value]) => (
            <div key={name} className="space-y-1">
              <span className="text-xs font-mono text-gray-500">
                {name} — {value}
              </span>
              <p
                className="text-base bg-gray-50 p-3 rounded border border-gray-200"
                style={{ lineHeight: value }}
              >
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam.
              </p>
            </div>
          ))}
        </div>
      </div>

      <div className="space-y-6">
        <h3 className="text-sm font-semibold text-gray-600">Letter Spacing</h3>
        <div className="space-y-4">
          {Object.entries(typography.letterSpacing).map(([name, value]) => (
            <div key={name} className="flex items-baseline gap-4">
              <span className="text-xs font-mono text-gray-500 w-16 text-right shrink-0">
                {name}
              </span>
              <span className="text-xs font-mono text-gray-400 w-16 shrink-0">
                {value}
              </span>
              <span className="text-lg" style={{ letterSpacing: value }}>
                DESIGN SYSTEM TYPOGRAPHY
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  ),
};

export const SemanticTextStyles: Story = {
  render: () => {
    const flatStyles: { name: string; style: { fontSize: string; lineHeight: string; letterSpacing: string } }[] = [];

    // Display
    Object.entries(textStyles.display).forEach(([key, style]) => {
      flatStyles.push({ name: `display.${key}`, style });
    });
    // Heading
    Object.entries(textStyles.heading).forEach(([key, style]) => {
      flatStyles.push({ name: `heading.${key}`, style });
    });
    // Body & others
    flatStyles.push({ name: 'body1', style: textStyles.body1 });
    flatStyles.push({ name: 'body2', style: textStyles.body2 });
    flatStyles.push({ name: 'body3', style: textStyles.body3 });
    flatStyles.push({ name: 'label', style: textStyles.label });
    flatStyles.push({ name: 'caption', style: textStyles.caption });
    flatStyles.push({ name: 'overline', style: textStyles.overline });

    return (
      <div className="w-full max-w-5xl mx-auto space-y-8">
        <h2 className="text-lg font-semibold">Semantic Text Styles</h2>
        <div className="space-y-4">
          {flatStyles.map(({ name, style }) => (
            <div key={name} className="flex items-baseline gap-4">
              <span className="text-xs font-mono text-gray-500 w-28 text-right shrink-0">
                {name}
              </span>
              <span className="text-xs font-mono text-gray-400 w-20 shrink-0">
                {style.fontSize}
              </span>
              <span style={style}>Almost before we knew it, we had left the ground</span>
            </div>
          ))}
        </div>
      </div>
    );
  },
};
