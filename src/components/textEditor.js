import React, { useState, useEffect } from "react";
import Child2 from "./Child2";

import { Editor, EditorState, RichUtils } from "draft-js";
import { convertToHTML } from "draft-convert";
import "draft-js/dist/Draft.css";
import "./draft.css";
import "./style.css";

function TextEditor() {
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const [data, setData] = useState();
  const editor = React.useRef(null);

  function focusEditor() {
    editor.current.focus();
  }

  function handleSubmit(e) {
    e.preventDefault();
    /*
    console.log("editorstate: " + editorState);
    console.log("content state: " + editorState.getCurrentContent());
    console.log(
      "blocks: " + editorState.getCurrentContent().getBlocksAsArray()[0]
    );
    */
    // setData(editorState.getCurrentContent().getBlocksAsArray());
    const html = convertToHTML(editorState.getCurrentContent());
    console.log(html);
    setData(html);
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
        </div>
      </div>
      <div className="two">
        <Child2 data={data} />
      </div>
    </div>
  );
}

export default TextEditor;
