import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addTodo, removeTodo, editTodos } from "./store/todoSlice";
import { v4 as uuidv4 } from "uuid";

const Todo = () => {
  const [todo, setTodo] = useState("");
  const [editTodoState, setEditTodoState] = useState({});
  const [isEdit, setIsEdit] = useState(false);
  const dispatch = useDispatch();
  const todos = useSelector((state) => state.todo.todos);

  const todoSubmitHandler = (e) => {
    e.preventDefault();
    if (todo.trim() === "") return;
    dispatch(addTodo({ id: uuidv4(), todo: todo }));
    setTodo("");
  };

  const todoDeleteHandler = (id) => {
    dispatch(removeTodo(id));
  };

  const todoEditHandler = (id, currentTodo) => {
    setIsEdit(true);
    setEditTodoState({ id, todo: currentTodo });
  };

  const editTodoSubmitHandler = () => {
    dispatch(editTodos(editTodoState));
    setIsEdit(false);
    setEditTodoState({});
  };

  return (
    <div className="h-screen w-full bg-zinc-900 overflow-hidden">
      <div className="flex justify-center gap-5 py-5 w-full">
        <form onSubmit={todoSubmitHandler} className="flex gap-5">
          <input
            className="py-2 px-3 rounded-xl bg-zinc-800 outline-none text-zinc-300"
            type="text"
            name="todo"
            id="todo"
            value={todo}
            onChange={(e) => setTodo(e.target.value)}
            placeholder="Enter Your Todo"
          />
          <button
            type="submit"
            className="px-3 bg-blue-500 rounded-xl text-white"
          >
            ADD
          </button>
        </form>
      </div>
      <div className="h-[80%] w-full flex justify-center overflow-y-scroll no-scrollbar">
        <ul className="p-5 w-[60%]">
          {todos.map((item) => (
            <li
              key={item.id}
              className="py-2 border-[1px] border-zinc-700 px-2 my-2 rounded-xl w-full text-white flex justify-between items-center"
            >
              <p>{item.todo}</p>
              <div className="flex gap-2">
                <button
                  onClick={() => todoEditHandler(item.id, item.todo)}
                  className="h-full bg-zinc-800 px-3 py-2 rounded-xl font-semibold"
                >
                  EDIT
                </button>
                <button
                  onClick={() => todoDeleteHandler(item.id)}
                  className="h-full bg-red-500 px-3 py-2 rounded-xl font-semibold"
                >
                  DELETE
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
      {isEdit && (
        <div className="h-screen absolute top-0 flex justify-center items-center w-full bg-zinc-700 bg-opacity-40">
          <div className="bg-zinc-900 border-[1px] p-5 text-white border-zinc-700">
            <h1 className="font-semibold m-2">EDIT TODO</h1>
            <div className="flex gap-5 flex-col">
              <input
                className="py-2 px-3 rounded-xl bg-zinc-800 outline-none text-zinc-300"
                name="todo"
                id="todo"
                value={editTodoState.todo}
                onChange={(e) =>
                  setEditTodoState({ ...editTodoState, todo: e.target.value })
                }
              />
              <div className="flex gap-2 justify-end">
                <button
                  onClick={() => setIsEdit(false)}
                  className="bg-zinc-800 text-sm px-3 py-2 rounded-xl font-semibold"
                >
                  CANCEL
                </button>
                <button
                  onClick={editTodoSubmitHandler}
                  type="button"
                  className="bg-blue-400 text-sm px-3 py-2 rounded-xl font-semibold"
                >
                  EDIT
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Todo;
