import { useContext, useEffect } from "react";
import { Cell, ConditionsCtx } from "../contexts/ConditionsContext";
import {
  CELL_STATE,
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
  const checkHandler = () => {};
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
    <div className="h-screen bg-[#B0E0E6]">
      <div className="flex flex-col items-center">
      <div className="text-[30px] text-[#000000] font-bold m-2">
          <h1>СУДОКУ</h1>
        </div>
        <div className="flex gap-20 m-5">
          <button
            className="w-24   bg-[#B0E0E6] "
            onClick={restartHandler}
          >
            ЗАНОВО
          </button>
          <button
            className="w-24   bg-[#B0E0E6] "
            onClick={getHintHandler}
          >
            ПОДСКАЗКА
          </button>
           
        </div>
        {/* Victory modal */}
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
