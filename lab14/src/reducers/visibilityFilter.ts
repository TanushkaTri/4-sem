import { setVisibilityFilter, VisibilityFilters } from "../actions";

export type VisibilityFiltersState =
  (typeof VisibilityFilters)[keyof typeof VisibilityFilters];

const visibilityFilter = (
  state: VisibilityFiltersState = VisibilityFilters.SHOW_ALL,
  action: ReturnType<typeof setVisibilityFilter>
): VisibilityFiltersState => {
  switch (action.type) {
    case "SET_VISIBILITY_FILTER":
      return action.filter;
    default:
      return state;
  }
};

export default visibilityFilter;
