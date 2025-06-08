export enum FileKinds {
  PDF = "PDF",
  Document = "Document",
  JPG = "JPG",
  PNG = "PNG",
  Folder = "Folder",
  MD = "MD",
  Text = "Text",
  XLSX = "XLSX",
  HTML = "HTML",
}

// export interface Folder {
//   id: string;
//   name: string;
//   createdAt: number;
//   children: string[];
// }

// export interface File {
//   id: string;
//   name: string;
//   createdAt: string;
//   size: number;
//   kind: FileKinds;
//}

export interface ItemType {
  id: string;
  name: string;
  children?: string[];
  createdAt: number;
  size?: number;
  kind?: string;
  isFolder: boolean;
}

export interface File {
  id: string;
  name: string;
  createdAt: number;
  size: number;
  kind: string;
  path: string;
}

export enum SortBy {
  Name = "Name",
  Size = "Size",
  Created = "Created",
  Type = "Type",
}