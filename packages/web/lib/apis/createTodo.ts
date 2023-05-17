import { apiUrl } from "./constants";

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

  return (await response.json()) as TodoDto;
}
