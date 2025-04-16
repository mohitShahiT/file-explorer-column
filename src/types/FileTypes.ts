export enum FileKinds {
    PDF,
    Document,
    JPG,
    PNG,
    Folder
}

export interface File {
    id: string,
    name: string,
    kind: FileKinds,
    size?: number, //in bytes.
    createdAt: number
}

export interface Folder extends File {
    children: Array<File | Folder>,
}