import { defineConfig } from 'tsup';

export default defineConfig([
  // Main library build (backwards compatible - includes everything)
  {
    entry: ['src/index.ts'],
    format: ['esm'],
    dts: true,
    sourcemap: true,
    clean: true,
    external: ['react', 'react-dom'],
    esbuildOptions(options) {
      options.jsx = 'automatic';
    },
  },
  // Core build - framework-agnostic (NO React dependency)
  {
    entry: ['src/core.ts'],
    format: ['esm'],
    dts: true,
    sourcemap: true,
    outDir: 'dist',
  },
  // React build - React components only
  {
    entry: ['src/react.ts'],
    format: ['esm'],
    dts: true,
    sourcemap: true,
    outDir: 'dist',
    external: ['react', 'react-dom'],
    esbuildOptions(options) {
      options.jsx = 'automatic';
    },
  },
  // Tailwind preset build (CommonJS for require())
  {
    entry: ['tailwind.preset.ts'],
    format: ['cjs', 'esm'],
    outDir: 'dist',
    dts: false,
  },
]);
