import { createContext, PropsWithChildren, useState } from "react";

export type Cell = {
  i: number;
  j: number;
};

interface ConditionsCtxProps {
  selectedCell: Cell;
  setSelectedCell: (new_cell: Cell) => void;
}

export const ConditionsCtx = createContext<ConditionsCtxProps>({
  selectedCell: { i: -1, j: -1 },
  setSelectedCell: () => {},
});

interface ConditionsProviderProps extends PropsWithChildren {}

export function ConditionsProvider(props: ConditionsProviderProps) {
  const [selectedCell, setSelectedCell] = useState<Cell>({ i: -1, j: -1 });

  return (
    <ConditionsCtx.Provider value={{ selectedCell, setSelectedCell }}>
      {props.children}
    </ConditionsCtx.Provider>
  );
}
