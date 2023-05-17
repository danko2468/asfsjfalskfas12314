import type { TodoDto } from "../types";

export function parseTodoResponse(
  data: Omit<TodoDto, "createdAt" | "udpatedAt"> & { createdAt: string; updatedAt: string }
) {
  return {
    id: data.id,
    title: data.title,
    description: data.description,
    createdAt: new Date(data.createdAt),
    updatedAt: new Date(data.updatedAt),
  } as TodoDto;
}
