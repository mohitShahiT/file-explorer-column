import { useState, useMemo } from "react";

import ColumnHeader from "./ColumnHeader";
import { SortBy } from "../types/FileTypes2";
import ItemList from "./FileList";
import { ItemType } from "../types/FileTypes2";
import { useItemContext } from "../contexts/ItemContext";
import { BASE_URL } from "../constants";
import FileDetail from "./FileDetail";
import { useQuery } from "react-query";

function getSortedItem(items: ItemType[], sortBy: SortBy): ItemType[] {
  let sortedItems = [...items];

  switch (sortBy) {
    case SortBy.Type: {
      const files: ItemType[] = [];
      const folders: ItemType[] = [];
      sortedItems.forEach((item) => {
        if (item.isFolder) {
          folders.push(item);
        } else {
          files.push(item);
        }
      });
      sortedItems = [...folders, ...files];
      break;
    }
    case SortBy.Name: {
      sortedItems.sort((a, b) => a.name.localeCompare(b.name));
      break;
    }
    case SortBy.Created: {
      sortedItems.sort((a, b) => a.createdAt - b.createdAt);
      break;
    }
    //TODO: Get Folder Size from API
    // case SortBy.Size: {
    //   sortedItems.sort((a, b) => {
    //     let aSize;
    //     let bSize;
    //     //if the child is file it already has size but for folder, it needs to be calculated dynamically
    //     if (a.kind !== FileKinds.Folder) {
    //       aSize = a.size;
    //     } else {
    //       aSize = calculateFolderSize(a);
    //     }
    //     if (b.kind !== FileKinds.Folder) {
    //       bSize = b.size;
    //     } else {
    //       bSize = calculateFolderSize(b);
    //     }
    //     return bSize - aSize;
    //   });
    //   break;
    // }
  }
  return sortedItems;
}

async function fetchFolder(path: string) {
  const url = `${BASE_URL}/api/folder?path=${path}`;
  const res = await fetch(url);
  const data = await res.json();
  return data.data;
}
async function fetchFile(id: string | null) {
  if (!id) return null;
  const url = `${BASE_URL}/api/file/${id}`;
  const res = await fetch(url);
  const data = await res.json();
  return data.data;
}
export default function FileExplorerColumn({
  pathArray,
  depth,
  activeFileId,
}: {
  pathArray: string[];
  depth: number;
  activeFileId: string | null;
}) {
  const [sortBy, setSortBy] = useState<SortBy>(SortBy.Type);
  const { activeFolders, setActiveFolders, setFolderDepth, setActiveFileId } =
    useItemContext();

  function handleSortByChange(newSortBy: SortBy) {
    setSortBy(newSortBy);
  }

  const path = pathArray.join("/");
  const { data: folderData, isLoading: isFolderItemsLoading } = useQuery(
    ["folder", path],
    () => fetchFolder(path)
  );

  const { data: fileData, isLoading: isFileItemLoading } = useQuery(
    ["file", activeFileId],
    () => fetchFile(activeFileId)
  );

  const sortedItems = useMemo(
    () => getSortedItem(folderData?.folder ?? [], sortBy),
    [folderData, sortBy]
  );

  return (
    <div
      className="border-r-[1px] border-r-blue-400/25 h-screen w-72"
      onClick={() => {
        setActiveFolders([...activeFolders.slice(0, depth + 1)]);
        setFolderDepth(depth);
        setActiveFileId(null);
      }}
    >
      {!fileData && (
        <ColumnHeader
          header={folderData?.parent}
          sortBy={sortBy}
          onSortByChange={handleSortByChange}
        />
      )}

      {isFileItemLoading || isFolderItemsLoading ? (
        <div>Loading...</div>
      ) : fileData ? (
        <FileDetail file={fileData.file} />
      ) : (
        <ItemList items={sortedItems} depth={depth} />
      )}
    </div>
  );
}
