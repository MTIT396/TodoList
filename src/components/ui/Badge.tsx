import { twMerge } from "tailwind-merge";

type BadgeProps = {
  text: string;
  amount: number;
  variant?: boolean;
};
const Badge = ({ text, amount, variant }: BadgeProps) => {
  return (
    <span
      className={twMerge(
        "font-medium w-fit rounded-xl bg-border flex items-center py-1 px-2 text-sm gap-1",
        `${
          variant &&
          "bg-red-200 border border-red-800 text-red-800 font-semibold"
        }`
      )}
    >
      <span>{text}:</span>
      <span>{amount}</span>
    </span>
  );
};

export default Badge;
