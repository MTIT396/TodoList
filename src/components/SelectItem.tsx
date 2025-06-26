import type { SelectDropDown } from "../lib/type";
import { LONG_TEXT } from "../lib/constant";
import { IoCheckmark } from "react-icons/io5";
type SelectItemProps = {
  item: SelectDropDown;
  handleSelectItem: (item: string) => void;
  selectedLabel: string;
};

const SelectItem = ({
  item,
  handleSelectItem,
  selectedLabel,
}: SelectItemProps) => {
  return (
    <div
      onClick={() => handleSelectItem(item.title)}
      className="cursor-pointer hover:bg-gray-100 px-2 py-1 rounded flex items-center space-x-2"
    >
      <span className={selectedLabel === item.title ? "visible" : "invisible"}>
        <IoCheckmark />
      </span>
      <span>
        {item.title === LONG_TEXT ? item.title.substring(0, 3) : item.title}
      </span>
    </div>
  );
};

export default SelectItem;
