import { useState, useEffect } from "react";
import _ from "lodash";

import LoadingModal from "./LoadingModal";

function ComponenetSidebar() {
  const [backendData, setBackendData] = useState([]);
  const [loadingModal, setShowLoading] = useState(false);

  const handleClose = () => setShowLoading(false);

  function handleDelete(e) {
    e.preventDefault();
    const oldBackendData = backendData;

    fetch("/component-delete", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ parcel: e.target.value }),
    });

    if (_.difference(oldBackendData, backendData) === []) {
      setShowLoading(true);
    }
  }

  useEffect(() => {
    fetch("/component-load")
      .then((response) => response.json())
      .then((data) => {
        setBackendData(data);
      });
  }, [backendData]);

  return (
    <>
      {backendData.map(function (q, index) {
        return (
          <>
            <div key={index}>
              <p>{q.name}</p>
              <button onClick={handleDelete} value={q.id}>
                Delete
              </button>
              {loadingModal ? (
                <>
                  <LoadingModal show={loadingModal} onClose={handleClose} />
                </>
              ) : null}
            </div>
          </>
        );
      })}
    </>
  );
}

export default ComponenetSidebar;
