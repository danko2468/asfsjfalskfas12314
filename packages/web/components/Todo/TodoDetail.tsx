"use client";
import { DateTime } from "luxon";
import { useMemo, useContext } from "react";
import { toast } from "react-toastify";
import useSWR from "swr";

import { AppContext } from "~/components/AppLayer/mod";
import { IcArrowBack } from "~/icons/IcArrowBack";
import { IcDelete } from "~/icons/IcDelete";
import { IcRestore } from "~/icons/IcRestore";
import { DeviceType } from "~/lib/Screen/constants";
import { deleteTodo } from "~/lib/apis/deleteTodo";
import { recoverTodo } from "~/lib/apis/recoverTodo";
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
  const { setId, deviceType } = useContext(AppContext);
  const { data, error, mutate } = useSWR<TodoDto>(() => `/todos/${id}`, getSwrFetcher(parseTodoResponse));

  const loading = useMemo(() => !data && !error, [data, error]);
  const isArchived = useMemo(() => data?.deletedAt, [data]);

  const onUpdate = async (data: any) => {
    try {
      await updateTodo({ id, ...data });
      mutate();
      toast.success("Todo updated");
    } catch (error) {
      toast.error((error as Error).message);
    }
  };

  const onCancel = () => {
    setId(null);
  };

  const onRecover = async () => {
    try {
      await recoverTodo(id);
      setId(null);
      toast.success("Todo recovered");
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
        <></>
      ) : (
        <>
          <div className="flex h-[64px] items-center justify-end px-4 pt-4">
            {deviceType === DeviceType.Mobile && (
              <button className="mx-0 w-[120px] border-none" onClick={onCancel}>
                <IcArrowBack />
                <span>Back</span>
              </button>
            )}
            <button className="w-[120px]" onClick={isArchived ? onRecover : onDelete}>
              {isArchived ? <IcRestore className="mr-1" /> : <IcDelete className="mr-1" />}
              <span>{isArchived ? "Restore" : "Delete"}</span>
            </button>
            <span className="flex-1 text-right">
              {isArchived
                ? `Deleted at ${data?.deletedAt?.toLocaleString(DateTime.DATETIME_MED)}`
                : `Updated at ${data?.updatedAt?.toLocaleString(DateTime.DATETIME_MED)}`}
            </span>
          </div>
          <TodoForm defaultValue={data as never} onSubmit={onUpdate} className="h-[calc(100%-64px)]" />
        </>
      )}
    </div>
  );
}
