import { useState, useEffect } from "react";
import "../style.css";
import { DndContext, closestCenter } from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import SortableItem from "./SortableItem";

function DocCreator(props) {
  const [visVars, setVisVars] = useState(null);
  const [showComponent, setShowComponent] = useState([]);
  const [document, setDocument] = useState([]);
  const [docTitle, setDocTitle] = useState("");
  const [backendData, setBackendData] = useState([{}]);

  // backendData import
  function handleBackend(e) {
    e.preventDefault();
    fetch("/api")
      .then((response) => response.json())
      .then((data) => {
        setBackendData(data);
      });
  }

  function addContent(e) {
    e.preventDefault();
    visVars ? setVisVars(false) : setVisVars(true);
  }

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

  const showHideVars = visVars ? (
    <span>Hide Variables</span>
  ) : (
    <span>Show Variables</span>
  );

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
  ) : null;

  return (
    <>
      <h1>Document Manager</h1>
      <div>
        <button onClick={addContent}>{showHideVars}</button>
        {docComponents}
        <DndContext
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
        >
          <div className="show-component-container">
            <div className="show-content">
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
            <div className="show-name">
              <h3>Document Components</h3>

              <SortableContext
                strategy={verticalListSortingStrategy}
                items={showComponent}
              >
                {showComponent.map(function (l, index) {
                  return (
                    <>
                      <SortableItem name={l.name} key={index} id={index} />
                    </>
                  );
                })}
              </SortableContext>
            </div>
          </div>
        </DndContext>
        <input type="submit" onClick={handleSubmit} />
        <input type="text" onChange={handleSaveTitle} />

        {/* This is for testing APIS */}
        <div>
          <p>Get from backend</p>
          <input type="submit" onClick={handleBackend} />
          {backendData.map(function (q, index) {
            return (
              <>
                <div key={index}>
                  <p>{q.name}</p>
                  <span dangerouslySetInnerHTML={{ __html: q.content }} />
                </div>
              </>
            );
          })}
        </div>
      </div>
    </>
  );
}

export default DocCreator;
