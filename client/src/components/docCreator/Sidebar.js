import { useContext, useState } from "react";
import _ from "lodash";

import {
  backendDocumentsContext,
  usedComponentsContext,
} from "../../contexts/documentContext";

function Sidebar() {
  const { documentsFromBackend, setDocumentsFromBackend } = useContext(
    backendDocumentsContext
  );

  const { usedComponents, setUsedComponents } = useContext(
    usedComponentsContext
  );

  // console.log(_.map(documentsFromBackend, "content"));

  function handleSelect(e) {
    e.preventDefault();
    const componentIds = e.target.value.split(",");

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
        setUsedComponents(component);
      })

      // fail error modal here
      .catch((error) => console.log("ERROR"));

    //console.log(component);
  }

  return (
    <>
      {documentsFromBackend.map(function (q, index) {
        return (
          <>
            <div key={index}>
              <p>{q.title}</p>
              <button onClick={handleSelect} value={q.content}>
                Select
              </button>
            </div>
          </>
        );
      })}
    </>
  );
}

export default Sidebar;
