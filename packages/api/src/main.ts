/* eslint-disable import/order */
import "~/utils/mongo/init.ts";

import config from "~/config.ts";

import server from "./app.ts";

try {
  await server.listen({ port: config.PORT, host: "0.0.0.0" });

  const address = server.server.address();
  const port = typeof address === "string" ? address : address?.port;

  server.log.info({ message: "Server started", port });
} catch (error) {
  server.log.error(error);
  process.exit(1);
}
