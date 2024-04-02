import { useState, useContext, useEffect } from "react";
import { UserContext } from "./Menu";
import { BoardContext } from "../App";
import "./Projects.css";
import { FaTrashAlt } from "react-icons/fa";

function SaveProject({ projectID, setProjectID }) {
  const user = useContext(UserContext);
  const board = useContext(BoardContext);
  const [projectName, setProjectName] = useState();
  const handleSubmit = (event, id) => {
    event.preventDefault();
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
        if (!res.success) alert(res.error);
        else {
          alert("Account created ! \nYour token is " + res.data);
          setProjectID(res.data._id);
        }
      });

    console.log("oui");
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

function LoadProject() {
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
        if (!res.success) alert(res.error);
        else setProjects(res.data);
      });
  }, []);
  console.log("projects", projects);
  const listProjects = projects.map((project) => {
    return <li></li>;
  });
  return (
    <>
      <h1>Projects</h1>
      <ul>{listProjects}</ul>
    </>
  );
}

function ButtonProject({ project }) {
  return <button>{project}</button>;
}

export default function Projects() {
  const [projectID, setProjectID] = useState("Null");

  const user = useContext(UserContext);
  if (user.isLoggedIn) {
    return (
      <>
        <SaveProject projectID={projectID} setProjectID={setProjectID} />
        <LoadProject />
      </>
    );
  }
  return <></>;
}
