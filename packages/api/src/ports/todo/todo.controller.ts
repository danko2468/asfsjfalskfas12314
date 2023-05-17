import createError from "http-errors";

import { getPaginationDto } from "~/ports/pagination/pagination.dto.converters.ts";
import { TodoInvalidInputError, TodoNotFoundError } from "~/services/todo/todo.errors.ts";
import * as TodoService from "~/services/todo/todo.service.ts";

import * as ControllerSchema from "./todo.controller.schema.ts";
import { convertTodoEntity } from "./todo.dto.converters.ts";

import type { TodoUpsertDto } from "./todo.upsert.dto.ts";
import type { FastifyInstance, FastifyRequest, FastifyReply } from "fastify";
import type { TodoEntity } from "~/services/todo/todo.entity.ts";

export default (fastify: FastifyInstance) => {
  fastify.get("/todos/:id", { schema: ControllerSchema.GetTodoById }, getTodoById);
  fastify.put("/todos/:id", { schema: ControllerSchema.UpdateTodo }, updateTodo);
  fastify.delete("/todos/:id", { schema: ControllerSchema.DeleteTodo }, deleteTodo);
  fastify.put("/todos/:id/recovery", { schema: ControllerSchema.RecoverTodo }, recoverTodo);
  fastify.get("/todos", { schema: ControllerSchema.GetTodoList }, getTodoList);
  fastify.post("/todos", { schema: ControllerSchema.CreateTodo }, createTodo);
};

export async function getTodoById(req: FastifyRequest) {
  const { id } = req.params as { id: string };

  try {
    const entity = await TodoService.getTodoEntityById(id);
    return convertTodoEntity(entity);
  } catch (error) {
    if (error instanceof TodoNotFoundError) throw createError.NotFound(error.message);
    throw createError.InternalServerError(error.message);
  }
}

export async function getTodoList(req: FastifyRequest) {
  const {
    page = 0,
    pageSize = 24,
    sortOrder = "asc",
    archived,
    keywords,
  } = req.query as {
    keywords?: string;
    page?: number;
    pageSize?: number;
    archived?: boolean;
    sortOrder?: "asc" | "desc";
  };

  const filter = {
    keywords,
    page,
    pageSize,
    sortOrder,
    archived,
  };

  try {
    const items = await TodoService.getTodoEntityListByFilter(filter);
    const count = await TodoService.countTodoEntityByFilter(filter);
    return {
      items: items.map(convertTodoEntity),
      pagination: getPaginationDto(page, pageSize, count),
    };
  } catch (error) {
    if (error instanceof TodoInvalidInputError) throw createError.BadRequest(error.message);
    throw createError.InternalServerError(error.message);
  }
}

export async function deleteTodo(req: FastifyRequest, reply: FastifyReply) {
  const { id } = req.params as { id: string };

  try {
    await TodoService.deleteTodoEntityById(id);
  } catch (error) {
    if (error instanceof TodoNotFoundError) throw createError.NotFound(error.message);
    throw createError.InternalServerError(error.message);
  }

  return reply.status(204).send(null);
}

export async function recoverTodo(req: FastifyRequest, reply: FastifyReply) {
  const { id } = req.params as { id: string };

  try {
    await TodoService.recoverTodoEntityById(id);
  } catch (error) {
    if (error instanceof TodoNotFoundError) throw createError.NotFound(error.message);
    throw createError.InternalServerError(error.message);
  }

  return reply.status(204).send(null);
}

export async function createTodo(req: FastifyRequest, reply: FastifyReply) {
  const dto = req.body as TodoUpsertDto;

  let entity: TodoEntity;

  try {
    entity = await TodoService.createTodoEntity({
      title: dto.title,
      description: dto.description,
    });
  } catch (error) {
    if (error instanceof TodoInvalidInputError) throw createError.BadRequest(error.message);
    throw createError.InternalServerError(error.message);
  }

  return reply.status(201).send(entity);
}

export async function updateTodo(req: FastifyRequest, reply: FastifyReply) {
  const dto = req.body as TodoUpsertDto;
  const { id } = req.params as { id: string };

  try {
    await TodoService.updateTodoEntity({ id, title: dto.title, description: dto.description });
  } catch (error) {
    if (error instanceof TodoInvalidInputError) throw createError.BadRequest(error.message);
    if (error instanceof TodoNotFoundError) throw createError.NotFound(error.message);
    throw createError.InternalServerError(error.message);
  }

  return reply.status(204).send(null);
}
