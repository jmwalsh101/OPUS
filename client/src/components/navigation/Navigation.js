import { useEffect, useState } from "react";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "../Home";
import Index from "../textEditor/Index";
import DCIndex from "../docCreator/DCIndex";
import Pricing from "../Pricing";
import LogIn from "../login/Login";
import LogOut from "../login/LogOut";

import LoggedIn from "./LoggedIn";

import "../style.css";

import { loginContext } from "../../contexts/LoginContext";
import NotLoggedIn from "./NotLoggedIn";
import Register from "../login/Register";

function Navigation() {
  const [loggedIn, setLoggedIn] = useState();

  useEffect(() => {
    fetch("/account-status")
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        if (data) {
          setLoggedIn(true);
        } else {
          setLoggedIn(false);
        }
      }) // fail error modal here
      .catch((error) => console.log("ERROR"));
  });

  return (
    <loginContext.Provider value={{ loggedIn, setLoggedIn }}>
      {loggedIn ? <LoggedIn /> : <NotLoggedIn />}
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/text-editor" element={<Index />} />
          <Route path="/doc-creator" element={<DCIndex />} />
          <Route path="/pricing" element={<Pricing />} />
          <Route path="/login" element={<LogIn />} />
          <Route path="/logout" element={<LogOut />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </BrowserRouter>
    </loginContext.Provider>
  );
}
export default Navigation;
