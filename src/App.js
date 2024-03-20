import React, { useState } from 'react';

export default function ListeDeroulante() {
    const [selectedOption, setSelectedOption] = useState("https://exemple.com/chemin/vers/coconut.jpg"); 

    const handleChange = (event) => {
        setSelectedOption(event.target.value);
    };

    return (
        <div>
            <select value={selectedOption} onChange={handleChange}>
                <option value="https://exemple.com/chemin/vers/banana.jpg">Banane</option>
                <option value="https://exemple.com/chemin/vers/lime.jpg">Citron vert</option>
                <option value="https://exemple.com/chemin/vers/coconut.jpg">Noix de coco</option>
                <option value="https://exemple.com/chemin/vers/mango.jpg">Mangue</option>
            </select>
            <p>Option sélectionnée: {selectedOption}</p>
            <img src={selectedOption} alt="Image sélectionnée"></img>
        </div>
    );
}


