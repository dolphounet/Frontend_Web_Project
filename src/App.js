import React, { useState, createContext } from "react";
import "./App.css";
import Menu from "./components/Menu";
import Images from "./components/Images";

export const ImagesContext = createContext({});

export default function App() {
  const [images, setImages] = useState([]);
  fetch("/db/items", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({}),
  })
    .then((res) => res.json())
    .then((res) => {
      if (!res.success) alert(res.error);
      else {
        setImages(res.data);
      }
    });
  return (
    <ImagesContext.Provider value={{ images }}>
      <Menu />
      <Images />
    </ImagesContext.Provider>
  );
}
