import { useMemo, useState } from "react";

import { useDeviceType } from "~/lib/Screen/useDeviceType";

import { AppContext } from "./context";

import type { PropsWithChildren } from "react";

export function AppLayer({ children }: PropsWithChildren<any>) {
  const [id, setId] = useState<string | null>(null);
  const deviceType = useDeviceType();
  const ctx = useMemo(() => ({ id, setId, deviceType }), [id, setId, deviceType]);

  return <AppContext.Provider value={ctx}>{children}</AppContext.Provider>;
}
