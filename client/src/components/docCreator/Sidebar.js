import { useContext } from "react";
import _ from "lodash";

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
        setUsedComponents(component);
        setDocTitle(title);
      })

      // fail error modal here
      .catch((error) => console.log("ERROR"));
  }

  return (
    <>
      {documentsFromBackend.map(function (q, index) {
        return (
          <>
            <div key={index}>
              <p>{q.title}</p>
              <button onClick={handleSelect} value={q.content} title={q.title}>
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
