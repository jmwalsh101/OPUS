import { useState, useEffect, useContext } from "react";
import "./style.css";
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

import {
  usedComponentsContext,
  documentTitleContext,
  backendDocumentsContext,
} from "../../contexts/DocumentContext";

function DocCreator() {
  const [visVars, setVisVars] = useState(true);
  const [backendData, setBackendData] = useState([]);

  const [successModal, showSuccessModal] = useState(false);
  const [errorModal, setErrorModal] = useState(false);
  const handleClose = () => setErrorModal(false);
  const [existingNameModal, setExistingNameModal] = useState(false);
  const handleExistingName = () => setExistingNameModal(false);
  const [backendErrorModal, setBackendErrorModal] = useState(false);

  const { usedComponents, setUsedComponents } = useContext(
    usedComponentsContext
  );

  const { docTitle, setDocTitle } = useContext(documentTitleContext);

  const { documentsFromBackend, setDocumentsFromBackend } = useContext(
    backendDocumentsContext
  );

  function handleClear(e) {
    e.preventDefault();
    setUsedComponents([]);
    setDocTitle("");
    //confirm modal with conditions
  }

  function handleDelete(e) {
    e.preventDefault();
    usedComponents.splice(e.target.value, 1);
    setUsedComponents(usedComponents);
  }

  function showSelected() {
    setVisVars(true);
  }

  function selectComponents() {
    setVisVars(false);
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
      setExistingNameModal(true);
    } else {
      const componentIds = _.map(usedComponents, "id");
      const newDocument = {
        title: docTitle,
        content: componentIds,
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

  var docComponents = visVars ? (
    <div>
      {backendData.map(function (i, index) {
        return (
          <button
            onClick={handleAdd}
            value={[i.id, i.name, i.content]}
            key={index}
          >
            {i.name}
          </button>
        );
      })}
    </div>
  ) : (
    <SortableContext
      strategy={verticalListSortingStrategy}
      items={usedComponents}
    >
      {usedComponents.map(function (l, index) {
        return (
          <>
            <SortableItem
              name={l.name}
              key={index}
              id={index}
              number={index + 1}
            />
            <button onClick={handleDelete} value={index}>
              Delete
            </button>
          </>
        );
      })}
    </SortableContext>
  );

  return (
    <>
      <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <h1>Document Editor</h1>
        <p>Create, Edit, and Manage your documents.</p>
        <div>
          <div className="doc-container-overview">
            <div className="doc-creator-container">
              <div className="doc-actions">
                Name
                <input
                  type="text"
                  onChange={handleSaveTitle}
                  value={docTitle}
                />
                <input type="submit" value="Save" onClick={handleSubmit} />
                <input type="submit" value="Clear" onClick={handleClear} />
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
              <button onClick={showSelected}>Select Components</button>
              <button onClick={selectComponents}>Order Components</button>
              {docComponents}
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
        </div>
      </DndContext>
    </>
  );
}

export default DocCreator;
