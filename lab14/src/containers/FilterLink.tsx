import { connect } from "react-redux";
import { setVisibilityFilter } from "../actions";
import Link from "../components/Link";
import { RootState } from "../reducers";
import { VisibilityFiltersState } from "../reducers/visibilityFilter";

const mapStateToProps = (
  state: RootState,
  ownProps: { filter: VisibilityFiltersState }
) => ({
  active: ownProps.filter === state.visibilityFilter,
});

const mapDispatchToProps = (
  dispatch: any,
  ownProps: { filter: VisibilityFiltersState }
) => ({
  onClick: () => dispatch(setVisibilityFilter(ownProps.filter)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Link);
