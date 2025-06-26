import type { JSX } from "react";
import { FaAngleDoubleDown, FaRegStar } from "react-icons/fa";
import { RiEqualizer3Line } from "react-icons/ri";
import { twMerge } from "tailwind-merge";

type LabelProps = {
  type: string;
};
interface IVariants {
  className: string;
  icon?: JSX.Element;
}
const Label = ({ type }: LabelProps) => {
  const base =
    "flex items-center gap-1 rounded-full w-fit text-xs py-[2px] px-2 border font-medium";

  const variants: Record<string, IVariants> = {
    low: {
      className: "text-gray-600 border-gray-400 bg-gray-50",
      icon: <FaAngleDoubleDown />,
    },
    medium: {
      className: "text-yellow-600 border-yellow-400 bg-yellow-50",
      icon: <RiEqualizer3Line />,
    },
    high: {
      className: "text-red-800 border-red-400 bg-red-200",
      icon: <FaRegStar />,
    },
    default: {
      className: "text-black font-semibold border-gray-400 bg-gray-100",
    },
  };

  const variant = variants[type] || variants.default;

  return (
    <div className={twMerge(base, variant.className)}>
      {variant.icon && <span>{variant.icon}</span>}
      <span>{type}</span>
    </div>
  );
};

export default Label;
