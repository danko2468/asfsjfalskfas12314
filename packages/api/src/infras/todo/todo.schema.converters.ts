import type { TodoDocument } from "./todo.schema.ts";
import type { TodoEntity } from "~/services/todo/todo.entity.ts";

export function convertTodoDocument(val: TodoDocument): TodoEntity {
  return {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    id: val._id!.toString(),
    title: val.title,
    description: val.description,
    createdAt: val.createdAt,
    updatedAt: val.updatedAt,
    deletedAt: val.deletedAt,
  };
}

export function convertTodoEntity(val: TodoEntity): Partial<TodoDocument> {
  return {
    title: val.title,
    description: val.description,
  };
}
