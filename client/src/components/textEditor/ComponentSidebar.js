import { useState, useEffect } from "react";
import _ from "lodash";

import LoadingModal from "../modals/LoadingModal";
import ConfirmModal from "../modals/ConfirmModal";

function ComponenetSidebar() {
  const [backendData, setBackendData] = useState([]);
  const [loadingModal, setShowLoading] = useState(false);
  const [confirmModal, setConfirmModal] = useState(false);

  const [deleteItem, setDeleteItem] = useState();
  const [deleteName, setDeleteName] = useState("");
  const [deleteContent, setDeleteContent] = useState();

  const handleClose = () => setShowLoading(false);

  function handleConfirmModalClose() {
    const oldBackendData = backendData;
    fetch("/component-delete", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ parcel: deleteItem }),
    });

    if (_.difference(oldBackendData, backendData) === []) {
      setShowLoading(true);
    }
    setConfirmModal(false);
  }

  function handleCancel() {
    setConfirmModal(false);
  }

  function handleDelete(e) {
    e.preventDefault();
    setDeleteItem(e.target.value);
    setConfirmModal(true);
    setDeleteContent(e.target.content);
    setDeleteName(e.target.name);
    console.log(e.target.content);
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
              <button
                onClick={handleDelete}
                value={q.id}
                name={q.name}
                content={q.content}
              >
                Delete
              </button>
              {loadingModal ? (
                <>
                  <LoadingModal show={loadingModal} onClose={handleClose} />
                </>
              ) : null}
              {confirmModal ? (
                <>
                  <ConfirmModal
                    show={confirmModal}
                    onClose={handleConfirmModalClose}
                    name={deleteName}
                    content={deleteContent}
                    cancel={handleCancel}
                  />
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
