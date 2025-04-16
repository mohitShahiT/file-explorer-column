import { Folder, FileKinds } from "./types/FileTypes";
// import { nanoid } from "nanoid";

// const ID_SIZE = 7;
export const root: Folder = {
  id: "0",
  kind: FileKinds.Folder,
  name: "Root",
  createdAt: Date.now(),
  children: [
    {
      id: "1",
      kind: FileKinds.Folder,
      name: "Documents",
      createdAt: Date.now(),
      children: [
        {
          id: "2",
          kind: FileKinds.Folder,
          name: "Projects",
          createdAt: Date.now(),
          children: [],
        },
        {
          id: "3",
          kind: FileKinds.Document,
          name: "budget.xlsx",
          size: 128,
          createdAt: Date.now(),
        },
        {
          id: "4",
          kind: FileKinds.Document,
          name: "resume.docx",
          size: 32,
          createdAt: Date.now(),
        },
      ],
    },
    {
      id: "5",
      kind: FileKinds.Folder,
      name: "Downloads",
      createdAt: Date.now(),
      children: [],
    },
    {
      id: "6",
      kind: FileKinds.Folder,
      name: "Pictures",
      createdAt: Date.now(),
      children: [],
    },
    {
      id: "7",
      kind: FileKinds.Document,
      name: "notes.txt",
      size: 10,
      createdAt: Date.now(),
    },
    {
      id: "8",
      kind: FileKinds.PDF,
      name: "resume.pdf",
      size: 50,
      createdAt: Date.now(),
    },
  ],
};