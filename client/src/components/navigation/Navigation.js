import { useState, useEffect } from "react";

import { Routes, Route, useNavigate } from "react-router-dom";
import Home from "../home/Home";
import Index from "../textEditor/Index";
import DCIndex from "../docCreator/DCIndex";
import Pricing from "../pricing/Pricing";
import LogIn from "../login/Login";

import ConfirmModal from "../modals/ConfirmModal";

import LoggedIn from "./LoggedIn";

import { loginContext } from "../../contexts/LoginContext";
import { activePageContext } from "../../contexts/Navigation";
import { componentIdContext } from "../../contexts/ComponentContext";

import NotLoggedIn from "./NotLoggedIn";
import Register from "../login/Register";
import Account from "../account/Account";
import Texts from "../texts/Texts";
import Documents from "../documents/Documents";
import Example from "../example/Example";

function Navigation() {
  const [backendComponentId, setBackendComponentId] = useState();
  const [loggedIn, setLoggedIn] = useState(sessionStorage.getItem("username"));
  const [activePage, setActivePage] = useState();
  const [logOutModal, setLogOutModal] = useState(false);

  useEffect(() => {
    setActivePage(sessionStorage.getItem("activePage"));
  }, [backendComponentId]);

  const navigate = useNavigate();

  function handleLogoutModal() {
    setLogOutModal(true);
  }

  function handleLogout() {
    setLoggedIn(false);
    sessionStorage.clear();
    navigate("/");
    setLogOutModal(false);
  }

  function handleCancel() {
    setLogOutModal(false);
  }

  console.log(backendComponentId);

  return (
    <>
      <componentIdContext.Provider
        value={{ backendComponentId, setBackendComponentId }}
      >
        <activePageContext.Provider value={{ activePage, setActivePage }}>
          <loginContext.Provider value={{ loggedIn, setLoggedIn }}>
            {loggedIn ? (
              <LoggedIn logout={handleLogoutModal} />
            ) : (
              <NotLoggedIn />
            )}
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
              <Route path="/example" element={<Example />} />
            </Routes>
          </loginContext.Provider>
        </activePageContext.Provider>
      </componentIdContext.Provider>
      <div>
        {logOutModal ? (
          <>
            <ConfirmModal
              show={logOutModal}
              onClose={handleLogout}
              cancel={handleCancel}
              confirmButton="Log Out"
              message={
                <>
                  <p>Logging out will end your session.</p>
                </>
              }
            />
          </>
        ) : null}
      </div>
    </>
  );
}
export default Navigation;
