import type { PropsWithoutRef } from "react";

type Props = {
  onCreate: () => void;
};

export function TodoBlank({ onCreate }: PropsWithoutRef<Props>) {
  return (
    <div className="flex h-full flex-col items-center justify-center text-2xl">
      <p>
        Welcome to &nbsp;<span className="font-bold">Todo</span>&nbsp; app.
      </p>
      <p>
        <span>{"Let's "}</span>
        <span className="cursor-pointer font-bold underline hover:text-neutral-200" onClick={onCreate}>
          create
        </span>
        <span>{" your first todo item."}</span>
      </p>
    </div>
  );
}
