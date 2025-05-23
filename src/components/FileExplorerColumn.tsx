import { useState, useEffect } from "react";
import { useFileContext } from "../contexts/FolderContext";
import { calculateFolderSize, getFileFolderFromID } from "../utils";
import ColumnHeader from "./ColumnHeader";
import FileDetail from "./FileDetail";
import FileLists from "./FileList";
import { FileKinds, Folder, SortBy, File } from "../types/FileTypes";
import { useMemo } from "react";
import ItemList from "./FileList";
import { ItemType } from "../types/FileTypes2";

// function sortChildren(folder: Folder, sortBy: SortBy): Folder {
//   let sortedChildren = [...folder.children];

//   switch (sortBy) {
//     case SortBy.Type: {
//       const folderChildren: Folder[] = [];
//       const fileChildren: File[] = [];
//       sortedChildren.forEach((item) => {
//         if (item.kind !== FileKinds.Folder) {
//           fileChildren.push(item);
//         } else {
//           folderChildren.push(item);
//         }
//       });
//       sortedChildren = [...folderChildren, ...fileChildren];
//       break;
//     }
//     case SortBy.Name: {
//       sortedChildren.sort((a, b) => a.name.localeCompare(b.name));
//       break;
//     }
//     case SortBy.Created: {
//       sortedChildren.sort((a, b) => a.createdAt - b.createdAt);
//       break;
//     }
//     case SortBy.Size: {
//       sortedChildren.sort((a, b) => {
//         let aSize;
//         let bSize;
//         //if the child is file it already has size but for folder, it needs to be calculated dynamically
//         if (a.kind !== FileKinds.Folder) {
//           aSize = a.size;
//         } else {
//           aSize = calculateFolderSize(a);
//         }
//         if (b.kind !== FileKinds.Folder) {
//           bSize = b.size;
//         } else {
//           bSize = calculateFolderSize(b);
//         }
//         return bSize - aSize;
//       });
//       break;
//     }
//   }
//   return {
//     ...folder,
//     children: sortedChildren,
//   };
// }

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
}: {
  pathArray: string[];
  depth: number;
}) {
  const [items, setItems] = useState<ItemType[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const path = pathArray.join("/");
  useEffect(
    function () {
      async function loadData() {
        try {
          setIsLoading(true);
          const url = `http://localhost:3000/api/folder?path=${path}`;
          const res = await fetch(url);
          const data = await res.json();
          console.log(data);
          setItems(data.data.folder);
        } catch (err) {
          console.log(err);
        } finally {
          setIsLoading(false);
        }
      }
      loadData();
    },
    [path]
  );
  return (
    <div className="border-r-[1px] border-r-blue-400/25 h-screen w-72">
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <ItemList items={items} depth={depth} />
      )}
    </div>
  );
}
