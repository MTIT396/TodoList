/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useState, type ReactNode } from "react";
type Main = {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
};
export const AddTodoContext = createContext<Main | undefined>(undefined);
const AddTodoProvider = ({ children }: { children: ReactNode }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  return (
    <AddTodoContext.Provider value={{ isOpen, setIsOpen }}>
      {children}
    </AddTodoContext.Provider>
  );
};

export default AddTodoProvider;
