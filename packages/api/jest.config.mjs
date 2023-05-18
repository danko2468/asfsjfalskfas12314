export default {
  testEnvironment: "node",
  testEnvironmentOptions: {},
  moduleFileExtensions: ["js", "json", "ts"],
  roots: ["<rootDir>/src"],
  testMatch: ["**/*.test.ts", "**/*.spec.ts"],
  extensionsToTreatAsEsm: [".ts"],
  transform: {
    "^.+\\.(t|j)s?$": [
      "@swc/jest",
      {
        module: {
          type: "es6",
        },
        jsc: {
          target: "es2021",
          parser: {
            syntax: "typescript",
            decorators: true,
            topLevelAwait: true,
            importMeta: true,
          },
          transform: {
            legacyDecorator: true,
            decoratorMetadata: true,
          },
        },
      },
    ],
  },
  transformIgnorePatterns: [],
  setupFiles: ["<rootDir>/jest.setup.ts"],
  coverageDirectory: "./coverage",
  coveragePathIgnorePatterns: [
    "<rootDir>/(.*).entity.ts",
    "<rootDir>/(.*).dto.ts",
    "<rootDir>/(.*).interface.ts",
    "<rootDir>/(.*).errors?.ts",
    "<rootDir>/(.*).vo.ts",
    "<rootDir>/(.*).module.ts",
    "<rootDir>/(.*).module.tokens.ts",
    "<rootDir>/(.*).types?.ts",
    "<rootDir>/(.*).constants?.ts",
  ],
  moduleNameMapper: {
    "^~/(.*)$": "<rootDir>/src/$1",
  },
};
