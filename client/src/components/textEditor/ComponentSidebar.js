import { useState, useContext } from "react";
import _ from "lodash";

import LoadingModal from "../modals/LoadingModal";
import SuccessModal from "../modals/SuccessModal";

import { backendComponentsContext } from "../../contexts/ComponentContext";
import { componentIdContext } from "../../contexts/ComponentContext";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRightToBracket } from "@fortawesome/free-solid-svg-icons";

function ComponenetSidebar() {
  const { componentsFromBackend, setComponentsFromBackend } = useContext(
    backendComponentsContext
  );

  const { backendComponentId, setBackendComponentId } =
    useContext(componentIdContext);

  const [loadingModal, setShowLoading] = useState(false);
  const [successModal, showSuccessModal] = useState(false);

  const category1 = _.filter(componentsFromBackend, {
    category: "volvo",
  });
  const category2 = _.filter(componentsFromBackend, {
    category: "saab",
  });
  const category3 = _.filter(componentsFromBackend, {
    category: "mercedes",
  });
  const category4 = _.filter(componentsFromBackend, {
    category: "audi",
  });

  const [showCategory1, setShowCategory1] = useState(false);
  const [showCategory2, setShowCategory2] = useState(false);
  const [showCategory3, setShowCategory3] = useState(false);
  const [showCategory4, setShowCategory4] = useState(false);

  function handleSelect(e) {
    e.preventDefault();
    setBackendComponentId(e.target.value);
  }

  return (
    <>
      <div className="sidebar-categories">
        <h3>Quick Access</h3>
        <div
          className="sidebar-category"
          id="cy-select"
          onClick={(e) => {
            if (showCategory1 === false) {
              setShowCategory1(true);
            } else {
              setShowCategory1(false);
            }
            e.currentTarget.classList.toggle("sidebar-category");
            e.currentTarget.classList.toggle("sidebar-category-active");
          }}
        >
          Volvo
        </div>
        <div className="sidebar-items">
          {showCategory1
            ? category1.map(function (l, index) {
                return (
                  <>
                    <div key={index} className="sidebar-item">
                      <p>{l.name}</p>
                      <p>{l.category}</p>
                      <button onClick={handleSelect} value={l.id}>
                        <FontAwesomeIcon
                          icon={faArrowRightToBracket}
                          style={{ pointerEvents: "none" }}
                        />
                      </button>
                    </div>
                  </>
                );
              })
            : null}
        </div>

        <div
          className="sidebar-category"
          onClick={(e) => {
            if (showCategory2 === false) {
              setShowCategory2(true);
            } else {
              setShowCategory2(false);
            }
            e.currentTarget.classList.toggle("sidebar-category");
            e.currentTarget.classList.toggle("sidebar-category-active");
          }}
        >
          Saab
        </div>
        <div className="sidebar-items">
          {showCategory2
            ? category2.map(function (l, index) {
                return (
                  <>
                    <div key={index} className="sidebar-item">
                      <p>{l.name}</p>
                      <p>{l.category}</p>
                      <button onClick={handleSelect} value={l.id}>
                        <FontAwesomeIcon
                          icon={faArrowRightToBracket}
                          style={{ pointerEvents: "none" }}
                        />
                      </button>
                    </div>
                  </>
                );
              })
            : null}
        </div>

        <div
          className="sidebar-category"
          onClick={(e) => {
            if (showCategory3 === false) {
              setShowCategory3(true);
            } else {
              setShowCategory3(false);
            }
            e.currentTarget.classList.toggle("sidebar-category");
            e.currentTarget.classList.toggle("sidebar-category-active");
          }}
        >
          Mercedes
        </div>
        <div className="sidebar-items">
          {showCategory3
            ? category3.map(function (l, index) {
                return (
                  <>
                    <div key={index} className="sidebar-item">
                      <p>{l.name}</p>
                      <p>{l.category}</p>
                      <button onClick={handleSelect} value={l.id}>
                        <FontAwesomeIcon
                          icon={faArrowRightToBracket}
                          style={{ pointerEvents: "none" }}
                        />
                      </button>
                    </div>
                  </>
                );
              })
            : null}
        </div>

        <div
          className="sidebar-category"
          onClick={(e) => {
            if (showCategory4 === false) {
              setShowCategory4(true);
            } else {
              setShowCategory4(false);
            }
            e.currentTarget.classList.toggle("sidebar-category");
            e.currentTarget.classList.toggle("sidebar-category-active");
          }}
        >
          Audi
        </div>
        <div className="sidebar-items">
          {showCategory4
            ? category4.map(function (l, index) {
                return (
                  <>
                    <div key={index} className="sidebar-item">
                      <p>{l.name}</p>
                      <p>{l.category}</p>
                      <button onClick={handleSelect} value={l.id}>
                        <FontAwesomeIcon
                          icon={faArrowRightToBracket}
                          style={{ pointerEvents: "none" }}
                        />
                      </button>
                    </div>
                  </>
                );
              })
            : null}
        </div>
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
