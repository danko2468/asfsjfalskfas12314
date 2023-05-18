import type { TodoEntity } from "~/services/todo/todo.entity.ts";

export function TodoEntityMockFactory(val: any): TodoEntity {
  return {
    id: val.id,
    title: val.title ?? "",
    description: val.description,
    createdAt: val.createdAt ?? new Date(),
    updatedAt: val.updatedAt ?? new Date(),
    deletedAt: val.deletedAt,
  };
}
