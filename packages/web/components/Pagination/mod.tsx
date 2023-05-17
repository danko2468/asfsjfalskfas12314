import clsx from "clsx";
import { useState, useMemo } from "react";

import { IcChevronLeft } from "~/icons/IcChevronLeft";
import { IcChevronRight } from "~/icons/IcChevronRight";
import { IcFirstPage } from "~/icons/IcFirstPage";
import { IcLastPage } from "~/icons/IcLastPage";

import type { PropsWithoutRef } from "react";
import type { PaginationDto } from "~/lib/types";

type Props = Pick<PaginationDto, "page" | "totalPages"> & {
  setPage: (page: number) => void;
};

export function Pagination({ page, totalPages, setPage }: PropsWithoutRef<Props>) {
  const isFirstPage = useMemo(() => (page ?? 0) === 0, [page]);
  const hasPrevPage = useMemo(() => (page ?? 0) > 0, [page]);
  const hasNextPage = useMemo(() => (page ?? 0) < (totalPages ?? 1) - 1, [page, totalPages]);
  const isLastPage = useMemo(() => (page ?? 0) === (totalPages ?? 1) - 1, [page, totalPages]);

  const onFisrtPageClick = () => {
    setPage(0);
  };

  const onNextPageClick = () => {
    const nextPage = page + 1;
    setPage(nextPage);
  };

  const onPrevPageClick = () => {
    const prevPage = page - 1;
    setPage(prevPage);
  };

  const onLastPageClick = () => {
    const lastPage = totalPages - 1;
    setPage(lastPage);
  };

  return (
    <div className="flex h-[64px] items-center justify-center">
      <IcFirstPage
        className={clsx("app_text cursor-pointer", isFirstPage && "disabled")}
        onClick={isFirstPage ? undefined : onFisrtPageClick}
      />
      <IcChevronLeft
        className={clsx("app_text cursor-pointer", !hasPrevPage && "disabled")}
        onClick={hasPrevPage ? onPrevPageClick : undefined}
      />
      <span className="app_text px-4">{`${page + 1} / ${totalPages}`}</span>
      <IcChevronRight
        className={clsx("app_text cursor-pointer", !hasNextPage && "disabled")}
        onClick={hasNextPage ? onNextPageClick : undefined}
      />
      <IcLastPage
        className={clsx("app_text cursor-pointer", isLastPage && "disabled")}
        onClick={isLastPage ? undefined : onLastPageClick}
      />
    </div>
  );
}
