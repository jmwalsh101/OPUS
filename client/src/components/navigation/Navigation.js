import { useState, useEffect } from "react";

import { Routes, Route, useNavigate } from "react-router-dom";
import Home from "../home/Home";
import Index from "../textEditor/Index";
import DCIndex from "../docCreator/DCIndex";
import Pricing from "../pricing/Pricing";
import LogIn from "../login/Login";

import LoggedIn from "./LoggedIn";

import { loginContext } from "../../contexts/LoginContext";
import { activePageContext } from "../../contexts/Navigation";
import { componentIdContext } from "../../contexts/ComponentContext";

import NotLoggedIn from "./NotLoggedIn";
import Register from "../login/Register";
import Account from "../account/Account";
import Texts from "../texts/Texts";
import Documents from "../documents/Documents";

function Navigation() {
  const [backendComponentId, setBackendComponentId] = useState();
  const [loggedIn, setLoggedIn] = useState(sessionStorage.getItem("username"));
  const [activePage, setActivePage] = useState();

  useEffect(() => {
    setActivePage(sessionStorage.getItem("activePage"));
    console.log("effect ran");
  }, [backendComponentId]);

  const navigate = useNavigate();
  function handleLogout() {
    setLoggedIn(false);
    sessionStorage.clear();
    navigate("/");
  }

  console.log(backendComponentId);

  return (
    <componentIdContext.Provider
      value={{ backendComponentId, setBackendComponentId }}
    >
      <activePageContext.Provider value={{ activePage, setActivePage }}>
        <loginContext.Provider value={{ loggedIn, setLoggedIn }}>
          {loggedIn ? <LoggedIn logout={handleLogout} /> : <NotLoggedIn />}
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/text-editor" element={<Index />} />
            <Route path="/doc-creator" element={<DCIndex />} />
            <Route path="/pricing" element={<Pricing />} />
            <Route path="/login" element={<LogIn />} />
            <Route path="/register" element={<Register />} />
            <Route path="/account" element={<Account />} />
            <Route path="/texts" element={<Texts />} />
            <Route path="/documents" element={<Documents />} />
          </Routes>
        </loginContext.Provider>
      </activePageContext.Provider>
    </componentIdContext.Provider>
  );
}
export default Navigation;
