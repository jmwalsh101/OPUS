import { useState } from "react";
import "./style.css";

function DocCreator(props) {
  const [visVars, setVisVars] = useState(null);
  const [showComponent, setShowComponent] = useState([]);
  const [document, setDocument] = useState([]);
  const [docTitle, setDocTitle] = useState("");

  function addContent(e) {
    e.preventDefault();
    visVars ? setVisVars(false) : setVisVars(true);
  }

  function handleAdd(e) {
    e.preventDefault();
    setShowComponent((current) => [...current, e.target.value]);
  }

  function handleSaveTitle(e) {
    e.preventDefault();
    setDocTitle(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    setDocument({ title: docTitle, content: showComponent });
  }
  console.log(document);

  const showHideVars = visVars ? (
    <span>Hide Variables</span>
  ) : (
    <span>Show Variables</span>
  );

  var docComponents = visVars ? (
    <div>
      {props.data.map(function (i, index) {
        return (
          <button onClick={handleAdd} value={i.content} key={index}>
            {i.name}
          </button>
        );
      })}
    </div>
  ) : null;

  console.log(showComponent);

  return (
    <>
      <div>
        <button onClick={addContent}>{showHideVars}</button>
        {docComponents}
        {showComponent.map(function (j, index) {
          return (
            <>
              <div className="doc-component" id={index}>
                <span key={index} dangerouslySetInnerHTML={{ __html: j }} />
              </div>
            </>
          );
        })}
        <input type="submit" onClick={handleSubmit} />
        <input type="text" onChange={handleSaveTitle} />
        <div></div>
      </div>
    </>
  );
}

export default DocCreator;
