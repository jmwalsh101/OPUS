import { useState, useEffect, useContext } from "react";
import { DndContext, closestCenter } from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import _ from "lodash";

import SortableItem from "./SortableItem";

import SuccessModal from "../modals/SuccessModal";
import ErrorModal from "../modals/ErrorModal";
import BackendErrorModal from "../modals/BackendErrorModal";
import ConfirmModal from "../modals/ConfirmModal";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRightToBracket } from "@fortawesome/free-solid-svg-icons";

import {
  usedComponentsContext,
  documentTitleContext,
  backendDocumentsContext,
  documentAuthorContext,
  documentCreatedDateContext,
  documentUpdaterContext,
  documentLastUpdatedContext,
  documentCategoryContext,
} from "../../contexts/DocumentContext";

import { timestamp } from "../constants/TimeStamp";

function DocCreator() {
  const [visVars, setVisVars] = useState(true);
  const [backendData, setBackendData] = useState([]);

  const [successModal, showSuccessModal] = useState(false);
  const [errorModal, setErrorModal] = useState(false);
  const handleClose = () => setErrorModal(false);
  const [existingNameModal, setExistingNameModal] = useState(false);
  const handleExistingName = () => setExistingNameModal(false);
  const [backendErrorModal, setBackendErrorModal] = useState(false);
  const [existingTitleModal, setExistingTitleModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);

  const { usedComponents, setUsedComponents } = useContext(
    usedComponentsContext
  );

  const [activeTab, setActiveTab] = useState("Select Components");

  const { docTitle, setDocTitle } = useContext(documentTitleContext);

  const { documentsFromBackend } = useContext(backendDocumentsContext);

  const { author, setAuthor } = useContext(documentAuthorContext);
  const { createDate, setCreateDate } = useContext(documentCreatedDateContext);
  const { updater, setUpdater } = useContext(documentUpdaterContext);
  const { lastUpdated, setLastUpdated } = useContext(
    documentLastUpdatedContext
  );

  const { optionState, setOptionState } = useContext(documentCategoryContext);
  const [category, setCategory] = useState(optionState);

  function handleCategory(e) {
    e.preventDefault();
    setCategory(e.target.value);
    setOptionState(e.target.value);
  }

  function handleConfirmUpdateModalClose() {
    setExistingTitleModal(false);
    // loading modal
    const componentIds = _.map(usedComponents, "id");
    const newDocument = {
      title: docTitle,
      content: componentIds,
      category: category,
      author: author,
      created: createDate,
      updater: JSON.parse(sessionStorage.getItem("username")).registerUsername,
      updated: timestamp,
    };

    fetch("/document-update", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ parcel: newDocument }),
    })
      .then((response) => {
        response.json();

        if (response.ok) {
          setDocTitle("");
          setUsedComponents([]);
          setAuthor(
            JSON.parse(sessionStorage.getItem("username")).registerUsername
          );
          setCreateDate(timestamp);
          setUpdater("");
          setLastUpdated("");
          showSuccessModal(true);
          setTimeout(() => showSuccessModal(false), 1000);
        }
        //else for modal
      })
      .catch((error) => {
        setTimeout(() => setBackendErrorModal(true), 3000);
      });
  }

  function handleCancel(e) {
    e.preventDefault();
    setExistingTitleModal(false);
  }

  function handleDeleteCancel(e) {
    e.preventDefault();
    setDeleteModal(false);
  }

  function handleDeleteDoc(e) {
    e.preventDefault();
    setDeleteModal(true);
  }

  function handleConfirmDeleteDoc(e) {
    e.preventDefault();

    fetch("/document-delete", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ parcel: docTitle }),
    })
      .then((response) => {
        response.json();

        if (response.ok) {
          setDocTitle("");
          setUsedComponents([]);
          setAuthor(
            JSON.parse(sessionStorage.getItem("username")).registerUsername
          );
          setCreateDate(timestamp);
          setUpdater("");
          setLastUpdated("");
          setDeleteModal(false);
        }
        //else for modal
      })
      .catch((error) => {
        setTimeout(() => setBackendErrorModal(true), 3000);
      });
  }

  function handleClear(e) {
    e.preventDefault();
    setUsedComponents([]);
    setDocTitle("");
    setAuthor(JSON.parse(sessionStorage.getItem("username")).registerUsername);
    setCreateDate(timestamp);
    setUpdater("");
    setLastUpdated("");
    //confirm modal with conditions
  }

  function handleDelete(e) {
    e.preventDefault();
    usedComponents.splice(e.target.value, 1);
    setUsedComponents(usedComponents);
  }

  function showSelected() {
    setVisVars(true);
    setActiveTab("Select Components");
  }

  function selectComponents() {
    setVisVars(false);
    setActiveTab("Order Components");
  }

  useEffect(() => {
    fetch("/component-load")
      .then((response) => response.json())
      .then((data) => {
        setBackendData(data);
      });
  }, [backendData]);

  function handleAdd(e) {
    e.preventDefault();
    const item = e.target.value.split(",");
    setUsedComponents((current) => [
      ...current,
      { id: item[0], name: item[1], content: item[2] },
    ]);
  }

  function handleSaveTitle(e) {
    e.preventDefault();
    setDocTitle(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    const existingTitle = _.find(documentsFromBackend, { title: docTitle });

    if (docTitle === "" || usedComponents.length === 0) {
      setErrorModal(true);
    } else if (existingTitle) {
      setExistingTitleModal(true);
    } else {
      const componentIds = _.map(usedComponents, "id");
      const newDocument = {
        title: docTitle,
        content: componentIds,
        category: category,
        author: author,
        created: createDate,
        updater: null,
        lastUpdated: null,
      };

      fetch("/document-new", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ parcel: newDocument }),
      })
        .then((response) => {
          response.json();

          if (response.ok) {
            setDocTitle("");
            setUsedComponents([]);
            showSuccessModal(true);
            setTimeout(() => showSuccessModal(false), 1000);
            setAuthor(
              JSON.parse(sessionStorage.getItem("username")).registerUsername
            );
            setCreateDate(timestamp);
            setUpdater("");
            setLastUpdated("");
          }
          //else for modal
        })
        .catch((error) => {
          setTimeout(() => setBackendErrorModal(true), 3000);
        });
    }
  }

  function handleDragEnd(event) {
    const { active, over } = event;
    setUsedComponents(arrayMove(usedComponents, active.id, over.id));
  }

  //
  const category1 = _.filter(backendData, {
    category: "Intro",
  });
  const category2 = _.filter(backendData, {
    category: "Main",
  });
  const category3 = _.filter(backendData, {
    category: "End",
  });
  const category4 = _.filter(backendData, {
    category: "Supplementary",
  });

  const [showCategory1, setShowCategory1] = useState(false);
  const [showCategory2, setShowCategory2] = useState(false);
  const [showCategory3, setShowCategory3] = useState(false);
  const [showCategory4, setShowCategory4] = useState(false);

  //

  var docComponents = visVars ? (
    <>
      {category1.length ? (
        <>
          <div
            className="component-category"
            id="cy-component-select"
            onClick={(e) => {
              if (showCategory1 === false) {
                setShowCategory1(true);
              } else {
                setShowCategory1(false);
              }
              e.currentTarget.classList.toggle("component-category");
              e.currentTarget.classList.toggle("component-category-active");
            }}
          >
            Intro
          </div>
          <div className="component-items">
            {showCategory1
              ? category1.map(function (l, index) {
                  return (
                    <>
                      <div key={index} className="component-item">
                        <p>{l.name}</p>
                        <p>{l.category}</p>
                        <button
                          onClick={handleAdd}
                          value={[l.id, l.name, l.content]}
                          id="cy-components"
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
            className="component-category"
            onClick={(e) => {
              if (showCategory2 === false) {
                setShowCategory2(true);
              } else {
                setShowCategory2(false);
              }
              if (category2.length) {
                e.currentTarget.classList.toggle("component-category");
                e.currentTarget.classList.toggle("component-category-active");
              }
            }}
          >
            Main
          </div>
          <div className="component-items">
            {showCategory2
              ? category2.map(function (l, index) {
                  return (
                    <>
                      <div key={index} className="component-item">
                        <p>{l.name}</p>
                        <p>{l.category}</p>
                        <button
                          onClick={handleAdd}
                          value={[l.id, l.name, l.content]}
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
            className="component-category"
            onClick={(e) => {
              if (showCategory3 === false) {
                setShowCategory3(true);
              } else {
                setShowCategory3(false);
              }
              if (category3.length) {
                e.currentTarget.classList.toggle("component-category");
                e.currentTarget.classList.toggle("component-category-active");
              }
            }}
          >
            End
          </div>
          <div className="component-items">
            {showCategory3
              ? category3.map(function (l, index) {
                  return (
                    <>
                      <div key={index} className="component-item">
                        <p>{l.name}</p>
                        <p>{l.category}</p>
                        <button
                          onClick={handleAdd}
                          value={[l.id, l.name, l.content]}
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
            className="component-category"
            onClick={(e) => {
              if (showCategory4 === false) {
                setShowCategory4(true);
              } else {
                setShowCategory4(false);
              }
              e.currentTarget.classList.toggle("component-category");
              e.currentTarget.classList.toggle("component-category-active");
            }}
          >
            Supplementary
          </div>
          <div className="component-items">
            {showCategory4
              ? category4.map(function (l, index) {
                  return (
                    <>
                      <div key={index} className="component-item">
                        <p>{l.name}</p>
                        <p>{l.category}</p>
                        <button
                          onClick={handleAdd}
                          value={[l.id, l.name, l.content]}
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
    </>
  ) : (
    <SortableContext
      strategy={verticalListSortingStrategy}
      items={usedComponents}
    >
      <table>
        <tbody>
          {usedComponents.map(function (l, index) {
            return (
              <tr className="doc-component">
                <SortableItem
                  name={l.name}
                  key={index}
                  id={index}
                  number={index + 1}
                />
                <td>
                  <button
                    onClick={handleDelete}
                    value={index}
                    className="warning"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </SortableContext>
  );

  return (
    <>
      <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <div>
          <div className="doc-container-overview">
            <div className="doc-creator-container">
              <div className="doc-actions">
                <div className="doc-actions1">
                  <span className="doc-action">
                    Title&nbsp;&nbsp;
                    <input
                      id="title"
                      type="text"
                      onChange={handleSaveTitle}
                      value={docTitle}
                    />
                  </span>
                  <span className="doc-action">
                    <p>Category</p>&nbsp;&nbsp;
                    <select
                      name="cars"
                      id="category"
                      onChange={handleCategory}
                      className="category-input select-input"
                      value={optionState}
                    >
                      <option value="Intro">Intro</option>
                      <option value="Main">Main</option>
                      <option value="End">End</option>
                      <option value="Supplementary">Supplementary</option>
                    </select>
                  </span>
                  <div className="doc-action-minimal-container">
                    <span className="doc-action-minimal">
                      <p>Author</p>&nbsp;&nbsp;
                      <input
                        type="text"
                        readOnly="readonly"
                        value={author}
                        className="odd-spaced-input"
                      />
                    </span>
                    <span className="doc-action-minimal">
                      <p>Created On</p>&nbsp;&nbsp;
                      <input
                        type="text"
                        readOnly="readonly"
                        value={createDate}
                      />
                    </span>
                  </div>
                  <div className="doc-action-minimal-container">
                    <span className="doc-action-minimal">
                      <p>Updated By</p>&nbsp;&nbsp;
                      <input type="text" readOnly="readonly" value={updater} />
                    </span>
                    <span className="doc-action-minimal">
                      <p>Updated On</p>&nbsp;&nbsp;
                      <input
                        type="text"
                        readOnly="readonly"
                        value={lastUpdated}
                      />
                    </span>
                  </div>
                </div>
                <input
                  type="submit"
                  value="Clear"
                  onClick={handleClear}
                  className="caution"
                />
                <input
                  id="delete"
                  type="submit"
                  value="Delete"
                  onClick={handleDeleteDoc}
                />
                <input
                  id="save"
                  type="submit"
                  value="Save"
                  onClick={handleSubmit}
                />
              </div>

              <div className="document-container">
                <div className="document">
                  {usedComponents.map(function (j, index) {
                    return (
                      <>
                        <div id={j.id}>
                          <span
                            key={index}
                            dangerouslySetInnerHTML={{ __html: j.content }}
                          />
                        </div>
                      </>
                    );
                  })}
                </div>
              </div>
            </div>
            <div className="component-manager">
              <div className="component-container">
                <div className="component-tabs">
                  <button
                    onClick={showSelected}
                    className={` ${
                      activeTab === "Select Components" ? "active-tab" : "tab"
                    }`}
                  >
                    Select Texts
                  </button>
                  &nbsp;&nbsp;
                  <button
                    onClick={selectComponents}
                    className={` ${
                      activeTab === "Order Components" ? "active-tab" : "tab"
                    }`}
                  >
                    Order Texts
                  </button>
                </div>
                <div className="doc-components">{docComponents}</div>
              </div>
            </div>
          </div>
          {successModal ? <SuccessModal message="Document created!" /> : null}
          {errorModal ? (
            <ErrorModal
              show={errorModal}
              onClose={handleClose}
              message="You must enter a title and select components."
            />
          ) : null}
          {existingNameModal ? (
            <ErrorModal
              show={errorModal}
              onClose={handleExistingName}
              message="A title already exists."
            />
          ) : null}
          {backendErrorModal ? <BackendErrorModal /> : null}
          {existingTitleModal ? (
            <>
              <ConfirmModal
                onClose={handleConfirmUpdateModalClose}
                cancel={handleCancel}
                confirmButton="Update"
                message={
                  <>
                    <p>
                      A document named <strong>{docTitle}</strong> already
                      exists. You can update this document with your changes.
                    </p>
                  </>
                }
              />
            </>
          ) : null}
          {deleteModal ? (
            <>
              <ConfirmModal
                onClose={handleConfirmDeleteDoc}
                cancel={handleDeleteCancel}
                confirmButton="Delete"
                message={
                  <>
                    <p>
                      This will permanently delete the document named {docTitle}
                      . You will not be able to recover it.
                    </p>
                  </>
                }
              />
            </>
          ) : null}
        </div>
      </DndContext>
    </>
  );
}

export default DocCreator;
