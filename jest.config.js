// TODO: Use helper for up to date `paths` mappings
// const {pathsToModuleNameMapper} = require('ts-jest/utils');

module.exports = {
  roots: ['<rootDir>/src'],
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
  },
  globals: {
    'ts-jest': {
      tsConfig: 'tsconfig.json',
    },
  },
  testRegex: '(/tests/.*|/__tests__/.*|(\\.|/)(test|spec))\\.tsx?$',
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  moduleNameMapper: {'^bapi/(.*)$': '<rootDir>/src/$1'},
  collectCoverage: true,
  collectCoverageFrom: [
    'src/**/*.{ts,tsx}',
    '!src/index.ts',

    /**
     * Modeled product is not yet ready for shipping,
     * hence excluded from coverage for now
     */
    '!src/helpers/ModeledBapiClient.ts',
    '!src/helpers/productMapping.ts',
    '!src/helpers/bapiProduct.ts',
  ],
};
