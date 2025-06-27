/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { IoSearchOutline } from "react-icons/io5";
import useDebounce from "../../hooks/useDebounce";

const SearchBar = ({
  handleSearchTodo,
}: {
  handleSearchTodo: (value: string) => void;
}) => {
  const [searchBarValue, setSearchBarValue] = useState<string>("");
  const debounceValue = useDebounce(searchBarValue, 500);
  useEffect(() => {
    handleSearchTodo(debounceValue);
  }, [debounceValue]);
  return (
    <div className="flex relative w-full border-border border items-center rounded-md p-1">
      <span className="text-third absolute top-1/2 left-2 -translate-y-1/2">
        <IoSearchOutline size={20} />
      </span>
      <input
        onChange={(e) => setSearchBarValue(e.target.value)}
        type="text"
        placeholder="Search todos..."
        className="outline-none ml-5 w-full h-full px-2 py-1 placeholder:text-third text-main"
      />
    </div>
  );
};

export default SearchBar;
