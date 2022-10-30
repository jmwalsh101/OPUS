import { useContext, useState } from "react";
import _ from "lodash";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRightToBracket } from "@fortawesome/free-solid-svg-icons";

import {
  backendDocumentsContext,
  documentTitleContext,
  usedComponentsContext,
  documentAuthorContext,
  documentCreatedDateContext,
  documentUpdaterContext,
  documentLastUpdatedContext,
} from "../../contexts/DocumentContext";

function Sidebar() {
  const { documentsFromBackend, setDocumentsFromBackend } = useContext(
    backendDocumentsContext
  );

  const { usedComponents, setUsedComponents } = useContext(
    usedComponentsContext
  );

  const { docTitle, setDocTitle } = useContext(documentTitleContext);

  const { author, setAuthor } = useContext(documentAuthorContext);
  const { createDate, setCreateDate } = useContext(documentCreatedDateContext);
  const { updater, setUpdater } = useContext(documentUpdaterContext);
  const { lastUpdated, setLastUpdated } = useContext(
    documentLastUpdatedContext
  );

  function handleSelect(e) {
    setLastUpdated();
    setUpdater();
    e.preventDefault();
    console.log("target", Object.values({ ...e.target }));
    let item = Object.values({ ...e.target });
    let selectedItem = item[1];
    console.log("target", selectedItem.lastUpdated);
    const title = selectedItem.title;
    const docAuthor = selectedItem.author;
    const docCreated = selectedItem.createDate;
    let docUpdater = selectedItem.updater;
    let docLastUpdated = selectedItem.lastUpdated;
    const componentIds = selectedItem.content;

    console.log("SI", selectedItem);

    if (docUpdater === undefined || docUpdater === null) {
      docUpdater = "";
    }

    if (docLastUpdated === undefined || docLastUpdated === null) {
      docLastUpdated = "";
    }

    fetch("/component-load")
      .then((response) => response.json())
      .then((data) => {
        const fetchedComponents = data;
        let component = [];

        for (const i of componentIds) {
          const id = parseInt(i);
          const item = _.find(fetchedComponents, { id: id });
          component.push(item);
        }
        if (component[0] !== undefined) {
          setUsedComponents(component);
        } else {
          setUsedComponents([]);
        }
        setDocTitle(title);
        setAuthor(docAuthor);
        setCreateDate(docCreated);
        setUpdater(docUpdater);
        setLastUpdated(docLastUpdated);
        console.log("ld", docUpdater);
      })
      // fail error modal here
      .catch((error) => console.log("ERROR"));
  }

  return (
    <>
      <h3>Quick Access</h3>
      {documentsFromBackend.map(function (q, index) {
        return (
          <>
            <div key={index} className="sidebar-item">
              <p>{q.title}</p>
              <span>
                <button
                  onClick={handleSelect}
                  title={q.title}
                  author={q.author}
                  content={q.content}
                  createDate={q.created}
                  updater={q.updater}
                  lastUpdated={q.updated}
                >
                  S<FontAwesomeIcon icon={faArrowRightToBracket} />
                </button>
              </span>
            </div>
            <div></div>
          </>
        );
      })}
    </>
  );
}

export default Sidebar;
