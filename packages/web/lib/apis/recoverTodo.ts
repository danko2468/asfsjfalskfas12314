import { apiUrl } from "./constants";
import { throwIfResponseNotOk } from "./response";

export async function recoverTodo(id: string) {
  const response = await fetch(`${apiUrl}/todos/${id}/recovery`, {
    method: "PUT",
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({}),
  });

  await throwIfResponseNotOk(response);
}
