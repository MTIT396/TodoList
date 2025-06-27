/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { getLocalStorageJSON } from "../utils/storageUtils";
import type { Todo, SelectDropDown } from "../lib/type";

type UseFilteredTodosProps = {
  selectedCategory: SelectDropDown | null;
  selectedTodo: SelectDropDown | null;
  searchValue: string;
  trigger: number;
};

const useFilteredTodos = ({
  selectedCategory,
  selectedTodo,
  searchValue,
  trigger,
}: UseFilteredTodosProps) => {
  const [filteredTodos, setFilteredTodos] = useState<Todo[]>([]);
  const storeTodoList: Todo[] = getLocalStorageJSON<Todo[]>("todoList", []);

  useEffect(() => {
    let filtered = [...storeTodoList];

    if (selectedCategory && selectedCategory.title !== "All Categories") {
      filtered = filtered.filter(
        (item) => item.category.title === selectedCategory.title
      );
    }

    if (selectedTodo) {
      switch (selectedTodo.title) {
        case "Active":
          filtered = filtered.filter((item) => !item.isCompleted);
          break;
        case "Completed":
          filtered = filtered.filter((item) => item.isCompleted);
          break;
      }
    }

    if (searchValue.trim()) {
      filtered = filtered.filter((todo) =>
        todo.text.toLowerCase().includes(searchValue.trim().toLowerCase())
      );
    }

    setFilteredTodos(filtered);
  }, [selectedCategory, selectedTodo, searchValue, trigger]);

  return filteredTodos;
};

export default useFilteredTodos;
