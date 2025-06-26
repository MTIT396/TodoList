/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useState, type ReactNode } from "react";

type Main = {
  openId: string;
  setOpenId: React.Dispatch<React.SetStateAction<string>>;
};
export const SelectContext = createContext<Main | undefined>(undefined);

export const SelectProvider = ({ children }: { children: ReactNode }) => {
  const [openId, setOpenId] = useState<string>("");
  return (
    <SelectContext.Provider value={{ openId, setOpenId }}>
      {children}
    </SelectContext.Provider>
  );
};
