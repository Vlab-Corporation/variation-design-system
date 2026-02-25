import type { Meta, StoryObj } from '@storybook/react';

/**
 * These patterns show how to use the vlab Corporation Design System
 * with pure HTML and Tailwind CSS classes.
 *
 * Copy these patterns for use in Astro, static HTML, or any framework.
 */
const meta: Meta = {
  title: 'Patterns/Pure HTML',
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
These patterns demonstrate how to create UI components using only Tailwind CSS classes.
Perfect for Astro components, static HTML pages, or any framework that uses Tailwind.

**Usage:**
1. Install the Tailwind preset: \`@vlab-corporation/design-system/tailwind-preset\`
2. Copy the HTML patterns you need
3. Apply Tailwind classes directly

\`\`\`js
// tailwind.config.js
module.exports = {
  presets: [require('@vlab-corporation/design-system/tailwind-preset')],
  // your config...
}
\`\`\`
        `,
      },
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

// Button patterns
export const Buttons: Story = {
  render: () => (
    <div className="flex flex-col gap-6">
      <div>
        <h3 className="text-sm font-medium text-gray-500 mb-2">Primary Button</h3>
        <button className="inline-flex items-center justify-center px-4 py-2 bg-accent-500 text-white font-medium rounded-button transition-all duration-200 hover:bg-accent-600 hover:scale-[1.02] active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-accent-500/20 focus:ring-offset-2">
          Primary Button
        </button>
      </div>

      <div>
        <h3 className="text-sm font-medium text-gray-500 mb-2">Secondary Button</h3>
        <button className="inline-flex items-center justify-center px-4 py-2 bg-secondary-100 text-secondary-800 font-medium rounded-button transition-all duration-200 hover:bg-secondary-200 hover:scale-[1.02] active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-secondary-500/20 focus:ring-offset-2">
          Secondary Button
        </button>
      </div>

      <div>
        <h3 className="text-sm font-medium text-gray-500 mb-2">Outline Button</h3>
        <button className="inline-flex items-center justify-center px-4 py-2 bg-transparent border border-accent-500 text-accent-600 font-medium rounded-button transition-all duration-200 hover:bg-accent-50 hover:scale-[1.02] active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-accent-500/20 focus:ring-offset-2">
          Outline Button
        </button>
      </div>

      <div>
        <h3 className="text-sm font-medium text-gray-500 mb-2">Ghost Button</h3>
        <button className="inline-flex items-center justify-center px-4 py-2 bg-transparent text-gray-700 font-medium rounded-button transition-all duration-200 hover:bg-gray-100 hover:scale-[1.02] active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-gray-500/20 focus:ring-offset-2">
          Ghost Button
        </button>
      </div>
    </div>
  ),
};

// Input patterns
export const Inputs: Story = {
  render: () => (
    <div className="flex flex-col gap-6 w-80">
      <div className="flex flex-col gap-1.5">
        <label className="text-sm font-medium text-gray-700">
          Default Input
        </label>
        <input
          type="text"
          placeholder="Enter text..."
          className="w-full px-3 py-2 bg-white border border-gray-300 rounded-input transition-all duration-200 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-accent-500/20 focus:border-accent-500"
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <label className="text-sm font-medium text-gray-700">
          Input with Helper
        </label>
        <input
          type="email"
          placeholder="you@example.com"
          className="w-full px-3 py-2 bg-white border border-gray-300 rounded-input transition-all duration-200 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-accent-500/20 focus:border-accent-500"
        />
        <p className="text-sm text-gray-500">We&apos;ll never share your email.</p>
      </div>

      <div className="flex flex-col gap-1.5">
        <label className="text-sm font-medium text-gray-700">
          Input with Error
        </label>
        <input
          type="text"
          defaultValue="invalid"
          className="w-full px-3 py-2 bg-white border border-red-500 rounded-input transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-500"
        />
        <p className="text-sm text-red-500">This field is required.</p>
      </div>
    </div>
  ),
};

// Card patterns
export const Cards: Story = {
  render: () => (
    <div className="flex gap-4">
      <div className="w-64 p-4 bg-white rounded-lg shadow-sm">
        <h3 className="text-lg font-semibold text-gray-900">Default Card</h3>
        <p className="text-sm text-gray-500 mt-1">With subtle shadow</p>
      </div>

      <div className="w-64 p-4 bg-white rounded-lg shadow-md">
        <h3 className="text-lg font-semibold text-gray-900">Elevated Card</h3>
        <p className="text-sm text-gray-500 mt-1">With more shadow</p>
      </div>

      <div className="w-64 p-4 bg-white rounded-lg border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900">Outlined Card</h3>
        <p className="text-sm text-gray-500 mt-1">With border</p>
      </div>
    </div>
  ),
};

// Badge patterns
export const Badges: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <div className="flex gap-2">
        <span className="inline-flex items-center px-2 py-0.5 text-sm font-medium bg-gray-100 text-gray-800 rounded-md animate-fade-in">
          Default
        </span>
        <span className="inline-flex items-center px-2 py-0.5 text-sm font-medium bg-accent-100 text-accent-800 rounded-md animate-fade-in">
          Primary
        </span>
        <span className="inline-flex items-center px-2 py-0.5 text-sm font-medium bg-green-100 text-green-800 rounded-md animate-fade-in">
          Success
        </span>
        <span className="inline-flex items-center px-2 py-0.5 text-sm font-medium bg-yellow-100 text-yellow-800 rounded-md animate-fade-in">
          Warning
        </span>
        <span className="inline-flex items-center px-2 py-0.5 text-sm font-medium bg-red-100 text-red-800 rounded-md animate-fade-in">
          Error
        </span>
      </div>

      <div className="flex gap-2">
        <span className="inline-flex items-center gap-1.5 px-2 py-0.5 text-sm font-medium bg-green-100 text-green-800 rounded-full">
          <span className="w-2 h-2 bg-green-500 rounded-full"></span>
          Online
        </span>
        <span className="inline-flex items-center gap-1.5 px-2 py-0.5 text-sm font-medium bg-yellow-100 text-yellow-800 rounded-full">
          <span className="w-2 h-2 bg-yellow-500 rounded-full"></span>
          Away
        </span>
      </div>
    </div>
  ),
};

// Alert patterns
export const Alerts: Story = {
  render: () => (
    <div className="flex flex-col gap-4 w-96">
      <div className="flex gap-3 p-4 bg-blue-50 border border-blue-200 text-blue-800 rounded-lg animate-fade-in">
        <svg className="w-5 h-5 text-blue-500 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
        </svg>
        <div>
          <h4 className="font-semibold mb-1">Information</h4>
          <p className="text-sm">This is an informational alert.</p>
        </div>
      </div>

      <div className="flex gap-3 p-4 bg-green-50 border border-green-200 text-green-800 rounded-lg animate-fade-in">
        <svg className="w-5 h-5 text-green-500 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
        </svg>
        <div>
          <h4 className="font-semibold mb-1">Success</h4>
          <p className="text-sm">Your action was completed successfully.</p>
        </div>
      </div>
    </div>
  ),
};

// Spinner pattern
export const Spinners: Story = {
  render: () => (
    <div className="flex gap-8 items-center">
      <div className="w-4 h-4 border-2 border-accent-500 border-b-transparent rounded-full animate-spin" />
      <div className="w-6 h-6 border-2 border-accent-500 border-b-transparent rounded-full animate-spin" />
      <div className="w-8 h-8 border-2 border-accent-500 border-b-transparent rounded-full animate-spin" />
      <div className="w-12 h-12 border-2 border-accent-500 border-b-transparent rounded-full animate-spin-slow" />
    </div>
  ),
};
