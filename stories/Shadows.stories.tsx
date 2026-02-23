import type { Meta, StoryObj } from '@storybook/react';
import { shadows } from '@/tokens';

const meta: Meta = {
  title: 'Foundation/Shadows',
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

const elevationScales = ['none', 'sm', 'md', 'lg', 'xl', '2xl'] as const;

export const ElevationScale: Story = {
  render: () => (
    <div className="w-full max-w-5xl mx-auto space-y-8">
      <h2 className="text-lg font-semibold">Elevation Scale</h2>
      <div className="bg-gray-50 p-8 rounded-lg">
        <div className="grid grid-cols-3 gap-8">
          {elevationScales.map((key) => (
            <div key={key} className="flex flex-col items-center gap-3">
              <div
                className="w-full h-24 rounded-lg bg-white flex items-center justify-center"
                style={{ boxShadow: shadows[key] }}
              >
                <span className="text-sm text-gray-600">{key}</span>
              </div>
              <span className="text-xs font-mono text-gray-500">
                shadow-{key}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  ),
};

export const SpecialShadows: Story = {
  render: () => (
    <div className="w-full max-w-5xl mx-auto space-y-8">
      <h2 className="text-lg font-semibold">Special Shadows</h2>
      <div className="bg-gray-50 p-8 rounded-lg">
        <div className="grid grid-cols-2 gap-8">
          <div className="flex flex-col items-center gap-3">
            <div
              className="w-full h-24 rounded-lg bg-white flex items-center justify-center"
              style={{ boxShadow: shadows.focus }}
            >
              <span className="text-sm text-gray-600">Focus ring</span>
            </div>
            <span className="text-xs font-mono text-gray-500">
              shadow-focus
            </span>
            <span className="text-xs font-mono text-gray-400">
              {shadows.focus}
            </span>
          </div>
          <div className="flex flex-col items-center gap-3">
            <div
              className="w-full h-24 rounded-lg bg-white flex items-center justify-center"
              style={{ boxShadow: shadows.inner }}
            >
              <span className="text-sm text-gray-600">Inner shadow</span>
            </div>
            <span className="text-xs font-mono text-gray-500">
              shadow-inner
            </span>
            <span className="text-xs font-mono text-gray-400">
              {shadows.inner}
            </span>
          </div>
        </div>
      </div>
    </div>
  ),
};
