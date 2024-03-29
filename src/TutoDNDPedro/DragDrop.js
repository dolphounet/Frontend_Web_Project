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

function DragDrop() {
  const [board, setBoard] = useState([]);

  const [{ isOver }, drop] = useDrop(() => ({
    accept: "image",
    drop: (item) => addImageToBoard(item.id),
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }));

  const addImageToBoard = (id) => {
    const pictureList = PictureList.filter((picture) => id === picture.id);
    setBoard((board) => [...board, pictureList[0]]);
  };
  return (
    <>
      <div className="Pictures">
        {PictureList.map((picture) => {
          return <Picture url={picture.url} id={picture.id} />;
        })}
      </div>
      <div className="Board" ref={drop}>
        {board.map((picture) => {
          return <Picture url={picture.url} id={picture.id} />;
        })}
      </div>
    </>
  );
}

export default DragDrop;