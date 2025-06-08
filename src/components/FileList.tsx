import { FaFolder, FaFile } from "react-icons/fa6";
import { IoIosArrowForward } from "react-icons/io";
import { ItemType } from "../types/FileTypes2";
import { motion, AnimatePresence } from "framer-motion";
import { ItemClick, useItemContext } from "../contexts/ItemContext";

export default function ItemList({
  items,
  depth,
}: {
  items: ItemType[];
  depth: number;
}) {
  if (items.length <= 0) {
    return (
      <div className="text-center p-1 text-gray-500/50">
        This folder is empty
      </div>
    );
  }

  return (
    <div className="p-0.5">
      <ul className="flex flex-col gap-1">
        <AnimatePresence>
          {items.map((item) => (
            <Item key={item.id} item={item} depth={depth} />
          ))}
        </AnimatePresence>
      </ul>
    </div>
  );
}

function Item({ item, depth }: { item: ItemType; depth: number }) {
  // const {
  //   root,
  //   activeFolderId,
  //   handleActiveChange,
  //   setOpenFolderIds,
  //   openFolderIds,
  //   pulseId,
  // } = useFileContext();

  // function handleClick(e: SyntheticEvent<HTMLLIElement>) {
  //   e.stopPropagation();
  //   handleActiveChange(file.id);
  //   const depth = getDepthFromID(root, file.id);
  //   let newIds = [...openFolderIds];
  //   if (depth < openFolderIds.length) {
  //     //if currently open depth then remove further open column up to that depth and then only push new column
  //     newIds = openFolderIds.slice(0, depth);
  //   }
  //   newIds[depth] = file.id;
  //   setOpenFolderIds(newIds);
  // }
  const { activeFolders, handleItemClick } = useItemContext();
  const currentPath = activeFolders
    .slice(0, depth + 1)
    .join("/")
    .concat(`/${item.name}`);
  const activeBg =
    currentPath === activeFolders.join("/")
      ? "bg-blue-600"
      : activeFolders.join("/").startsWith(currentPath)
      ? "bg-gray-700"
      : "";
  return (
    <motion.li
      onClick={(e) => {
        e.stopPropagation();
        const data: ItemClick = {
          itemId: item.id,
          itemName: item.name,
          depth: depth,
          isFolder: item.isFolder,
        };
        console.log({ data });
        handleItemClick(data);
      }}
      className={`hover:bg-blue-600 py-1 flex justify-between items-center px-3 cursor-pointer rounded-sm ${activeBg}`}
      layout
      transition={{ duration: 0.3 }}
    >
      <span className="flex items-center gap-2 ">
        {item.isFolder ? <FaFolder /> : <FaFile />}

        {item.name}
      </span>
      {item.isFolder && <IoIosArrowForward />}
    </motion.li>
  );
}
