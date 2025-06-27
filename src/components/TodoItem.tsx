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
  setTodoListTrigger: React.Dispatch<React.SetStateAction<number>>;
};

const TodoItem = ({ todo, todoList, setTodoListTrigger }: Props) => {
  const { text, category, priority, id, isCompleted } = todo;
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(text);

  const priorities = getLocalStorageJSON<SelectDropDown[]>("priority", []);
  const inputRef = useRef<HTMLInputElement>(null);
  const saveButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (isEditing && inputRef.current) inputRef.current.focus();
  }, [isEditing]);

  const updateTodoList = (newList: Todo[]) => {
    setLocalStorageJSON("todoList", newList);
  };

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
    setEditText(text);
  };

  const handleTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditText(e.target.value);
  };

  const handleSaveEdit = () => {
    const updatedText = editText.trim() || text;
    const newList = todoList.map((item) =>
      item.id === id ? { ...item, text: updatedText } : item
    );
    updateTodoList(newList);
    setIsEditing(false);
    setTodoListTrigger((t) => t + 1);
  };

  const handleCancelEdit = () => {
    setEditText(text);
    setIsEditing(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      saveButtonRef.current?.click();
    }
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newList = todoList.map((item) =>
      item.id === id ? { ...item, isCompleted: e.target.checked } : item
    );
    updateTodoList(newList);
    setTodoListTrigger((t) => t + 1);
  };

  const handlePriorityChange = (newPriority: SelectDropDown) => {
    const newList = todoList.map((item) =>
      item.id === id ? { ...item, priority: newPriority } : item
    );
    updateTodoList(newList);
    setTodoListTrigger((t) => t + 1);
  };

  const handleRemove = () => {
    const currentList = getLocalStorageJSON<Todo[]>("todoList", []);
    const newList = currentList.filter((item) => item.id !== id);
    setLocalStorageJSON("todoList", newList);
    setTodoListTrigger((t) => t + 1); // trigger update via external state
  };

  return (
    <div className="flex flex-col border border-border p-4 rounded-md">
      <div className="w-full flex flex-col sm:flex-row gap-2 flex-wrap">
        {/* Left Side: Text / Input */}
        <div className="w-full flex flex-col sm:flex-row items-center flex-1 min-w-0">
          {isEditing ? (
            <>
              <div className="w-full flex border border-border rounded mb-2 sm:mb-0 sm:flex-1 sm:mr-2">
                <input
                  value={editText}
                  ref={inputRef}
                  onChange={handleTextChange}
                  onKeyDown={handleKeyDown}
                  type="text"
                  className="flex-1 h-full rounded py-1 px-2 outline-none text-sm focus:ring-[1.6px] focus:ring-gray-800"
                />
              </div>
              <div className="flex items-center gap-2 flex-shrink-0">
                <Button
                  disabled={!editText.trim()}
                  ref={saveButtonRef}
                  onClick={handleSaveEdit}
                  label="Save"
                  className="bg-black text-white px-2 py-1"
                />
                <Button
                  onClick={handleCancelEdit}
                  label="Cancel"
                  className="px-2 py-1 bg-white border border-border text-black"
                />
              </div>
            </>
          ) : (
            <div className="flex items-center w-full min-w-0">
              <CheckBox checked={isCompleted} onChange={handleCheckboxChange} />
              <span className="text-sm text-main font-medium mt-1 ml-2 break-words whitespace-normal w-full">
                {isCompleted ? (
                  <span className="line-through">{text}</span>
                ) : (
                  text
                )}
              </span>
            </div>
          )}
        </div>

        {/* Right Side: Priority + Actions */}
        <div className="flex items-center gap-4 mx-auto sm:m-0 mt-2">
          <Select
            onSelect={handlePriorityChange}
            label={priority?.title}
            selects={priorities}
            className="p-1 px-2 text-sm w-[100px]"
          />
          <button onClick={handleEditToggle} className="text-main">
            <FaRegEdit size={20} />
          </button>
          <button onClick={handleRemove} className="text-red-500">
            <BsTrash size={20} />
          </button>
        </div>
      </div>

      {/* Labels */}
      <div className="flex gap-2 mt-3 flex-wrap mx-auto sm:mx-0">
        <Label type={priority?.title.toLowerCase() || "no-priority"} />
        <Label type={category?.title || "no-category"} />
      </div>
    </div>
  );
};

export default TodoItem;
