import type { ReactNode } from "react";
import { twMerge } from "tailwind-merge";

type ButtonProps = {
  disabled?: boolean;
  onClick?: () => void;
  onKeyDown?: (e: React.KeyboardEvent<HTMLButtonElement>) => void;
  type?: "submit" | "button" | "reset" | undefined;
  label: string;
  className?: string;
  icon?: ReactNode;
  ref?: React.Ref<HTMLButtonElement> | undefined;
};

const Button = ({
  onClick,
  onKeyDown,
  type,
  label,
  className,
  icon,
  ref,
  disabled,
}: ButtonProps) => {
  const base = `${
    disabled ? "cursor-not-allowed opacity-50" : "cursor-pointer"
  } text-nowrap w-fit h-fit text-sm text-main flex justify-center items-center gap-1 rounded-sm px-2 py-1 sm:px-3 sm:py-2`;
  return (
    <button
      disabled={disabled}
      type={type}
      ref={ref}
      onKeyDown={onKeyDown}
      onClick={onClick}
      className={twMerge(base, className)}
    >
      <span>{icon}</span>
      <span>{label}</span>
    </button>
  );
};

export default Button;
