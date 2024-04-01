import React, { useState, useContext, useEffect } from "react";
import Picture from "./Picture";
import { useDrop } from "react-dnd";
import "../TutoDNDPedro/App.css";
import { BoardContext } from "../App";

function Tile({ tile, onDrop, onRemove, pictureList }) {
  const [{ isOver }, drop] = useDrop(() => {
    return {
      accept: "image",
      drop: (item) => {
        if (tile.name === "") {
          onDrop(item.id);
        } else {
          onRemove();
          onDrop(item.id);
        }
      },
      collect: (monitor) => ({
        isOver: !!monitor.isOver(),
      }),
    };
  });
  if (tile.name === "") {
    return <div className="Board" ref={drop} key={tile.pos}></div>;
  }
  const picture = pictureList.find((picture) => {
    return picture.name === tile.name;
  });
  return (
    <div className="Board" ref={drop}>
      <div key={tile.pos}>
        <img
          src="https://cdn.icon-icons.com/icons2/930/PNG/512/cross_icon-icons.com_72347.png" // Insérer l'URL de l'image de suppression
          alt="Remove"
          className="RemoveButton"
          onClick={onRemove} // Déclencher la fonction onRemove lors du clic sur l'image
          style={{ width: "10px", height: "10px" }}
        />
        <Picture url={picture.url} id={picture.id} />
      </div>
    </div>
  );
}

export default function Board() {
  const [pictureList, setPictureList] = useState([]);
  let newImages = [];
  useEffect(() => {
    fetch("/db/items", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({}),
    })
      .then((res) => res.json())
      .then((res) => {
        if (!res.success) alert(res.error);
        else {
          newImages = res.data;
          for (let i = 0; i < newImages.length; i++) {
            newImages[i].id = i;
          }
          setPictureList(newImages);
        }
      });
  }, []);

  const board = useContext(BoardContext);

  const handleDrop = (id, index) => {
    console.log(index);
    // Utiliser une promesse pour attendre que pictureList soit disponible
    const picture = newImages.find((picture) => picture.id === id);
    board.setBoard((prevBoard) => {
      let newBoards = [...prevBoard];
      newBoards[index - 1] = picture;
      newBoards[index - 1].pos = index;
      return newBoards;
    });
  };

  const handleRemove = (index) => {
    console.log(index);
    board.setBoard((prevBoard) => {
      let newBoards = [...prevBoard];
      newBoards[index - 1] = { name: "", pos: index };
      return newBoards;
    });
  };
  let boards = board.board.map((tile) => {
    console.log(tile);
    return (
      <Tile
        key={tile.pos}
        tile={tile}
        onDrop={(id) => handleDrop(id, tile.pos)}
        onRemove={() => handleRemove(tile.pos)}
        pictureList={pictureList}
      />
    );
  });
  return (
    <>
      <div className="Pictures">
        {pictureList.map((picture) => (
          <Picture key={picture.id} url={picture.url} id={picture.id} />
        ))}
      </div>
      <div className="Boards">{boards}</div>
    </>
  );
}
