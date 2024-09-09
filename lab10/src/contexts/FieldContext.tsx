import {
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
  useState,
} from "react";
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

type ValidationResult = {
  rows: CHECK_STATE[];
  cols: CHECK_STATE[];
  blocks: CHECK_STATE[];
};

function Validate(currentField: number[][]): ValidationResult {
  let result: ValidationResult = {
    rows: [0, 0, 0, 0, 0, 0, 0, 0, 0],
    cols: [0, 0, 0, 0, 0, 0, 0, 0, 0],
    blocks: [0, 0, 0, 0, 0, 0, 0, 0, 0],
  };

  //rows
  for (let i = 0; i < 9; i++) {
    if (!CheckArray(currentField[i])) result.rows[i] = 2;
  }

  //cols
  for (let i = 0; i < 9; i++) {
    let col = [];
    for (let j = 0; j < 9; j++) {
      col.push(currentField[j][i]);
    }
    if (!CheckArray(col)) result.cols[i] = 2;
  }

  for (let x = 0; x < 3; x++) {
    for (let z = 0; z < 3; z++) {
      let block = [];
      for (let i = 0 + x * 3; i < 3 + x * 3; i++) {
        for (let j = 0 + z * 3; j < 3 + z * 3; j++) {
          // 00 01 02 | 10 11 12  |  20 21 22
          block.push(currentField[i][j]);
        }
      }
      if (!CheckArray(block))
        result.blocks[x * 3 + z] = CHECK_STATE.INCORRECT_PATH;
    }
  }

  //blocks
  return result;
}

function GenerateChecks(v: ValidationResult): CHECK_STATE[][] {
  let checks: CHECK_STATE[][] = [
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

  //rows
  for (let i = 0; i < 9; i++) {
    if (v.rows[i] === CHECK_STATE.INCORRECT_PATH) {
      for (let j = 0; j < 9; j++) {
        checks[i][j] = CHECK_STATE.INCORRECT_PATH;
      }
    }
  }

  //cols
  for (let i = 0; i < 9; i++) {
    if (v.cols[i] === CHECK_STATE.INCORRECT_PATH) {
      for (let j = 0; j < 9; j++) {
        checks[j][i] = CHECK_STATE.INCORRECT_PATH;
      }
    }
  }

  //blocks
  for (let x = 0; x < 3; x++) {
    for (let z = 0; z < 3; z++) {
      if (v.blocks[x * 3 + z] === CHECK_STATE.INCORRECT_PATH) {
        for (let i = 0 + x * 3; i < 3 + x * 3; i++) {
          for (let j = 0 + z * 3; j < 3 + z * 3; j++) {
            checks[i][j] = CHECK_STATE.INCORRECT_PATH;
          }
        }
      }
    }
  }

  return checks;
}

function Check(currentField: number[][]): CHECK_STATE[][] {
  let validation = Validate(currentField);

  let new_checks = GenerateChecks(validation);

  return new_checks;
}

function CheckArray(arr: number[]): boolean {
  let nums = [];
  for (let i = 0; i < 9; i++) {
    if (arr[i] !== 0) {
      nums.push(arr[i]);
    }
  }

  const uniqueArray = nums.filter((value, index, self) => {
    return self.indexOf(value) === index;
  });

  return nums.length === uniqueArray.length;
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

    let tempChecks = Check(tmp);
    setChecks(tempChecks);
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
