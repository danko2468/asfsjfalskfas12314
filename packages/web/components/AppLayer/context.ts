import { createContext } from "react";

import { DeviceType } from "~/lib/Screen/constants";

type AppContextType = {
  id: string | null;
  setId: (id: string | null) => void;
  deviceType: DeviceType;
};

export const AppContext = createContext<AppContextType>({
  id: null,
  setId: () => void 0,
  deviceType: DeviceType.Mobile,
});
