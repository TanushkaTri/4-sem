import { render } from "react-dom";
import { Provider } from "react-redux";
import { combineReducers, createStore } from "redux";
import App from "./App";
import "./index.css";
import todos from "./reducers/todos";
import visibilityFilter from "./reducers/visibilityFilter";

const rootReducer = combineReducers({
  todos,
  visibilityFilter,
});

const store = createStore(rootReducer);

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
