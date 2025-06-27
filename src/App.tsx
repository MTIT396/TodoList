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
import { AnimatePresence, motion } from "framer-motion";
import AddTodo from "./layouts/AddTodo";
import useAddTodo from "./hooks/useAddTodo";
import Header from "./layouts/Header";
import Footer from "./layouts/Footer";
import TodoSkeleton from "./components/ui/TodoSkeleton";
import { FAKE_SKELETON_TIME } from "./lib/constant";
import TodoItem from "./components/TodoItem";
import Stats from "./layouts/Stats";
import useFilteredTodos from "./hooks/useFilteredTodos";

function App() {
  const { isOpen, setIsOpen } = useAddTodo();
  const [todoListTrigger, setTodoListTrigger] = useState<number>(0);
  const [isOpenStats, setIsOpenStats] = useState<boolean>(false);
  const [isSearching, setIsSearching] = useState<boolean>(false);
  const [searchValue, setSearchValue] = useState<string>("");
  const [selectedTodo, setSelectedTodo] = useState<SelectDropDown | null>(null);
  const [selectedCategory, setSelectedCategory] =
    useState<SelectDropDown | null>(null);

  // Custom Hook useFilteredTodos
  const filteredTodoList = useFilteredTodos({
    selectedCategory,
    selectedTodo,
    searchValue,
    trigger: todoListTrigger,
  });

  const completeList = filteredTodoList.filter((item) => item.isCompleted);
  const activeList = filteredTodoList.filter((item) => !item.isCompleted);
  const highPriority = filteredTodoList.filter(
    (todo) => todo.priority.title === "High"
  );
  // Data For LocalStorage
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
      setLocalStorageJSON("priority", priority);
      setLocalStorageJSON("todos", todos);
      setLocalStorageJSON("categories", categories);
      setLocalStorageJSON("initialized", true);
    }
  }, []);

  const defaultTodos = getLocalStorageJSON<SelectDropDown[]>("todos", []);
  const defaultCategories = getLocalStorageJSON<SelectDropDown[]>(
    "categories",
    []
  );

  const handleSearchTodo = (value: string) => {
    setIsSearching(true);
    setSearchValue(value);
    setTimeout(() => {
      setIsSearching(false);
    }, FAKE_SKELETON_TIME);
  };

  const handleOpenStats = () => setIsOpenStats(true);

  const handleClearAll = () => {
    setLocalStorageJSON<TodoType[]>("todoList", []);
    setTodoListTrigger((t) => t + 1);
  };
  return (
    <div className="bg-secondary transition duration-300">
      <div className="container sm:px-6 px-4 mx-auto flex flex-col w-full min-h-screen h-full font-poppins">
        <div className="py-4 mt-4 sm:mt-6 text-center">
          <span className="text-4xl font-semibold text-main uppercase">
            Todo List App
          </span>
        </div>

        <div className="max-w-[980px] w-full mx-auto border border-border rounded-md shadow-2xl transition duration-300 bg-background">
          <Header total={filteredTodoList} completed={completeList} />

          <div className="py-3 px-6 flex flex-col">
            {/* Top bar */}
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

            {/* Stats */}
            <div className="flex gap-x-5 gap-y-4 justify-center sm:justify-normal py-3 mt-3 sm:mt-0 items-center flex-wrap">
              <Badge text="Total" amount={filteredTodoList.length} />
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

            {/* Filter & Search */}
            <div className="flex gap-4 w-full justify-between py-4 flex-wrap md:flex-nowrap">
              <SearchBar handleSearchTodo={handleSearchTodo} />
              <div className="flex items-center gap-3 w-full flex-wrap md:flex-nowrap">
                <Select
                  onSelect={setSelectedTodo}
                  label={defaultTodos[0]?.title || "No Data"}
                  selects={defaultTodos}
                  className="w-full sm:w-[180px] text-nowrap"
                />
                <Select
                  onSelect={setSelectedCategory}
                  label={defaultCategories[0]?.title || "No Data"}
                  selects={defaultCategories}
                  className="w-full sm:w-[180px] text-nowrap"
                />
                <Button
                  disabled={!filteredTodoList.length}
                  label="Clear All"
                  className="bg-red-500 text-white ml-auto"
                  icon={<BsTrash size={18} />}
                  onClick={handleClearAll}
                />
              </div>
            </div>

            {/* Todo list */}
            <ul className="scrollbar flex flex-col gap-2 min-h-[260px] mb-3">
              {isSearching
                ? [...Array(2)].map((_, i) => <TodoSkeleton key={i} />)
                : filteredTodoList.map((todo) => (
                    <TodoItem
                      key={todo.id}
                      todo={todo}
                      todoList={filteredTodoList}
                      setTodoListTrigger={setTodoListTrigger}
                    />
                  ))}
            </ul>
          </div>
        </div>

        <Footer />

        {/* Modals */}
        {isOpen && (
          <AnimatePresence>
            <motion.div
              className="fixed opacity-60 bg-black/50 z-10 inset-0 flex justify-center items-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
            >
              <AddTodo onAddSuccess={() => setTodoListTrigger((t) => t + 1)} />
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
              <Stats
                setIsOpenStats={setIsOpenStats}
                todoList={filteredTodoList}
              />
            </motion.div>
          </AnimatePresence>
        )}
      </div>
    </div>
  );
}

export default App;
