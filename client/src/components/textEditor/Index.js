import ComponenetSidebar from "./ComponentSidebar";
import TextEditor from "./TextEditor";
import { useState, useEffect, useContext } from "react";

import { backendComponentsContext } from "../../contexts/ComponentContext";
import {
  componentIdContext,
  componentCategoryContext,
} from "../../contexts/ComponentContext";

function Index() {
  const [componentsFromBackend, setComponentsFromBackend] = useState([]);
  const { backendComponentId } = useContext(componentIdContext);

  const [optionState, setOptionState] = useState("Intro");

  useEffect(() => {
    fetch("/component-load")
      .then((response) => response.json())
      .then((data) => {
        setComponentsFromBackend(data);
      }) // fail error modal here
      .catch((error) => console.log("ERROR"));
  }, [componentsFromBackend]);

  useEffect(() => {
    fetch("/component-load")
      .then((response) => response.json())
      .then((data) => {
        setComponentsFromBackend(data);
      }) // fail error modal here
      .catch((error) => console.log("ERROR"));
  }, [backendComponentId]);

  console.log(backendComponentId);

  return (
    <componentCategoryContext.Provider value={{ optionState, setOptionState }}>
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
    </componentCategoryContext.Provider>
  );
}

export default Index;
