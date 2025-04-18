import { useFileContext } from "../contexts/FolderContext";
import { IoIosArrowBack } from "react-icons/io";

export default function FileExplorerTitle({ title }: { title: string }) {
  const {
    root,
    openFolderIds,
    setOpenFolderIds,
    activeFolder,
    setActiveFolderId,
  } = useFileContext();

  function handleBackClick() {
    if (activeFolder?.id === root.id) return;
    const newOpenFolderIds = [...openFolderIds];
    newOpenFolderIds.pop();
    setOpenFolderIds(newOpenFolderIds);
    setActiveFolderId(newOpenFolderIds[newOpenFolderIds.length - 1]);
  }
  return (
    <div className="flex items-end gap-8  p-3 border-b-[1px] border-b-blue-400/25 max-w-screen">
      <button
        className="bg-neutral-900 h-7 w-7 rounded-md flex items-center justify-center cursor-pointer hover:bg-blue-800"
        onClick={handleBackClick}
      >
        <IoIosArrowBack />
      </button>
      <span>{title}</span>
    </div>
  );
}