import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useState,
} from "react";

interface ItemContexType {
  activeFolders: string[];
  setActiveFolders: Dispatch<SetStateAction<string[]>>;
  handleItemClick: (name: string, depth: number) => void;
}

const ItemContext = createContext<ItemContexType | null>(null);

export function ItemContextProvider({ children }: { children: ReactNode }) {
  const [activeFolders, setActiveFolders] = useState(["root"]);
  function handleItemClick(name: string, depth: number) {
    console.log([...activeFolders.slice(0, depth + 1), name]);
    setActiveFolders([...activeFolders.slice(0, depth + 1), name]);
  }
  return (
    <ItemContext.Provider
      value={{ activeFolders, setActiveFolders, handleItemClick }}
    >
      {children}
    </ItemContext.Provider>
  );
}

export function useItemContext() {
  const context = useContext(ItemContext);
  if (!context) {
    throw new Error("Item context used outside provider");
  }
  return context;
}
