import alias from "@rollup/plugin-alias";
import commonjs from "@rollup/plugin-commonjs";
import json from "@rollup/plugin-json";
import { nodeResolve } from "@rollup/plugin-node-resolve";
import swc from "@rollup/plugin-swc";
import terser from "@rollup/plugin-terser";

import packageJson from "./package.json" assert { type: "json" };

/** @type {import("rollup").RollupOptions} */
const base = {
  plugins: [
    alias({
      entries: [{ find: "~", replacement: "src" }],
    }),
    nodeResolve({ exportConditions: ["node"] }),
    commonjs(),
    json(),
    swc({
      swc: {
        jsc: {
          target: "es2021",
          parser: {
            syntax: "typescript",
            decorators: true,
            topLevelAwait: true,
            importMeta: true,
          },
          keepClassNames: true,
          transform: {
            legacyDecorator: true,
            decoratorMetadata: true,
          },
        },
      },
    }),
    ...(process.env.NODE_ENV !== "development"
      ? [
          terser({
            keep_classnames: true,
            keep_fnames: true,
          }),
        ]
      : []),
  ],
  external: [...Object.keys(packageJson.devDependencies), ...Object.keys(packageJson.dependencies)],
};

const inputMap = new Map();

if (process.env.APP_SWAGGER === "true") {
  inputMap.set("src/swagger.ts", "dist/swagger.js");
} else {
  inputMap.set("src/main.ts", "dist/main.js");
}

export default Array.from(inputMap.entries()).map(([input, outputFile]) => ({
  ...base,
  input,
  output: {
    sourcemap: true,
    file: outputFile,
    format: "es",
  },
}));
