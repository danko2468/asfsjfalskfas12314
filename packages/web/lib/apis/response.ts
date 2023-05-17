import { DateTime } from "luxon";

import type { TodoDto } from "../types";

export function parseTodoResponse(
  data: Omit<TodoDto, "createdAt" | "udpatedAt"> & { createdAt: string; updatedAt: string }
) {
  return {
    id: data.id,
    title: data.title,
    description: data.description,
    createdAt: DateTime.fromISO(data.createdAt),
    updatedAt: DateTime.fromISO(data.updatedAt),
  } as TodoDto;
}
