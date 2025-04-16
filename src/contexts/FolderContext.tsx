import {
  createContext,
  ReactNode,
  Dispatch,
  SetStateAction,
  useContext,
  useState,
  useMemo,
} from "react";
import { Folder } from "../types/FileTypes";
import { getFileFolderFromID } from "../utils";
import { root } from "../FileTree";
interface fileContextInterface {
  root: Folder;
  openFolderIds: string[];
  setOpenFolderIds: Dispatch<SetStateAction<string[]>>;
  activeFolderId: string;
  setActiveFolderId: Dispatch<SetStateAction<string>>;
  activeFolder: Folder | File | null;
  handleActiveChange: (id: string) => void;
}

const FileContext = createContext<fileContextInterface | null>(null);

export function FileContextProvider({ children }: { children: ReactNode }) {
  const [openFolderIds, setOpenFolderIds] = useState([root.id]);
  const [activeFolderId, setActiveFolderId] = useState<string>(root.id);

  const activeFolder = useMemo(
    () => getFileFolderFromID(root, activeFolderId),
    [root, activeFolderId]
  );

  function handleActiveChange(id: string) {
    setActiveFolderId(id);
  }

  return (
    <FileContext.Provider
      value={{
        root,
        openFolderIds,
        setOpenFolderIds,
        activeFolderId,
        setActiveFolderId,
        activeFolder,
        handleActiveChange,
      }}
    >
      {children}
    </FileContext.Provider>
  );
}

export function useFileContex() {
  const context = useContext(FileContext);
  if (context === null) {
    return new Error("File Context used outside the context provider");
  }
  return context;
}
