import { useContext, useEffect } from "react";
import { Cell, ConditionsCtx } from "../contexts/ConditionsContext";
import {
  CELL_STATE,
  CHECK_STATE,
  FieldContext,
} from "../contexts/FieldContext";
import { KeyContext } from "../contexts/KeyContext";
import { VictoryContext } from "../contexts/VictoryContext";
import getInitialChecks from "../utils/getChecks";
import getInitialStates from "../utils/getInitialStates";
import sudokuGen from "../utils/sudokuGen";
import sudokuSolve from "../utils/sudokuSolve";
import Game from "./Game";
import Modal from "./Modal";

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
          // 00 01 02 | 10 11 12  | 20 21 22
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

interface MainPageProps {
  empty_cells: number;
}

function MainPage({ empty_cells }: MainPageProps) {
  const {
    currentField,
    setCurrentField,
    solution,
    setSolution,
    states,
    setStates,
    initialField,
    setInitialField,
    checks,
    setChecks,
  } = useContext(FieldContext);
  const { handleChange } = useContext(KeyContext);
  const { correct, victory, setVictory } = useContext(VictoryContext);
  const { setSelectedCell } = useContext(ConditionsCtx);

  const restartHandler = () => {
    setVictory(false);
    let new_initialField = sudokuGen(empty_cells);
    let new_currentField = [...new_initialField];
    let new_solution = sudokuSolve(new_initialField);
    let new_states = getInitialStates(new_initialField);
    let new_checks = getInitialChecks(new_initialField);
    setInitialField(new_initialField);
    setSolution(new_solution);
    setStates(new_states);
    setChecks(new_checks);
    setSelectedCell({ i: -1, j: -1 });
    setCurrentField(new_currentField);
  };
  
  const checkHandler = () => {
    let tempChecks = Check(currentField);
    setChecks(tempChecks);
  };

  const getHintHandler = () => {
    let available: Cell[] = [];

    for (let i = 0; i < 9; i++) {
      for (let j = 0; j < 9; j++) {
        if (correct[i][j] === 1) {
          available.push({ i, j });
        }
      }
    }

    if (available.length === 0) {
      return;
    }

    let choice = Math.floor(Math.random() * available.length);
    let tempField = JSON.parse(JSON.stringify(currentField));
    tempField[available[choice].i][available[choice].j] =
      solution[available[choice].i][available[choice].j];

    let tempStates = JSON.parse(JSON.stringify(states));
    tempStates[available[choice].i][available[choice].j] = CELL_STATE.HINTED;

    setStates(tempStates);
    setCurrentField(tempField);
  };

  useEffect(() => {
    const handleKeyDown = (e: any) => {
      if (e.key === "r") {
        restartHandler();
        return;
      }

      if (e.key === "h") {
        getHintHandler();
        return;
      }

      handleChange(e.key);
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [currentField]);

  return (
    <div className="h-screen bg-[#ffffff]">
      <div className="flex flex-col items-center">
        <div className="flex gap-10 m-5">
          <button
            className="w-24 border-1 border-[#000000] "
            onClick={restartHandler}
          >
            ЗАНОВО
          </button>
          <button
            className="w-24  border-[#000000] border-1"
            onClick={getHintHandler}
          >
            ПОДСКАЗКА
          </button>
          <button
            onClick={checkHandler}
            className="w-24 border-1 border-[#000000] bg-[#ffffff]"
          >
            ПРОВЕРКА
          </button>
        </div>
        {/*modal */}
        {victory && (
          <Modal onClose={restartHandler}>
            <div className="flex flex-col items-center justify-center">
              <h1 className="text-[100px] text-[#000000] font-bold">
                ИГРА ОКОНЧЕНА
              </h1>
             
            </div>
          </Modal>
        )}
        {/* ------------------- */}
        <Game />
      </div>
    </div>
  );
}

export default MainPage;
