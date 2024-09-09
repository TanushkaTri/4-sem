import { Cell } from "../contexts/ConditionsContext";
import { CELL_STATE, Check, CHECK_STATE } from "../contexts/FieldContext";
import { default as GetChecks } from "../utils/getChecks";
import getInitialStates from "../utils/getInitialStates";
import init from "../utils/init";
import sudokuGen from "../utils/sudokuGen";
import sudokuSolve from "../utils/sudokuSolve";

export type FieldState = {
  initialField: number[][];
  currentField: number[][];
  solution: number[][];
  states: CELL_STATE[][];
  checks: CHECK_STATE[][];
  selectedCell: { i: number; j: number };
};

type InsertIntoCellAction = {
  type: "INSERT_INTO_CELL";
  value: number;
};

type RestartAction = {
  type: "RESTART";
};

type HintAction = {
  type: "GET_HINT";
};

type SelectCellAction = {
  type: "SELECT_CELL";
  i: number;
  j: number;
};

type InitializeAction = {
  type: "INIT";
  payload: FieldState;
};

type FieldAction =
  | InsertIntoCellAction
  | RestartAction
  | HintAction
  | SelectCellAction
  | InitializeAction;

const fieldReducer = (
  state: FieldState = init(),
  action: FieldAction
): FieldState => {
  switch (action.type) {
    case "INIT":
      return action.payload;

    case "INSERT_INTO_CELL":
      if (state.selectedCell.i === -1) {
        return state;
      }

      if (
        !(
          state.states[state.selectedCell.i][state.selectedCell.j] ===
            CELL_STATE.EMPTY ||
          state.states[state.selectedCell.i][state.selectedCell.j] ===
            CELL_STATE.INSERTED
        )
      ) {
        return state;
      }

      //This path should be executed only if action cell is already validated
      state.currentField[state.selectedCell.i][state.selectedCell.j] =
        action.value;

      state.states[state.selectedCell.i][state.selectedCell.j] =
        CELL_STATE.INSERTED;

      return {
        initialField: state.initialField,
        currentField: state.currentField,
        solution: state.solution,
        states: state.states,
        checks: Check(state.currentField),
        selectedCell: state.selectedCell,
      };
    case "RESTART":
      let new_sudoku = sudokuGen(40);
      let new_solution = sudokuSolve(new_sudoku);
      let new_initial_states = getInitialStates(new_sudoku);
      let new_checks = GetChecks(new_sudoku);
      return {
        initialField: new_sudoku,
        currentField: new_sudoku,
        solution: new_solution,
        states: new_initial_states,
        checks: new_checks,
        selectedCell: { i: -1, j: -1 },
      };
    case "GET_HINT":
      let available: Cell[] = [];
      for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {
          if (state.currentField[i][j] !== state.solution[i][j]) {
            available.push({ i, j });
          }
        }
      }

      console.log(available);

      if (available.length === 0) {
        return { ...state };
      }

      let choice = Math.floor(Math.random() * available.length);
      state.currentField[available[choice].i][available[choice].j] =
        state.solution[available[choice].i][available[choice].j];

      state.states[available[choice].i][available[choice].j] =
        CELL_STATE.HINTED;
      return {
        ...state,
        checks: GetChecks(state.currentField),
        selectedCell: { i: -1, j: -1 },
      };
    case "SELECT_CELL":
      return {
        ...state,
        selectedCell: { i: action.i, j: action.j },
      };

    default:
      return init();
  }
};

export default fieldReducer;
