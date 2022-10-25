import { useState, useContext } from "react";
import _ from "lodash";

import LoadingModal from "../modals/LoadingModal";
import ConfirmModal from "../modals/ConfirmModal";
import SuccessModal from "../modals/SuccessModal";

import { backendComponentsContext } from "../../constants/componentContext";

function ComponenetSidebar() {
  const { componentsFromBackend, setComponentsFromBackend } = useContext(
    backendComponentsContext
  );

  const [loadingModal, setShowLoading] = useState(false);
  const [confirmModal, setConfirmModal] = useState(false);
  const [successModal, showSuccessModal] = useState(false);

  const [deleteItem, setDeleteItem] = useState();
  const [deleteName, setDeleteName] = useState("");
  const [deleteContent, setDeleteContent] = useState();

  const handleClose = () => setShowLoading(false);

  function handleConfirmModalClose() {
    const oldBackendData = componentsFromBackend;
    fetch("/component-delete", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ parcel: deleteItem }),

      // I need to somehow include the response here.
    });

    if (_.difference(oldBackendData, componentsFromBackend) === []) {
      setShowLoading(true);
    }
    setConfirmModal(false);

    // addition to try and show success modal -- a response from backend is required

    if (_.difference(componentsFromBackend, oldBackendData) !== []) {
      showSuccessModal(true);
      setTimeout(() => showSuccessModal(false), 1000);
    }
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

  return (
    <>
      {componentsFromBackend.map(function (q, index) {
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
              {successModal ? (
                <SuccessModal message="Component deleted!" />
              ) : null}
            </div>
          </>
        );
      })}
    </>
  );
}

export default ComponenetSidebar;
