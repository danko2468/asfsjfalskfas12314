import { apiUrl } from "./constants";

type Args = {
  id: string;
  title: string;
  description?: string;
};

export async function updateTodo({ id, title, description }: Args) {
  await fetch(`${apiUrl}/todos/${id}`, {
    method: "PUT",
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ title, description }),
  });
}
