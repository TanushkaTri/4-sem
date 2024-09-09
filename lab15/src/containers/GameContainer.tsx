import { connect } from "react-redux";
import Game from "../components/Game";
import { FieldState } from "../reducers/field";

const mapStateToProps = (state: FieldState) => {
  console.log(state);
  return {
    currentField: state.currentField,
  };
};

const mapDispatchToProps = (dispatch: any) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(Game);
