import { BASE_URL } from "../constants";

export async function fetchFolder(path: string) {
  console.log({ BASE_URL });
  console.log(`${BASE_URL}/api/folder?path=${path}`);
  const url = `${BASE_URL}/api/folder?path=${path}`;
  const res = await fetch(url);
  const data = await res.json();
  return data.data;
}
export async function fetchFile(id: string | null) {
  if (!id) return null;
  const url = `${BASE_URL}/api/file/${id}`;
  const res = await fetch(url);
  const data = await res.json();
  return data.data;
}