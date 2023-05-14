import Swagger from "@fastify/swagger";

import config from "~/config.ts";

import type { FastifyInstance } from "fastify";

export async function useSwagger(server: FastifyInstance) {
  await server.register(Swagger, {
    swagger: {
      schemes: ["https"],
      consumes: ["application/json"],
      produces: ["application/json"],
    },
    openapi: {
      info: {
        title: "TODO API",
        version: config.PACKAGE_VERSION,
      },
      servers: [{ url: "http://localhost:3000", description: "LOCAL" }],
      tags: [{ name: "Todo" }, { name: "Others" }],
      components: {
        securitySchemes: {
          bearerAuth: {
            type: "http",
            scheme: "bearer",
            bearerFormat: "JWT",
          },
        },
      },
    },
  });
}
