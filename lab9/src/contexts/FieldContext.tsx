import {
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
  useState,} from "react";
import getInitialChecks from "../utils/getChecks";
import getInitialStates from "../utils/getInitialStates";
import sudokuSolve from "../utils/sudokuSolve";
import { ConditionsCtx } from "./ConditionsContext";
import { KeyContext } from "./KeyContext";

export enum CELL_STATE {
  INITIAL = -1,
  INSERTED = 1,
  HINTED = 2,
  EMPTY = 0,
}

export enum CHECK_STATE {
  CORRECT = 0,
  INCORRECT = 1,
  INCORRECT_PATH = 2,
}

interface FieldContextProps {
  initialField: number[][];
  currentField: number[][];
  states: CELL_STATE[][];
  checks: CHECK_STATE[][];
  solution: number[][];
  setInitialField: (newField: number[][]) => void;
  setCurrentField: (newField: number[][]) => void;
  setStates: (newStates: CELL_STATE[][]) => void;
  setChecks: (newChecks: CHECK_STATE[][]) => void;
  setSolution: (newSolution: number[][]) => void;
}

export const FieldContext = createContext<FieldContextProps>({
  initialField: [],
  currentField: [],
  states: [],
  checks: [],
  solution: [],
  setInitialField: ([]) => {},
  setCurrentField: ([]) => {},
  setStates: ([]) => {},
  setChecks: ([]) => {},
  setSolution: ([]) => {},
});

interface FieldProviderProps extends PropsWithChildren {
  initialField: number[][];
  currentField: number[][];
}

export function FieldProvider(props: FieldProviderProps) {
  const [initialField, setInitialField] = useState(props.initialField);
  const [currentField, setCurrentField] = useState(props.currentField);
  const [solution, setSolution] = useState(sudokuSolve(props.initialField));
  const [states, setStates] = useState<CELL_STATE[][]>(
    getInitialStates(props.currentField)
  );
  const [checks, setChecks] = useState<CHECK_STATE[][]>(
    getInitialChecks(initialField)
  );

  const { pressedKey, handleChange } = useContext(KeyContext);
  const { selectedCell } = useContext(ConditionsCtx);

  useEffect(() => {
    console.log(pressedKey);
    if (selectedCell.i === -1 || selectedCell.j === -1 || pressedKey === "") {
      return;
    }

    let tmp = JSON.parse(JSON.stringify(currentField));
    tmp[selectedCell.i][selectedCell.j] = Number(pressedKey);

    let tempStates = JSON.parse(JSON.stringify(states));
    tempStates[selectedCell.i][selectedCell.j] =
      pressedKey === "0" ? CELL_STATE.EMPTY : CELL_STATE.INSERTED;
    setStates(tempStates);

    handleChange("bs");
    setCurrentField(tmp);
  }, [pressedKey, currentField]);

  return (
    <FieldContext.Provider
      value={{
        initialField,
        currentField,
        states,
        checks,
        solution,
        setInitialField,
        setCurrentField,
        setStates,
        setChecks,
        setSolution,
      }}
    >
      {props.children}
    </FieldContext.Provider>
  );
}
