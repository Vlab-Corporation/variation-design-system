# @vlab-corporation/design-system

[![CI](https://github.com/Vlab-Corporation/design-system/actions/workflows/ci.yml/badge.svg)](https://github.com/Vlab-Corporation/design-system/actions/workflows/ci.yml)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

Cross-framework design system with Tailwind CSS for Astro, React, and pure HTML.

## Features

- 🎨 **Design Tokens**: Colors, typography, spacing, animations, shadows, z-index, text styles
- ⚛️ **42 React Components**: Forms, layout, navigation, feedback, and specialized components
- 🎯 **Tailwind Preset**: Use the design system with any framework
- 🔌 **Three Entry Points**: Full bundle, React-only, and framework-agnostic core
- 📖 **Storybook**: Interactive component documentation
- ✨ **Subtle Animations**: Purposeful micro-interactions
- ♿ **Accessible**: ARIA-compliant components
- 🧪 **Tested**: Comprehensive test coverage with 80% threshold

## Installation

This package is published to GitHub Packages. To install:

1. Create or update `.npmrc` in your project root:

```
@vlab-corporation:registry=https://npm.pkg.github.com
//npm.pkg.github.com/:_authToken=${GITHUB_TOKEN}
```

2. Install the package:

```bash
npm install @vlab-corporation/design-system
```

## Usage

### With React

```tsx
import { Button, Input, Card, Modal, Toast } from '@vlab-corporation/design-system';

function App() {
  return (
    <Card>
      <Input label="Email" placeholder="you@example.com" />
      <Button variant="primary">Submit</Button>
    </Card>
  );
}
```

### Framework-Agnostic (Core)

Style functions and tokens without React dependency:

```ts
import { buttonStyles, cn, colors, shadows } from '@vlab-corporation/design-system/core';

// Use style functions to get Tailwind classes
const classes = buttonStyles({ variant: 'primary', size: 'md' });
// → "px-4 py-2 bg-primary-500 text-white ..."
```

### With Tailwind CSS (Any Framework)

Configure your `tailwind.config.js`:

```js
module.exports = {
  presets: [require('@vlab-corporation/design-system/tailwind-preset')],
  content: [
    // your content paths...
  ],
};
```

Then use Tailwind classes directly in HTML or any framework:

```html
<!-- Astro, HTML, Vue, Svelte, etc. -->
<button class="px-4 py-2 bg-primary-500 text-white font-medium rounded-button
               transition-all duration-200 hover:bg-primary-600 hover:scale-[1.02]
               shadow-md">
  Button
</button>
```

### Design Tokens

```ts
import { colors, typography, spacing, animations, shadows, zIndex, textStyles } from '@vlab-corporation/design-system';

console.log(colors.primary['500']); // #D38475
console.log(typography.fontFamily.sans); // ['Pretendard', ...]
console.log(shadows.md); // box-shadow value
console.log(zIndex.modal); // 1050
```

## Entry Points

| Import Path | Contains | React Required |
|------------|----------|----------------|
| `@vlab-corporation/design-system` | Everything (components + tokens + utilities) | Yes |
| `@vlab-corporation/design-system/core` | Tokens, style functions, `cn()` | No |
| `@vlab-corporation/design-system/react` | React components only | Yes |
| `@vlab-corporation/design-system/tailwind-preset` | Tailwind CSS preset | No |
| `@vlab-corporation/design-system/styles` | Global CSS | No |

## Components

### Foundation

| Component | Description |
|-----------|-------------|
| `Button` | Primary, secondary, outline, ghost variants |
| `Input` | Text input with label and error states |
| `Card` | Container with header, content, footer |
| `Badge` | Status indicators with dot and pulse |
| `Spinner` | Loading indicator with multiple sizes |
| `Alert` | Info, success, warning, error messages |
| `Typography` | Heading and Text components for consistent text rendering |

### Form Controls

| Component | Description |
|-----------|-------------|
| `Checkbox` | Checkbox with label and indeterminate state |
| `Radio` | Radio button and RadioGroup for single selection |
| `Select` | Dropdown selection with custom styling |
| `Textarea` | Multi-line text input with auto-resize |
| `Switch` | Toggle on/off switch |

### Layout & Navigation

| Component | Description |
|-----------|-------------|
| `Stack` | VStack / HStack directional layout with spacing |
| `Separator` | Horizontal/vertical divider |
| `Tabs` | Tab-based content switching |
| `Pagination` | Page navigation controls |
| `Breadcrumb` | Hierarchical path navigation |
| `Stepper` | Step-by-step progress indicator |
| `CommandPalette` | Ctrl+K style command search |

### Overlay & Feedback

| Component | Description |
|-----------|-------------|
| `Modal` | Dialog overlay with Portal |
| `Toast` | Temporary notification messages |
| `Tooltip` | Hover information popover |
| `Popover` | Click-triggered floating panel |
| `DropdownMenu` | Context/action menu |
| `EmptyState` | Empty data state display |
| `Progress` | Progress bar indicator |

### Data Display

| Component | Description |
|-----------|-------------|
| `Avatar` | User profile image/initials |
| `Skeleton` | Loading placeholder |
| `Tag` | Interactive, removable tags |
| `Calendar` | Date display and selection |
| `Accordion` | Collapsible content sections |
| `DataTable` | Sortable, filterable data table |

### Specialized

| Component | Description |
|-----------|-------------|
| `MarkdownEditor` | Rich markdown editing |
| `KanbanBoard` | Drag-and-drop kanban board |
| `PageTree` | Hierarchical page tree navigation |
| `AudioRecorder` | Audio recording interface |
| `IconPicker` | Icon selection UI |
| `CoverImage` | Cover image component |
| `Filter` | Data filtering controls |
| `DragDrop` | Drag and drop utilities |
| `SyncStatus` | Real-time sync status indicator |

## Design Tokens

| Token | Description |
|-------|-------------|
| `colors` | Primary (terracotta #D38475), semantic, surface, interactive colors |
| `typography` | Pretendard (sans), JetBrains Mono (mono), text style presets |
| `spacing` | Spacing scale and border radius |
| `animations` | Transitions and keyframe animations |
| `shadows` | Elevation system (sm, md, lg, xl, focus, inner) |
| `zIndex` | Stacking context (dropdown, sticky, modal, popover, tooltip, toast) |
| `textStyles` | Semantic text presets (heading, body, display, caption) |

## Animations

Subtle, purposeful animations included:

- `animate-fade-in` / `animate-fade-out`
- `animate-slide-up` / `animate-slide-down`
- `animate-scale-in`
- `animate-pulse-subtle`
- `animate-spin` / `animate-spin-slow` / `animate-spin-fast`

## Development

```bash
# Install dependencies
npm install

# Run Storybook
npm run dev

# Run tests
npm test

# Run tests with coverage
npm run test:coverage

# Build library
npm run build

# Type checking
npm run typecheck

# Lint & format
npm run lint
npm run format
```

## Contributing

Contributions are welcome! Please read our [contributing guidelines](CONTRIBUTING.md) before submitting a pull request.

## License

MIT © [vlab Corporation](https://github.com/Vlab-Corporation)
