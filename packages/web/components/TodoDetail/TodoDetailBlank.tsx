import type { PropsWithoutRef } from "react";

type Props = {
  onCreate: () => void;
};

export function TodoDetailBlank({ onCreate }: PropsWithoutRef<Props>) {
  return (
    <div className="flex h-full flex-col items-center justify-center text-2xl">
      <p>
        Welcome to &nbsp;<span className="font-bold">Todo</span>&nbsp; app.
      </p>
      <p>
        <span>{"Let's "}</span>
        <span className="cursor-pointer font-bold hover:text-neutral-200 hover:underline" onClick={onCreate}>
          create
        </span>
        <span>{" your first todo item."}</span>
      </p>
    </div>
  );
}
