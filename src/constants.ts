export const BASE_URL =
  import.meta.env.MODE === "production"
    ? "https://file-explorer-api-server.onrender.com"
    : "http://localhost:8000";
export const FOLDERS_KEY = "folders";
