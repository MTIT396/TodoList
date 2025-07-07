import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { IoClose } from "react-icons/io5";
import useAddTodo from "../hooks/useAddTodo";
import {
  getLocalStorageJSON,
  setLocalStorageJSON,
} from "../utils/storageUtils";
import Select from "../components/Select";
import type { SelectDropDown, Todo } from "../lib/type";
import Button from "../components/ui/Button";
import { v4 } from "uuid";

type Props = {
  onAddSuccess?: () => void;
};

const AddTodo = ({ onAddSuccess }: Props) => {
  const { isOpen, setIsOpen } = useAddTodo();
  const defaultPriority = getLocalStorageJSON<SelectDropDown[]>("priority", []);
  const defaultCategories = getLocalStorageJSON<SelectDropDown[]>(
    "categories",
    []
  ).filter((item) => item.title !== "All Categories");
  const [text, setText] = useState<string>("");
  const [selectPriority, setSelectPriority] = useState<SelectDropDown>(
    defaultPriority[0]
  );
  const [selectCategory, setSelectCategory] = useState<SelectDropDown>(
    defaultCategories[0]
  );

  const buttonRef = useRef<HTMLButtonElement>(null);
  const textAreaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (textAreaRef.current && isOpen) {
      textAreaRef.current.focus();
    }
  }, [isOpen]);

  const handleAddTodo = (e: React.FormEvent) => {
    e.preventDefault();
    setIsOpen(false);
    const prev = getLocalStorageJSON<Todo[]>("todoList", []);
    const newTodo: Todo = {
      id: v4(),
      text: text.trim(),
      priority: selectPriority,
      category: selectCategory,
      isCompleted: false,
    };
    setLocalStorageJSON("todoList", [newTodo, ...prev]);
    if (onAddSuccess) onAddSuccess();
  };

  return (
    <motion.div
      className="max-w-[580px] mx-6 w-full h-[480px] bg-white shadow-md rounded-md z-[12] p-4 flex flex-col"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={(e) => e.stopPropagation()}
    >
      <div className="flex items-center justify-between">
        <h1 className="font-semibold">Add New Todo</h1>
        <button
          onClick={() => setIsOpen(false)}
          className="text-third cursor-pointer"
        >
          <IoClose size={24} />
        </button>
      </div>
      <form onSubmit={handleAddTodo} className="h-full flex flex-col ">
        <div className="mt-2">
          <span>Todo Text</span>
          <div className="mt-1 h-[120px] rounded-sm border border-border">
            <textarea
              onChange={(e) => setText(e.target.value)}
              ref={textAreaRef}
              rows={4}
              className="w-full h-full resize-none py-2 px-3 leading-5 rounded-sm focus:ring-[1.6px] focus:ring-gray-800 focus:outline-none"
            />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4 mt-3">
          <div className="flex flex-col space-y-2">
            <span className="font-medium text-sm">Priority</span>
            <Select
              onSelect={setSelectPriority}
              label={defaultPriority[0].title}
              selects={defaultPriority}
            />
          </div>
          <div className="flex flex-col space-y-2">
            <span className="font-medium text-sm">Category</span>
            <Select
              onSelect={setSelectCategory}
              label={defaultCategories[0].title}
              selects={defaultCategories}
            />
          </div>
        </div>
        <Button
          disabled={!text.trim()}
          type="submit"
          ref={buttonRef}
          label="Add Todo"
          className="bg-black text-white w-full mt-auto"
        />
      </form>
    </motion.div>
  );
};

export default AddTodo;
