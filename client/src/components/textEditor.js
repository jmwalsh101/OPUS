import React, { useState, useEffect } from "react";
import DocCreator from "./DocCreator";

import { Editor, EditorState, RichUtils } from "draft-js";
import { convertToHTML } from "draft-convert";
import "draft-js/dist/Draft.css";
import "./draft.css";
import "./style.css";

function TextEditor() {
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const [data, setData] = useState([]);
  const [name, setName] = useState("");
  const editor = React.useRef(null);
  const [component, setComponent] = useState([]);
  //test

  function focusEditor() {
    editor.current.focus();
  }

  function handleSaveName(e) {
    e.preventDefault();
    setName(e.target.value);
  }

  function handleSave() {
    const save = convertToHTML(editorState.getCurrentContent());
    setComponent((current) => [...current, { name: name, content: save }]);
  }

  function handleSubmit(e) {
    e.preventDefault();
    const html = convertToHTML(editorState.getCurrentContent());
    const tempData = [...data, { name: name, content: html }];

    setData(tempData);

    fetch("/api2", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ parcel: tempData }),
    });
  }

  useEffect(() => {
    focusEditor();
  }, []);

  const StyleButton = (props) => {
    let onClickButton = (e) => {
      e.preventDefault();
      props.onToggle(props.style);
    };
    return <button onMouseDown={onClickButton}>{props.label}</button>;
  };

  const BLOCK_TYPES = [
    { label: "H1", style: "header-one" },
    { label: "H2", style: "header-two" },
    { label: "H3", style: "header-three" },
    { label: "H4", style: "header-four" },
    { label: "H5", style: "header-five" },
    { label: "H6", style: "header-six" },
    { label: "Blockquote", style: "blockquote" },
    { label: "UL", style: "unordered-list-item" },
    { label: "OL", style: "ordered-list-item" },
    { label: "Code Block", style: "code-block" },
  ];

  const BlockStyleControls = (props) => {
    return (
      <div>
        {BLOCK_TYPES.map((type) => (
          <StyleButton
            key={type.label}
            label={type.label}
            onToggle={props.onToggle}
            style={type.style}
          />
        ))}
      </div>
    );
  };

  const INLINE_STYLES = [
    { label: "Bold", style: "BOLD" },
    { label: "Italic", style: "ITALIC" },
    { label: "Underline", style: "UNDERLINE" },
    { label: "Monospace", style: "CODE" },
  ];
  const InlineStyleControls = (props) => {
    return (
      <div>
        {INLINE_STYLES.map((type) => (
          <StyleButton
            key={type.label}
            label={type.label}
            onToggle={props.onToggle}
            style={type.style}
          />
        ))}
      </div>
    );
  };

  const onInlineClick = (e) => {
    let nextState = RichUtils.toggleInlineStyle(editorState, e);
    setEditorState(nextState);
  };

  const onBlockClick = (e) => {
    let nextState = RichUtils.toggleBlockType(editorState, e);
    setEditorState(nextState);
  };

  return (
    <div className="main">
      <div className="one">
        <h1>Editor</h1>
        <input type="text" onChange={handleSaveName} value={name} />
        <div onClick={focusEditor}>
          <div className="App">
            <BlockStyleControls onToggle={onBlockClick} />
            <InlineStyleControls onToggle={onInlineClick} />
          </div>

          <div className="App">
            <Editor
              ref={editor}
              editorState={editorState}
              onChange={(editorState) => setEditorState(editorState)}
            />
          </div>
          <input type="submit" onClick={handleSubmit} />
          <button onClick={handleSave}>Save</button>
        </div>
      </div>

      <div className="two">
        <h1>Document Creator</h1>
        <DocCreator />
      </div>
    </div>
  );
}

export default TextEditor;
