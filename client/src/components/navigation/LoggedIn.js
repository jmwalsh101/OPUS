import { loginContext } from "../../contexts/LoginContext";
import { useContext } from "react";

function LoggedIn() {
  const { loggedIn, setLoggedIn } = useContext(loginContext);

  return (
    <>
      <div className="navbar-container">
        <a className="nav-link" href="http://localhost:3000/">
          Home
        </a>
        <a className="nav-link" href="http://localhost:3000/text-editor">
          Text Editor
        </a>
        <a className="nav-link" href="http://localhost:3000/doc-creator">
          Document Creator
        </a>
        <a className="nav-link" href="http://localhost:3000/logout">
          Log Out{" "}
        </a>
      </div>
    </>
  );
}

export default LoggedIn;
