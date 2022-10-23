import React, { useState, useEffect } from "react";

import { Editor, EditorState, RichUtils } from "draft-js";
import { clearEditorContent } from "draftjs-utils";
import { convertToHTML } from "draft-convert";
import "draft-js/dist/Draft.css";
import "./draft.css";
import "../style.css";

function TextEditor() {
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const [data, setData] = useState([]);
  const [name, setName] = useState("");
  const editor = React.useRef(null);

  function focusEditor() {
    editor.current.focus();
  }

  function handleSaveName(e) {
    e.preventDefault();
    setName(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    const html = convertToHTML(editorState.getCurrentContent());
    const tempData = [{ name: name, content: html }];
    setName("");
    setEditorState(clearEditorContent.EditorState);

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

  const HEADER_TYPES = [
    { label: "H1", style: "header-one" },
    { label: "H2", style: "header-two" },
    { label: "H3", style: "header-three" },
    { label: "H4", style: "header-four" },
    { label: "H5", style: "header-five" },
    { label: "H6", style: "header-six" },
  ];

  const HeaderStyleControls = (props) => {
    return (
      <div>
        {HEADER_TYPES.map((type) => (
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

  const LIST_TYPES = [
    { label: "Blockquote", style: "blockquote" },
    { label: "Code Block", style: "code-block" },
    { label: "Monospace", style: "CODE" },
  ];

  const ListStyleControls = (props) => {
    return (
      <div>
        {LIST_TYPES.map((type) => (
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
    { label: "UL", style: "unordered-list-item" },
    { label: "OL", style: "ordered-list-item" },
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
      <h1>Component Editor</h1>
      <p>
        Create a new component for your documents. Add new components to
        documents in the Document Creator.
      </p>
      <h3>Name</h3>
      <input type="text" onChange={handleSaveName} value={name} />
      <div onClick={focusEditor}>
        <h3>Content</h3>
        <div className="controls">
          <span className="control-set">
            <HeaderStyleControls onToggle={onBlockClick} />
          </span>
          <span className="control-set">
            <InlineStyleControls onToggle={onInlineClick} />
          </span>
          <span className="control-set">
            <ListStyleControls onToggle={onInlineClick} />
          </span>
        </div>

        <div className="text-box">
          <Editor
            ref={editor}
            editorState={editorState}
            onChange={(editorState) => setEditorState(editorState)}
          />
        </div>
        <input type="submit" onClick={handleSubmit} />
      </div>
    </div>
  );
}

export default TextEditor;
