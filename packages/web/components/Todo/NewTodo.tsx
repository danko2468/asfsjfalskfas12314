"use client";
import { useContext } from "react";
import { toast } from "react-toastify";

import { AppContext } from "~/components/AppLayer/mod";
import { IcArrowBack } from "~/icons/IcArrowBack";
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

  const onCancel = () => {
    setId(null);
  };

  return (
    <div className="h-full">
      <div className="flex h-[64px] items-center justify-start px-4 pt-4">
        <button className="mx-0 w-[120px] border-none" onClick={onCancel}>
          <IcArrowBack />
          <span>Back</span>
        </button>
      </div>
      <TodoForm onSubmit={onSubmit} className="h-[calc(100%-64px)]" />
    </div>
  );
}
