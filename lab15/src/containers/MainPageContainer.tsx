import { connect } from "react-redux";
import { getHint, insertIntoCell, restart } from "../actions";
import MainPage from "../components/MainPage";
import { FieldState } from "../reducers/field";

const mapStateToProps = (state: FieldState) => {
  let victory = true;
  for (let i = 0; i < 9; i++) {
    for (let j = 0; j < 9; j++) {
      if (state.currentField[i][j] !== state.solution[i][j]) {
        victory = false;
      }
    }
  }
  return {
    victory,
  };
};

const mapDispatchToProps = (dispatch: any) => ({
  getHint: () => dispatch(getHint()),
  doRestart: () => dispatch(restart()),
  insertValue: (key: string) =>
    dispatch(insertIntoCell({ value: parseInt(key) })),
});

export default connect(mapStateToProps, mapDispatchToProps)(MainPage);
