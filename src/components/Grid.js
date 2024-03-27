import "./Grid.css";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { useDrag } from "react-dnd";

export const ItemTypes = {
  KNIGHT: "knight",
};

function Square({ black, children }) {
  const fill = black ? "black" : "white";
  const stroke = black ? "white" : "black";

  return (
    <div
      className="Square"
      style={{
        backgroundColor: fill,
        color: stroke,
        height: "100%",
        width: "100%",
      }}
    >
      {children}
    </div>
  );
}
function GridSquare({ x, y, children }) {
  const black = (x + y) % 2 === 1;
  return <Square black={black}>{children}</Square>;
}
function Knight() {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: ItemTypes.KNIGHT,
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  return (
    <div
      ref={drag}
      style={{
        opacity: isDragging ? 0.5 : 1,
        fontSize: 25,
        fontWeight: "bold",
        cursor: "move",
      }}
    >
      ♘
    </div>
  );
}
function renderPiece(x, y, [knightX, knightY]) {
  if (x === knightX && y === knightY) {
    return <Knight />;
  }
}
function renderSquare(i, knightPosition) {
  const x = i % 8;
  const y = Math.floor(i / 8);

  return (
    <div
      className="Wrapper"
      key={i}
      style={{ minWidth: "12.5%", minHeight: "12.5%" }}
    >
      <GridSquare x={x} y={y}>
        {renderPiece(x, y, knightPosition)}
      </GridSquare>
    </div>
  );
}

export default function Grid({ knightPosition }) {
  const squares = [];
  for (let i = 0; i < 64; i++) {
    squares.push(renderSquare(i, knightPosition));
  }

  return (
    <DndProvider backend={HTML5Backend}>
      <div
        className="Grid"
        style={{
          width: "100vw",
          height: "100vh",
          display: "flex",
          flexWrap: "wrap",
        }}
      >
        {squares}
      </div>
    </DndProvider>
  );
}
