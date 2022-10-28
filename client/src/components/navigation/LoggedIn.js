import { loginContext } from "../../contexts/LoginContext";
import { useContext } from "react";

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
        <a className=" logo" href="http://localhost:3000/">
          OPUS
        </a>
        <a className="nav-link" href="http://localhost:3000/text-editor">
          Text Editor
        </a>
        <a className="nav-link" href="http://localhost:3000/doc-creator">
          Document Creator
        </a>
        <a className="nav-link" onClick={logout}>
          Log Out
        </a>
        <a className="nav-link" href="http://localhost:3000/account">
          {activeAccount.registerUsername}
        </a>
      </div>
    </>
  );
}

export default LoggedIn;
