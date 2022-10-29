import { useContext, useState } from "react";
import _ from "lodash";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRightToBracket } from "@fortawesome/free-solid-svg-icons";

import {
  backendDocumentsContext,
  documentTitleContext,
  usedComponentsContext,
} from "../../contexts/DocumentContext";

function Sidebar() {
  const { documentsFromBackend, setDocumentsFromBackend } = useContext(
    backendDocumentsContext
  );

  const { usedComponents, setUsedComponents } = useContext(
    usedComponentsContext
  );

  const { docTitle, setDocTitle } = useContext(documentTitleContext);

  function handleSelect(e) {
    e.preventDefault();
    const title = e.target.title;
    const componentIds = e.currentTarget.value.split(",");

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
        console.log(component);
        if (component[0] !== undefined) {
          setUsedComponents(component);
        } else {
          setUsedComponents([]);
        }
        setDocTitle(title);
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
                  value={q.content}
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
