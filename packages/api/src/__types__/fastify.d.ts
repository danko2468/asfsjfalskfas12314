import "fastify";

declare module "fastify" {
  interface FastifyInstance {
    getToken?: () => any;
  }
}
