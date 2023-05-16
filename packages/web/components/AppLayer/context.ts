import { createContext } from "react";

type AppContextType = {
  id: string | null;
  setId: (id: string | null) => void;
};

export const AppContext = createContext<AppContextType>({
  id: null,
  setId: () => void 0,
});
