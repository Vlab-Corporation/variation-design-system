import { useState, useCallback } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { animations } from '@/tokens';

const meta: Meta = {
  title: 'Foundation/Animations',
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

const AnimationCard = ({
  name,
  value,
}: {
  name: string;
  value: string;
}) => {
  const [key, setKey] = useState(0);
  const replay = useCallback(() => setKey((k) => k + 1), []);

  return (
    <div className="flex flex-col items-center gap-3 p-4 border border-gray-200 rounded-lg">
      <div className="w-full h-20 flex items-center justify-center overflow-hidden">
        <div
          key={key}
          className="w-14 h-14 rounded-lg bg-primary-500"
          style={{ animation: value }}
        />
      </div>
      <span className="text-xs font-mono text-gray-500">{name}</span>
      <span className="text-xs font-mono text-gray-400 text-center break-all">
        {value}
      </span>
      <button
        type="button"
        onClick={replay}
        className="text-xs px-3 py-1 rounded bg-gray-100 hover:bg-gray-200 text-gray-700 transition-colors"
      >
        Replay
      </button>
    </div>
  );
};

export const AnimationShowcase: Story = {
  render: () => (
    <div className="w-full max-w-5xl mx-auto space-y-8">
      <h2 className="text-lg font-semibold">Animations</h2>
      <div className="grid grid-cols-3 gap-4">
        {Object.entries(animations.animation).map(([name, value]) => (
          <AnimationCard key={name} name={name} value={value} />
        ))}
      </div>
    </div>
  ),
};

export const TransitionDurations: Story = {
  render: () => (
    <div className="w-full max-w-5xl mx-auto space-y-8">
      <h2 className="text-lg font-semibold">Transition Durations</h2>
      <p className="text-sm text-gray-500">
        Hover over each box to see the transition speed.
      </p>
      <div className="flex flex-wrap gap-6">
        {Object.entries(animations.transitionDuration).map(
          ([name, duration]) => (
            <div key={name} className="flex flex-col items-center gap-2">
              <div
                className="w-20 h-20 rounded-lg bg-primary-200 hover:bg-primary-600 hover:scale-110 cursor-pointer"
                style={{
                  transitionProperty: 'background-color, transform',
                  transitionDuration: duration,
                  transitionTimingFunction: 'ease-in-out',
                }}
              />
              <span className="text-xs font-mono text-gray-500">{name}</span>
              <span className="text-xs font-mono text-gray-400">
                {duration}
              </span>
            </div>
          )
        )}
      </div>
    </div>
  ),
};

export const TimingFunctions: Story = {
  render: () => (
    <div className="w-full max-w-5xl mx-auto space-y-8">
      <h2 className="text-lg font-semibold">Timing Functions</h2>
      <p className="text-sm text-gray-500">
        Hover over each box to compare easing curves.
      </p>
      <div className="flex flex-wrap gap-6">
        {Object.entries(animations.transitionTimingFunction).map(
          ([name, easing]) => (
            <div key={name} className="flex flex-col items-center gap-2">
              <div
                className="w-20 h-20 rounded-lg bg-primary-200 hover:bg-primary-600 hover:scale-110 cursor-pointer"
                style={{
                  transitionProperty: 'background-color, transform',
                  transitionDuration: '500ms',
                  transitionTimingFunction: easing,
                }}
              />
              <span className="text-xs font-mono text-gray-500">{name}</span>
              <span className="text-xs font-mono text-gray-400 text-center max-w-24 break-all">
                {easing}
              </span>
            </div>
          )
        )}
      </div>
    </div>
  ),
};
