import { useId, useState } from "react";
import { IoIosArrowDown } from "react-icons/io";
import { twMerge } from "tailwind-merge";
import SelectItem from "./SelectItem";
import type { SelectDropDown } from "../lib/type";
import useSelect from "../hooks/useSelect";

interface ISelectProps {
  className?: string;
  label: string;
  selects: SelectDropDown[];
  onSelect:
    | React.Dispatch<React.SetStateAction<SelectDropDown>>
    | ((newPriority: SelectDropDown) => void);
}
const Select = ({ className, label, selects, onSelect }: ISelectProps) => {
  const [selectedLabel, setSelectedLabel] = useState(label);
  const { openId, setOpenId } = useSelect();
  const id = useId();
  const isOpen = id === openId;
  const base =
    "relative p-2 text-sm sm:text-base border border-[#ddd] rounded-md flex items-center justify-between cursor-pointer";
  const handleOpenSelect = () => {
    setOpenId(isOpen ? "" : id);
  };
  const handleSelectItem = (selectItem: string) => {
    setSelectedLabel(selectItem);
    onSelect({ title: selectItem });
  };
  return (
    <div onClick={handleOpenSelect} className={twMerge(base, className)}>
      <span className="mr-2 text-main">{selectedLabel}</span>
      <span
        className={`${isOpen ? "rotate-180" : "rotate-0"} text-main transition`}
      >
        <IoIosArrowDown size={18} />
      </span>
      <div
        className={twMerge(
          "scrollbar max-h-[200px] z-2 overflow-auto flex flex-col gap-2 p-2 shadow-md rounded-md absolute left-[50%] -translate-x-[50%] top-full translate-y-[6px] w-full bg-white transition-all duration-200 origin-top",
          isOpen
            ? "scale-100 opacity-100 visible"
            : "scale-95 opacity-0 invisible"
        )}
      >
        {selects.map((item) => (
          <SelectItem
            selectedLabel={selectedLabel}
            key={item.id}
            item={item}
            handleSelectItem={handleSelectItem}
          />
        ))}
      </div>
    </div>
  );
};

export default Select;
