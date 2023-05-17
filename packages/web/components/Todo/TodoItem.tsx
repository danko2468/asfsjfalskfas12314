import { DateTime } from "luxon";

import type { PropsWithoutRef } from "react";
import type { TodoDto } from "~/lib/types";

type Props = TodoDto & {
  onClick: () => void;
};

export function TodoItem({ title, createdAt, onClick }: PropsWithoutRef<Props>) {
  return (
    <li className="flex cursor-pointer items-center px-4 py-5 hover:bg-slate-500" onClick={onClick}>
      <span className="app_text mb-1 inline-block w-[calc(100%-100px)] flex-1 overflow-hidden truncate text-xl">
        {title}
      </span>
      <span className="app_text w-[100px] text-right text-xs">
        {createdAt.toLocaleString(DateTime.DATE_MED)}
      </span>
    </li>
  );
}
