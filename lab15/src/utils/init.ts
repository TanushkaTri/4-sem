import { FieldState } from "../reducers/field";
import getChecks from "./getChecks";
import getInitialStates from "./getInitialStates";
import sudokuGen from "./sudokuGen";
import sudokuSolve from "./sudokuSolve";

const init = (): FieldState => {
  let init_field = sudokuGen(40);
  let init_solution = sudokuSolve(init_field);
  let init_states = getInitialStates(init_field);
  let init_checks = getChecks(init_field);

  return {
    initialField: init_field,
    currentField: init_field,
    solution: init_solution,
    states: init_states,
    checks: init_checks,
    selectedCell: { i: -1, j: -1 },
  };
};

export default init;
