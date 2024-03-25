import { useState } from "react";
import "./LoginScreen.css";
import Accounts from "./Accounts.js"

function Login({ switchMethod, display }) {
  const [username, setUserName] = useState();
  const [password, setPassword] = useState();
  function handleSubmit(event) {
    event.preventDefault();
    if (password) {
      alert(password);
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
          <label>Password</label>
          <input
            type="password"
            placeholder="Enter your password"
            onChange={(e) => setPassword(e.target.value)}
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
  const [password, setPassword] = useState();
  const [passwordConfirm, setPasswordConfirm] = useState();

  function handleSubmit(event) {
    event.preventDefault();
    if (password && password === passwordConfirm) {
      
      alert(password);
      const { account, mdp } = { account: username, mdp: password};
      console.log(password)
      console.log({ account, mdp })
      fetch('/api/comments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ account, mdp }),
      }).then(res => res.json()).then((res) => {
        if (!res.success) console.log({ error: res.error.message || res.error });
        else console.log({ account: '', mdp: '', error: null });
      });;
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
          <label>Password</label>
          <input
            type="password"
            placeholder="Enter your password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="Form-Item">
          <label>Confirm your password</label>
          <input
            type="password"
            placeholder="Confirm your password"
            onChange={(e) => setPasswordConfirm(e.target.value)}
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
    <div>
      <Login display={display[0]} switchMethod={switchMethod} />
      <Signup display={display[1]} switchMethod={switchMethod} />
      <Accounts/>
    </div>
  );
}
