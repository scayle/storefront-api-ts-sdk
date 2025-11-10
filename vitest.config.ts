import { defineConfig, configDefaults } from 'vitest/config'
import { vitestCIConfigThreading } from '@scayle/vitest-config-storefront'

export default defineConfig({
  test: {
    globals: true,
    coverage: {
      provider: 'v8',
      include: ['src/**/*.{ts,js,mjs}'],
      exclude: [...(configDefaults.coverage.exclude || []), './src/test/**'],
      reporter: ['text', 'cobertura'],
      reportsDirectory: 'coverage',
    },
    ...vitestCIConfigThreading,
  },
})
