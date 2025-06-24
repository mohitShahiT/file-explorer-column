import { FaFile } from "react-icons/fa6";
import { useFileContext } from "../contexts/FolderContext";
import { getRelativePath } from "../utils";
import { File } from "../types/FileTypes2";

export default function FileDetail({ file }: { file: File }) {
    const { root } = useFileContext();
        return (
          <div
            className="p-4 flex flex-col justify-center items-center w-72"
            onClick={(e) => e.stopPropagation()}
          >
            <FaFile size={80} />
            <h1 className="m-5">{file.name}</h1>
            <div className="w-full">
              <p>Kind: {file.kind}</p>
              <p>Size: {file.size} KB</p>
              <p className="wrap-break-word ">
                Path: {getRelativePath(root, file.id)}
              </p>
              <p>Created: {new Date(file.createdAt).toLocaleString()}</p>
            </div>
          </div>
        );
  }