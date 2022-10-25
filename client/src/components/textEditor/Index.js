import "./style.css";
import ComponenetSidebar from "./ComponentSidebar";
import TextEditor from "./TextEditor";
import { useContext, useState, useEffect } from "react";

import { backendComponentsContext } from "../../constants/componentContext";

function Index() {
  const [componentsFromBackend, setComponentsFromBackend] = useState([]);

  useEffect(() => {
    fetch("/component-load")
      .then((response) => response.json())
      .then((data) => {
        setComponentsFromBackend(data);
      });
  }, [componentsFromBackend]);

  return (
    <backendComponentsContext.Provider
      value={{ componentsFromBackend, setComponentsFromBackend }}
    >
      <div className="main-container">
        <div className="sidebar">
          <ComponenetSidebar />
        </div>
        <div className="main-text-editor">
          <div className="text-editor">
            <TextEditor />
          </div>
        </div>
      </div>
    </backendComponentsContext.Provider>
  );
}

export default Index;
