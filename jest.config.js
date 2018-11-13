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
};
