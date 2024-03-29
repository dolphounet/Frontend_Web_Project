import { useState, useContext } from "react";
import "./LoginScreen.css";
import { FaUser } from "react-icons/fa6";
import { UserContext } from "./Menu";

function Login({ switchMethod, display }) {
  const user = useContext(UserContext);
  const [username, setUserName] = useState();
  const [token, setToken] = useState();
  function handleSubmit(event) {
    event.preventDefault();
    if (token || username) {
      const { account, mdp } = { account: username, mdp: token };
      fetch("/db/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ account, mdp }),
      })
        .then((res) => res.json())
        .then((res) => {
          if (!res.success) alert(res.error);
          else {
            user.setIsLoggedIn(username);
          }
        });
    }
  }
  return (
    <div className="Login-Screen" style={{ display: display }}>
      <h1>Login</h1>
      <form className="Login-Form" onSubmit={handleSubmit}>
        <div className="Form-Item">
          <label>Username</label>
          <input
            type="text"
            placeholder="Enter your username"
            onChange={(e) => setUserName(e.target.value)}
          />
        </div>
        <div className="Form-Item">
          <label>Token</label>
          <input
            type="password"
            placeholder="Enter your token"
            onChange={(e) => setToken(e.target.value)}
          />
        </div>
        <div className="Form-Item">
          <input type="submit" value="Log in" />
        </div>
      </form>
      <p>
        <label>No account ?</label>
        <button onClick={switchMethod}>create one.</button>
      </p>
    </div>
  );
}

function Signup({ switchMethod, display }) {
  const [username, setUserName] = useState();
  const [mail, setMail] = useState();

  function handleSubmit(event) {
    event.preventDefault();
    if (mail) {
      const { account, email } = { account: username, email: mail };
      fetch("/db/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ account, email }),
      })
        .then((res) => res.json())
        .then((res) => {
          if (!res.success) alert(res.error);
          else alert("Account created ! \nYour token is " + res.token);
        });
    }
  }
  return (
    <div className="Login-Screen" style={{ display: display }}>
      <h1>Signup</h1>
      <form className="Form" onSubmit={handleSubmit}>
        <div className="Form-Item">
          <label>Username</label>
          <input
            type="text"
            placeholder="Enter your username"
            onChange={(e) => setUserName(e.target.value)}
          />
        </div>
        <div className="Form-Item">
          <label>Email</label>
          <input
            type="text"
            placeholder="Enter your email"
            onChange={(e) => setMail(e.target.value)}
          />
        </div>
        <div className="Form-Item">
          <input type="submit" value="Sign up" />
        </div>
      </form>
      <p>
        <label>Already has an account ? </label>
        <button onClick={switchMethod}>connect.</button>
      </p>
    </div>
  );
}

export default function LoginScreen() {
  const user = useContext(UserContext);
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
  if (user.isLoggedIn) {
    return (
      <div className="LoggedIn">
        <div className="User-Icon">
          <FaUser />
        </div>
        <span>{user.isLoggedIn}</span>
      </div>
    );
  } else
    return (
      <div>
        <Login display={display[0]} switchMethod={switchMethod} />
        <Signup display={display[1]} switchMethod={switchMethod} />
      </div>
    );
}
