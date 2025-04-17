import "./App.css";
import { FaFolder } from "react-icons/fa6";
import { FaFile } from "react-icons/fa";
import { IoIosArrowForward, IoIosArrowBack } from "react-icons/io";
import { File, Folder, FileKinds } from "./types/FileTypes";
import { useFileContext } from "./contexts/FolderContext";
import { getDepthFromID, getFileFolderFromID } from "./utils";
import { SyntheticEvent } from "react";

function App() {
  return (
    <>
      <div>
        <FileExplorer />
      </div>
    </>
  );
}

function FileExplorer() {
  const { openFolderIds, activeFolder } = useFileContext();

  return (
    <>
      <div className="p-2 ">
        <Title title={activeFolder ? activeFolder.name : ""} />
        <div className="flex overflow-scroll">
          {openFolderIds.map((id) => (
            <FolderColumn key={id} id={id} />
          ))}
          {/* <FileColumn folder={root} /> */}
        </div>
      </div>
    </>
  );
}

function Title({ title }: { title: string }) {
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
        className="bg-neutral-900 h-7 w-7 rounded-md flex items-center justify-center"
        onClick={handleBackClick}
      >
        <IoIosArrowBack />
      </button>
      <span>{title}</span>
    </div>
  );
}

function FolderColumn({ id }: { id: string }) {
  const { root, handleActiveChange, openFolderIds, setOpenFolderIds } =
    useFileContext();
  const folder = getFileFolderFromID(root, id);
  const isFolder = folder && "children" in folder;
  function handleClick() {
    if (!folder) return;
    handleActiveChange(folder.id);
    const curretDepth = openFolderIds.indexOf(id);
    setOpenFolderIds(openFolderIds.slice(0, curretDepth + 1));
  }
  return (
    <div
      className="border-r-[1px] border-r-blue-400/25 h-screen w-72"
      onClick={handleClick}
    >
      {folder && (
        <>
          {isFolder && <FileColumnHeader header={folder.name} />}

          {isFolder ? (
            <FileLists files={folder.children} />
          ) : (
            <FileDetails file={folder} />
          )}
        </>
      )}
    </div>
  );
}

function FileDetails({ file }: { file: File }) {
  // const { root } = useFileContext();
  return (
    <div className="p-4 flex flex-col justify-center items-center w-72">
      <FaFile size={80} />
      <h1 className="m-5">{file.name}</h1>
      <div className="w-full">
        <p>Kind: {file.kind}</p>
        <p>Size: {file.size}</p>
        {/* <p>Path: {getPathFromID(root, file.id)}</p> */}
        {/*TODO: Alogrithm to find the path*/}
        <p>Created: {new Date(file.createdAt).toLocaleString()}</p>
      </div>
    </div>
  );
}

function FileColumnHeader({ header }: { header: string }) {
  return (
    <div className="border-b-[1px] border-b-blue-400/25 w-72 p-2 flex justify-between">
      <p>{header}</p>
      <select className="bg-gray-700">
        <option value={"name"}>Name</option>
        <option value={"size"}>Size</option>
        <option value={"created"}>Created</option>
      </select>
    </div>
  );
}

function FileLists({ files }: { files: (File | Folder)[] }) {
  if (files.length <= 0)
    return (
      <div className="text-center p-1 text-gray-500/50">
        This folder is empty
      </div>
    );
  return (
    <div className="p-0.5">
      <ul className="flex flex-col gap-1">
        {files.map((file) => (
          <FileItem key={file.id} file={file} />
        ))}
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
    <li
      onClick={handleClick}
      className={`hover:bg-blue-600 py-1 flex justify-between items-center px-3 cursor-pointer rounded-sm ${activeBg}`}
    >
      <span className="flex items-center gap-2 ">
        {file.kind === FileKinds.Folder ? <FaFolder /> : <FaFile />}

        {file.name}
      </span>
      {file.kind === FileKinds.Folder && <IoIosArrowForward />}
    </li>
  );
}

export default App;

/*
[
  {
    type: "folder"
    name: "Document"
  },
  {
  type: "folder"
  name: "Downloads"
},
  {
  type: "folder"
  name: "Pictures"
},
{
  type: "file"
  name: "Notes.txt"
}
]
    
*/
