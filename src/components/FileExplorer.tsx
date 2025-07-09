import { JSX } from "react/jsx-runtime";
import { useItemContext } from "../contexts/ItemContext";
import FileExplorerColumn from "./FileExplorerColumn";
import FileExplorerTitle from "./FileExplorerTitle";
export default function FileExplorer() {
  const { activeFileId, activeFolders, folderDepth } = useItemContext();
  const Columns: JSX.Element[] = [];
  for (let i = 0; i < folderDepth + 1; i++) {
    Columns.push(
      <FileExplorerColumn
        pathArray={activeFolders.slice(0, i + 1)}
        depth={i}
        key={`${i}-${activeFolders.slice(0, i + 1).join("-")}`}
        activeFileId={i === folderDepth && activeFileId ? activeFileId : null}
      />
    );
  }
  return (
    <>
      <div className="p-2">
        <FileExplorerTitle title={activeFolders[activeFolders.length - 1]} />
        <div className="flex overflow-scroll">{Columns}</div>
      </div>
    </>
  );
}
