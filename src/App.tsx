import "./App.css";
import { FaFolder } from "react-icons/fa6";
import { FaFile } from "react-icons/fa";
import { IoIosArrowForward, IoIosArrowBack } from "react-icons/io";
import { File, Folder, FileKinds } from "./types/FileTypes";
import { root } from "./FileTree";
import { useState, useMemo } from "react";
import { getFileFolderFromID } from "./utils";

function App() {
  return (
    <>
      <div>
        <FileExplorer root={root} />
      </div>
    </>
  );
}

function FileExplorer({ root }: { root: Folder }) {
  const [currentFolderIds, setCurrentFolderIds] = useState<string[]>([root.id]);
  const [activeFolderId, setActiveFolderId] = useState<string>(root.id);

  const activeFolder = useMemo(
    () => getFileFolderFromID(root, activeFolderId),
    [root, activeFolderId]
  );

  function handleActiveChange(id: string) {
    setActiveFolderId(id);
  }

  return (
    <>
      <div className="p-2 ">
        <Title title={activeFolder ? activeFolder.name : ""} />
        <div className="flex">
          <FileColumn folder={root} onClick={handleActiveChange} />
          <FileColumn onClick={() => {}} />
          <FileColumn onClick={() => {}} />
        </div>
      </div>
    </>
  );
}

function Title({ title }: { title: string }) {
  return (
    <div className="flex items-end gap-8  p-3 border-b-[1px] border-b-blue-400/25">
      <button className="bg-neutral-900 h-7 w-7 rounded-md flex items-center justify-center">
        <IoIosArrowBack />
      </button>
      <span>{title}</span>
    </div>
  );
}

function FileColumn({
  folder,
  onClick,
}: {
  folder?: Folder;
  onClick: (id: string) => void;
}) {
  return (
    <div
      className="border-r-[1px] border-r-blue-400/25 h-screen w-72"
      onClick={() => folder && onClick(folder.id)}
    >
      {folder && (
        <>
          <FileColumnHeader header={folder.name} />
          <FileLists files={folder.children} onClick={onClick} />
        </>
      )}
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

function FileLists({
  files,
  onClick,
}: {
  files: (File | Folder)[];
  onClick: (id: string) => void;
}) {
  return (
    <div className="p-0.5">
      <ul className="flex flex-col gap-1">
        {files.map((file) => (
          <FileItem key={file.id} file={file} onClick={onClick} />
        ))}
      </ul>
    </div>
  );
}

function FileItem({
  file,
  onClick,
}: {
  file: File | Folder;
  onClick: (id: string) => void;
}) {
  return (
    <li
      onClick={(e) => {
        e.stopPropagation();
        onClick(file.id);
      }}
      className={`hover:bg-blue-600 py-1 flex justify-between items-center px-3 cursor-pointer rounded-sm`}
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
