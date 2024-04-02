import React, { useState, createContext } from "react";
import "./App.css";
import Menu from "./components/Menu";
import Board from "./components/Board";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

export const BoardContext = createContext({});

export default function App({ size }) {
  const [board, setBoard] = useState(() => {
    let newBoard = [];
    for (let i = 0; i < size * (size-2); i++) {
      newBoard.push({ name: "", pos: i + 1 });
    }
    return newBoard;
  });
  return (
    <BoardContext.Provider value={{ board, setBoard }}>
      <DndProvider backend={HTML5Backend}>
        <div className="App">
          <Menu />
          <Board size={size} />
        </div>
      </DndProvider>
    </BoardContext.Provider>
  );
}
