
type ContextMenueProps = {
    positionX: number,
    positionY: number
}

export default function ContextMenue({
  positionX,
  positionY,
}: ContextMenueProps) {
  console.log({ positionX, positionY });
  return (

      <div style={{
        position: "absolute",
        top: positionY,
        left: positionX,
        background: "grey",
        padding: "8px",
        zIndex: 1000,
      }}>Context Menue</div>

  );
}