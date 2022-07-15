module.exports = {
  'roots': [
      '<rootDir>/src'
  ],
  'transform': {
      '^.+\.tsx?$': 'ts-jest'
  },
  'moduleNameMapper': {
       '@alias/(.*)': '<rootDir>/src/path/to/alias/$1'
  }
};