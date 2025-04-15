import './App.css'
import { FaFolder } from "react-icons/fa6";
import { FaFile } from "react-icons/fa";
function App() {


  return (
    <>
    <div>
    <FileExplorer/>
    </div>
    </>
  )
}


function FileExplorer() {
  return <>
  <div className='p-2 '>
    <Title/>
    <div className='flex'>

    <FileColumn/>
    <FileColumn/>
    <FileColumn/>
    </div>
  </div>
  </>
}

function Title(){
  return <div className='flex items-end gap-8  p-3 border-b-[1px] border-b-blue-400/25'>
    <button className='bg-neutral-900 h-7 w-7 rounded-md'>{"<"}</button>
    <span>Documents</span>
  </div>
}

function FileColumn(){
  return <div className='border-r-[1px] border-r-blue-400/25 h-screen w-72'>
    <FileColumnHeader/>
    <FileLists/>
  </div>
}

function FileColumnHeader() {
  return (
  <div className='border-b-[1px] border-b-blue-400/25 w-72 p-2 flex justify-between'>
    <p>Dir Name</p>
    <select className='bg-gray-700'>
      <option value={"name"}>Name</option>
      <option value={"size"}>Size</option>
      <option value={"created"}>Created</option>
    </select>
  </div>
  )
}

function FileLists() {
  const files = [
    {
      type: "folder",
      name: "Document"
    },
    {
    type: "folder",
    name: "Downloads"
  },
    {
    type: "folder",
    name: "Pictures"
  },
  {
    type: "file",
    name: "Notes.txt"
  }
  ]
  return (
  <div className='p-0.5'>
    <ul>
    {files.map(file=><li className='hover:bg-blue-600 py-1 flex justify-between px-3'><span className='flex items-center gap-2 '><FaFolder />{file.name}</span><span>{">"}</span></li>)}
    </ul>
  </div>
  )
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