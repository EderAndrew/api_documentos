/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  detectOpenHandles: true, //To realize async tests
  setupFilesAfterEnv: ['./src/singleton.ts'],
};