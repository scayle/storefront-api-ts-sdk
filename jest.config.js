/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  roots: ['<rootDir>/src'],
  preset: 'ts-jest',
  testEnvironment: 'node',
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
