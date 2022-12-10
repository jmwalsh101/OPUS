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
  documentCategoryContext,
} from "../../contexts/DocumentContext";

function Sidebar() {
  const { documentsFromBackend } = useContext(backendDocumentsContext);

  const { setUsedComponents } = useContext(usedComponentsContext);

  const { setDocTitle } = useContext(documentTitleContext);

  const { setAuthor } = useContext(documentAuthorContext);
  const { setCreateDate } = useContext(documentCreatedDateContext);
  const { setUpdater } = useContext(documentUpdaterContext);
  const { setLastUpdated } = useContext(documentLastUpdatedContext);

  const { setOptionState } = useContext(documentCategoryContext);

  // categories

  const category1 = _.filter(documentsFromBackend, {
    category: "Intro",
  });
  const category2 = _.filter(documentsFromBackend, {
    category: "Main",
  });
  const category3 = _.filter(documentsFromBackend, {
    category: "End",
  });
  const category4 = _.filter(documentsFromBackend, {
    category: "Supplementary",
  });

  const [showCategory1, setShowCategory1] = useState(false);
  const [showCategory2, setShowCategory2] = useState(false);
  const [showCategory3, setShowCategory3] = useState(false);
  const [showCategory4, setShowCategory4] = useState(false);

  function handleSelect(e) {
    setLastUpdated();
    setUpdater();
    e.preventDefault();
    let item = Object.values({ ...e.target });
    let selectedItem = item[1];
    const title = selectedItem.title;
    const docAuthor = selectedItem.author;
    const docCreated = selectedItem.createDate;
    let docUpdater = selectedItem.updater;
    let docLastUpdated = selectedItem.lastUpdated;
    const componentIds = selectedItem.content;
    const docCategory = selectedItem.category;

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
        setOptionState(docCategory);
      })
      // fail error modal here
      .catch((error) => console.log("ERROR"));
  }

  return (
    <>
      <div className="sidebar-categories">
        <div className="sidebar-header">
          <h3>Documents</h3>
        </div>
        {category1.length ? (
          <>
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
              Intro
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
                            category={l.category}
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
          </>
        ) : null}

        {category2.length ? (
          <>
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
              Main
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
                            category={l.category}
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
          </>
        ) : null}

        {category3.length ? (
          <>
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
              End
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
                            category={l.category}
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
          </>
        ) : null}

        {category4.length ? (
          <>
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
              Supplementary
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
                            category={l.category}
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
          </>
        ) : null}
      </div>
    </>
  );
}

export default Sidebar;
