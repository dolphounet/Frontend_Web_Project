import React, { useState, createContext, useContext } from "react";
import { RxCross1, RxHamburgerMenu } from "react-icons/rx";
import { MdOutlineLogout } from "react-icons/md";
import LoginScreen from "./LoginScreen";
import Projects from "./Projects";
import "./Menu.css";
import { BoardContext } from "../App";

export const UserContext = createContext();

function MenuButton({ display, switchMethod }) {
  return (
    <div style={{ display: display, backgroundColor: "white" }}>
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

function LogOut({ setProjectID }) {
  const board = useContext(BoardContext);
  const user = useContext(UserContext);
  function handleLogOut(event) {
    event.preventDefault();
    user.setIsLoggedIn("");
    board.resetBoard();
    setProjectID("Null");
  }
  if (!user.isLoggedIn) {
    return <></>;
  }
  return (
    <div className="LogOut-Wrapper">
      <button className="LogOut-Button" onClick={handleLogOut}>
        <MdOutlineLogout />
      </button>
    </div>
  );
}

export default function Menu() {
  const [display, setDisplay] = useState(["", "none"]);
  const [isLoggedIn, setIsLoggedIn] = useState("");
  const [projectID, setProjectID] = useState("Null");

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
        <UserContext.Provider value={{ isLoggedIn, setIsLoggedIn }}>
          <LoginScreen />
          <LogOut setProjectID={setProjectID} />
          <Projects projectID={projectID} setProjectID={setProjectID} />
        </UserContext.Provider>
      </div>
    </>
  );
}
