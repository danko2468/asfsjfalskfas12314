import type { TodoDto } from "./todo.dto.ts";
import type { TodoEntity } from "~/services/todo/todo.entity.ts";

export function convertTodoEntity(val: TodoEntity): TodoDto {
  return {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    id: val.id!,
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    createdAt: val.createdAt!.toISOString(),
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    updatedAt: val.updatedAt!.toISOString(),
    title: val.title,
    description: val.description,
  };
}
