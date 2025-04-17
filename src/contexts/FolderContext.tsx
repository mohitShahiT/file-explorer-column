import {
  createContext,
  ReactNode,
  Dispatch,
  SetStateAction,
  useContext,
  useState,
  useMemo,
} from "react";
import { Folder, File } from "../types/FileTypes";
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
  const [openFolderIds, setOpenFolderIds] = useState([root.id]); //its index is important, index decides on which column the list is shown
  const [activeFolderId, setActiveFolderId] = useState<string>("");

  const activeFolder = useMemo(
    () => getFileFolderFromID(root, activeFolderId),
    [activeFolderId]
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

export function useFileContext() {
  const context = useContext(FileContext);
  if (context === null) {
    throw new Error("File Context used outside the context provider");
  }
  return context;
}
