import { useState, useEffect } from "react";
import "./style.css";
import { DndContext, closestCenter } from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import _ from "lodash";

import SortableItem from "./SortableItem";

function DocCreator(props) {
  const [visVars, setVisVars] = useState(true);
  const [usedComponents, setUsedComponents] = useState([]);
  const [document, setDocument] = useState([]);
  const [docTitle, setDocTitle] = useState("");
  const [backendData, setBackendData] = useState([]);

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
    const componentIds = _.map(usedComponents, "id");
    const newDocument = {
      title: docTitle,
      content: componentIds,
    };

    setDocument({
      title: docTitle,
      content: componentIds,
    });

    fetch("/document-new", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ parcel: newDocument }),
    })
      .then((response) => {
        response.json();

        if (response.ok) {
        }
        //else for modal
      })
      .catch((error) => console.log("ERROR"));
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
                <input type="text" onChange={handleSaveTitle} />
                <input type="submit" value="Save" onClick={handleSubmit} />
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
        </div>
      </DndContext>
    </>
  );
}

export default DocCreator;
