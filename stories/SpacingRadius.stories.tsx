import type { Meta, StoryObj } from '@storybook/react';
import { spacing, borderRadius } from '@/tokens';

const meta: Meta = {
  title: 'Foundation/Spacing & Radius',
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

const majorSpacingKeys = [
  '0', 'px', '0.5', '1', '1.5', '2', '3', '4', '5', '6', '8',
  '10', '12', '16', '20', '24', '32', '40', '48', '64',
] as const;

export const SpacingScale: Story = {
  render: () => (
    <div className="w-full max-w-5xl mx-auto space-y-8">
      <h2 className="text-lg font-semibold">Spacing Scale</h2>
      <div className="space-y-2">
        {majorSpacingKeys.map((key) => {
          const value = spacing[key as keyof typeof spacing];
          return (
            <div key={key} className="flex items-center gap-4">
              <span className="text-xs font-mono text-gray-500 w-8 text-right shrink-0">
                {key}
              </span>
              <span className="text-xs font-mono text-gray-400 w-20 shrink-0">
                {value}
              </span>
              <div
                className="h-4 rounded-sm bg-accent-400"
                style={{ width: value === '0' ? '1px' : value }}
              />
            </div>
          );
        })}
      </div>
    </div>
  ),
};

export const BorderRadiusScale: Story = {
  name: 'BorderRadius',
  render: () => {
    const scaleKeys = ['none', 'sm', 'DEFAULT', 'md', 'lg', 'xl', '2xl', '3xl', 'full'] as const;
    const semanticKeys = ['card', 'button', 'input'] as const;

    return (
      <div className="w-full max-w-5xl mx-auto space-y-8">
        <h2 className="text-lg font-semibold">Border Radius</h2>

        <div className="space-y-4">
          <h3 className="text-sm font-semibold text-gray-600">Scale</h3>
          <div className="flex flex-wrap gap-6">
            {scaleKeys.map((key) => (
              <div key={key} className="flex flex-col items-center gap-2">
                <div
                  className="w-20 h-20 bg-accent-100 border-2 border-accent-400"
                  style={{ borderRadius: borderRadius[key] }}
                />
                <span className="text-xs font-mono text-gray-500">{key}</span>
                <span className="text-xs font-mono text-gray-400">
                  {borderRadius[key]}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-sm font-semibold text-gray-600">Semantic</h3>
          <div className="flex flex-wrap gap-6">
            {semanticKeys.map((key) => (
              <div key={key} className="flex flex-col items-center gap-2">
                <div
                  className="w-20 h-20 bg-accent-100 border-2 border-accent-400"
                  style={{ borderRadius: borderRadius[key] }}
                />
                <span className="text-xs font-mono text-gray-500">{key}</span>
                <span className="text-xs font-mono text-gray-400">
                  {borderRadius[key]}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  },
};
