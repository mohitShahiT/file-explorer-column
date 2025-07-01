import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { ItemContextProvider } from "./contexts/ItemContext.tsx";
import { ContextMenuContextProvider } from "./contexts/ContextMenuContext";


createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ContextMenuContextProvider>
      <ItemContextProvider>
        <App />
      </ItemContextProvider>
    </ContextMenuContextProvider>
  </StrictMode>
);
