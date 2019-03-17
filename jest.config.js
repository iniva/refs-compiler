module.exports = {
  testMatch: [
    '<rootDir>/src/**/?(*.)test.js',
    '<rootDir>/bin/**/?(*.)test.js',
  ],
  testPathIgnorePatterns: [
    '/node_modules/',
    '<rootDir>/lib/',
  ],
  testEnvironment: 'node',
  coverageReporters: [
    'text-summary',
    'html',
    'lcov',
  ],
  collectCoverageFrom: [
    'src/**/*.js',
    'bin/*.js',
  ],
};
