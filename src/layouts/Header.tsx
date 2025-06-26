import Circle from "../components/ui/Circle";
import type { Todo } from "../lib/type";

type HeaderProps = {
  total: Todo[];
  completed: Todo[];
};
const Header = ({ total, completed }: HeaderProps) => {
  return (
    <div className="w-full px-6 py-4 flex items-center justify-between bg-tab transition duration-300 rounded-t-md">
      <div className="flex space-x-2">
        <Circle color="#FF6561" />
        <Circle color="#FFBF4A" />
        <Circle color="#08CC54" />
      </div>
      <div className="flex items-center gap-2 text-main">
        <span>
          <span className="font-semibold">{completed.length}</span> /{" "}
          <span className="font-medium">{total.length}</span>
        </span>
        <span>Completed</span>
      </div>
    </div>
  );
};

export default Header;
