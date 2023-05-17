"use client";

import clsx from "clsx";
import { useState, useMemo, useContext } from "react";
import useSWR from "swr";

import { AppContext } from "~/components/AppLayer/mod";
import { EnhancedTextInput } from "~/components/Input/EnhancedTextInput";
import { Nav } from "~/components/Nav/mod";
import { Pagination } from "~/components/Pagination/mod";
import { IcFolderDelete } from "~/icons/IcFolderDelete";
import { IcSearch } from "~/icons/IcSearch";
import { IcSort } from "~/icons/IcSort";
import { parseTodoResponse } from "~/lib/apis/response";
import { getSwrFetcher } from "~/lib/apis/swrFetcher";

import { TodoItem } from "./TodoItem";

import styles from "./TodoList.module.css";

import type { TodoDto, PaginationDto } from "~/lib/types";

export function TodoList() {
  const { setId } = useContext(AppContext);
  const [archived, toggleArchived] = useState(false);
  const [currentPage, setPage] = useState<number>(0);
  const [keywords, setKeyword] = useState("");
  const [sortOrder, setSortOrder] = useState<"desc" | "asc">("asc");
  const queryString = useMemo(() => {
    const search = new URLSearchParams({
      page: `${currentPage}`,
      ...(keywords && { keywords }),
      ...(typeof archived === "boolean" && { archived: `${archived}` }),
      sortOrder,
      pageSize: `${10}`,
    });
    return search.toString();
  }, [keywords, currentPage, sortOrder, archived]);

  const { data, error } = useSWR<{ items: TodoDto[]; pagination: PaginationDto }>(
    `/todos?${queryString}`,
    getSwrFetcher((res) => ({ items: res.items.map(parseTodoResponse), pagination: res.pagination })),
    { refreshInterval: 1000 }
  );

  const { items, pagination } = data ?? {};
  const loading = useMemo(() => !data && !error, [data, error]);

  const onKeywordsChange = (val: string) => {
    setKeyword(val);
    setPage(0);
  };

  return (
    <>
      <Nav onCreateTodoClick={() => setId("create")} onHomeClick={() => setId(null)} />
      <div className="h-[calc(100%-128px)]">
        {loading ? (
          <></>
        ) : (
          items && (
            <>
              <hr className="border-gray-500" />
              <div className="flex h-[95px] items-center justify-between px-4 py-4">
                <IcSearch width={30} height={30} className="app_text mr-4" />
                <EnhancedTextInput
                  placeholder="Search TODO keywords"
                  value={keywords}
                  onChange={onKeywordsChange}
                />
              </div>
              <div className="flex h-[62px] items-center justify-between px-2 py-4">
                <button
                  className="mx-0 h-[30px] w-[180px] justify-start border-0 p-0 px-1 text-base"
                  onClick={() => setSortOrder((prev) => (prev === "asc" ? "desc" : "asc"))}
                >
                  <IcSort className="mr-2" />
                  Create Date {sortOrder.toUpperCase()}
                </button>
                <button
                  className={clsx(
                    "mx-0 h-[30px] w-[130px] justify-end p-0 px-1 text-base",
                    archived && styles.isViewingArchived
                  )}
                  onClick={() => toggleArchived((prev) => !prev)}
                >
                  <IcFolderDelete className="mr-2" />
                  <span className="text-sm">View Archived</span>
                </button>
              </div>
              <ul className="h-[calc(100%-157px)] list-none overflow-y-auto">
                {items.length > 0 ? (
                  items.map((v) => <TodoItem key={v.id} {...v} onClick={() => setId(v.id)} />)
                ) : (
                  <li className="app_text disabled flex cursor-pointer items-center px-4 py-5">
                    No Todo item
                  </li>
                )}
              </ul>
            </>
          )
        )}
      </div>
      {pagination && <Pagination {...pagination} setPage={setPage} />}
    </>
  );
}
