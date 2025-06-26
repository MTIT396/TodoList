import { useContext } from "react";
import { AddTodoContext } from "../contexts/AddTodoContext";

const useAddTodo = () => {
  const context = useContext(AddTodoContext);
  if (!context) {
    throw new Error("useAddTodo must be used within AddTodoProvider");
  }
  return context;
};

export default useAddTodo;
