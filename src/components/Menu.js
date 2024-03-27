import React, { useState } from "react";
import { RxCross1, RxHamburgerMenu } from "react-icons/rx";
import LoginScreen from "./LoginScreen";
import "./Menu.css";

function MenuButton({ display, switchMethod }) {
  return (
    <div className="Menu-Wrapper" style={{ display: display }}>
      <button className="Menu-Button" onClick={switchMethod}>
        <RxHamburgerMenu />
      </button>
    </div>
  );
}

function QuitButton({ switchMethod }) {
  return (
    <div className="Quit-Wrapper">
      <button className="Quit-Button" onClick={switchMethod}>
        <RxCross1 />
      </button>
    </div>
  );
}

export default function Menu() {
  const [display, setDisplay] = useState(["", "none"]);
  function switchMethod() {
    const nextDisplay = display.slice();
    if (nextDisplay[0] === "none") {
      nextDisplay[0] = "";
      nextDisplay[1] = "none";
    } else {
      nextDisplay[0] = "none";
      nextDisplay[1] = "";
    }
    setDisplay(nextDisplay);
  }
  return (
    <>
      <MenuButton display={display[0]} switchMethod={switchMethod} />
      <div className="Menu" style={{ display: display[1] }}>
        <QuitButton switchMethod={switchMethod} />
        <LoginScreen />
      </div>
    </>
  );
}
