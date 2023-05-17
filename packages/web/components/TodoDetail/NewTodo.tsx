import { useContext } from "react";
import { toast } from "react-toastify";

import { AppContext } from "~/components/AppLayer/mod";
import { createTodo } from "~/lib/apis/createTodo";

import { TodoForm } from "./TodoForm";

export function NewTodo() {
  const { setId } = useContext(AppContext);

  const onSubmit = async (data: { title: string; description?: string }) => {
    try {
      const todo = await createTodo(data.title, data.description);
      setId(todo.id);
      toast.success("Todo created");
    } catch (error) {
      toast.error((error as Error).message);
    }
  };

  return <TodoForm onSubmit={onSubmit} />;
}
