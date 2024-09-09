import React, { useState } from "react";
import { connect } from "react-redux";
import { addTodo } from "../actions";

interface AddTodoProps {
  dispatch: any;
}

function AddTodo({ dispatch }: AddTodoProps) {
  const [input, setInput] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!input.trim()) {
      return;
    }
    dispatch(addTodo(input));
    setInput("");
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          className="bg-[#ffffff] rounded-lg h-12 text-lg w-96 outline-none text-black placeholder-gray-700 pl-2"
          placeholder="What are the plans?"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button
          type="submit"
          className="bg-[#ffffff] ml-2 h-12 w-12 rounded-lg hover:shadow-xl text-gray-500 text-xl hover:scale-110 transition-all"
        >
          add
        </button>
      </form>
    </div>
  );
}

export default connect()(AddTodo);
