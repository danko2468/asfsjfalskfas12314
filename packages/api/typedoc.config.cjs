/** @type {import('typedoc').TypeDocOptions} */
module.exports = {
  entryPoints: ["./src/services", "./src/ports", "./src/infras"],
  entryPointStrategy: "expand",
  out: "doc",
  tsconfig: "./tsconfig.json",
  name: "Todo API Documentation",
};
