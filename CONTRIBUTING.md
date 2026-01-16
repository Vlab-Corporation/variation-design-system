# Contributing to @vlab-corporation/design-system

Thank you for your interest in contributing to the vlab Corporation Design System!

## Getting Started

1. Fork the repository
2. Clone your fork:
   ```bash
   git clone https://github.com/YOUR_USERNAME/design-system.git
   cd design-system
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Create a branch for your changes:
   ```bash
   git checkout -b feature/your-feature-name
   ```

## Development

### Running Storybook

```bash
npm run dev
```

This starts Storybook at `http://localhost:6006` for component development.

### Running Tests

```bash
# Run tests once
npm test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test:coverage
```

### Linting and Formatting

```bash
# Run ESLint
npm run lint

# Fix ESLint issues
npm run lint:fix

# Check formatting
npm run format:check

# Format code
npm run format
```

### Building

```bash
# Build the library
npm run build

# Build Storybook
npm run build:storybook
```

## Pull Request Guidelines

1. **Create focused PRs**: Each PR should address a single concern
2. **Write tests**: All new components and features should have tests
3. **Update documentation**: Update Storybook stories and README if needed
4. **Follow code style**: Ensure your code passes linting and formatting checks
5. **Write meaningful commits**: Use clear, descriptive commit messages

## Component Guidelines

### Adding a New Component

1. Create a new directory under `src/components/YourComponent/`
2. Include the following files:
   - `YourComponent.tsx` - Component implementation
   - `YourComponent.test.tsx` - Component tests
   - `index.ts` - Export file
3. Export the component from `src/components/index.ts`
4. Export the component from `src/index.ts`
5. Add Storybook stories in `stories/`

### Component Best Practices

- Use TypeScript for all components
- Include proper ARIA attributes for accessibility
- Support all common variants and sizes
- Use the design tokens from `src/tokens/`
- Write comprehensive tests with good coverage

## Design Tokens

Design tokens are defined in `src/tokens/`:

- `colors.ts` - Color palette
- `typography.ts` - Font families, sizes, weights
- `spacing.ts` - Spacing scale
- `animations.ts` - Animation keyframes and durations

When adding new tokens, also update `tailwind.preset.js`.

## Questions?

If you have questions, feel free to open an issue or reach out to the maintainers.

Thank you for contributing!
