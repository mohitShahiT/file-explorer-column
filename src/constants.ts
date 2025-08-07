export const BASE_URL =
  import.meta.env.MODE === "production"
    ? import.meta.env.VITE_API_URL
    : "http://localhost:8000";
export const FOLDERS_KEY = "folders";
