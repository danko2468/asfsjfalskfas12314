import fsPromise from "node:fs/promises";
import { fileURLToPath } from "node:url";

import server from "./app.ts";

console.time("swagger.json generated");

const outDir = fileURLToPath(new URL("../dist", import.meta.url));

await server.ready();
const json = (server as any).swagger();

if (!(await fsPromise.stat(outDir).catch(() => false))) {
  await fsPromise.mkdir(outDir);
}

await fsPromise.writeFile(`${outDir}/swagger.json`, JSON.stringify(json, null, 2));

console.timeEnd("swagger.json generated");
