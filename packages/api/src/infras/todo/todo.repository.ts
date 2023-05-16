import { TodoNotFoundError, TodoUnknownError } from "~/services/todo/todo.errors.ts";

import { convertTodoDocument, convertTodoEntity } from "./todo.schema.converters.ts";
import TodoModel from "./todo.schema.ts";

import type { TodoDocument } from "./todo.schema.ts";
import type { TodoEntity } from "~/services/todo/todo.entity.ts";
import type { TodoFilterDto } from "~/services/todo/todo.filter.dto.ts";

export async function createTodoEntity(val: TodoEntity): Promise<TodoEntity> {
  try {
    const todo = await TodoModel.create(convertTodoEntity(val));
    return convertTodoDocument(todo);
  } catch (error) {
    throw new TodoUnknownError(error.message);
  }
}

export async function updateTodoEntity(val: TodoEntity): Promise<void> {
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
  try {
    const doc = await TodoModel.findById(id).lean();
    if (!doc || doc.deletedAt) throw new TodoNotFoundError(`Todo with id ${id} not found`);
    return convertTodoDocument(doc);
  } catch (error) {
    if (error instanceof TodoNotFoundError) throw error;
    throw new TodoUnknownError(error.message);
  }
}

export async function getDeletedTodoEntityList(): Promise<TodoEntity[]> {
  try {
    const docList = await TodoModel.find({ deletedAt: { $ne: null } }).lean();
    return docList.map(convertTodoDocument);
  } catch (error) {
    throw new TodoUnknownError(error.message);
  }
}

export async function countTodoEntityByFilter(val: TodoFilterDto) {
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
  let result: TodoDocument[];
  try {
    result = await TodoModel.aggregate<TodoDocument>([
      {
        $match: {
          deletedAt: null,
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
