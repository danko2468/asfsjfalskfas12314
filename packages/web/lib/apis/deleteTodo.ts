import { apiUrl } from "./constants";

export async function deleteTodo(id: string) {
  await fetch(`${apiUrl}/todos/${id}`, {
    method: "DELETE",
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
    },
  });
}
