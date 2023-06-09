import { apiUrl } from "./constants";
import { throwIfResponseNotOk } from "./response";

export async function deleteTodo(id: string) {
  const response = await fetch(`${apiUrl}/todos/${id}`, {
    method: "DELETE",
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
    },
  });

  await throwIfResponseNotOk(response);
}
