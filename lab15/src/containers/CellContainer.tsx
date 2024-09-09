import { connect } from "react-redux";
import { selectCell } from "../actions";
import Cell from "../components/Cell";
import { FieldState } from "../reducers/field";

interface CellContainerProps {
  cell_i: number;
  cell_j: number;
  block_i: number;
  block_j: number;
}

const mapStateToProps = (state: FieldState, ownProps: CellContainerProps) => {
  return {
    cell_i: ownProps.cell_i,
    cell_j: ownProps.cell_j,
    block_i: ownProps.block_i,
    block_j: ownProps.block_j,
    currentField: state.currentField,
    states: state.states,
    checks: state.checks,
    selectedCell: state.selectedCell,
  };
};

const mapDispatchToProps = (dispatch: any, ownProps?: any) => ({
  selectCell: (cell: { i: number; j: number }) => {
    dispatch(selectCell(cell));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Cell);
