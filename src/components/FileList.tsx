import { SyntheticEvent } from "react";
import { FaFolder, FaFile } from "react-icons/fa6";
import { IoIosArrowForward } from "react-icons/io";
import { useFileContext } from "../contexts/FolderContext";
import { Folder, FileKinds, File } from "../types/FileTypes";
import { getDepthFromID } from "../utils";
import { motion, AnimatePresence } from "framer-motion";

export default function FileLists({ files }: { files: (File | Folder)[] }) {
  if (files.length <= 0)
    return (
      <div className="text-center p-1 text-gray-500/50">
        This folder is empty
      </div>
    );
  return (
    <div className="p-0.5">
      <ul className="flex flex-col gap-1">
        <AnimatePresence>
          {files.map((file) => (
            <FileItem key={file.id} file={file} />
          ))}
        </AnimatePresence>
      </ul>
    </div>
  );
}

function FileItem({ file }: { file: File | Folder }) {
  const {
    root,
    activeFolderId,
    handleActiveChange,
    setOpenFolderIds,
    openFolderIds,
  } = useFileContext();

  function handleClick(e: SyntheticEvent<HTMLLIElement>) {
    e.stopPropagation();
    handleActiveChange(file.id);
    const depth = getDepthFromID(root, file.id);
    let newIds = [...openFolderIds];
    if (depth < openFolderIds.length) {
      //if currently open depth then remove further open column up to that depth and then only push new column
      newIds = openFolderIds.slice(0, depth);
    }
    newIds[depth] = file.id;
    setOpenFolderIds(newIds);
  }
  const activeBg =
    activeFolderId === file.id
      ? "bg-blue-600"
      : openFolderIds.includes(file.id)
      ? "bg-gray-700"
      : "";
  return (
    <motion.li
      onClick={handleClick}
      className={`hover:bg-blue-600 py-1 flex justify-between items-center px-3 cursor-pointer rounded-sm ${activeBg}`}
      layout
      transition={{ duration: 0.3 }}
    >
      <span className="flex items-center gap-2 ">
        {file.kind === FileKinds.Folder ? <FaFolder /> : <FaFile />}

        {file.name}
      </span>
      {file.kind === FileKinds.Folder && <IoIosArrowForward />}
    </motion.li>
  );
}