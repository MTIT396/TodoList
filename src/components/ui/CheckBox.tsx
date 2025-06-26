import { useId } from "react";
import { FiCheck } from "react-icons/fi";

interface ICheckBoxProps {
  checked: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}
const CheckBox = ({ checked, onChange }: ICheckBoxProps) => {
  const id = useId();
  return (
    <label
      htmlFor={id}
      className="flex items-center cursor-pointer select-none"
    >
      <div className="w-4 h-4 relative ">
        <input
          onChange={onChange}
          checked={checked}
          id={id}
          type="checkbox"
          className="peer cursor-pointer appearance-none w-full h-full border-2 border-main rounded checked:bg-main transition"
        />
        <FiCheck
          size={14}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-text text-xs scale-0 peer-checked:scale-100 transition-transform"
        />
      </div>
    </label>
  );
};

export default CheckBox;
