import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { FileContextProvider } from "./contexts/FolderContext.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <FileContextProvider>
      <App />
    </FileContextProvider>
  </StrictMode>
);
