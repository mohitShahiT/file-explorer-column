import { useFileContext } from "../contexts/FolderContext";
import { getFileFolderFromID } from "../utils";
import ColumnHeader from "./ColumnHeader";
import FileDetail from "./FileDetail";
import FileLists from "./FileList";

export default function FileExplorerColumn({ id }: { id: string }) {
    const { root, handleActiveChange, openFolderIds, setOpenFolderIds } =
      useFileContext();
    const folder = getFileFolderFromID(root, id);
    const isFolder = folder && "children" in folder;
    function handleClick() {
      if (!folder) return;
      handleActiveChange(folder.id);
      const curretDepth = openFolderIds.indexOf(id);
      setOpenFolderIds(openFolderIds.slice(0, curretDepth + 1));
    }
    return (
      <div
        className="border-r-[1px] border-r-blue-400/25 h-screen w-72"
        onClick={handleClick}
      >
        {folder && (
          <>
            {isFolder && <ColumnHeader header={folder.name} />}
  
            {isFolder ? (
              <FileLists files={folder.children} />
            ) : (
              <FileDetail file={folder} />
            )}
          </>
        )}
      </div>
    );
  }