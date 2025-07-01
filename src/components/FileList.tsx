import { FaFolder, FaFile } from "react-icons/fa6";
import { IoIosArrowForward } from "react-icons/io";
import { ItemType } from "../types/FileTypes2";
import { motion, AnimatePresence } from "framer-motion";
import { ItemClick, useItemContext } from "../contexts/ItemContext";
import { fetchFile } from "../api/items";
import { useQuery } from "react-query";

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
  const { activeFolders, handleItemClick, activeFileId } = useItemContext();
  const currentPath = activeFolders
    .slice(0, depth + 1)
    .join("/")
    .concat(`/${item.name}`);
  let activeFolderPath = activeFolders.join("/");
  const { data: fileData } = useQuery(["file", activeFileId], () =>
    fetchFile(activeFileId)
  );
  if (activeFileId && fileData) {
    activeFolderPath = activeFolderPath.concat(`/${fileData.file.name}`);
  }
  const activeBg =
    currentPath === activeFolderPath
      ? "bg-blue-600"
      : activeFolderPath.startsWith(currentPath)
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
        handleItemClick(data);
      }}
      className={`hover:bg-blue-600 py-1 flex justify-between items-center px-3 cursor-pointer rounded-sm ${activeBg}`}
      layout
      transition={{ duration: 0.3 }}
    >
      <div className="flex w-full items-center justify-between gap-2 ">
        <div className="flex items-center gap-3.5">
          {item.isFolder ? <FaFolder /> : <FaFile />}
          <span>{item.name}</span>
        </div>
        {item.isFolder && <IoIosArrowForward />}
      </div>
    </motion.li>
  );
}
