import { loginContext } from "../../contexts/LoginContext";
import { activePageContext } from "../../contexts/Navigation";

import { useContext } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import Logo from "../../images/web-icon2.png";

function LoggedIn(props) {
  const { loggedIn, setLoggedIn } = useContext(loginContext);
  const { activePage, setActivePage } = useContext(activePageContext);

  const activeAccount = JSON.parse(sessionStorage.getItem("username"));
  return (
    <>
      <div className="navbar-container">
        <a
          className={` ${activePage === "home" ? "logo" : "logo"}`}
          href="http://localhost:3000/"
          onClick={() => sessionStorage.setItem("activePage", "home")}
        >
          <img src={Logo} height="20px" width="20px" />
          &nbsp;OPUS
        </a>
        <div className="navbar-left">
          <a
            className={` ${
              activePage === "documents" ? "active-link" : "nav-link"
            }`}
            href="http://localhost:3000/documents"
            onClick={() => sessionStorage.setItem("activePage", "documents")}
          >
            Documents
          </a>
          <a
            className={` ${
              activePage === "texts" ? "active-link" : "nav-link"
            }`}
            href="http://localhost:3000/texts"
            onClick={() => sessionStorage.setItem("activePage", "texts")}
          >
            Texts
          </a>
          <a
            className={` ${
              activePage === "editor" ? "active-link" : "nav-link"
            }`}
            href="http://localhost:3000/text-editor"
            onClick={() => sessionStorage.setItem("activePage", "editor")}
          >
            Editor
          </a>
          <a
            className={` ${
              activePage === "manager" ? "active-link" : "nav-link"
            }`}
            href="http://localhost:3000/doc-creator"
            onClick={() => sessionStorage.setItem("activePage", "manager")}
          >
            Manager
          </a>
        </div>
        <div className="navbar-right">
          <a className="nav-link" onClick={props.logout}>
            Log Out
          </a>
          <a
            className={` ${
              activePage === "account" ? "active-link" : "nav-link"
            }`}
            href="http://localhost:3000/account"
            onClick={() => sessionStorage.setItem("activePage", "account")}
          >
            <FontAwesomeIcon icon={faUser} />
            &nbsp;&nbsp;
            {activeAccount.registerUsername}
          </a>
        </div>
      </div>
    </>
  );
}

export default LoggedIn;
