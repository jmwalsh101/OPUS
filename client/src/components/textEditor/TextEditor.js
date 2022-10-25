import React, { useState, useEffect } from "react";

import { Editor, EditorState, RichUtils } from "draft-js";
import { clearEditorContent } from "draftjs-utils";
import { convertToHTML } from "draft-convert";
import "draft-js/dist/Draft.css";
import "./draft.css";
import "../style.css";

import MyVerticallyCenteredModal from "./MyVerticallyCenteredModal";
import LoadingModal from "./LoadingModal";
import SuccessModal from "./SuccessModal";
import _ from "lodash";

function TextEditor() {
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const [name, setName] = useState("");
  const editor = React.useRef(null);
  const [componentId, setComponentId] = useState();

  console.log(editorState);

  const [modalShow, setModalShow] = useState(false);
  const handleClose = () => setModalShow(false);

  const [successModal, showSuccessModal] = useState(false);
  const handleSuccessModalClose = () => showSuccessModal(false);

  // test for loading modal

  const [backendData, setBackendData] = useState([]);
  const [loadingModal, setShowLoading] = useState(false);
  const handleLoadingClose = () => setShowLoading(false);

  useEffect(() => {
    fetch("/component-load")
      .then((response) => response.json())
      .then((data) => {
        setBackendData(data);
      });
  }, [backendData]);

  //

  useEffect(() => {
    fetch("/component-id")
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        setComponentId(parseInt(data) + 1);
      });
  }, [name]);

  function focusEditor() {
    editor.current.focus();
  }

  function handleClear(e) {
    e.preventDefault();
    setName("");
    setEditorState(clearEditorContent(editorState));
  }

  function handleSaveName(e) {
    e.preventDefault();
    setName(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    const oldBackendData = backendData;

    if (name !== "" && editorState.getCurrentContent().hasText()) {
      const html = convertToHTML(editorState.getCurrentContent());
      const newComponent = [{ id: componentId, name: name, content: html }];
      setName("");
      setEditorState(clearEditorContent(editorState));

      fetch("/component-update", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ parcel: newComponent }),
      });

      while (_.difference(oldBackendData, backendData) === []) {
        setShowLoading(true);
      }

      if (_.difference(oldBackendData, backendData) !== []) {
        showSuccessModal(true);
      }
    } else {
      setModalShow(true);
    }
  }
  /*
  const showModal = modalShow ? (
    <>
      <MyVerticallyCenteredModal show={modalShow} />
    </>
  ) : (
    <>No modal</>
  );
*/
  useEffect(() => {
    focusEditor();
  }, []);

  const StyleButton = (props) => {
    let onClickButton = (e) => {
      e.preventDefault();
      props.onToggle(props.style);
    };
    return (
      <button
        className="RichEditor-controls RichEditor-styleButton RichEditor-activeButton"
        onMouseDown={onClickButton}
      >
        {props.label}
      </button>
    );
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
          <>
            <StyleButton
              key={type.label}
              label={type.label}
              onToggle={props.onToggle}
              style={type.style}
            />
          </>
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
    <>
      <div className="main">
        <h1>Component Editor</h1>
        <p>
          Create a new component for your documents. Add new components to
          documents in the Document Creator.
        </p>
        <div className="component-actions">
          <span>
            <p>Name</p>
            <input type="text" onChange={handleSaveName} value={name} />
          </span>
          <span>
            <p>Category</p>
            <input type="text" />
          </span>
          <span>
            <p>ID</p>
            <input type="text" readonly="readonly" value={componentId} />
          </span>
          <span>
            <input type="submit" value="Clear" onClick={handleClear} />
          </span>
          <span>
            <input type="submit" onClick={handleSubmit} />
          </span>
        </div>
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
        </div>
        {modalShow ? (
          <MyVerticallyCenteredModal show={modalShow} onClose={handleClose} />
        ) : null}
        {loadingModal ? (
          <>
            <LoadingModal show={loadingModal} onClose={handleLoadingClose} />
          </>
        ) : null}
        {successModal ? (
          <SuccessModal show={successModal} onClose={handleSuccessModalClose} />
        ) : null}
      </div>
    </>
  );
}

export default TextEditor;
