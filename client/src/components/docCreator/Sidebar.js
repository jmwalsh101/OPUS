import { useContext, useState } from "react";
import _ from "lodash";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRightToBracket } from "@fortawesome/free-solid-svg-icons";

import {
  backendDocumentsContext,
  documentTitleContext,
  usedComponentsContext,
  documentAuthorContext,
  documentCreatedDateContext,
  documentUpdaterContext,
  documentLastUpdatedContext,
} from "../../contexts/DocumentContext";

function Sidebar() {
  const { documentsFromBackend, setDocumentsFromBackend } = useContext(
    backendDocumentsContext
  );

  const { usedComponents, setUsedComponents } = useContext(
    usedComponentsContext
  );

  const { docTitle, setDocTitle } = useContext(documentTitleContext);

  const { author, setAuthor } = useContext(documentAuthorContext);
  const { createDate, setCreateDate } = useContext(documentCreatedDateContext);
  const { updater, setUpdater } = useContext(documentUpdaterContext);
  const { lastUpdated, setLastUpdated } = useContext(
    documentLastUpdatedContext
  );

  // categories

  const category1 = _.filter(documentsFromBackend, {
    category: "volvo",
  });
  const category2 = _.filter(documentsFromBackend, {
    category: "saab",
  });
  const category3 = _.filter(documentsFromBackend, {
    category: "mercedes",
  });
  const category4 = _.filter(documentsFromBackend, {
    category: "audi",
  });

  const [showCategory1, setShowCategory1] = useState(false);
  const [showCategory2, setShowCategory2] = useState(false);
  const [showCategory3, setShowCategory3] = useState(false);
  const [showCategory4, setShowCategory4] = useState(false);

  function handleSelect(e) {
    setLastUpdated();
    setUpdater();
    e.preventDefault();
    console.log("target", Object.values({ ...e.target }));
    let item = Object.values({ ...e.target });
    let selectedItem = item[1];
    console.log("target", selectedItem.lastUpdated);
    const title = selectedItem.title;
    const docAuthor = selectedItem.author;
    const docCreated = selectedItem.createDate;
    let docUpdater = selectedItem.updater;
    let docLastUpdated = selectedItem.lastUpdated;
    const componentIds = selectedItem.content;

    if (docUpdater === undefined || docUpdater === null) {
      docUpdater = "";
    }

    if (docLastUpdated === undefined || docLastUpdated === null) {
      docLastUpdated = "";
    }

    fetch("/component-load")
      .then((response) => response.json())
      .then((data) => {
        const fetchedComponents = data;
        let component = [];

        for (const i of componentIds) {
          const item = _.find(fetchedComponents, { id: i });

          component.push(item);
        }
        if (component[0] !== undefined) {
          setUsedComponents(component);
        } else {
          setUsedComponents([]);
        }
        setDocTitle(title);
        setAuthor(docAuthor);
        setCreateDate(docCreated);
        setUpdater(docUpdater);
        setLastUpdated(docLastUpdated);
      })
      // fail error modal here
      .catch((error) => console.log("ERROR"));
  }

  return (
    <>
      <div className="sidebar-categories">
        <h3>Quick Access</h3>
        <div
          className="sidebar-category"
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
                      <p>{l.title}</p>
                      <p>{l.category}</p>
                      <button
                        onClick={handleSelect}
                        title={l.title}
                        author={l.author}
                        content={l.content}
                        createDate={l.created}
                        updater={l.updater}
                        lastUpdated={l.updated}
                      >
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
                      <p>{l.title}</p>
                      <p>{l.category}</p>
                      <button
                        onClick={handleSelect}
                        title={l.title}
                        author={l.author}
                        content={l.content}
                        createDate={l.created}
                        updater={l.updater}
                        lastUpdated={l.updated}
                      >
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
                      <p>{l.title}</p>
                      <p>{l.category}</p>
                      <button
                        onClick={handleSelect}
                        title={l.title}
                        author={l.author}
                        content={l.content}
                        createDate={l.created}
                        updater={l.updater}
                        lastUpdated={l.updated}
                      >
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
                      <p>{l.title}</p>
                      <p>{l.category}</p>
                      <button
                        onClick={handleSelect}
                        title={l.title}
                        author={l.author}
                        content={l.content}
                        createDate={l.created}
                        updater={l.updater}
                        lastUpdated={l.updated}
                      >
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
    </>
  );
}

export default Sidebar;
