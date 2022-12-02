import { useEffect, useState } from "react";

import Sidebar from "./Sidebar";
import DocCreator from "./DocCreator";

import {
  backendDocumentsContext,
  usedComponentsContext,
  documentTitleContext,
  documentAuthorContext,
  documentCreatedDateContext,
  documentLastUpdatedContext,
  documentUpdaterContext,
  documentCategoryContext,
} from "../../contexts/DocumentContext";

import BackendErrorModal from "../modals/BackendErrorModal";

import { timestamp } from "../constants/TimeStamp";

function DCIndex() {
  const [documentsFromBackend, setDocumentsFromBackend] = useState([]);
  const [usedComponents, setUsedComponents] = useState([]);
  const [docTitle, setDocTitle] = useState("");
  const [author, setAuthor] = useState(
    JSON.parse(sessionStorage.getItem("username")).registerUsername
  );
  const [createDate, setCreateDate] = useState(timestamp);
  const [updater, setUpdater] = useState(null);
  const [lastUpdated, setLastUpdated] = useState(null);

  const [backendErrorModal, setBackendErrorModal] = useState(false);

  const [optionState, setOptionState] = useState("Volvo");

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
      <documentCategoryContext.Provider value={{ optionState, setOptionState }}>
        <documentLastUpdatedContext.Provider
          value={{ lastUpdated, setLastUpdated }}
        >
          <documentCreatedDateContext.Provider
            value={{ createDate, setCreateDate }}
          >
            <documentAuthorContext.Provider value={{ author, setAuthor }}>
              <documentUpdaterContext.Provider value={{ updater, setUpdater }}>
                <documentTitleContext.Provider
                  value={{ docTitle, setDocTitle }}
                >
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
                        <div className="main-editor">
                          <DocCreator />
                        </div>
                        {backendErrorModal ? <BackendErrorModal /> : null}
                      </div>
                    </backendDocumentsContext.Provider>
                  </usedComponentsContext.Provider>
                </documentTitleContext.Provider>
              </documentUpdaterContext.Provider>
            </documentAuthorContext.Provider>
          </documentCreatedDateContext.Provider>
        </documentLastUpdatedContext.Provider>
      </documentCategoryContext.Provider>
    </>
  );
}

export default DCIndex;
