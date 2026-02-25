import type { Preview, Decorator } from '@storybook/react';
import { createElement } from 'react';
import '../src/styles/globals.css';

const withTheme: Decorator = (Story, context) => {
  const theme = context.globals.theme;
  return createElement(
    'div',
    { 'data-theme': theme === 'variation' ? undefined : theme },
    createElement(Story),
  );
};

const preview: Preview = {
  globalTypes: {
    theme: {
      description: 'Accent theme',
      toolbar: {
        title: 'Theme',
        icon: 'paintbrush',
        items: [
          { value: 'variation', title: 'Variation (Coral Red)' },
          { value: 'rehabworks', title: 'RehabWorks (Violet Blue)' },
        ],
        dynamicTitle: true,
      },
    },
  },
  initialGlobals: {
    theme: 'variation',
  },
  decorators: [withTheme],
  parameters: {
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    backgrounds: {
      default: 'light',
      values: [
        { name: 'light', value: '#ffffff' },
        { name: 'cream', value: '#EEE7DF' },
        { name: 'dark', value: '#1F2937' },
      ],
    },
    layout: 'centered',
  },
};

export default preview;
