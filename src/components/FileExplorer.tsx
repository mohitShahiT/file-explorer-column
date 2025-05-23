import { useItemContext } from "../contexts/ItemContext";
import { useEffect, useState } from "react";
import FileExplorerColumn from "./FileExplorerColumn";
import FileExplorerTitle from "./FileExplorerTitle";
export default function FileExplorer() {
  const { activeFolders } = useItemContext();

  return (
    <>
      <div className="p-2 ">
        <FileExplorerTitle title={activeFolders[activeFolders.length - 1]} />
        <div className="flex overflow-scroll">
          {/* {openFolderIds.map((id) => (
            <FileExplorerColumn key={id} id={id} />
          ))} */}
          {/* <FileExplorerColumn key={id} id={id} /> */}
          {activeFolders.map((_, indx) => (
            <FileExplorerColumn
              pathArray={activeFolders.slice(0, indx + 1)}
              depth={indx}
              key={`${indx}-${activeFolders.slice(0, indx + 1).join("-")}`}
            />
          ))}
        </div>
      </div>
    </>
  );
}
