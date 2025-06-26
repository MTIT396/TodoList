import { useEffect, useRef, useState } from "react";
import CheckBox from "./ui/CheckBox";
import { FaRegEdit } from "react-icons/fa";
import { BsTrash } from "react-icons/bs";
import Select from "./Select";
import {
  getLocalStorageJSON,
  setLocalStorageJSON,
} from "../utils/storageUtils";
import Button from "./ui/Button";
import type { SelectDropDown, Todo } from "../lib/type";
import Label from "./ui/Label";

type Props = {
  todo: Todo;
  todoList: Todo[];
  setTodoList: React.Dispatch<React.SetStateAction<Todo[]>>;
};

const TodoItem = ({ todo, todoList, setTodoList }: Props) => {
  const { text, category, priority, id, isCompleted } = todo;
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [editText, setEditText] = useState<string>(text);
  const defaultPriority = getLocalStorageJSON<SelectDropDown[]>("priority", []);
  const inputRef = useRef<HTMLInputElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const handleChangeEditText = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditText(e.target.value);
  };
  const handleSave = () => {
    setIsEdit(false);
    const updateText = editText.trim() || text;
    const newTodoList = todoList.map((todo) =>
      todo.id === id ? { ...todo, text: updateText } : todo
    );
    setEditText(updateText);
    setTodoList(newTodoList);
    setLocalStorageJSON<Todo[]>("todoList", newTodoList);
  };
  const handleCancel = () => {
    setIsEdit(false);
    setEditText(text);
  };
  const handleRemoveTodo = () => {
    const newTodoList = todoList.filter((todo) => todo.id !== id);
    setTodoList(newTodoList);
    setLocalStorageJSON<Todo[]>("todoList", newTodoList);
  };
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      buttonRef.current?.click();
    }
  };
  const handleChangeCheckbox = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTodoList = todoList.map((todo) =>
      todo.id === id ? { ...todo, isCompleted: e.target.checked } : todo
    );
    setTodoList(newTodoList);
    setLocalStorageJSON<Todo[]>("todoList", newTodoList);
  };
  const handleChangePriority = (newPriority: SelectDropDown) => {
    const updateList = todoList.map((item) =>
      item.id === id ? { ...todo, priority: newPriority } : item
    );
    setTodoList(updateList);
    setLocalStorageJSON<Todo[]>("todoList", updateList);
  };
  // Handle Focus Input
  useEffect(() => {
    if (inputRef.current && isEdit) {
      inputRef.current?.focus();
    }
  }, [isEdit]);

  return (
    <div className="flex flex-col border border-border p-4 rounded-md">
      {/* Top */}
      <div className="w-full flex flex-col sm:flex-row gap-2 flex-wrap">
        {/* Left */}
        <div className="w-full flex flex-col sm:flex-row items-center flex-1 min-w-0">
          {isEdit ? (
            <>
              <div className="w-full flex border border-border rounded mb-2 sm:mb-0 sm:flex-1 sm:mr-2">
                <input
                  value={editText}
                  ref={inputRef}
                  onChange={handleChangeEditText}
                  type="text"
                  onKeyDown={handleKeyDown}
                  className="flex-1 h-full rounded py-1 px-2 outline-none text-sm focus:ring-[1.6px] focus:ring-gray-800"
                />
              </div>
              <div className="flex items-center gap-2 flex-shrink-0">
                <Button
                  disabled={!editText.trim()}
                  ref={buttonRef}
                  onClick={handleSave}
                  label="Save"
                  className="bg-black text-white px-2 py-1"
                />
                <Button
                  onClick={handleCancel}
                  label="Cancel"
                  className="px-2 py-1 bg-white border border-border text-black"
                />
              </div>
            </>
          ) : (
            <div className="flex items-center w-full min-w-0">
              <CheckBox checked={isCompleted} onChange={handleChangeCheckbox} />
              <span className="text-sm text-main font-medium mt-1 ml-2 break-words whitespace-normal w-full">
                {isCompleted ? (
                  <span className="line-through break-words whitespace-normal w-full">
                    {editText}
                  </span>
                ) : (
                  editText
                )}
              </span>
            </div>
          )}
        </div>

        {/* Right */}
        <div className="flex items-center gap-4 mx-auto sm:m-0 mt-2">
          <Select
            onSelect={handleChangePriority}
            label={priority?.title}
            selects={defaultPriority}
            className="p-1 px-2 text-sm w-[100px]"
          />
          <button
            onClick={() => setIsEdit(!isEdit)}
            className="cursor-pointer text-main"
          >
            <FaRegEdit size={20} />
          </button>
          <button
            onClick={handleRemoveTodo}
            className="cursor-pointer text-red-500"
          >
            <BsTrash size={20} />
          </button>
        </div>
      </div>

      {/* Bottom */}
      <div className="flex gap-2 mt-3 flex-wrap mx-auto sm:mx-0">
        <Label type={priority?.title.toLowerCase() || "No data for Priority"} />
        <Label type={category?.title || "No data for Category"} />
      </div>
    </div>
  );
};

export default TodoItem;
