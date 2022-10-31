import { useState, useContext } from "react";

import LoadingModal from "../modals/LoadingModal";
import SuccessModal from "../modals/SuccessModal";

import { backendComponentsContext } from "../../contexts/ComponentContext";
import { componentIdContext } from "../../contexts/ComponentContext";

function ComponenetSidebar() {
  const { componentsFromBackend, setComponentsFromBackend } = useContext(
    backendComponentsContext
  );

  const { backendComponentId, setBackendComponentId } =
    useContext(componentIdContext);

  const [loadingModal, setShowLoading] = useState(false);
  const [successModal, showSuccessModal] = useState(false);

  function handleSelect(e) {
    e.preventDefault();
    setBackendComponentId(e.target.value);
  }

  return (
    <>
      <div>
        <h3>Quick Access</h3>
        {componentsFromBackend.map(function (q, index) {
          return (
            <>
              <div key={index} className="sidebar-item">
                <p>{q.name}</p>
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
        {successModal ? <SuccessModal message="Component deleted!" /> : null}
      </div>
    </>
  );
}

export default ComponenetSidebar;
