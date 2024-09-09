import { TodosState } from "./todos";
import { VisibilityFiltersState } from "./visibilityFilter";

export type RootState = {
  todos: TodosState;
  visibilityFilter: VisibilityFiltersState;
};
