const TodoSkeleton = () => {
  return (
    <div className="flex flex-col border border-border p-4 rounded-md bg-gray-100 animate-pulse">
      <div className="flex items-center justify-between">
        <div className="w-1/2 h-4 animate-pulse bg-gray-300 rounded-md"></div>
        <div className="w-1/4 h-4 animate-pulse bg-gray-300 rounded-md"></div>
      </div>
      <div className="flex items-center gap-2 py-2">
        <div className="w-16 h-4 animate-pulse bg-gray-300 rounded-md"></div>
        <div className="w-16 h-4 animate-pulse bg-gray-300 rounded-md"></div>
      </div>
    </div>
  );
};

export default TodoSkeleton;
