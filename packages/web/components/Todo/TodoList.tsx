"use client";

import clsx from "clsx";
import { useState, useMemo, useContext } from "react";
import useSWR from "swr";

import { AppContext } from "~/components/AppLayer/mod";
import { IcChevronLeft } from "~/icons/IcChevronLeft";
import { IcChevronRight } from "~/icons/IcChevronRight";
import { IcFirstPage } from "~/icons/IcFirstPage";
import { IcFolderDelete } from "~/icons/IcFolderDelete";
import { IcLastPage } from "~/icons/IcLastPage";
import { IcListAltAdd } from "~/icons/IcListAltAdd";
import { IcSort } from "~/icons/IcSort";
import { DeviceType } from "~/lib/Screen/constants";
import { parseTodoResponse } from "~/lib/apis/response";
import { getSwrFetcher } from "~/lib/apis/swrFetcher";

import { TodoBlank } from "./TodoBlank";
import { TodoItem } from "./TodoItem";

import type { TodoDto, PaginationDto } from "~/lib/types";

export function TodoList() {
  const { deviceType, setId } = useContext(AppContext);
  const [currentPage, setPage] = useState<number>(0);
  const [keywords, setKeyword] = useState("");
  const [sortOrder, setSortOrder] = useState<"desc" | "asc">("asc");
  const queryString = useMemo(() => {
    const search = new URLSearchParams({
      page: `${currentPage}`,
      ...(keywords && { keywords }),
      sortOrder,
      pageSize: `${12}`,
    });
    return search.toString();
  }, [keywords, currentPage, sortOrder]);

  const { data, error } = useSWR<{ items: TodoDto[]; pagination: PaginationDto }>(
    `/todos?${queryString}`,
    getSwrFetcher((res) => ({ items: res.items.map(parseTodoResponse), pagination: res.pagination })),
    { refreshInterval: 1000 }
  );

  const { items, pagination } = data ?? {};
  const loading = useMemo(() => !data && !error, [data, error]);

  const isFirstPage = useMemo(() => (pagination?.page ?? 0) === 0, [pagination?.page]);
  const hasPrevPage = useMemo(() => (pagination?.page ?? 0) > 0, [pagination?.page]);
  const hasNextPage = useMemo(
    () => (pagination?.page ?? 0) < (pagination?.totalPages ?? 1) - 1,
    [pagination?.page, pagination?.totalPages]
  );
  const isLastPage = useMemo(
    () => (pagination?.page ?? 0) === (pagination?.totalPages ?? 1) - 1,
    [pagination?.page, pagination?.totalPages]
  );

  const onFisrtPageClick = () => {
    if (!pagination) return;
    setPage(0);
  };

  const onNextPageClick = () => {
    if (!pagination) return;
    const nextPage = pagination.page + 1;
    setPage(nextPage);
  };

  const onPrevPageClick = () => {
    if (!pagination) return;
    const prevPage = pagination.page - 1;
    setPage(prevPage);
  };

  const onLastPageClick = () => {
    if (!pagination) return;
    const lastPage = pagination.totalPages - 1;
    setPage(lastPage);
  };

  return (
    <>
      <div className="flex h-[64px] items-center px-2">
        <IcListAltAdd width={30} height={30} className="app_text clickable" onClick={() => setId("create")} />
      </div>
      <div className="h-[calc(100%-128px)]">
        {loading ? (
          <></>
        ) : items && items.length > 0 ? (
          <ul className="h-full list-none overflow-y-auto border-t">
            <li className="flex items-center justify-between px-2 py-4">
              <button
                className="mx-0 h-[30px] w-[180px] justify-start border-0 p-0 px-1 text-base"
                onClick={() => setSortOrder((prev) => (prev === "asc" ? "desc" : "asc"))}
              >
                <IcSort className="mr-2" />
                Create Date {sortOrder.toUpperCase()}
              </button>
              <button className="mx-0 h-[30px] w-[145px] justify-end p-0 px-1 text-base">
                <IcFolderDelete className="mr-2" />
                View Archived
              </button>
            </li>
            {items.map((v) => (
              <TodoItem key={v.id} {...v} onClick={() => setId(v.id)} />
            ))}
          </ul>
        ) : deviceType === DeviceType.Mobile ? (
          <TodoBlank onCreate={() => setId("create")} />
        ) : (
          <>No Todo item</>
        )}
      </div>
      <div className="flex h-[64px] items-center justify-center">
        {pagination && (
          <>
            <IcFirstPage
              className={clsx("app_text cursor-pointer", isFirstPage && "disabled")}
              onClick={isFirstPage ? undefined : onFisrtPageClick}
            />
            <IcChevronLeft
              className={clsx("app_text cursor-pointer", !hasPrevPage && "disabled")}
              onClick={hasPrevPage ? onPrevPageClick : undefined}
            />
            <span className="app_text px-4">{`${pagination.page + 1} / ${pagination.totalPages}`}</span>
            <IcChevronRight
              className={clsx("app_text cursor-pointer", !hasNextPage && "disabled")}
              onClick={hasNextPage ? onNextPageClick : undefined}
            />
            <IcLastPage
              className={clsx("app_text cursor-pointer", isLastPage && "disabled")}
              onClick={isLastPage ? undefined : onLastPageClick}
            />
          </>
        )}
      </div>
    </>
  );
}
