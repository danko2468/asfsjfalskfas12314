import { TodoNotFoundError, TodoUnknownError } from "~/services/todo/todo.errors.ts";
import { useLogger, getLogger } from "~/utils/logger/mod.ts";

import { convertTodoDocument, convertTodoEntity } from "./todo.schema.converters.ts";
import TodoModel from "./todo.schema.ts";

import type { TodoDocument } from "./todo.schema.ts";
import type { TodoEntity } from "~/services/todo/todo.entity.ts";
import type { TodoFilterDto } from "~/services/todo/todo.filter.dto.ts";

const logger = getLogger("TodoRepository");

export async function createTodoEntity(val: TodoEntity): Promise<TodoEntity> {
  const { logArgs } = useLogger(logger, createTodoEntity.name);
  logArgs(val);

  try {
    const todo = await TodoModel.create(convertTodoEntity(val));
    return convertTodoDocument(todo);
  } catch (error) {
    throw new TodoUnknownError(error.message);
  }
}

export async function updateTodoEntity(val: TodoEntity): Promise<void> {
  const { logArgs } = useLogger(logger, updateTodoEntity.name);
  logArgs(val);
  try {
    const result = await TodoModel.updateOne({ _id: val.id }, convertTodoEntity(val));
    if (result.matchedCount === 0) {
      throw new TodoNotFoundError(`Todo with id ${val.id} not found`);
    }
  } catch (error) {
    if (error instanceof TodoNotFoundError) throw error;
    throw new TodoUnknownError(error.message);
  }
}

export async function deleteTodoEntityById(id: string): Promise<void> {
  const { logArgs } = useLogger(logger, deleteTodoEntityById.name);
  logArgs(id);
  try {
    const result = await TodoModel.updateOne({ _id: id }, { deletedAt: new Date() });
    if (result.matchedCount === 0) {
      throw new TodoNotFoundError(`Todo with id ${id} not found`);
    }
  } catch (error) {
    if (error instanceof TodoNotFoundError) throw error;
    throw new TodoUnknownError(error.message);
  }
}

export async function recoverTodoEntityById(id: string): Promise<void> {
  const { logArgs } = useLogger(logger, recoverTodoEntityById.name);
  logArgs(id);
  try {
    const result = await TodoModel.updateOne({ _id: id }, { deletedAt: null });
    if (result.matchedCount === 0) {
      throw new TodoNotFoundError(`Todo with id ${id} not found`);
    }
  } catch (error) {
    if (error instanceof TodoNotFoundError) throw error;
    throw new TodoUnknownError(error.message);
  }
}

export async function getTodoEntityById(id: string): Promise<TodoEntity> {
  const { logArgs } = useLogger(logger, getTodoEntityById.name);
  logArgs(id);
  try {
    const doc = await TodoModel.findById(id).lean();
    if (!doc) throw new TodoNotFoundError(`Todo with id ${id} not found`);
    return convertTodoDocument(doc);
  } catch (error) {
    if (error instanceof TodoNotFoundError) throw error;
    throw new TodoUnknownError(error.message);
  }
}

export async function countTodoEntityByFilter(val: TodoFilterDto) {
  const { logArgs } = useLogger(logger, countTodoEntityByFilter.name);
  logArgs(val);
  try {
    return await TodoModel.countDocuments({
      deletedAt: null,
      ...(val.keywords && {
        $or: [
          { title: { $regex: val.keywords, $options: "i" } },
          { description: { $regex: val.keywords, $options: "i" } },
        ],
      }),
    });
  } catch (error) {
    throw new TodoUnknownError(error.message);
  }
}

export async function getTodoEntityListByFilter(val: TodoFilterDto): Promise<TodoEntity[]> {
  const { logArgs } = useLogger(logger, getTodoEntityListByFilter.name);
  logArgs(val);

  let result: TodoDocument[];
  try {
    result = await TodoModel.aggregate<TodoDocument>([
      {
        $match: {
          deletedAt: val.archived ? { $ne: null } : null,
          ...(val.keywords && {
            $or: [
              { title: { $regex: val.keywords, $options: "i" } },
              { description: { $regex: val.keywords, $options: "i" } },
            ],
          }),
        },
      },
      {
        $sort: {
          _id: val.sortOrder === "asc" ? 1 : -1,
        },
      },
      {
        $skip: val.page * val.pageSize,
      },
      {
        $limit: val.pageSize,
      },
    ]);
  } catch (error) {
    throw new TodoUnknownError(error.message);
  }

  return result.map(convertTodoDocument);
}
