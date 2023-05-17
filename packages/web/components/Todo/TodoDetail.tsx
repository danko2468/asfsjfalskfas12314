"use client";
import { DateTime } from "luxon";
import { useMemo, useContext } from "react";
import { toast } from "react-toastify";
import useSWR from "swr";

import { AppContext } from "~/components/AppLayer/mod";
import { IcDelete } from "~/icons/IcDelete";
import { deleteTodo } from "~/lib/apis/deleteTodo";
import { parseTodoResponse } from "~/lib/apis/response";
import { getSwrFetcher } from "~/lib/apis/swrFetcher";
import { updateTodo } from "~/lib/apis/updateTodo";

import { TodoForm } from "./TodoForm";

import type { PropsWithoutRef } from "react";
import type { TodoDto } from "~/lib/types";

type Props = {
  id: string;
};

export function TodoDetail({ id }: PropsWithoutRef<Props>) {
  const { setId } = useContext(AppContext);
  const { data, error, mutate } = useSWR<TodoDto>(`/todos/${id}`, getSwrFetcher(parseTodoResponse));

  const loading = useMemo(() => !data && !error, [data, error]);

  const onUpdate = async (data: any) => {
    try {
      await updateTodo({ id, ...data });
      mutate();
      toast.success("Todo updated");
    } catch (error) {
      toast.error((error as Error).message);
    }
  };

  const onDelete = async () => {
    try {
      await deleteTodo(id);
      setId(null);
      toast.success("Todo deleted");
    } catch (error) {
      toast.error((error as Error).message);
    }
  };

  return (
    <div className="h-full">
      {loading ? (
        "Loading..."
      ) : (
        <>
          <div className="flex h-[64px] items-center justify-end px-4 pt-4">
            <button className="w-[120px]" onClick={onDelete}>
              <IcDelete className="mr-1" />
              <span>Delete</span>
            </button>
            <span className="flex-1 text-right">
              Updated at {data?.updatedAt?.toLocaleString(DateTime.DATETIME_MED)}
            </span>
          </div>
          <TodoForm defaultValue={data as never} onSubmit={onUpdate} className="h-[calc(100%-64px)]" />
        </>
      )}
    </div>
  );
}
