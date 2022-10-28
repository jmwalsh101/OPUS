import { loginContext } from "../../contexts/LoginContext";
import { useContext } from "react";

function LoggedIn() {
  const { loggedIn, setLoggedIn } = useContext(loginContext);

  const activeAccount = JSON.parse(sessionStorage.getItem("username"));
  console.log(activeAccount.registerUsername);
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
        <a className="nav-link">{activeAccount.registerUsername}</a>
      </div>
    </>
  );
}

export default LoggedIn;
