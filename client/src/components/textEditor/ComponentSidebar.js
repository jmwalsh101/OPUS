import { useState, useContext } from "react";
import _ from "lodash";

import LoadingModal from "../modals/LoadingModal";
import ConfirmModal from "../modals/ConfirmModal";
import SuccessModal from "../modals/SuccessModal";

import { backendComponentsContext } from "../../contexts/componentContext";
import { componentIdContext } from "../../contexts/componentContext";

function ComponenetSidebar() {
  const { componentsFromBackend, setComponentsFromBackend } = useContext(
    backendComponentsContext
  );

  const { backendComponentId, setBackendComponentId } =
    useContext(componentIdContext);

  const [loadingModal, setShowLoading] = useState(false);
  const [confirmModal, setConfirmModal] = useState(false);
  const [successModal, showSuccessModal] = useState(false);

  const [deleteItem, setDeleteItem] = useState();
  const [deleteName, setDeleteName] = useState("");
  const [deleteContent, setDeleteContent] = useState();

  function handleConfirmModalClose() {
    setConfirmModal(false);
    setShowLoading(true);

    fetch("/component-delete", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ parcel: deleteItem }),
    })
      .then((response) => {
        response.json();
        setShowLoading(false);
        if (response.ok) {
          showSuccessModal(true);
          setTimeout(() => showSuccessModal(false), 1000);
        }
        //else for modal
      })

      // fail error modal here
      .catch((error) => console.log("ERROR"));
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

  function handleSelect(e) {
    e.preventDefault();
    setBackendComponentId(e.target.value);
  }

  return (
    <>
      <div>
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
                <button onClick={handleSelect} value={q.id}>
                  Select
                </button>
              </div>
            </>
          );
        })}
      </div>
      <div>
        {loadingModal ? (
          <>
            <LoadingModal />
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
        {successModal ? <SuccessModal message="Component deleted!" /> : null}
      </div>
    </>
  );
}

export default ComponenetSidebar;
