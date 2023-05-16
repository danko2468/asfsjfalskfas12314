import { useContext } from "react";

import { AppContext } from "~/components/AppLayer/mod";

import { NewTodo } from "./NewTodo";
import { TodoDetail } from "./TodoDetail";
import { TodoDetailBlank } from "./TodoDetailBlank";

export function TodoDetailWrapper() {
  const { id, setId } = useContext(AppContext);

  const onCreate = () => {
    setId("create");
  };

  return (
    <div className="h-full border-l border-neutral-500">
      {id ? id === "create" ? <NewTodo /> : <TodoDetail id={id} /> : <TodoDetailBlank onCreate={onCreate} />}
    </div>
  );
}
