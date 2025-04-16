import './App.css'
import { FaFolder } from "react-icons/fa6";
import { FaFile } from "react-icons/fa";
import { IoIosArrowForward, IoIosArrowBack } from "react-icons/io";
import { File, Folder, FileKinds } from "./types/FileTypes";
import { nanoid } from "nanoid";

//BFS for finding the folder or file with given id
// takes in folder and id as parameters returns either File, Folder on null if matching id not founds
function getFileFolderFromID(root: Folder, id: string): (File | Folder | null) {
  const queue:(File | Folder)[] = [];
  queue.push(root);
  while (queue.length > 0) {
    const current = queue.shift();
    console.log(current?.name)
    if(current?.id === id) return current;
    if(current && 'children' in current) {
      queue.push(...current.children)
    }
  }
  return null
}

const ID_SIZE = 7;
const root: Folder = {
  id: nanoid(ID_SIZE),
  kind: "folder",
  name: "root",
  createdAt: Date.now(),
  children: [
    {
      id: nanoid(ID_SIZE),
      kind: "folder",
      name: "Documents",
      createdAt: Date.now(),
      children: [
        {
          id: nanoid(ID_SIZE),
          kind: "folder",
          name: "Projects",
          createdAt: Date.now(),
          children: [],
        },
        {
          id: "mohit",
          kind: FileKinds.Document,
          name: "budget.xlsx",
          size: 128,
          createdAt: Date.now(),
        },
        {
          id: nanoid(ID_SIZE),
          kind: FileKinds.Document,
          name: "resume.docx",
          size: 32,
          createdAt: Date.now(),
        },
      ],
    },
    {
      id: nanoid(ID_SIZE),
      kind: "folder",
      name: "Downloads",
      createdAt: Date.now(),
      children: [],
    },
    {
      id: nanoid(ID_SIZE),
      kind: "folder",
      name: "Pictures",
      createdAt: Date.now(),
      children: [],
    },
    {
      id: nanoid(ID_SIZE),
      kind: FileKinds.Document,
      name: "notes.txt",
      size: 10,
      createdAt: Date.now(),
    },
    {
      id: nanoid(ID_SIZE),
      kind: FileKinds.PDF,
      name: "resume.pdf",
      size: 50,
      createdAt: Date.now(),
    },
  ],
};
function App() {
  console.log(getFileFolderFromID(root, "mohit"))
  return (
    <>
      <div>
        <FileExplorer />
      </div>
    </>
  );
}

function FileExplorer() {
  return (
    <>
      <div className="p-2 ">
        <Title title={root.name} />
        <div className="flex">
          <FileColumn folder={root} />
          {/* <FileColumn />
          <FileColumn /> */}
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

function FileColumn({ folder }: { folder: Folder }) {
  return (
    <div className="border-r-[1px] border-r-blue-400/25 h-screen w-72">
      <FileColumnHeader header={folder.name} />
      <FileLists files={folder.children} />
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
  return (
    <li className="hover:bg-blue-600 py-1 flex justify-between items-center px-3 cursor-pointer rounded-sm">
      <span className="flex items-center gap-2 ">
        {file.kind === "folder" ? <FaFolder /> : <FaFile />}

        {file.name}
      </span>
      <IoIosArrowForward />
    </li>
  );
}

export default App

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