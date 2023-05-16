import * as TodoRepo from "~/infras/todo/todo.repository.ts";
import { useLogger, getLogger } from "~/utils/logger/mod.ts";

import { TodoSchema } from "./todo.entity.ts";
import { TodoInvalidInputError } from "./todo.errors.ts";
import { TodoFilterDtoSchema } from "./todo.filter.dto.ts";

import type { TodoEntity } from "./todo.entity.ts";
import type { TodoFilterDto } from "./todo.filter.dto.ts";

const logger = getLogger("TodoService");

export async function createTodoEntity(val: TodoEntity): Promise<TodoEntity> {
  const { logArgs } = useLogger(logger, createTodoEntity.name);
  logArgs(val);

  let entity: TodoEntity;
  try {
    entity = await TodoSchema.validate(val);
  } catch (error) {
    throw new TodoInvalidInputError(error.message);
  }

  return TodoRepo.createTodoEntity(entity);
}

export async function updateTodoEntity(val: TodoEntity): Promise<void> {
  const { logArgs } = useLogger(logger, updateTodoEntity.name);
  logArgs(val);

  let entity: TodoEntity;

  try {
    entity = await TodoSchema.validate(val);
    if (!entity.id) throw new Error(`Todo id is required`);
  } catch (error) {
    throw new TodoInvalidInputError(error.message);
  }

  await TodoRepo.updateTodoEntity(entity);
}

export async function deleteTodoEntityById(id: string) {
  const { logArgs } = useLogger(logger, deleteTodoEntityById.name);
  logArgs(id);

  await TodoRepo.deleteTodoEntityById(id);
}

export async function recoverTodoEntityById(id: string) {
  const { logArgs } = useLogger(logger, recoverTodoEntityById.name);
  logArgs(id);

  await TodoRepo.recoverTodoEntityById(id);
}

export async function getTodoEntityById(id: string): Promise<TodoEntity> {
  const { logArgs } = useLogger(logger, getTodoEntityById.name);
  logArgs(id);

  return TodoRepo.getTodoEntityById(id);
}

export async function getDeletedTodoEntityList(): Promise<TodoEntity[]> {
  const { logArgs } = useLogger(logger, getDeletedTodoEntityList.name);
  logArgs();

  return TodoRepo.getDeletedTodoEntityList();
}

export async function getTodoEntityListByFilter(val: TodoFilterDto) {
  const { logArgs } = useLogger(logger, getTodoEntityListByFilter.name);
  logArgs(val);

  let filter: TodoFilterDto;

  try {
    filter = await TodoFilterDtoSchema.validate(val);
  } catch (error) {
    throw new TodoInvalidInputError(error.message);
  }

  return await TodoRepo.getTodoEntityListByFilter(filter);
}

export async function countTodoEntityByFilter(val: TodoFilterDto) {
  const { logArgs } = useLogger(logger, countTodoEntityByFilter.name);
  logArgs(val);

  let filter: TodoFilterDto;
  try {
    filter = await TodoFilterDtoSchema.validate(val);
  } catch (error) {
    throw new TodoInvalidInputError(error.message);
  }
  return await TodoRepo.countTodoEntityByFilter(filter);
}
