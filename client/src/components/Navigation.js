import React from "react";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Home";
import TextEditor from "./TextEditor";

function Navigation() {
  return (
    <>
      <a className="nav-link" href="http://localhost:3000/">
        Home
      </a>
      <a className="nav-link" href="http://localhost:3000/text-editor">
        Text Editor
      </a>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/text-editor" element={<TextEditor />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}
export default Navigation;
