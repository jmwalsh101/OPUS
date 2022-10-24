import { useState, useEffect } from "react";
import "./style.css";
import { DndContext, closestCenter } from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import SortableItem from "./SortableItem";

function DocCreator(props) {
  const [visVars, setVisVars] = useState(true);
  const [showComponent, setShowComponent] = useState([]);
  const [document, setDocument] = useState([]);
  const [docTitle, setDocTitle] = useState("");
  const [backendData, setBackendData] = useState([{}]);

  // deletion

  function handleDelete(e) {
    e.preventDefault();
    showComponent.splice(e.target.value, 1);
    setShowComponent(showComponent);
  }

  function showSelected() {
    setVisVars(true);
  }

  function selectComponents() {
    setVisVars(false);
  }

  useEffect(() => {
    fetch("/api")
      .then((response) => response.json())
      .then((data) => {
        setBackendData(data);
      });
  }, [backendData]);

  function handleAdd(e) {
    e.preventDefault();
    const item = e.target.value.split(",");
    setShowComponent((current) => [
      ...current,
      { name: item[0], content: item[1] },
    ]);
  }

  function handleSaveTitle(e) {
    e.preventDefault();
    setDocTitle(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    setDocument({ title: docTitle, content: showComponent });
  }

  function handleDragEnd(event) {
    const { active, over } = event;
    setShowComponent(arrayMove(showComponent, active.id, over.id));
  }

  var docComponents = visVars ? (
    <div>
      {backendData.map(function (i, index) {
        return (
          <button onClick={handleAdd} value={[i.name, i.content]} key={index}>
            {i.name}
          </button>
        );
      })}
    </div>
  ) : (
    <SortableContext
      strategy={verticalListSortingStrategy}
      items={showComponent}
    >
      {showComponent.map(function (l, index) {
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
                  {showComponent.map(function (j, index) {
                    return (
                      <>
                        <div id={index}>
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
