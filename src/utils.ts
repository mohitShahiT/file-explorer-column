import { Folder, File, FileKinds } from "./types/FileTypes";
//BFS for finding the folder or file with given id
// takes in folder and id as parameters returns either File, Folder on null if matching id not founds
export function getFileFolderFromID(
  root: Folder,
  id: string
): File | Folder | null {
  const queue: (File | Folder)[] = [];
  queue.push(root);
  while (queue.length > 0) {
    const current = queue.shift();
    // console.log(current?.name)
    if (current?.id === id) return current;
    if (current && "children" in current) {
      // console.log(`Pushing ${current.name}'s children into the queue`);
      queue.push(...current.children);
    }
  }
  return null;
}

// export function getPathFromID(root: Folder, id: string): string {
//   const pathStack: { name: string; id: string }[] = [];
//   const visitedIds: string[] = [];
//   const stack: (File | Folder)[] = [root];
//   stack.push(root);
//   while (stack.length > 0) {
//     const current = stack.pop();
//     current && visitedIds.push(current?.id);
//     if (current?.id === id) {
//       // pathStack.push(current.name)
//       break;
//     }
//     if (current && "children" in current) {
//       stack.push(...current.children);
//       // path += `${current.name}/`
//     }
//   }
//   return "";
//   return pathStack.join("/");
// }

export function getDepthFromID(root: Folder, id: string): number {
  const queue: { file: Folder | File; depth: number }[] = [
    { file: root, depth: 0 },
  ];
  while (queue.length > 0) {
    const currentFile = queue.shift();
    if (!currentFile) continue;
    const { file: current, depth } = currentFile;
    if (current.id === id) return depth;
    if ("children" in current) {
      (current as Folder).children.forEach((child) => {
        queue.push({ file: child, depth: depth + 1 });
      });
    }
  }
  return -1;
}

export function calculateFolderSize(folder: Folder): number {
  let totalSize = 0;

  for (const item of folder.children) {
    if (item.kind !== FileKinds.Folder) {
      totalSize += item.size;
    } else {
      totalSize += calculateFolderSize(item);
    }
  }
  return totalSize;
}

export function getRelativePath(root: Folder, id: string): string {
  const queue: { folder: Folder; path: string }[] = [
    //this queue only stores folder information
    {
      folder: root,
      path: `/${root.name}`,
    },
  ];

  while (queue.length > 0) {
    const current = queue.shift();
    if (!current) continue;
    const { folder: currentFolder, path } = current;
    if (currentFolder.id === id) return path; //this returns path for a folder
    for (const child of currentFolder.children) {
      //we only push folder and check for ids of other files
      if (child.kind !== FileKinds.Folder && child.id === id) {
        return path + "/" + child.name;
      } else if (child.kind === FileKinds.Folder) {
        queue.push({
          folder: child,
          path: path + "/" + child.name,
        });
      }
    }
  }
  return "id not found";
}