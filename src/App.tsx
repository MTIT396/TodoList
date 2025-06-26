/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import "./App.css";
import { getLocalStorageJSON, setLocalStorageJSON } from "./utils/storageUtils";
import { GoPlus } from "react-icons/go";
import { IoIosCloudOutline, IoIosStats } from "react-icons/io";
import Button from "./components/ui/Button";
import Theme from "./components/ui/Theme";
import { v4, v6 } from "uuid";
import SearchBar from "./components/ui/SearchBar";
import Select from "./components/Select";
import { BsTrash } from "react-icons/bs";
import Badge from "./components/ui/Badge";
import type { SelectDropDown, Todo as TodoType } from "./lib/type";
import { AnimatePresence } from "framer-motion";
import { motion } from "framer-motion";
import AddTodo from "./layouts/AddTodo";
import useAddTodo from "./hooks/useAddTodo";
import Header from "./layouts/Header";
import Footer from "./layouts/Footer";
import TodoSkeleton from "./components/ui/TodoSkeleton";
import { FAKE_SKELETON_TIME } from "./lib/constant";
import TodoItem from "./components/TodoItem";
import Stats from "./layouts/Stats";
function App() {
  const { isOpen, setIsOpen } = useAddTodo();
  const [todoList, setTodoList] = useState(() =>
    getLocalStorageJSON<TodoType[]>("todoList", [])
  );
  const [isOpenStats, setIsOpenStats] = useState<boolean>(false);
  const [isSearching, setIsSearching] = useState<boolean>(false);
  const [selectedTodo, setSelectedTodo] = useState<SelectDropDown | null>(null);
  const [selectedCategory, setSelectedCategory] =
    useState<SelectDropDown | null>(null);
  const storeTodoList: TodoType[] = getLocalStorageJSON<[]>("todoList", []);
  const completeList = todoList.filter((item) => item.isCompleted);
  const activeList = todoList.filter((item) => !item.isCompleted);
  const highPriority = todoList.filter(
    (todo) => todo.priority.title === "High"
  );
  // Default Data For LocalStorage
  useEffect(() => {
    const isInitialized = getLocalStorageJSON<boolean>("initialized", false);
    if (!isInitialized) {
      const priority = [
        { id: v6(), title: "Low" },
        { id: v6(), title: "Medium" },
        { id: v6(), title: "High" },
      ];
      const todos = [
        { id: v6(), title: "All Todos" },
        { id: v6(), title: "Active" },
        { id: v6(), title: "Completed" },
      ];
      const categories = [
        { id: v4(), title: "All Categories" },
        { id: v4(), title: "Personal" },
        { id: v4(), title: "Work" },
        { id: v4(), title: "Study" },
        { id: v4(), title: "Health" },
        { id: v4(), title: "Shopping" },
        { id: v4(), title: "Love" },
      ];
      setLocalStorageJSON<SelectDropDown[]>("priority", priority);
      setLocalStorageJSON<SelectDropDown[]>("todos", todos);
      setLocalStorageJSON<SelectDropDown[]>("categories", categories);
      // Init
      setLocalStorageJSON<boolean>("initialized", true);
    }
  }, []);
  const defaultTodos = getLocalStorageJSON<SelectDropDown[]>("todos", []);
  const defaultCategories = getLocalStorageJSON<SelectDropDown[]>(
    "categories",
    []
  );

  // Handle Filter TodoList
  const filteredTodoList = () => {
    let filtered = [...storeTodoList];
    if (selectedCategory && selectedCategory.title !== "All Categories") {
      filtered = filtered.filter(
        (item) => item.category.title === selectedCategory.title
      );
    }
    if (selectedTodo) {
      switch (selectedTodo?.title) {
        case "Active":
          filtered = filtered.filter((item) => !item.isCompleted);
          break;
        case "Completed":
          filtered = filtered.filter((item) => item.isCompleted);
          break;
        default:
          break;
      }
    }
    return filtered;
  };
  useEffect(() => {
    const newFilteredList = filteredTodoList();
    setTodoList(newFilteredList);
  }, [selectedTodo, selectedCategory]);
  // Handle Function
  const handleClearAll = () => {
    setTodoList([]);
    setLocalStorageJSON<[]>("todoList", []);
  };
  const handleSearchTodo = (searchValue: string) => {
    setIsSearching(true);
    setTimeout(() => {
      const newFilteredList = filteredTodoList();
      const cloneFilteredList = [...newFilteredList];
      if (searchValue) {
        const newTodoList = cloneFilteredList.filter((todo) =>
          todo.text.toLowerCase().includes(searchValue.trim().toLowerCase())
        );
        setTodoList(newTodoList);
      } else {
        setTodoList(newFilteredList);
      }
      setIsSearching(false);
    }, FAKE_SKELETON_TIME);
  };
  const handleOpenStats = () => {
    setIsOpenStats(true);
  };
  return (
    <div className="bg-secondary transition duration-300">
      <div className="container sm:px-6 px-4 mx-auto flex flex-col w-full min-h-screen h-full font-poppins">
        {/* Title */}
        <div className="my-4 text-center">
          <span className="text-4xl font-semibold text-main uppercase">
            Todo List App
          </span>
        </div>
        {/* Card */}
        <div className="max-w-[980px] w-full mx-auto border border-border rounded-md shadow-2xl transition duration-300 bg-background">
          <Header total={todoList} completed={completeList} />
          <div className="py-3 px-6 flex flex-col max-h-[680px]">
            <div className="flex items-center justify-between sm:flex-row flex-col gap-2">
              <div className="flex gap-2">
                <span className="text-main">
                  <IoIosCloudOutline size={24} />
                </span>
                <h1 className="text-main font-semibold">
                  Advanced Todo Manager
                </h1>
              </div>
              <div className="flex items-center gap-4 sm:gap-2">
                <Button
                  label="Stats"
                  onClick={handleOpenStats}
                  icon={<IoIosStats size={20} />}
                  className="border border-main"
                />
                <Button
                  label="Add Todo"
                  onClick={() => setIsOpen(true)}
                  icon={<GoPlus size={20} />}
                  className="bg-main text-text text-nowrap"
                />
                <Theme />
              </div>
            </div>
            <div className="flex gap-x-5 gap-y-4 justify-center sm:justify-normal py-3 mt-3 sm:mt-0 items-center flex-wrap">
              <Badge text="Total" amount={todoList.length} />
              <Badge text="Active" amount={activeList.length} />
              <Badge text="Completed" amount={completeList.length} />
              {highPriority.length > 0 && (
                <Badge
                  text="High Priority"
                  amount={highPriority.length}
                  variant
                />
              )}
            </div>
            <div className="flex gap-4 w-full justify-between py-4 flex-wrap md:flex-nowrap">
              <SearchBar handleSearchTodo={handleSearchTodo} />
              <div className="flex items-center gap-3 w-full flex-wrap md:flex-nowrap">
                <Select
                  onSelect={setSelectedTodo}
                  label={defaultTodos[0]?.title || "No Data for Name"}
                  selects={defaultTodos}
                  className="w-full sm:w-[180px] text-nowrap"
                />
                <Select
                  onSelect={setSelectedCategory}
                  label={defaultCategories[0]?.title || "No Data for Name"}
                  selects={defaultCategories}
                  className="w-full sm:w-[180px] text-nowrap"
                />
                <Button
                  disabled={!todoList.length}
                  label="Clear All"
                  className="bg-red-500 text-white ml-auto"
                  icon={<BsTrash size={18} />}
                  onClick={handleClearAll}
                />
              </div>
            </div>
            <ul className="overflow-auto scrollbar flex flex-col gap-2 min-h-[260px] ">
              {isSearching ? (
                <>
                  {[...Array(3)].map((_, i) => (
                    <TodoSkeleton key={i} />
                  ))}
                </>
              ) : (
                todoList.map((todo) => (
                  <TodoItem
                    key={todo.id}
                    todo={todo}
                    todoList={todoList}
                    setTodoList={setTodoList}
                  />
                ))
              )}
            </ul>
          </div>
        </div>
        <Footer />
        {/* Modal Add Todo */}
        {isOpen && (
          <AnimatePresence>
            <motion.div
              className="fixed opacity-60 bg-black/50 z-10 inset-0 flex justify-center items-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
            >
              <AddTodo setTodoList={setTodoList} />
            </motion.div>
          </AnimatePresence>
        )}
        {isOpenStats && (
          <AnimatePresence>
            <motion.div
              className="fixed inset-0 bg-black/50 z-10 flex items-center justify-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpenStats(false)}
            >
              <Stats setIsOpenStats={setIsOpenStats} todoList={todoList} />
            </motion.div>
          </AnimatePresence>
        )}
      </div>
    </div>
  );
}

export default App;
