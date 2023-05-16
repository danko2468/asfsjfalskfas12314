import type { FastifyInstance } from "fastify";
import type { HttpError } from "http-errors";

export async function useErrorHandler(fastify: FastifyInstance) {
  fastify.setErrorHandler((error, request, reply) => {
    const statusCode = (error as unknown as HttpError)?.status || 500;

    request.log.error(error, `This error has status code ${statusCode}`);
    reply.status(statusCode).send({
      statusCode: statusCode,
      message: error.cause,
    });
  });
}
