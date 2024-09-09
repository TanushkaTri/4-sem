import { Todo } from "../reducers/todos";
import TodoItem from "./TodoItem";

type TodoListProps = {
  todos: Todo[];
  toggleTodo: (id: number) => void;
};

function TodoList({ todos, toggleTodo }: TodoListProps) {
  return (
    <ul className="flex flex-col items-center justify-center gap-4 mt-5">
      {todos.map((todo) => (
        <TodoItem
          key={todo.id}
          onClick={() => toggleTodo(todo.id)}
          completed={todo.completed}
          text={todo.text}
        />
      ))}
    </ul>
  );
}

export default TodoList;
