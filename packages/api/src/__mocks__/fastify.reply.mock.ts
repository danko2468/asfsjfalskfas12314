import { jest } from "@jest/globals";

import type { FastifyReply } from "fastify";

class FastifyReplyMock {
  status = jest.fn().mockReturnValue(this);
  send = jest.fn().mockReturnValue(this);
}

export function FastifyReplyMockFactory(): FastifyReply {
  return new FastifyReplyMock() as never;
}
