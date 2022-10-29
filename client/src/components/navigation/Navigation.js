import { useState } from "react";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "../home/Home";
import Index from "../textEditor/Index";
import DCIndex from "../docCreator/DCIndex";
import Pricing from "../pricing/Pricing";
import LogIn from "../login/Login";

import LoggedIn from "./LoggedIn";

import { loginContext } from "../../contexts/LoginContext";
import NotLoggedIn from "./NotLoggedIn";
import Register from "../login/Register";
import Account from "../account/Account";

function Navigation() {
  const [loggedIn, setLoggedIn] = useState(sessionStorage.getItem("username"));

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
          <Route path="/register" element={<Register />} />
          <Route path="/account" element={<Account />} />
        </Routes>
      </BrowserRouter>
    </loginContext.Provider>
  );
}
export default Navigation;
