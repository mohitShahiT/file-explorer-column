export enum FileKinds {
    PDF= "PDF",
    Document = "Document",
    JPG = "JPG",
    PNG = "PNG",
    Folder = "Folder",
    MD = "MD",
    Text = "Text",
    XLSX = "XLSXs"
}

export interface FileFolderBase {
    id: string,
    name: string,

    createdAt: number
}

export interface File extends FileFolderBase {
    kind: Exclude<FileKinds, FileKinds.Folder>
    size: number
}

export interface Folder extends FileFolderBase {
    kind: FileKinds.Folder,
    children: Array<File | Folder>,
}