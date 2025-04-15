export enum FileKinds {
    PDF,
    Document,
    JPG,
    PNG,
}

export interface File {
    id: string,
    name: string,
    kind: FileKinds,
    size: number, //in bytes.
    createdAt: number
  }

export interface Folder {
    id: string,
    name: string,
    kind: "folder",
    children: Array<File | Folder>,
    size?:number
}