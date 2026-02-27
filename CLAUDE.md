# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

`@vlab-corporation/design-system` — a cross-framework design system with Tailwind CSS. Provides React components, design tokens, a Tailwind preset, and framework-agnostic style functions for Astro, React, and pure HTML. Published to GitHub Packages (`npm.pkg.github.com`).

## Commands

```bash
npm run dev              # Storybook on localhost:6006
npm run build            # Build library with tsup
npm run build:storybook  # Build Storybook static site
npm test                 # Run tests once (vitest run)
npm run test:watch       # Tests in watch mode
npm run test:coverage    # Tests with coverage (80% threshold enforced)
npm run typecheck        # TypeScript type checking (tsc --noEmit)
npm run lint             # ESLint
npm run lint:fix         # ESLint with auto-fix
npm run format           # Prettier write
npm run format:check     # Prettier check (used in CI)
```

To run a single test file: `npx vitest run src/components/Button/Button.test.tsx`

## Architecture

### Three Export Entry Points

The package ships three distinct entry points via `tsup`:

| Entry | Import Path | Contains | React Required |
|-------|------------|----------|----------------|
| `src/index.ts` | `@vlab-corporation/design-system` | Everything | Yes |
| `src/core.ts` | `.../core` | Tokens, style functions, `cn()` | No |
| `src/react.ts` | `.../react` | React components only | Yes |

Additionally: `tailwind.preset.js` → `.../tailwind-preset` (CJS + ESM), `src/styles/globals.css` → `.../styles`.

### Component File Structure

Every component follows this exact layout:

```
src/components/ComponentName/
├── ComponentName.tsx          # Component with forwardRef
├── ComponentName.styles.ts    # Variant/size types, style maps, style function
├── ComponentName.test.tsx     # Vitest + Testing Library tests
└── index.ts                   # Barrel: exports component, types, and style functions
```

**Style separation pattern**: All Tailwind class logic lives in `.styles.ts` files. The style function (e.g., `buttonStyles()`) uses `cn()` to compose classes. This makes styles usable without React via the `core` entry point.

### Adding a New Component

1. Create `src/components/ComponentName/` with the four files above
2. Export from `src/components/index.ts`
3. Export from `src/index.ts` and `src/react.ts`
4. If style functions should be framework-agnostic, also export from `src/core.ts`
5. Add story in `stories/ComponentName.stories.tsx`

### Design Tokens

Defined in `src/tokens/` (colors, typography, spacing, animations). When adding tokens, also update `tailwind.preset.js` to keep the preset in sync.

- Primary color: warm terracotta (#D38475)
- Font: Pretendard (sans), JetBrains Mono (mono)

### Path Alias

`@/` maps to `src/` — configured in `tsconfig.json`, `vitest.config.ts`, and `.storybook/main.ts`.

## Key Conventions

- **컴포넌트 스타일 값은 디자인 토큰을 우선 적용** — 색상, shadow, typography, z-index, spacing, border-radius, animation 등 `src/tokens/`과 `tailwind.preset.js`에 정의된 토큰이 있으면 반드시 토큰을 사용한다. 토큰에 해당 값이 없을 경우 하드코딩하지 말고 사용자에게 **(1) 토큰을 새로 추가하고 적용** vs **(2) 하드코딩** 중 어떤 방식을 원하는지 물어본 후 진행한다.
  - 색상: `primary` → `accent-*` 토큰(CSS 변수 `--accent-*` 기반), semantic → `success-*`, `warning-*`, `error-*`, `info-*` 토큰. gray/white/current 등 테마 불변 색상은 그대로 사용 가능.
  - Shadow: `shadow-sm`, `shadow-md` 등 `tailwind.preset.js`의 boxShadow 토큰 사용.
  - Typography: `text-body-2`, `text-heading-3` 등 fontSize 토큰 사용.
  - Z-index: `z-modal`, `z-tooltip` 등 zIndex 토큰 사용.
  - Animation: `animate-fade-in`, `animate-dot-pulse` 등 animation 토큰 사용.
- **All components use `forwardRef`** and set `displayName`
- **`cn()` utility** (clsx + tailwind-merge) — always use this for class composition, never raw string concatenation
- **Props extend native HTML attributes** (e.g., `ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement>`)
- **No default exports** — named exports only throughout the codebase
- **ESM-only output** for the main library; Tailwind preset also ships CJS for `require()` compatibility
- **react and react-dom are optional peer dependencies** — the `core` entry point works without them

## CI Pipeline

GitHub Actions runs on push to `main` and PRs:
1. **Lint** → `npm run lint` + `npm run format:check`
2. **Typecheck** → `npm run typecheck`
3. **Test** → `npm run test:coverage` (80% minimum coverage)
4. **Build** → `npm run build` (depends on lint, typecheck, test)
5. **Storybook** → `npm run build:storybook` (depends on lint, typecheck, test)

Release workflow publishes to GitHub Packages and deploys Storybook to GitHub Pages on release tag.

## Testing Patterns

- **Framework**: Vitest with happy-dom environment
- **Libraries**: @testing-library/react, @testing-library/jest-dom
- **Test globals enabled** — no need to import `describe`, `it`, `expect`
- **Structure**: Group tests by concern (Rendering, Variants, Sizes, States, Events, Accessibility)
- **Query priority**: by role → by text → by testid
- **Mock handlers**: `vi.fn()`
- **스타일 테스트 시 `.styles.ts`의 variant/size 맵을 import하여 기댓값으로 사용** — 하드코딩 금지. variant 맵에 없는 기본 클래스(예: `rounded-card`)나 조건부 클래스(예: interactive hover)는 하드코딩 허용.
