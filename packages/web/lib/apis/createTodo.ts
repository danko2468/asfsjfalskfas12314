import { apiUrl } from "./constants";
import { throwIfResponseNotOk } from "./response";

import type { TodoDto } from "~/lib/types";

export async function createTodo(title: string, description?: string) {
  const response = await fetch(`${apiUrl}/todos`, {
    method: "POST",
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ title, description }),
  });

  await throwIfResponseNotOk(response);

  return (await response.json()) as TodoDto;
}
