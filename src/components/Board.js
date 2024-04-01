import React, { useState, useContext } from "react";
import Picture from "./Picture";
import { useDrop } from "react-dnd";
import "../TutoDNDPedro/App.css";
import { ImagesContext } from "../App";
import { BoardContext } from "../App";

function Tile({ tile, onDrop, onRemove, pictureList }) {
  //const pictureList = useContext(ImagesContext);
  const [{ isOver }, drop] = useDrop(() => {
    //const pictureList = useContext(ImagesContext);
    return {
      accept: "image",
      drop: (item) => {
        if (tile.name === "") {
          onDrop(item.id, pictureList);
        } else {
          onRemove();
          onDrop(item.id, pictureList);
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
  const picture = pictureList.find((picture) => picture.name === tile.name);
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
  useEffect(() => {
    setPictureList(useContext(ImagesContext))
    fetchPictureList().then((data) => {
      setPictureList(data);
    });
  }, []);

  const board = useContext(BoardContext);
  
  console.log(pictureList);

  const handleDrop = (id, index) => {
    console.log(pictureList);
    const picture = pictureList.find((picture) => picture.id === id);
    board.setBoard((prevBoard) => {
      let newBoards = [...prevBoard];
      newBoards[index - 1] = [picture];
      return newBoards;
    });
  };

  const handleRemove = (index) => {
    console.log(`remove ${index}`);
    board.setBoard((prevBoard) => {
      let newBoards = [...prevBoard];
      newBoards[index - 1] = [];
      return newBoards;
    });
  };

  let boards = board.board.map((tile) => {
    return (
      <Tile
        key={tile.pos}
        tile={tile}
        onDrop={(id, pictureList) => handleDrop(id, tile.pos, pictureList)}
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
