import { apiUrl } from "./constants";
import { throwIfResponseNotOk } from "./response";

type Args = {
  id: string;
  title: string;
  description?: string;
};

export async function updateTodo({ id, title, description }: Args) {
  const response = await fetch(`${apiUrl}/todos/${id}`, {
    method: "PUT",
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ title, description }),
  });
  await throwIfResponseNotOk(response);
}
