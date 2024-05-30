import { createSlice } from "@reduxjs/toolkit";

const todoSlice = createSlice({
  name: "todos",
  initialState: {
    todos: [],
  },
  reducers: {
    addTodo: (state, action) => {
      state.todos.push(action.payload);
    },
    removeTodo: (state, action) => {
      state.todos = state.todos.filter((item) => item.id !== action.payload);
    },
    editTodos : (state ,action) => {
      const { id , todo} = action.payload
      state.todos = state.todos.map((item)=>{
        if(item.id === id){
          return {...item , todo}
        }
        return item
      })
    },
  },
});

export const { addTodo, removeTodo, editTodos } = todoSlice.actions;
export default todoSlice;
