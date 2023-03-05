// jest.config.js
module.exports = {
  verbose: true,
  testEnvironment: 'node',
  // node-exports-resolver is needed to support firebase-admin v10
  resolver: 'jest-node-exports-resolver',
  setupFilesAfterEnv: ['./scripts/testSetup.js'],
  coverageReporters: ['lcov', 'text'],
  collectCoverageFrom: ['./src/**']
}
