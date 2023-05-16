import cors from "@fastify/cors";
import Fastify from "fastify";

import { useErrorHandler } from "~/ports/error/error.handler.ts";
import addHealthRoutes from "~/ports/health/health.controller.ts";
import { PaginationDtoJsonSchmea } from "~/ports/pagination/pagination.dto.json-schema.ts";
import addTodoRoutes from "~/ports/todo/todo.controller.ts";
import { TodoDtoJsonSchema } from "~/ports/todo/todo.dto.json-schema.ts";
import { TodoFilterDtoJsonSchema } from "~/ports/todo/todo.filter.dto.json-schema.ts";
import { TodoUpsertDtoJsonSchema } from "~/ports/todo/todo.upsert.dto.json-schema.ts";
import { useSwagger } from "~/utils/swagger/hooks.ts";

const app = Fastify({ logger: true });

await app.register(cors);
await useErrorHandler(app);
await useSwagger(app);

app.addSchema(TodoDtoJsonSchema);
app.addSchema(TodoUpsertDtoJsonSchema);
app.addSchema(TodoFilterDtoJsonSchema);
app.addSchema(PaginationDtoJsonSchmea);

addHealthRoutes(app);
addTodoRoutes(app);

export default app;
