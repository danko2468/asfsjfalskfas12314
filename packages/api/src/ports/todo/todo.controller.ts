import createError from "http-errors";

import type { FastifyInstance } from "fastify";

export default (fastify: FastifyInstance) => {
  getTodoById(fastify);
};

export function getTodoById(fastify: FastifyInstance) {
  fastify.get(
    "/todos/:id",
    {
      schema: Swagger.getFeatureStoreByStoreId,
    },
    async (_, reply) => {}
  );
}

export function getTodoList(fastify: FastifyInstance) {
  fastify.get(
    "/todos",
    {
      schema: Swagger.getFeatureStoreByStoreId,
    },
    async (_, reply) => {}
  );
}
