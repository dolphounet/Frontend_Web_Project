import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import DragDrop from "./DragDrop2";

function App() {
  return (
    <DndProvider backend={HTML5Backend}>
      <div className="App">
        <DragDrop />
      </div>
    </DndProvider>
  );
}

export default App;
