import type { TodoEntity } from "~/services/todo/todo.entity.ts";

export type TodoDto = TodoEntity & Required<Pick<TodoEntity, "id" | "createdAt" | "updatedAt">>;
