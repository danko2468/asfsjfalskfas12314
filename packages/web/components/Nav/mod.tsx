import { IcHome } from "~/icons/IcHome";
import { IcListAltAdd } from "~/icons/IcListAltAdd";

import type { PropsWithoutRef } from "react";

type Props = {
  onHomeClick: () => void;
  onCreateTodoClick: () => void;
};

export function Nav({ onCreateTodoClick, onHomeClick }: PropsWithoutRef<Props>) {
  return (
    <div className="flex h-[64px] items-center justify-start px-4 tablet:px-2">
      <h1 className="app_text flex-1 font-mono text-4xl font-bold">TODO</h1>
      <IcHome width={36} height={36} className="app_text clickable mr-3" onClick={onHomeClick} />
      <IcListAltAdd width={36} height={36} className="app_text clickable" onClick={onCreateTodoClick} />
    </div>
  );
}
