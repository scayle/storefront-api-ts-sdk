import eslintConfigStorefront from '@scayle/eslint-config-storefront'

export default eslintConfigStorefront({ isNuxt: false }).append(
  {
    rules: {
      'no-use-before-define': 0,
      'node/no-path-concat': 0,
      'sonarjs/cognitive-complexity': 0,
      'jsonc/no-useless-escape': 0,
    },
  },
)
