module.exports = {
    setupFilesAfterEnv: [
        "./tests/setup.js",
    ],
    transform: {
      "^.+\\.[t|j]sx?$": "babel-jest"
    },
    moduleNameMapper: {
      "~(.*)$": "<rootDir>/app$1"
    }
}