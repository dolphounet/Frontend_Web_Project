import React, { useState } from 'react';
import { DndProvider, useDrag, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

// Définissez ItemTypes
const ItemTypes = {
  IMAGE: 'image',
};

export default function Main(){
    return(
        <DndProvider backend={HTML5Backend}>
            <div>
                <Title/>
                <ListeDeroulante/>
                <Poubelle/>
                <Button_load/>
            </div>
        </DndProvider>
    );
}

function Title(){
    return(
        <div style={{marginLeft:'20px'}}>
            <h1>Plan de feu</h1>
        </div>
        
    )
}
function Button_load(load){
    return(
        <button onClick={load} style={{ border: 'none', background: 'none', padding: '0', cursor: 'pointer', marginLeft:"20px" }}>
            <img src= "https://cdn-icons-png.flaticon.com/512/72/72389.png" alt="bouton image" style={{ width: '100px', height: 'auto' }} />
        </button>
    )
}
function Poubelle(){
    const [isImageDropped, setIsImageDropped] = useState(false);

    const [{ canDrop, isOver }, drop] = useDrop(() => ({
        accept: ItemTypes.IMAGE,
        drop: () => setIsImageDropped(true), // Marquer l'image comme déposée
        collect: (monitor) => ({
          isOver: monitor.isOver(),
          canDrop: monitor.canDrop(),
        }),
      }));
    
      let backgroundColor = 'white';
      if (isOver && canDrop) {
        backgroundColor = 'lightgreen';
      } else if (canDrop) {
        backgroundColor = 'lightpink';
      }
    
      return(
        <div style={{ display: 'flex', justifyContent: 'flex-end', marginRight: '20px' }}>
            <div ref={drop} style={{ width: '100px', height: '100px', backgroundColor }}>
                <img 
                src="https://cdn-icons-png.flaticon.com/512/2602/2602735.png"
                style = {{width:90,height:90 }}>
                </img>
            </div>
        </div>
    )
}

function ListeDeroulante() {
    const [selectedOption, setSelectedOption] = useState("https://exemple.com/chemin/vers/coconut.jpg"); 
    const [isImageDropped, setIsImageDropped] = useState(false); // État pour suivre si l'image a été déposée

    const handleChange = (event) => {
        setSelectedOption(event.target.value);
    };

    const [{isDragging}, drag] = useDrag(() => ({
        type: ItemTypes.IMAGE,
        collect: monitor => ({
          isDragging: !!monitor.isDragging(),
        }),
      }));

   

    return (
        <div style={{ position: 'absolute', top: '70px', left: '20px', display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
            {!isImageDropped && (
                <select value={selectedOption} onChange={handleChange}>
                    <option value="https://github.com/dolphounet/Frontend_Web_Project/blob/dev/src/assets/banane.jpg?raw=true">Banane</option>
                    <option value="https://github.com/dolphounet/Frontend_Web_Project/blob/dev/src/assets/citron_vert.jpg?raw=true">Citron vert</option>
                    <option value="https://github.com/dolphounet/Frontend_Web_Project/blob/dev/src/assets/coconut.jpg?raw=true">Noix de coco</option>
                    <option value="https://github.com/dolphounet/Frontend_Web_Project/blob/dev/src/assets/mangue.jpg?raw=true">Mangue</option>
                </select>
            )}
            {!isImageDropped && (
                
                <img 
                src={selectedOption} 
                alt="Image sélectionnée"
                ref={drag} 
                style={{ marginTop: '15px', width: '110px', height: 'auto' }} />
                
            )}
        </div>
    );
}
