import config from "~/config.ts";

import type { FastifyInstance } from "fastify";

export default function addHealthRoutes(fastify: FastifyInstance) {
  fastify.get(
    "/health",
    {
      schema: {
        tags: ["Others"],
        response: {
          200: {
            type: "object",
            properties: {
              message: { type: "string" },
              version: { type: "string" },
            },
          },
        },
      },
    },
    () => ({
      message: "OK",
      version: config.PACKAGE_VERSION,
    })
  );
}
