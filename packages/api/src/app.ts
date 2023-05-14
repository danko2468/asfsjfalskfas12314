import cors from "@fastify/cors";
import Fastify from "fastify";
import qs from "qs";

import { useAuth } from "~/ports/auth/hooks.ts";
import { useErrorHandler } from "~/ports/error/error.handler.ts";
import { addHealthRoutes } from "~/ports/health/health.controller.ts";
import { useSwagger } from "~/utils/swagger/hooks.ts";

const app = Fastify({ logger: true, querystringParser: (str) => qs.parse(str, { comma: true }) });

await app.register(cors);
await useErrorHandler(app);
await useSwagger(app);

addHealthRoutes(app);

// app.register(
//   useAuth((childServer) => {
//     addTomicaReservationRoutes(childServer);
//     addTomicaRoutes(childServer);
//   })
// );

export default app;
