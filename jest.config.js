const { pathsToModuleNameMapper } = require('ts-jest/utils');
const { compilerOptions } = require('./tsconfig.json');

module.exports = {
  clearMocks: true,
  collectCoverage: true,
  roots: ['<rootDir>/src'],
  coverageDirectory: 'coverage',
  coverageProvider: 'v8',
  coverageReporters: ['text', 'lcov'],

  transform: {
    '.[tj]s': 'babel-jest',
  },
  testEnvironment: 'node',
  testMatch: ['**/*.test.ts', '**/*.spec.ts'],
  moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths, {
    prefix: '<rootDir>/src/',
  }),
  collectCoverageFrom: [
    '<rootDir>/src/services/**',
    '<rootDir>/src/providers/**',
    '<rootDir>/src/http/controllers/**',
    '!<rootDir>/src/http/controllers/_utils/**',
    '!**/*.test.ts',
    '!**/*.spec.ts',
  ],
};
