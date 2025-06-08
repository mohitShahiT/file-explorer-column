import { useState, useEffect } from "react";

import ColumnHeader from "./ColumnHeader";
import { SortBy, File } from "../types/FileTypes2";
import ItemList from "./FileList";
import { ItemType } from "../types/FileTypes2";
import { useItemContext } from "../contexts/ItemContext";
import { BASE_URL } from "../constants";
import FileDetail from "./FileDetail";

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

// export default function FileExplorerColumn({ id }: { id: string }) {
//   const { root, handleActiveChange, openFolderIds, setOpenFolderIds } =
//     useFileContext();
//   const [sortBy, setSortBy] = useState<SortBy>(SortBy.Type);

//   const folder = useMemo(() => {
//     let tempFileFolder = getFileFolderFromID(root, id);
//     if (tempFileFolder?.kind === FileKinds.Folder) {
//       tempFileFolder = sortChildren(tempFileFolder, sortBy);
//     }
//     return tempFileFolder;
//   }, [root, id, sortBy]);
//   const isFolder = folder && "children" in folder;

//   function handleClick() {
//     if (!folder) return;
//     handleActiveChange(folder.id);
//     const curretDepth = openFolderIds.indexOf(id);
//     setOpenFolderIds(openFolderIds.slice(0, curretDepth + 1));
//   }

//   function handleSortByChange(newSortBy: SortBy) {
//     setSortBy(newSortBy);
//   }

//   return (
//     <div
//       className="border-r-[1px] border-r-blue-400/25 h-screen w-72"
//       onClick={handleClick}
//     >
//       {folder && (
//         <>
//           {isFolder && (
//             <ColumnHeader
//               header={folder.name}
//               sortBy={sortBy}
//               onSortByChange={handleSortByChange}
//             />
//           )}

//           {isFolder ? (
//             <FileLists files={folder.children} />
//           ) : (
//             <FileDetail file={folder} />
//           )}
//         </>
//       )}
//     </div>
//   );
// }
export default function FileExplorerColumn({
  pathArray,
  depth,
  activeFileId,
}: {
  pathArray: string[];
  depth: number;
  activeFileId: string | null;
}) {
  const [items, setItems] = useState<ItemType[]>([]);
  const [fileItem, setFileItem] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [parentName, setParentName] = useState("");
  const [sortBy, setSortBy] = useState<SortBy>(SortBy.Type);
  const { activeFolders, setActiveFolders, setFolderDepth, setActiveFileId } =
    useItemContext();

  function handleSortByChange(newSortBy: SortBy) {
    setSortBy(newSortBy);
  }
  useEffect(() => {
    setItems(getSortedItem(items, sortBy));
  }, [sortBy]);

  const path = pathArray.join("/");

  useEffect(() => {
    async function loadData() {
      try {
        const url = `${BASE_URL}/api/folder?path=${path}`;
        const res = await fetch(url);
        const data = await res.json();
        setItems(data.data.folder);
        setParentName(data.data.parent);
      } catch (err) {
        console.log(err);
      } finally {
        setIsLoading(false);
        setFileItem(null);
      }
    }
    loadData();
  }, [path]);

  useEffect(() => {
    async function fetchFileItem() {
      try {
        const url = `${BASE_URL}/api/file/${activeFileId}`;
        const res = await fetch(url);
        const data = await res.json();
        const { file } = data.data;
        const clickedFile: File = {
          ...file,
          path: [...activeFolders, file.name].join("/"),
        };
        setFileItem(clickedFile);
      } catch (err) {
        console.log(err);
        throw new Error("Something went wrong");
      }
    }
    if (activeFileId) fetchFileItem();
  }, [activeFileId]);
  return (
    <div
      className="border-r-[1px] border-r-blue-400/25 h-screen w-72"
      onClick={() => {
        setActiveFolders([...activeFolders.slice(0, depth + 1)]);
        setFolderDepth(depth);
        setActiveFileId(null);
      }}
    >
      <ColumnHeader
        header={parentName}
        sortBy={sortBy}
        onSortByChange={handleSortByChange}
      />
      <p>
        {depth} {pathArray.join("/")}
      </p>

      {isLoading ? (
        <div>Loading...</div>
      ) : fileItem ? (
        <FileDetail file={fileItem} />
      ) : (
        <ItemList items={items} depth={depth} />
      )}
    </div>
  );
}
