export enum FileKinds {
  PDF = "PDF",
  Document = "Document",
  JPG = "JPG",
  PNG = "PNG",
  Folder = "Folder",
  MD = "MD",
  Text = "Text",
  XLSX = "XLSX",
}

export interface FileFolderBase {
  id: string;
  name: string;
  createdAt: number;
}

export interface File extends FileFolderBase {
    kind: Exclude<FileKinds, FileKinds.Folder>
    size: number
}

export interface Folder extends FileFolderBase {
    kind: FileKinds.Folder,
    children: Array<File | Folder>,
}

export enum SortBy {
  Name = "Name",
  Size = "Size",
  Created = "Created",
  Type = "Type",
}