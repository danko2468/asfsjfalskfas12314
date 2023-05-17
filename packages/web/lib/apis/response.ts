import { DateTime } from "luxon";

import type { TodoDto } from "../types";

export async function throwIfResponseNotOk(response: Response) {
  if (!response?.ok) {
    throw new Error((await response.json()).message ?? response.statusText);
  }
}

export function parseTodoResponse(
  data: Omit<TodoDto, "createdAt" | "udpatedAt" | "deletedAt"> & {
    createdAt: string;
    updatedAt: string;
    deletedAt: string;
  }
) {
  return {
    id: data.id,
    title: data.title,
    description: data.description,
    createdAt: DateTime.fromISO(data.createdAt),
    updatedAt: DateTime.fromISO(data.updatedAt),
    ...(data.deletedAt && { deletedAt: DateTime.fromISO(data.deletedAt) }),
  } as TodoDto;
}
