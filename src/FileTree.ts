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
          children: [
            {
              id: "9",
              kind: FileKinds.Folder,
              name: "ReactApp",
              createdAt: Date.now(),
              children: [
                {
                  id: "11",
                  kind: FileKinds.Folder,
                  name: "src",
                  createdAt: Date.now(),
                  children: [
                    {
                      id: "12",
                      kind: FileKinds.Text,
                      name: "app.js",
                      createdAt: Date.now(),
                      size: 40,
                    },
                    {
                      id: "13",
                      kind: FileKinds.Text,
                      name: "index.js",
                      createdAt: Date.now(),
                      size: 30,
                    },
                  ],
                },
                {
                  id: "14",
                  kind: FileKinds.Text,
                  name: "package.json",
                  createdAt: Date.now(),
                  size: 30,
                },
              ],
            },
            {
              id: "10",
              kind: FileKinds.MD,
              name: "project-plan.md",
              createdAt: Date.now(),
              size: 40,
            },
          ],
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
      kind: FileKinds.Text,
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

// //making the folder and files valid using BFS
// function createFileTree(root: Folder){
//   if(root.kind !== FileKinds.Folder) throw new Error("Root is not of folder kind!")
//   if(!root.children) {
//     root.children = []
//   }

//   const queue = [root]

//   while(queue.length > 0) {
//     const current:(Folder | File | undefined) = queue.shift()
//     if(current) {
//       if(current.kind === FileKinds.Folder && !current.children) current.children = []
//       if(current.kind !== FileKinds.Folder && current.children)
//     }
//   }

// }