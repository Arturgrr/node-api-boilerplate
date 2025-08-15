import swc from 'unplugin-swc';
import tsConfigPaths from 'vite-tsconfig-paths';
import { defineConfig } from 'vitest/config';

export default defineConfig({

  plugins: [tsConfigPaths(), swc.vite()],
  test: {
    globals: true,
    

    include: ['tests/**/*.e2e-spec.ts'],
    

    exclude: ['node_modules', 'dist', 'tests/**/*.spec.ts'],
    

    setupFiles: ['./tests/setup-e2e.ts'],
    

    testTimeout: 30000,
  },
});