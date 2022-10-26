import { useEffect, useState } from "react";
import "./style.css";
import "../style.css";
import Sidebar from "./Sidebar";
import DocCreator from "./DocCreator";

import {
  backendDocumentsContext,
  usedComponentsContext,
} from "../../contexts/documentContext";

function DCIndex() {
  const [documentsFromBackend, setDocumentsFromBackend] = useState([]);
  const [usedComponents, setUsedComponents] = useState([]);

  useEffect(() => {
    fetch("/documents-load")
      .then((response) => response.json())
      .then((data) => {
        setDocumentsFromBackend(data);
      }) // fail error modal here
      .catch((error) => console.log("ERROR"));
  }, [documentsFromBackend]);

  return (
    <>
      <usedComponentsContext.Provider
        value={{ usedComponents, setUsedComponents }}
      >
        <backendDocumentsContext.Provider
          value={{ documentsFromBackend, setDocumentsFromBackend }}
        >
          <div className="main-container">
            <div className="sidebar">
              <Sidebar />
            </div>
            <div className="main-doc-creator">
              <div className="doc-creator">
                <DocCreator />
              </div>
            </div>
          </div>
        </backendDocumentsContext.Provider>
      </usedComponentsContext.Provider>
    </>
  );
}

export default DCIndex;
