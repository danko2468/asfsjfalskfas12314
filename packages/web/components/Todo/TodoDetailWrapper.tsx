"use client";
import { useContext } from "react";

import { AppContext } from "~/components/AppLayer/mod";

import { NewTodo } from "./NewTodo";
import { TodoBlank } from "./TodoBlank";
import { TodoDetail } from "./TodoDetail";

export function TodoDetailWrapper() {
  const { id, setId } = useContext(AppContext);

  const onCreate = () => {
    setId("create");
  };

  return (
    <div className="h-full border-neutral-500 tablet:border-l">
      {id ? id === "create" ? <NewTodo /> : <TodoDetail id={id} /> : <TodoBlank onCreate={onCreate} />}
    </div>
  );
}
