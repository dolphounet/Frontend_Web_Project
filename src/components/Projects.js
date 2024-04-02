import { useState, useContext, useEffect } from "react";
import { UserContext } from "./Menu";
import { BoardContext } from "../App";
import "./Projects.css";
import { FaTrashAlt } from "react-icons/fa";
import { MdFileDownload } from "react-icons/md";
import { IoIosCreate } from "react-icons/io";

function SaveProject({ projectID, setProjectID }) {
  const user = useContext(UserContext);
  const board = useContext(BoardContext);
  const [projectName, setProjectName] = useState();
  const handleSubmit = (event, id) => {
    event.preventDefault();
    if (!projectName) {
      alert("Please enter a name for your project");
      return;
    }
    const project = {
      _id: id,
      name: projectName,
      owner: user.isLoggedIn,
      itemList: structuredClone(board.board),
    };
    fetch("/db/projects/save", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(project),
    })
      .then((res) => res.json())
      .then((res) => {
        if (!res.success) alert(res.data.error);
      });
  };
  return (
    <form className="Save" onSubmit={(event) => handleSubmit(event, projectID)}>
      <h1>Save project</h1>
      <input
        type="text"
        placeholder="Name of the project"
        onChange={(e) => setProjectName(e.target.value)}
      />
      <input type="submit" value="Save" />
    </form>
  );
}

function ButtonProject({ load, deletePrjct }) {
  return (
    <div>
      <button onClick={load}>
        <MdFileDownload />
      </button>
      <button onClick={deletePrjct}>
        <FaTrashAlt />
      </button>
    </div>
  );
}

function NewProject({ setProjectID }) {
  const board = useContext(BoardContext);
  function create() {
    setProjectID("Null");
    board.resetBoard();
  }
  return (
    <div className="Create">
      <button onClick={create}>
        <IoIosCreate />
      </button>
    </div>
  );
}

function LoadProject({ projectID, setProjectID }) {
  const user = useContext(UserContext);
  const board = useContext(BoardContext);
  const [projects, setProjects] = useState([]);
  useEffect(() => {
    fetch("/db/projects/getAll", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ user: user.isLoggedIn }),
    })
      .then((res) => res.json())
      .then((res) => {
        if (!res.success) alert(res.data.error);
        else setProjects(res.data);
      });
  });

  function load(id) {
    fetch("/db/projects/getOne", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: id }),
    })
      .then((res) => res.json())
      .then((res) => {
        if (!res.success) alert(res.data.error);
        else {
          board.setBoard(res.data.itemList);
        }
      });

    setProjectID(id);
  }

  function deletePrjct(id) {
    fetch("/db/projects/delete", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: id }),
    })
      .then((res) => res.json())
      .then((res) => {
        if (!res.success) alert(res.data.error);
      });
  }

  const listProjects = projects.map((project) => {
    let currentColor = "black";
    if (project._id === projectID) currentColor = "red";
    return (
      <li>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            color: currentColor,
            marginRight: "1rem",
            marginTop: "0.4rem",
          }}
        >
          <span>{project.name}</span>
          <ButtonProject
            load={() => load(project._id)}
            deletePrjct={() => deletePrjct(project._id)}
          />
        </div>
      </li>
    );
  });
  return (
    <>
      <h1>Projects</h1>
      <ul>{listProjects}</ul>
    </>
  );
}

export default function Projects({ projectID, setProjectID }) {
  const user = useContext(UserContext);
  if (user.isLoggedIn) {
    return (
      <>
        <SaveProject projectID={projectID} setProjectID={setProjectID} />
        <LoadProject projectID={projectID} setProjectID={setProjectID} />
        <NewProject setProjectID={setProjectID} />
      </>
    );
  }
  return <></>;
}
