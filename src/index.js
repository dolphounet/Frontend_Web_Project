import React, { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";

//import reportWebVitals from "./reportWebVitals";
import Menu from "./components/Menu";
import Grid from "./components/Grid";
import App from "./components/FrontTest";
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <StrictMode>
    <Menu />
  </StrictMode>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
