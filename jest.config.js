module.exports = {
    setupFilesAfterEnv: [
        "./tests/setup.js",
    ],
    transform: {
      "^.+\\.[t|j]sx?$": "babel-jest"
    },
    moduleNameMapper: {
      "app/(.*)":"<rootDir>/app/$1",
      "tests/(.*)": "<rootDir>/tests/$1"
    },
    moduleDirectories: ['node_modules', 'app']
}