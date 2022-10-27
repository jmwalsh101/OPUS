import { useEffect, useState } from "react";
import "./style.css";
import "../style.css";
import Sidebar from "./Sidebar";
import DocCreator from "./DocCreator";

import {
  backendDocumentsContext,
  usedComponentsContext,
  documentTitleContext,
} from "../../contexts/DocumentContext";

import BackendErrorModal from "../modals/BackendErrorModal";

function DCIndex() {
  const [documentsFromBackend, setDocumentsFromBackend] = useState([]);
  const [usedComponents, setUsedComponents] = useState([]);
  const [docTitle, setDocTitle] = useState("");

  const [backendErrorModal, setBackendErrorModal] = useState(false);

  useEffect(() => {
    fetch("/documents-load")
      .then((response) => response.json())
      .then((data) => {
        setDocumentsFromBackend(data);
      })
      .catch((error) => {
        setTimeout(() => setBackendErrorModal(true), 3000);
      });
  }, [documentsFromBackend]);

  return (
    <>
      <documentTitleContext.Provider value={{ docTitle, setDocTitle }}>
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
              {backendErrorModal ? <BackendErrorModal /> : null}
            </div>
          </backendDocumentsContext.Provider>
        </usedComponentsContext.Provider>
      </documentTitleContext.Provider>
    </>
  );
}

export default DCIndex;
