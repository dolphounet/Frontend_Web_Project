import "./LoginScreen.css";

export default function LoginScreen() {
  return (
    <div className="Login-Screen">
      <h1>Login</h1>
      <form className="Login-Form" onSubmit={console.log("certes")}>
        <div className="Form-Item">
          <label>Username</label>
          <input
            type="text"
            name="username"
            placeholder="Enter your username"
          />
        </div>
        <div className="Form-Item">
          <label>Password</label>
          <input
            type="password"
            name="password"
            placeholder="Enter your password"
          />
        </div>
        <div className="Form-Item">
          <input type="submit" name="" value="Log in" />
        </div>
      </form>
    </div>
  );
}
