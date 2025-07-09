import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useState,
} from "react";

interface ItemContexType {
  activeFileId: string | null;
  activeFolders: string[];
  setActiveFolders: Dispatch<SetStateAction<string[]>>;
  handleItemClick: (param: ItemClick) => void;
  folderDepth: number;
  setFolderDepth: Dispatch<SetStateAction<number>>;
  setActiveFileId: Dispatch<SetStateAction<string | null>>;
}

const ItemContext = createContext<ItemContexType | null>(null);

export interface ItemClick {
  itemId: string;
  itemName: string;
  depth: number;
  isFolder: boolean;
}

export function ItemContextProvider({ children }: { children: ReactNode }) {
  const [activeFolders, setActiveFolders] = useState<string[]>(["root"]);
  const [activeFileId, setActiveFileId] = useState<string | null>(null);
  const [folderDepth, setFolderDepth] = useState(0);

  async function handleItemClick({
    itemId,
    itemName,
    depth,
    isFolder,
  }: ItemClick) {
    //Increase the depth on each item click
    setFolderDepth(depth + 1); //Clicked Item is folder type
    if (isFolder) {
      setActiveFolders([...activeFolders.slice(0, depth + 1), itemName]);
      setActiveFileId(null);
    }
    //Clicked Item is file type
    else {
      setActiveFileId(itemId);
    }
  }
  return (
    <ItemContext.Provider
      value={{
        activeFileId,
        activeFolders,
        setActiveFolders,
        handleItemClick,
        folderDepth,
        setFolderDepth,
        setActiveFileId,
      }}
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
