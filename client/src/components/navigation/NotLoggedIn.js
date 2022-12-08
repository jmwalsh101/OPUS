import { loginContext } from "../../contexts/LoginContext";
import { activePageContext } from "../../contexts/Navigation";
import { useContext } from "react";

function NotLoggedIn() {
  const { loggedIn, setLoggedIn } = useContext(loginContext);
  const { activePage, setActivePage } = useContext(activePageContext);

  return (
    <>
      <div className="navbar-container">
        <a
          className={` ${activePage === "home" ? "logo" : "logo"}`}
          href="http://54.234.44.9:3000/"
          onClick={() => sessionStorage.setItem("activePage", "home")}
        >
          OPUS
        </a>
        <div className="navbar-left">
          <a
            className={` ${
              activePage === "pricing" ? "active-link" : "nav-link"
            }`}
            href="http://54.234.44.9:3000/pricing"
            onClick={() => sessionStorage.setItem("activePage", "pricing")}
          >
            Pricing
          </a>
          <a
            className={` ${
              activePage === "example" ? "active-link" : "nav-link"
            }`}
            href="http://54.234.44.9:3000/example"
            onClick={() => sessionStorage.setItem("activePage", "example")}
          >
            Example
          </a>
        </div>
        <div className="navbar-right">
          <a
            className={` ${
              activePage === "login" ? "active-link" : "nav-link"
            }`}
            href="http://54.234.44.9:3000/login"
            onClick={() => sessionStorage.setItem("activePage", "login")}
          >
            Login
          </a>
          <a
            className={` ${
              activePage === "register" ? "active-link" : "nav-link"
            }`}
            href="http://54.234.44.9:3000/register"
            onClick={() => sessionStorage.setItem("activePage", "register")}
          >
            Sign Up
          </a>
        </div>
      </div>
    </>
  );
}

export default NotLoggedIn;
