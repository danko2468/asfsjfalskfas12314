import * as TodoRepo from "~/infras/todo/todo.repository.ts";

import { TodoSchema } from "./todo.entity.ts";
import { TodoInvalidInputError } from "./todo.errors.ts";
import { TodoFilterDtoSchema } from "./todo.filter.dto.ts";

import type { TodoEntity } from "./todo.entity.ts";
import type { TodoFilterDto } from "./todo.filter.dto.ts";

export async function createTodoEntity(val: TodoEntity): Promise<TodoEntity> {
  let entity: TodoEntity;
  try {
    entity = await TodoSchema.validate(val);
  } catch (error) {
    throw new TodoInvalidInputError(error.message);
  }

  return TodoRepo.createTodoEntity(entity);
}

export async function updateTodoEntity(val: TodoEntity): Promise<void> {
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
  await TodoRepo.deleteTodoEntityById(id);
}

export async function recoverTodoEntityById(id: string) {
  await TodoRepo.recoverTodoEntityById(id);
}

export async function getTodoEntityById(id: string): Promise<TodoEntity> {
  return TodoRepo.getTodoEntityById(id);
}

export async function getDeletedTodoEntityList(): Promise<TodoEntity[]> {
  return TodoRepo.getDeletedTodoEntityList();
}

export async function getTodoEntityListByFilter(val: TodoFilterDto) {
  let filter: TodoFilterDto;

  try {
    filter = await TodoFilterDtoSchema.validate(val);
  } catch (error) {
    throw new TodoInvalidInputError(error.message);
  }

  return await TodoRepo.getTodoEntityListByFilter(filter);
}

export async function countTodoEntityByFilter(val: TodoFilterDto) {
  let filter: TodoFilterDto;
  try {
    filter = await TodoFilterDtoSchema.validate(val);
  } catch (error) {
    throw new TodoInvalidInputError(error.message);
  }
  return await TodoRepo.countTodoEntityByFilter(filter);
}
