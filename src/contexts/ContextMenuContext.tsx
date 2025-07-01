import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useState,
} from "react";

interface ContextMenuInterface {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  menuPosition: {
    positionX: number,
    positionY: number
  } | null;
  setMenuPosition: Dispatch<SetStateAction<{
    positionX: number,
    positionY: number
  } | null>>
}

const ContextMenuContext = createContext<ContextMenuInterface | null>(null);

export function ContextMenuContextProvider({ children }:{children: ReactNode}) {
  const [isOpen, setIsOpen] = useState(false);
    const [menuPosition, setMenuPosition] = useState<{
      positionX: number;
      positionY: number;
    } | null>(null);


  return (
    <ContextMenuContext.Provider value={{ isOpen, setIsOpen, menuPosition, setMenuPosition }}>
      {children}
    </ContextMenuContext.Provider>
  );
}

export function useContextMenuContext() {
  const context = useContext(ContextMenuContext);
  if (context === null) {
    throw new Error("getContextMenuContext used outside context provider");
  }
  return context;
}
