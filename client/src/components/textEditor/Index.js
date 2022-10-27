import "./style.css";
import ComponenetSidebar from "./ComponentSidebar";
import TextEditor from "./TextEditor";
import { useState, useEffect } from "react";

import { backendComponentsContext } from "../../contexts/ComponentContext";
import { componentIdContext } from "../../contexts/ComponentContext";

function Index() {
  const [componentsFromBackend, setComponentsFromBackend] = useState([]);
  const [backendComponentId, setBackendComponentId] = useState();

  useEffect(() => {
    fetch("/component-load")
      .then((response) => response.json())
      .then((data) => {
        setComponentsFromBackend(data);
      }) // fail error modal here
      .catch((error) => console.log("ERROR"));
  }, [componentsFromBackend]);

  return (
    <componentIdContext.Provider
      value={{ backendComponentId, setBackendComponentId }}
    >
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
    </componentIdContext.Provider>
  );
}

export default Index;
