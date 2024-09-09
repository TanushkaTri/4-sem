import { VisibilityFilters } from "../actions";
import FilterLink from "../containers/FilterLink";

function Footer() {
  return (
    <footer className="flex gap-10 justify-center mt-10">
      <FilterLink filter={VisibilityFilters.SHOW_ALL}>All</FilterLink>
      <FilterLink filter={VisibilityFilters.SHOW_ACTIVE}>Active</FilterLink>
      <FilterLink filter={VisibilityFilters.SHOW_COMPLETED}>Completed</FilterLink>
    </footer>
  );
}

export default Footer;
