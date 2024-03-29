import React, { useState } from "react";
import Picture from "./Picture";
import { useDrop } from "react-dnd";
import "./App.css";

const PictureList = [
  {
    id: 1,
    url:
      "https://cdn-icons-png.flaticon.com/512/2602/2602735.png",
  },
  {
    id: 2,
    url:
      "https://cdn.icon-icons.com/icons2/1791/PNG/512/trashcan1_114647.png",
  },
  {
    id: 3,
    url:
      "https://cdn-icons-png.flaticon.com/512/4812/4812459.png",
  },
];

function Board({ onDrop, board, onRemove }) {
  const [{ isOver }, drop] = useDrop(() => ({
    accept: "image",
    drop: (item) => {
      if (board.length === 0) {
        onDrop(item.id);
      } else {
        onRemove();
        onDrop(item.id);
      }
    },
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }));

  return (
    <div className="Board" ref={drop}>
      {board.map((picture, index) => (
        <div key={index}>
          
          <img
            src="https://cdn.icon-icons.com/icons2/930/PNG/512/cross_icon-icons.com_72347.png" // Insérer l'URL de l'image de suppression
            alt="Remove"
            className="RemoveButton"
            onClick={onRemove} // Déclencher la fonction onRemove lors du clic sur l'image
            style={{ width: '10px', height: '10px' }} 
          />
          <Picture url={picture.url} id={picture.id} />
        </div>
      ))}
    </div>
  );
}

function DragDrop() {
  const [boards, setBoards] = useState(Array.from({ length: 84 }, () => []));

  const handleDrop = (id, index) => {
    const picture = PictureList.find((picture) => picture.id === id);
    setBoards((prevBoards) => {
      const newBoards = [...prevBoards];
      newBoards[index] = [picture];
      return newBoards;
    });
  };

  const handleRemove = (index) => {
    setBoards((prevBoards) => {
      const newBoards = [...prevBoards];
      newBoards[index] = [];
      return newBoards;
    });
  };

  // Diviser les boards en sous-tableaux de 12 boards chacun
  const dividedBoards = [];
  for (let i = 0; i < boards.length; i += 12) {
    dividedBoards.push(boards.slice(i, i + 12));
  }

  return (
    <>
      <div className="Pictures">
        {PictureList.map((picture) => (
          <Picture key={picture.id} url={picture.url} id={picture.id} />
        ))}
      </div>
      <div style={{ display: "flex", flexDirection: "column",justifyContent: "center", alignItems: "center" }}>
        {dividedBoards.map((row, rowIndex) => (
          <div key={rowIndex} style={{ display: "flex", justifyContent:"flex-end" }}>
            {row.map((board, index) => (
              <Board
                key={index}
                onDrop={(id) => handleDrop(id, rowIndex * 12 + index)}
                board={board}
                onRemove={() => handleRemove(rowIndex * 12 + index)}
              />
            ))}
          </div>
        ))}
      </div>
    </>
  );
}

export default DragDrop;
