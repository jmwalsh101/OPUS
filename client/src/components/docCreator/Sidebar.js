import { useContext } from "react";
import _ from "lodash";

import { backendDocumentsContext } from "../../contexts/documentContext";

function Sidebar() {
  const { documentsFromBackend, setDocumentsFromBackend } = useContext(
    backendDocumentsContext
  );

  console.log(_.map(documentsFromBackend, "content"));

  return (
    <>
      {documentsFromBackend.map(function (q, index) {
        return (
          <>
            <div key={index}>
              <p>{q.title}</p>
            </div>
          </>
        );
      })}
    </>
  );
}

export default Sidebar;
