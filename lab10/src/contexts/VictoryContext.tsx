import {
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
  useState,
} from "react";
import { FieldContext } from "./FieldContext";

interface VictoryContextProps {
  correct: number[][];
  setCorrect: (new_correct: number[][]) => void;
  victory: boolean;
  setVictory: (new_state: boolean) => void;
}

export const VictoryContext = createContext<VictoryContextProps>({
  correct: [],
  setCorrect: ([]) => {},
  victory: false,
  setVictory: () => {},
});

function parseField(
  field: number[][],
  solution: number[][]
): { newCorrect: number[][]; solved: boolean } {
  let result: number[][] = [
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
  ];

  let solved = true;

  for (let i = 0; i < 9; i++) {
    for (let j = 0; j < 9; j++) {
      if (field[i][j] !== solution[i][j]) {
        solved = false;
        result[i][j] = 1;
      }
    }
  }

  return { newCorrect: result, solved };
}

interface VictoryProviderProps extends PropsWithChildren {}

export function VictoryProvider(props: VictoryProviderProps) {
  const { currentField, solution } = useContext(FieldContext);
  let { newCorrect } = parseField(currentField, solution);
  const [correct, setCorrect] = useState<number[][]>(newCorrect);
  const [victory, setVictory] = useState<boolean>(false);

  useEffect(() => {
    let { newCorrect, solved } = parseField(currentField, solution);
    if (solved) setVictory(true);
    setCorrect(newCorrect);
  }, [currentField]);

  return (
    <VictoryContext.Provider
      value={{ correct, setCorrect, victory, setVictory }}
    >
      {props.children}
    </VictoryContext.Provider>
  );
}
