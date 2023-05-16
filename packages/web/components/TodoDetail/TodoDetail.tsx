import useSWR from "swr";

import { swrFetcher } from "~/lib/ApiCaller";

import type { PropsWithoutRef } from "react";

type Props = {
  id: string;
};

export function TodoDetail({ id }: PropsWithoutRef<Props>) {
  // const {} = useSWR(`/todos/${id}`, swrFetcher);

  return <></>;
}
