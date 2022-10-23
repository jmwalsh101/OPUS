import React from "react";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import DocCreator from "./DocCreator";
import Home from "./Home";
import Index from "./textEditor/Index";
import Pricing from "./Pricing";

import "./style.css";

function Navigation() {
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
        <a className="nav-link" href="http://localhost:3000/pricing">
          Pricing
        </a>
      </div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/text-editor" element={<Index />} />
          <Route path="/doc-creator" element={<DocCreator />} />
          <Route path="/pricing" element={<Pricing />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}
export default Navigation;
