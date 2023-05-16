import { useMemo, useState } from "react";

import { AppContext } from "./context";

import type { PropsWithChildren } from "react";

export function AppLayer({ children }: PropsWithChildren<any>) {
  const [id, setId] = useState<string | null>(null);
  const ctx = useMemo(() => ({ id, setId }), [id, setId]);

  return <AppContext.Provider value={ctx}>{children}</AppContext.Provider>;
}
