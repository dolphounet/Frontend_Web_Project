import React, { useState, createContext } from "react";
import "./App.css";
import Menu from "./components/Menu";
import Board from "./components/Board";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

export const ImagesContext = createContext({});
export const BoardContext = createContext({});

export default function App({ size }) {
  const [images, setImages] = useState([]);
  const [board, setBoard] = useState(() => {
    let newBoard = [];
    for (let i = 0; i < size * size; i++) {
      newBoard.push({ name: "", pos: i + 1 });
    }
    return newBoard;
  });
  fetch("/db/items", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({}),
  })
    .then((res) => res.json())
    .then((res) => {
      if (!res.success) alert(res.error);
      else {
        let newImages = res.data;
        for (let i = 0; i < images.length; i++) {
          newImages[i].id = i;
        }
        setImages(newImages);
      }
    });
  return (
    <ImagesContext.Provider value={images}>
      <BoardContext.Provider value={{ board, setBoard }}>
        <DndProvider backend={HTML5Backend}>
          <div className="App">
            <Menu />
            <Board />
          </div>
        </DndProvider>
      </BoardContext.Provider>
    </ImagesContext.Provider>
  );
}
