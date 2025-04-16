import { Folder, File } from "./types/FileTypes";
//BFS for finding the folder or file with given id
// takes in folder and id as parameters returns either File, Folder on null if matching id not founds
export function getFileFolderFromID(root: Folder, id: string): (File | Folder | null) {
  const queue:(File | Folder)[] = [];
  queue.push(root);
  while (queue.length > 0) {
    const current = queue.shift();
    // console.log(current?.name)
    if(current?.id === id) return current;
    if(current && 'children' in current) {
      queue.push(...current.children)
    }
  }
  return null
}