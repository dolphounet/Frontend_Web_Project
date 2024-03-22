import { useState } from "react";
import "./LoginScreen.css";

export default function LoginScreen() {
  const [username, setUserName] = useState();
  const [password, setPassword] = useState();
  function handleSubmit(event) {
    event.preventDefault();
    alert(password);
  }
  return (
    <div className="Login-Screen">
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
    </div>
  );
}
