// Context.ts
import React, { createContext, useState, useContext } from "react";

type layoutData = {
  seoTitle: string;
  title: string;
  showsubTitle: boolean;
  isHome: boolean;
};

type ProviderProps = {
  children: React.ReactNode;
};

const defaultContextValue: layoutData = {
  // data for the home page
  seoTitle: "Tim Creamer Prayer Room",
  title: "...a time to be silent and a time to speak...",
  showsubTitle: true,
  isHome: true,
};

const Context = createContext<
  | {
      layout?: layoutData | undefined;
      setData?: React.Dispatch<React.SetStateAction<layoutData>>;
    }
  | undefined
>(undefined);

function LayoutContextProvider({ children }: ProviderProps) {
  const [layout, setData] = useState(defaultContextValue);

  const value = { layout, setData };

  return <Context.Provider value={value}>{children}</Context.Provider>;
}

function useLayoutContext() {
  const context = useContext(Context);
  if (context === undefined) {
    throw new Error("useLayoutContext must be used within a LayoutContextProvider");
  }
  return context;
}

export { LayoutContextProvider, useLayoutContext };
