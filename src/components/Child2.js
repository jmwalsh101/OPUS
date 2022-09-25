import { useState } from "react";

function Child2(props) {
  console.log("props: " + props.data);
  //const [newV, setNewV] = useState("");
  const [visVars, setVisVars] = useState(null);
  const [testy, setTesty] = useState("");

  function addContent(e) {
    e.preventDefault();
    visVars ? setVisVars(false) : setVisVars(true);
  }

  function handleAdd(e) {
    e.preventDefault();
    setTesty(e.target.value);
  }

  const showHideVars = visVars ? (
    <span>Hide Variables</span>
  ) : (
    <span>Show Variables</span>
  );

  /*
  function addTest(e) {
    e.preventDefault();
    setNewV(textV);
  }
*/
  var test = visVars ? (
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

  return (
    <div>
      <button onClick={addContent}>{showHideVars}</button>
      {test}
      <span dangerouslySetInnerHTML={{ __html: testy }} />
    </div>
  );
}

export default Child2;
