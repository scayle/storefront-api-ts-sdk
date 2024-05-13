import eslintConfigStorefront from '@scayle/eslint-config-storefront'

export default eslintConfigStorefront({ isNuxt: false }).append(
  {
    rules: {
      'no-console': 'warn',
      'prefer-template': 'warn',
      'node/prefer-global/buffer': 'warn',
      'ts/consistent-type-definitions': 'warn',
      'ts/prefer-ts-expect-error': 'warn',
      'no-restricted-globals': 'warn',
      'no-cond-assign': 'warn',
      'no-use-before-define': 0,
      'node/no-path-concat': 0,
      'sonarjs/no-duplicate-string': 0,
      'sonarjs/cognitive-complexity': 0,
      'jsonc/no-useless-escape': 0,
    },
  },
)
