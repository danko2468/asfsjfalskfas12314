import * as jose from "jose";

import config from "~/config.ts";
import { getLogger } from "~/utils/logger/mod.ts";

import type { AuthTokenInfo } from "./token.ts";
import type { FastifyInstance, FastifyPluginCallback } from "fastify";

const logger = getLogger("AuthHook");

export function useAuth(nestedServerImpl: (childServer: FastifyInstance) => void): FastifyPluginCallback {
  return (fastify, _options, done) => {
    let tokenInfo: AuthTokenInfo | undefined = undefined;

    fastify.decorate("getToken", () => tokenInfo);

    fastify.addHook("preHandler", async (request, reply) => {
      const token = ((request.headers["authorization"] as string) ?? "").replace("Bearer ", "");

      if (!token) {
        return reply.status(401).send({ message: "Unauthorized" });
      }

      const secret = new TextEncoder().encode(config.JWT_SECRET);

      try {
        const { payload } = await jose.jwtVerify(token, secret);
        tokenInfo = {
          // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
          userId: payload.sub!,
        };
      } catch (error) {
        logger.error("verifyToken error: %s", error.message);
        return reply.status(401).send({ message: error.message });
      }
    });

    fastify.register((i, _, d) => {
      nestedServerImpl(i);
      d();
    });

    done();
  };
}
