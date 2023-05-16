module.exports = {
  root: true,
  extends: ["next/core-web-vitals", "plugin:import/recommended", "plugin:import/typescript", "prettier"],
  ignorePatterns: [
    ".eslintrc.js",
    "jest*.js",
    "jest*.ts",
    "next*.config.js",
    "next*.config.mjs",
    "postcss.config.js",
    "prettier.config.js",
    "scripts/*.js",
    "scripts/*.mjs",
    "tailwind.config.js",
  ],
  settings: {
    "import/extensions": [".js", ".jsx"],
    "import/parsers": {
      "@typescript-eslint/parser": [".ts", ".tsx"],
    },
    "import/resolver": {
      typescript: {
        alwaysTryTypes: true,
        project: __dirname + "/tsconfig.json",
      },
      node: {
        extensions: [".js", ".jsx", ".ts", ".tsx"],
      },
    },
  },
  rules: {
    "import/order": [
      "error",
      {
        groups: ["builtin", "external", "internal", "parent", "sibling", "index", "object", "type"],
        pathGroups: [
          {
            pattern: "*.css",
            patternOptions: { matchBase: true },
            group: "type",
            position: "before",
          },
          {
            pattern: "*.scss",
            patternOptions: { matchBase: true },
            group: "type",
            position: "before",
          },
          {
            pattern: "*.sass",
            patternOptions: { matchBase: true },
            group: "type",
            position: "before",
          },
          {
            pattern: "*.less",
            patternOptions: { matchBase: true },
            group: "type",
            position: "before",
          },
        ],
        alphabetize: {
          order: "asc",
          caseInsensitive: false,
        },
        "newlines-between": "always",
        warnOnUnassignedImports: true,
      },
    ],
    "import/no-named-as-default": "off",
    "import/no-named-as-default-member": "off",
  },
};
