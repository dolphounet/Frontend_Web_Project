import React, { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./components/FrontTest";
//import reportWebVitals from "./reportWebVitals";
//import Menu from "./components/Menu";
//import Grid from "./components/Grid";
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Menu />
  </React.StrictMode>,
  //  <Grid knightPosition={[7, 4]} />
  //</StrictMode>,
);
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
