import { useFileContext } from "../contexts/FolderContext";
import FileExplorerColumn from "./FileExplorerColumn";
import FileExplorerTitle from "./FileExplorerTitle";
export default function FileExplorer() {
  const { openFolderIds, activeFolder } = useFileContext();

  return (
    <>
      <div className="p-2 ">
        <FileExplorerTitle title={activeFolder ? activeFolder.name : ""} />
        <div className="flex overflow-scroll">
          {openFolderIds.map((id) => (
            <FileExplorerColumn key={id} id={id} />
          ))}
        </div>
      </div>
    </>
  );
}



