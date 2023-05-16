import type { TodoEntity } from "~/services/todo/todo.entity.ts";

export type TodoDto = Omit<TodoEntity, "createdAt" | "updatedAt"> &
  Required<Pick<TodoEntity, "id">> & {
    createdAt: string;
    updatedAt: string;
  };
