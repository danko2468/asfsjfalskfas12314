"use client";

import { useState, useMemo, useContext } from "react";
import useSWR from "swr";

import { AppContext } from "~/components/AppLayer/mod";
import { IcChevronLeft } from "~/icons/IcChevronLeft";
import { IcChevronRight } from "~/icons/IcChevronRight";
import { IcFirstPage } from "~/icons/IcFirstPage";
import { IcLastPage } from "~/icons/IcLastPage";
import { DeviceType } from "~/lib/Screen/constants";
import { parseTodoResponse } from "~/lib/apis/response";
import { getSwrFetcher } from "~/lib/apis/swrFetcher";

import { TodoBlank } from "./TodoBlank";

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
      pageSize: `${24}`,
    });
    return search.toString();
  }, [keywords, currentPage, sortOrder]);

  const { data: { items, pagination } = {}, error } = useSWR<{ items: TodoDto[]; pagination: PaginationDto }>(
    `/todos?${queryString}`,
    getSwrFetcher((res) => ({ items: res.items.map(parseTodoResponse), pagination: res.pagination }))
  );

  const onLastPageClick = () => {
    if (!pagination) return;
    const lastPage = pagination.totalPages - 1;
    if (pagination.page !== lastPage) {
      setPage(lastPage);
    }
  };

  const onFisrtPageClick = () => {
    if (!pagination) return;
    if (pagination.page !== 0) {
      setPage(0);
    }
  };

  return (
    <>
      <div></div>
      <div>
        {items && items.length > 0 ? (
          <></>
        ) : deviceType === DeviceType.Mobile ? (
          <TodoBlank onCreate={() => setId("create")} />
        ) : (
          <>No Todo item</>
        )}
      </div>
      <div className="flex h-[64px] items-center justify-center">
        {pagination && (
          <>
            <IcFirstPage onClick={onFisrtPageClick} />
            <IcChevronLeft />
            <span>{`${pagination.page + 1} / ${pagination.totalPages}`}</span>
            <IcChevronRight />
            <IcLastPage onClick={onLastPageClick} />
          </>
        )}
      </div>
    </>
  );
}
