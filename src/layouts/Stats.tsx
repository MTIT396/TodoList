import { motion } from "framer-motion";
import { IoClose } from "react-icons/io5";
import { getLocalStorageJSON } from "../utils/storageUtils";
import type { SelectDropDown, Todo } from "../lib/type";

type StatsProps = {
  setIsOpenStats: React.Dispatch<React.SetStateAction<boolean>>;
  todoList: Todo[];
};
const Stats = ({ setIsOpenStats, todoList }: StatsProps) => {
  const defaultPriority = getLocalStorageJSON<SelectDropDown[]>("priority", []);
  const defaultCategories = getLocalStorageJSON<SelectDropDown[]>(
    "categories",
    []
  ).filter((item) => item.title !== "All Categories");
  return (
    <motion.div
      className="max-w-[580px] mx-6 w-full h-[380px] bg-white shadow-md rounded-md z-[12] p-4 flex flex-col"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={(e) => e.stopPropagation()}
    >
      {/* Header */}
      <div className="flex items-center justify-between border-b border-border pb-2">
        <h1 className="font-semibold">Stats</h1>
        <button
          onClick={() => setIsOpenStats(false)}
          className="text-third cursor-pointer"
        >
          <IoClose size={24} />
        </button>
      </div>
      {/* Content */}
      <div className="grid grid-cols-2 mt-4">
        {/* Priority */}
        <div>
          <span className="font-semibold">Priority</span>
          <ul className="flex flex-col gap-2 mt-4">
            {defaultPriority.map((item) => {
              return (
                <div key={item.id}>
                  <li className="flex gap-2">
                    <span>- {item.title}:</span>
                    <span className="font-medium">
                      {
                        todoList.filter(
                          (todo) => todo.priority.title === item.title
                        ).length
                      }
                    </span>
                  </li>
                </div>
              );
            })}
          </ul>
        </div>
        {/* Category */}
        <div>
          <span className="font-semibold">Category</span>
          <ul className="flex flex-col gap-2 mt-4 ">
            {defaultCategories.map((item) => {
              return (
                <div key={item.id}>
                  <li className="flex gap-2">
                    <span>- {item.title}:</span>
                    <span className="font-medium">
                      {
                        todoList.filter(
                          (todo) => todo.category.title === item.title
                        ).length
                      }
                    </span>
                  </li>
                </div>
              );
            })}
          </ul>
        </div>
      </div>
    </motion.div>
  );
};

export default Stats;
