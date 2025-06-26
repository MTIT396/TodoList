import { useEffect, useState } from "react";
import { IoSunnyOutline } from "react-icons/io5";
import { CiDark } from "react-icons/ci";

const Theme = () => {
  const [isDark, setIsDark] = useState<boolean>(() => {
    return document.documentElement.classList.contains("dark");
  });
  useEffect(() => {
    const root = document.documentElement;
    return isDark ? root.classList.add("dark") : root.classList.remove("dark");
  }, [isDark]);
  return (
    <button
      onClick={() => setIsDark(!isDark)}
      className="flex items-center justify-center rounded-full border border-main text-main p-1 cursor-pointer"
    >
      <span>{isDark ? <IoSunnyOutline /> : <CiDark />}</span>
    </button>
  );
};

export default Theme;
