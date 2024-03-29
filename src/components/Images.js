import "./Images.css";
import { DndProvider, useDrag, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { useState, useContext } from "react";
import { ImagesContext } from "../App";

export default function Images() {
  const { images } = useContext(ImagesContext);
  const listImages = images.map((image) => {
    return (
      <div>
        <img src={image.url} alt={image.name} />
      </div>
    );
  });
  return listImages;
}
