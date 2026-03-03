import type { Meta, StoryObj } from "@storybook/react";
import { borderRadius } from "@/tokens";

const meta: Meta = {
  title: "Foundation/Spacing & Radius",
  tags: ["autodocs"],
  parameters: {
    layout: "padded",
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const BorderRadiusScale: Story = {
  name: "BorderRadius",
  render: () => {
    const scaleKeys = [
      "none",
      "sm",
      "DEFAULT",
      "md",
      "lg",
      "xl",
      "2xl",
      "3xl",
      "full",
    ] as const;
    const semanticKeys = ["card", "button", "input"] as const;

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
