import { useEffect, useRef, useState } from "react";

type ContextMenueProps = {
  positionX: number;
  positionY: number;
};

const contextOptions = ["New File", "New Folder", "Get Info"];

export default function ContextMenu({
  positionX,
  positionY,
}: ContextMenueProps) {
  const menuRef = useRef<HTMLDivElement>(null);
  const [adjustedPosition, setAdjustedPosition] = useState({
    x: positionX,
    y: positionY,
  });
  useEffect(() => {
    const menu = menuRef.current;
    if (menu) {
      const { innerWidth, innerHeight } = window;
      const { offsetWidth, offsetHeight } = menu;
      console.log({ innerWidth, innerHeight, offsetWidth, offsetHeight, menu })

      let newX = positionX;
      let newY = positionY;

      if (positionX + offsetWidth > innerWidth) {
        newX = innerWidth - offsetWidth - 8; // 8px padding from edge
      }
      if (positionY + offsetHeight > innerHeight) {
        newY = innerHeight - offsetHeight - 8;
      }

      setAdjustedPosition({ x: newX, y: newY });
    }
  }, [positionX, positionY]);
  return (
    <div
    ref={menuRef}
      className="p-1 text-sm absolute w-48 bg-neutral-900 opacity-90 text-amber-50 rounded-md shadow-xl z-50 border-1 border-gray-800 overflow-hidden"
      style={{ top: adjustedPosition.x, left: adjustedPosition.y }}
      // onClick={(e)=>e.stopPropagation()}
    >
      <ul className="flex flex-col">
        {contextOptions.map((option, indx) => (
          <li
            className="px-4 py-2 hover:bg-blue-800 cursor-pointer"
            key={`${option}-${indx}`}
          >
            {option}
          </li>
        ))}
      </ul>
    </div>
  );
}
