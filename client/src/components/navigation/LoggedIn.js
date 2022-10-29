import { loginContext } from "../../contexts/LoginContext";
import { useContext } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";

function LoggedIn() {
  const { loggedIn, setLoggedIn } = useContext(loginContext);

  function logout() {
    setLoggedIn(false);
    sessionStorage.clear();
  }

  const activeAccount = JSON.parse(sessionStorage.getItem("username"));
  return (
    <>
      <div className="navbar-container">
        <a className="logo" href="http://localhost:3000/">
          OPUS
        </a>
        <a className="nav-link" href="http://localhost:3000/">
          Documents
        </a>
        <a className="nav-link" href="http://localhost:3000/">
          Texts
        </a>
        <a className="nav-link" href="http://localhost:3000/text-editor">
          Editor
        </a>
        <a className="nav-link" href="http://localhost:3000/doc-creator">
          Manager
        </a>
        <a className="nav-link" onClick={logout}>
          Log Out
        </a>
        <a className="nav-link" href="http://localhost:3000/account">
          <FontAwesomeIcon icon={faUser} />
          &nbsp;&nbsp;
          {activeAccount.registerUsername}
        </a>
      </div>
    </>
  );
}

export default LoggedIn;
