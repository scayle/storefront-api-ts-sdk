import { defineConfig, configDefaults } from 'vitest/config'

export default defineConfig({
  test: {
    globals: true,
    coverage: {
      provider: 'v8',
      exclude: [...(configDefaults.coverage.exclude || []), './src/test/**'],
      reporter: ['text', 'cobertura'],
      reportsDirectory: 'coverage',
    },
  },
})
