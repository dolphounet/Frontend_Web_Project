import { useState, useContext } from "react";
import { UserContext } from "./Menu";
import "./Projects.css";

function SaveProject() {
  const user = useContext(UserContext);
  const [projectName, setProjectName] = useState();
  function handleSubmit(event) {
    const { name, itemsList } = {
      name: user.isLoggedIn + projectName,
      itemsList: [],
    };
    fetch("/db/projects", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, itemsList }),
    })
      .then((res) => res.json())
      .then((res) => {
        if (!res.success) alert(res.error);
        else alert("Account created ! \nYour token is " + res.token);
      });

    console.log("oui");
  }
  return (
    <form className="Save" onSubmit={handleSubmit}>
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
  const projects = [
    1,
    2,
    3,
    "ceciest un projet",
    "c'est encore un projet aaaaaaaaa",
  ];
  const listProjects = projects.map((project) => {
    return <li>{project}</li>;
  });
  return (
    <>
      <h1>Load project</h1>
      <ul>{listProjects}</ul>
    </>
  );
}

function ButtonProject({ project }) {
  return <button>{project}</button>;
}

export default function Projects() {
  const user = useContext(UserContext);
  if (user.isLoggedIn) {
    return (
      <>
        <SaveProject />
        <LoadProject />
      </>
    );
  }
  return <></>;
}
