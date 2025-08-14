import tsConfigPaths from 'vite-tsconfig-paths'
import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    globals: true,
    exclude: [
      'node_modules',
      'dist',
      '**/*.e2e-spec.ts',
    ],
    
    include: [
      'tests/**/*.spec.ts'
    ],
  },
  plugins: [
    tsConfigPaths(),
  ],
})