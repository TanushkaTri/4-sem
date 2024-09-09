type TodoItemProps = {
  onClick: () => void;
  completed: boolean;
  text: string;
};

function TodoItem({ onClick, completed, text }: TodoItemProps) {
  return (
    <li
      className={
        "text-2xl cursor-pointer transition-all " +
        (!completed ? "text-gray-200 hover:text-gray-400" : "text-gray-600")
      }
      onClick={onClick}
      style={{
        textDecoration: completed ? "line-through" : "none",
      }}
    >
      {text}
    </li>
  );
}

export default TodoItem;
