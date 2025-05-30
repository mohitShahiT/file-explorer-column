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
  pulseId: string;
  setPulseId: Dispatch<SetStateAction<string>>;
  shouldPulse: (id: string) => boolean;
}

const FileContext = createContext<fileContextInterface | null>(null);

export function FileContextProvider({ children }: { children: ReactNode }) {
  const [openFolderIds, setOpenFolderIds] = useState([root.id]); //its index is important, index(depth) decides on which column the list is shown
  const [activeFolderId, setActiveFolderId] = useState<string>(root.id);
  const [pulseId, setPulseId] = useState(root.id);

  const activeFolder = useMemo(
    () => getFileFolderFromID(root, activeFolderId),
    [activeFolderId]
  );

  function handleActiveChange(id: string) {
    setActiveFolderId(id);
  }

  function shouldPulse(id: string) {
    if (id === activeFolderId) return true;
    else return false;
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
        pulseId,
        setPulseId,
        shouldPulse,
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
