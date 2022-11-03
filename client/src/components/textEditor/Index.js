import ComponenetSidebar from "./ComponentSidebar";
import TextEditor from "./TextEditor";
import { useState, useEffect, useContext } from "react";

import { backendComponentsContext } from "../../contexts/ComponentContext";
import { componentIdContext } from "../../contexts/ComponentContext";

function Index() {
  const [componentsFromBackend, setComponentsFromBackend] = useState([]);
  const { backendComponentId, setBackendComponentId } =
    useContext(componentIdContext);

  useEffect(() => {
    fetch("/component-load")
      .then((response) => response.json())
      .then((data) => {
        setComponentsFromBackend(data);
      }) // fail error modal here
      .catch((error) => console.log("ERROR"));
  }, [componentsFromBackend]);

  console.log(backendComponentId);

  return (
    <backendComponentsContext.Provider
      value={{ componentsFromBackend, setComponentsFromBackend }}
    >
      <div className="main-container">
        <div className="sidebar">
          <ComponenetSidebar />
        </div>
        <div className="main-editor">
          <TextEditor />
        </div>
      </div>
    </backendComponentsContext.Provider>
  );
}

export default Index;
