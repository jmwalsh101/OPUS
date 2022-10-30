import { loginContext } from "../../contexts/LoginContext";
import { useContext } from "react";

function NotLoggedIn() {
  const { loggedIn, setLoggedIn } = useContext(loginContext);

  return (
    <>
      <div className="navbar-container">
        <a className="nav-link" href="http://localhost:3000/">
          OPUS
        </a>
        <a className="nav-link" href="http://localhost:3000/pricing">
          Pricing
        </a>
        <a className="nav-link" href="http://localhost:3000/login">
          Login
        </a>
        <a className="nav-link" href="http://localhost:3000/register">
          Sign Up
        </a>
      </div>
    </>
  );
}

export default NotLoggedIn;
